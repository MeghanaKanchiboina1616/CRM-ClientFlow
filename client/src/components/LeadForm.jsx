import { useEffect, useState } from "react";
import API from "../services/api";

const LeadForm = ({
  onSubmit,
  initialData,
  onCancel
}) => {
  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const isAdmin = user?.role === "ADMIN";

  const [salesUsers, setSalesUsers] = useState([]);

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    company: initialData?.company || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    source: initialData?.source || "Website",
    status: initialData?.status || "NEW",

    assignedTo:
      initialData?.assignedTo?._id ||
      initialData?.assignedTo ||
      "",

    nextFollowUp: initialData?.nextFollowUp
      ? initialData.nextFollowUp.substring(0, 10)
      : "",

    notes: initialData?.notes || ""
  });

  const [loadingUsers, setLoadingUsers] =
    useState(false);

  useEffect(() => {
    if (!isAdmin) return;

    const fetchSalesUsers = async () => {
      try {
        setLoadingUsers(true);

        const response = await API.get(
          "/auth/sales-users"
        );

        setSalesUsers(response.data);
      } catch (error) {
        console.error(
          "Failed to load sales users:",
          error
        );
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchSalesUsers();
  }, [isAdmin]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);
  };

  return (
    <form
      className="lead-form"
      onSubmit={handleSubmit}
    >
      <h2>
        {initialData
          ? "Edit Lead"
          : "Add New Lead"}
      </h2>

      <div className="form-grid">

        {/* NAME */}

        <div>
          <label>Name</label>

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Smith"
            required
          />
        </div>

        {/* COMPANY */}

        <div>
          <label>Company</label>

          <input
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="ABC Technologies"
            required
          />
        </div>

        {/* EMAIL */}

        <div>
          <label>Email</label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@abc.com"
            required
          />
        </div>

        {/* PHONE */}

        <div>
          <label>Phone</label>

          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="9876543210"
          />
        </div>

        {/* SOURCE */}

        <div>
          <label>Source</label>

          <select
            name="source"
            value={formData.source}
            onChange={handleChange}
          >
            <option value="Website">
              Website
            </option>

            <option value="Referral">
              Referral
            </option>

            <option value="Social Media">
              Social Media
            </option>

            <option value="Advertisement">
              Advertisement
            </option>

            <option value="Other">
              Other
            </option>
          </select>
        </div>

        {/* STATUS */}

        <div>
          <label>Status</label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
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

        {/* ASSIGNED SALESPERSON - ADMIN ONLY */}

        {isAdmin && (
          <div>
            <label>
              Assigned Salesperson
            </label>

            <select
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              required
            >
              <option value="">
                {loadingUsers
                  ? "Loading sales users..."
                  : "Select salesperson"}
              </option>

              {salesUsers.map((salesUser) => (
                <option
                  key={salesUser._id}
                  value={salesUser._id}
                >
                  {salesUser.name} (
                  {salesUser.email})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* FOLLOW-UP */}

        <div>
          <label>
            Next Follow-up
          </label>

          <input
            type="date"
            name="nextFollowUp"
            value={formData.nextFollowUp}
            onChange={handleChange}
          />
        </div>

        {/* NOTES */}

        <div className="full-width">
          <label>Notes</label>

          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Add notes about this lead..."
            rows="4"
          />
        </div>

      </div>

      <div className="form-actions">

        <button
          type="submit"
          className="primary-btn"
        >
          {initialData
            ? "Update Lead"
            : "Create Lead"}
        </button>

        {onCancel && (
          <button
            type="button"
            className="secondary-btn"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}

      </div>
    </form>
  );
};

export default LeadForm;