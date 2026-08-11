const LeadCard = ({
  lead,
  onEdit,
  onDelete
}) => {
  return (
    <div className="lead-card">

      <div className="lead-card-header">

        <div>
          <h3>{lead.name}</h3>
          <p>{lead.company}</p>
        </div>

        <span
          className={`status ${lead.status.toLowerCase()}`}
        >
          {lead.status}
        </span>

      </div>

      <div className="lead-info">

        <p>
          <strong>Email:</strong>{" "}
          {lead.email}
        </p>

        <p>
          <strong>Phone:</strong>{" "}
          {lead.phone || "Not provided"}
        </p>

        <p>
          <strong>Source:</strong>{" "}
          {lead.source}
        </p>

        <p>
          <strong>Follow-up:</strong>{" "}
          {lead.nextFollowUp
            ? new Date(
                lead.nextFollowUp
              ).toLocaleDateString()
            : "Not scheduled"}
        </p>

        {/* Show owner only when populated */}
        {lead.assignedTo && (
          <p>
            <strong>Assigned To:</strong>{" "}
            {lead.assignedTo.name}
          </p>
        )}

      </div>

      <div className="lead-score">

        <strong>
          Lead Score:
        </strong>{" "}

        {lead.score || 0}

        <span
          className={`category ${lead.category?.toLowerCase()}`}
        >
          {lead.category}
        </span>

      </div>

      {lead.notes && (
        <p className="lead-notes">
          <strong>Notes:</strong>{" "}
          {lead.notes}
        </p>
      )}

      <div className="card-actions">
        {onEdit && (
        <button
          className="secondary-btn"
          onClick={() => onEdit(lead)}
        >
          Edit
        </button>
         )}
        {/* Delete only exists for ADMIN */}
        {onDelete && (
          <button
            className="danger-btn"
            onClick={() =>
              onDelete(lead._id)
            }
          >
            Delete
          </button>
        )}

      </div>

    </div>
  );
};

export default LeadCard;