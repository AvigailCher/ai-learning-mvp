import React, { useEffect, useState } from "react";
import { api } from "../api.js";
import "./AdminDashboard.css";

/**
 * AdminDashboard Component
 * Displays a table of all users and their prompt history.
 * Only accessible to admin users (assumes admin is already authenticated).
 */
function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedPrompt, setExpandedPrompt] = useState({});

  useEffect(() => {
    // Fetch all users and their prompt history from the backend
    const fetchUsers = async () => {
      try {
        const res = await api.get("/users");
        setUsers(res.data);
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <div>Loading users...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!users || users.length === 0) {
    return <div>No users found.<br />
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>;
  }

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Prompt History</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.phone}</td>
              <td>
                {user.prompts && user.prompts.length > 0 ? (
                  <ul className="prompt-list">
                    {user.prompts.map((prompt) => (
                      <li key={prompt.id} style={{marginBottom: '0.5em'}}>
                        <button
                          className="prompt-toggle"
                          onClick={() => setExpandedPrompt((prev) => ({ ...prev, [prompt.id]: !prev[prompt.id] }))}
                          style={{ cursor: 'pointer', background: 'none', border: 'none', color: '#222', textDecoration: 'underline', padding: 0 }}
                        >
                          {prompt.prompt}
                        </button>
                        {expandedPrompt[prompt.id] && (
                          <div className="prompt-details" style={{marginTop: '0.3em', background: '#f9f9f9', borderRadius: '4px', padding: '0.5em'}}>
                            <strong>Date:</strong> {prompt.createdAt?.slice(0, 19).replace("T", " ")}
                            <br />
                            <strong>Response:</strong> {prompt.response}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span>No prompts</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
