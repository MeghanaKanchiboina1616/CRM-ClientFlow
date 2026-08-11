import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import LeadCard from "../components/LeadCard";
import LeadForm from "../components/LeadForm";
import API from "../services/api";

const Leads = () => {
  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const isAdmin = user?.role === "ADMIN";

  const [leads, setLeads] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingLead, setEditingLead] = useState(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const [error, setError] = useState("");

  const fetchLeads = async () => {
    try {
      const response = await API.get("/leads", {
        params: {
          search,
          status
        }
      });

      setLeads(response.data);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to load leads"
      );
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [search, status]);

  const handleCreate = async (data) => {
  try {
    await API.post("/leads", data);

    setShowForm(false);
    setEditingLead(null);

    fetchLeads();
  } catch (error) {
    setError(
      error.response?.data?.message ||
        "Failed to create lead"
    );
  }
};

  const handleUpdate = async (data) => {
    try {
      await API.put(
        `/leads/${editingLead._id}`,
        data
      );

      setEditingLead(null);
      setShowForm(false);
      fetchLeads();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to update lead"
      );
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this lead?"
    );

    if (!confirmed) return;

    try {
      await API.delete(`/leads/${id}`);

      fetchLeads();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Only admins can delete leads"
      );
    }
  };

  return (
    <>
      <Navbar />

      <main className="page-container">

        {/* HEADER */}

        <div className="page-header">

          <div>
            <h1>
              {isAdmin
                ? "All Leads"
                : "My Leads"}
            </h1>

            <p>
              {isAdmin
                ? "Manage all sales leads"
                : "Manage leads assigned to you"}
            </p>
          </div>

          {isAdmin && (
           <button
            className="primary-btn"
            onClick={() => {
             setEditingLead(null);
             setShowForm(true);
            }}
           >
            + Add Lead
          </button>
        )}

        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {/* FORM */}

        {(showForm || editingLead) && (
          <LeadForm
            initialData={editingLead}
            onSubmit={
              editingLead
                ? handleUpdate
                : handleCreate
            }
            onCancel={() => {
              setShowForm(false);
              setEditingLead(null);
            }}
          />
        )}

        {/* FILTERS */}

        <div className="filters">

          <input
            placeholder="Search by name, company or email..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
          >
            <option value="ALL">
              All Statuses
            </option>

            <option value="NEW">
              New
            </option>

            <option value="CONTACTED">
              Contacted
            </option>

            <option value="QUALIFIED">
              Qualified
            </option>

            <option value="PROPOSAL">
              Proposal
            </option>

            <option value="WON">
              Won
            </option>

            <option value="LOST">
              Lost
            </option>

          </select>

        </div>

        <div className="lead-count">
          {leads.length} lead
          {leads.length !== 1 ? "s" : ""}
        </div>

        {/* LEADS */}

        {leads.length === 0 ? (
          <div className="empty-state">

            <h2>No leads found</h2>

            <p>
              {isAdmin
                ? "Add a lead to start managing your pipeline."
                : "You don't have any leads assigned to you yet."}
            </p>

          </div>
        ) : (
          <div className="lead-grid">

            {leads.map((lead) => (
              <LeadCard
                key={lead._id}
                lead={lead}
                onEdit={
                  isAdmin
                  ? (lead) => {
                  setEditingLead(lead);
                  setShowForm(false);
                  }
                 : undefined
                }
                onDelete={
                  isAdmin
                    ? handleDelete
                    : undefined
                }
              />
            ))}

          </div>
        )}

      </main>
    </>
  );
};

export default Leads;