const express = require("express");

const {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
  getDashboardStats,
  getTodayFollowUps
} = require("../controllers/leadController");

const {
  protect,
  adminOnly
} = require("../middleware/authMiddleware");

const router = express.Router();

// All lead routes require authentication
router.use(protect);

// Dashboard
router.get("/dashboard/stats", getDashboardStats);

// Today's follow-ups
router.get("/followups/today", getTodayFollowUps);

// Leads
router.get("/", getLeads);

router.get("/:id", getLeadById);

router.post("/", adminOnly, createLead);

router.put("/:id", adminOnly, updateLead);

// ONLY ADMIN can delete
router.delete("/:id", adminOnly, deleteLead);

module.exports = router;