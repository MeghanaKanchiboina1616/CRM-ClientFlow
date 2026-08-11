const Lead = require("../models/Lead");
const { calculateLeadScore } = require("../services/leadService");

// GET ALL LEADS / GET SALES USER'S LEADS
const getLeads = async (req, res, next) => {
  try {
    const { search, status } = req.query;

    const filter = {};

    // SALES users can only see their own leads
    if (req.user.role !== "ADMIN") {
      filter.assignedTo = req.user.id;
    }

    if (status && status !== "ALL") {
      filter.status = status;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } }
      ];
    }

    const leads = await Lead.find(filter)
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 });

    const result = leads.map((lead) => {
      const leadObject = lead.toObject();

      const scoring = calculateLeadScore(leadObject);

      return {
        ...leadObject,
        score: scoring.score,
        category: scoring.category
      };
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
};


// GET SINGLE LEAD
const getLeadById = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id)
      .populate("assignedTo", "name email");

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found"
      });
    }

    // SALES users cannot access another user's lead
    if (
      req.user.role !== "ADMIN" &&
      lead.assignedTo &&
      lead.assignedTo._id.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "You are not allowed to access this lead"
      });
    }

    const leadObject = lead.toObject();

    const scoring = calculateLeadScore(leadObject);

    res.json({
      ...leadObject,
      score: scoring.score,
      category: scoring.category
    });
  } catch (error) {
    next(error);
  }
};


// CREATE LEAD
const createLead = async (req, res, next) => {
  try {
    const {
      name,
      company,
      email,
      phone,
      source,
      status,
      nextFollowUp,
      notes,
      assignedTo
    } = req.body;

    let leadOwner;

    // ADMIN can assign the lead to a SALES user
    if (req.user.role === "ADMIN") {
      leadOwner = assignedTo || req.user.id;
    } else {
      // SALES automatically owns the lead they create
      leadOwner = req.user.id;
    }

    const lead = await Lead.create({
      name,
      company,
      email,
      phone,
      source,
      status,
      nextFollowUp,
      notes,
      assignedTo: leadOwner
    });

    const populatedLead = await Lead.findById(lead._id)
      .populate("assignedTo", "name email");

    const leadObject = populatedLead.toObject();

    const scoring = calculateLeadScore(leadObject);

    res.status(201).json({
      ...leadObject,
      score: scoring.score,
      category: scoring.category
    });
  } catch (error) {
    next(error);
  }
};


// UPDATE LEAD
const updateLead = async (req, res, next) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found"
      });
    }

    // SALES users can only update their own leads
    if (
      req.user.role !== "ADMIN" &&
      lead.assignedTo &&
      lead.assignedTo.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "You are not allowed to update this lead"
      });
    }

    // SALES users cannot change lead ownership
    if (req.user.role !== "ADMIN") {
      delete req.body.assignedTo;
    }

    Object.assign(lead, req.body);

    await lead.save();

    const populatedLead = await Lead.findById(lead._id)
      .populate("assignedTo", "name email");

    const leadObject = populatedLead.toObject();

    const scoring = calculateLeadScore(leadObject);

    res.json({
      ...leadObject,
      score: scoring.score,
      category: scoring.category
    });
  } catch (error) {
    next(error);
  }
};

// DELETE LEAD
const deleteLead = async (req, res, next) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      return res.status(404).json({
        message: "Lead not found"
      });
    }

    res.json({
      message: "Lead deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};


// DASHBOARD STATISTICS
const getDashboardStats = async (req, res, next) => {
  try {
    const filter = {};

    // ADMIN → all leads
    // SALES → only their leads
    if (req.user.role !== "ADMIN") {
      filter.assignedTo = req.user.id;
    }

    const total = await Lead.countDocuments(filter);

    const newLeads = await Lead.countDocuments({
      ...filter,
      status: "NEW"
    });

    const contacted = await Lead.countDocuments({
      ...filter,
      status: "CONTACTED"
    });

    const qualified = await Lead.countDocuments({
      ...filter,
      status: "QUALIFIED"
    });

    const proposal = await Lead.countDocuments({
      ...filter,
      status: "PROPOSAL"
    });

    const won = await Lead.countDocuments({
      ...filter,
      status: "WON"
    });

    const lost = await Lead.countDocuments({
      ...filter,
      status: "LOST"
    });

    const allLeads = await Lead.find(filter);

    let hot = 0;
    let warm = 0;
    let cold = 0;

    allLeads.forEach((lead) => {
      const { category } = calculateLeadScore(
        lead.toObject()
      );

      if (category === "HOT") {
        hot++;
      } else if (category === "WARM") {
        warm++;
      } else {
        cold++;
      }
    });

    res.json({
      total,
      newLeads,
      contacted,
      qualified,
      proposal,
      won,
      lost,
      hot,
      warm,
      cold
    });
  } catch (error) {
    next(error);
  }
};


// TODAY'S FOLLOW-UPS
const getTodayFollowUps = async (req, res, next) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const filter = {
      nextFollowUp: {
        $gte: start,
        $lte: end
      }
    };

    // SALES → only their follow-ups
    if (req.user.role !== "ADMIN") {
      filter.assignedTo = req.user.id;
    }

    const leads = await Lead.find(filter)
      .populate("assignedTo", "name email")
      .sort({ nextFollowUp: 1 });

    res.json(leads);
  } catch (error) {
    next(error);
  }
};


module.exports = {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
  getDashboardStats,
  getTodayFollowUps
};