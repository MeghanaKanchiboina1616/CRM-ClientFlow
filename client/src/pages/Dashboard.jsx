import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

const Dashboard = () => {
  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const isAdmin = user?.role === "ADMIN";

  const [stats, setStats] = useState(null);
  const [followUps, setFollowUps] = useState([]);
  const [error, setError] = useState("");

  const fetchDashboard = async () => {
    try {
      const [statsResponse, followUpResponse] =
        await Promise.all([
          API.get("/leads/dashboard/stats"),
          API.get("/leads/followups/today")
        ]);

      setStats(statsResponse.data);
      setFollowUps(followUpResponse.data);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to load dashboard"
      );
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (!stats) {
    return (
      <>
        <Navbar />

        <main className="page-container">
          <p>Loading dashboard...</p>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="page-container">

        {/* HEADER */}

        <div className="page-header">
          <div>
            <h1>
              {isAdmin
                ? "Admin Dashboard"
                : "Sales Dashboard"}
            </h1>

            <p>
              {isAdmin
                ? "Company-wide sales pipeline overview"
                : "Your personal sales pipeline overview"}
            </p>
          </div>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {/* STATS */}

        <div className="stats-grid">

          <div className="stat-card">
            <h3>
              {isAdmin
                ? "Total Leads"
                : "My Leads"}
            </h3>

            <strong>{stats.total}</strong>
          </div>

          <div className="stat-card">
            <h3>New</h3>
            <strong>{stats.newLeads}</strong>
          </div>

          <div className="stat-card">
            <h3>Qualified</h3>
            <strong>{stats.qualified}</strong>
          </div>

          <div className="stat-card">
            <h3>Proposal</h3>
            <strong>{stats.proposal}</strong>
          </div>

          <div className="stat-card">
            <h3>Won</h3>
            <strong>{stats.won}</strong>
          </div>

          <div className="stat-card">
            <h3>Lost</h3>
            <strong>{stats.lost}</strong>
          </div>

        </div>

        {/* LEAD HEALTH */}

        <section className="dashboard-section">

          <h2>Lead Health</h2>

          <div className="health-grid">

            <div className="health-card hot">
              <span>🔥</span>

              <h3>HOT</h3>

              <strong>{stats.hot}</strong>
            </div>

            <div className="health-card warm">
              <span>🟡</span>

              <h3>WARM</h3>

              <strong>{stats.warm}</strong>
            </div>

            <div className="health-card cold">
              <span>🔵</span>

              <h3>COLD</h3>

              <strong>{stats.cold}</strong>
            </div>

          </div>

        </section>

        {/* FOLLOW UPS */}

        <section className="dashboard-section">

          <h2>
            {isAdmin
              ? "Today's Follow-ups"
              : "My Today's Follow-ups"}
          </h2>

          {followUps.length === 0 ? (
            <div className="empty-state">
              <p>
                No follow-ups scheduled for today.
              </p>
            </div>
          ) : (
            <div className="followup-list">

              {followUps.map((lead) => (
                <div
                  className="followup-card"
                  key={lead._id}
                >

                  <div>
                    <strong>{lead.name}</strong>

                    <p>{lead.company}</p>

                    {isAdmin &&
                      lead.assignedTo && (
                        <small>
                          Assigned to:{" "}
                          {lead.assignedTo.name}
                        </small>
                      )}
                  </div>

                  <span>
                    {new Date(
                      lead.nextFollowUp
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </span>

                </div>
              ))}

            </div>
          )}

        </section>

      </main>
    </>
  );
};

export default Dashboard;