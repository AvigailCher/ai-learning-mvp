import { useState, useEffect } from "react";
import { getUserPrompts } from "../api";
import "./PromptHistory.css";

/**
 * PromptHistory Component
 * Displays all of the user's previous prompts and AI-generated lessons
 * Shows category, subcategory, date, and the full lesson for each
 */
export default function PromptHistory({ userId, onNewPrompt }) {
  // State management
  const [prompts, setPrompts] = useState([]); // User's prompt history
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState(null); // Track which prompt is expanded

  /**
   * Load user's prompt history when component mounts
   * This runs once when the component first appears
   */
  useEffect(() => {
    const loadPrompts = async () => {
      try {
        const data = await getUserPrompts(userId);
        setPrompts(data);
        setLoading(false);
      } catch (err) {
        console.error("Error loading prompts:", err);
        setError("Failed to load learning history");
        setLoading(false);
      }
    };

    loadPrompts();
  }, [userId]); // Re-run if userId changes

  /**
   * Format date to readable format
   * Example: "Feb 16, 2026 at 3:45 PM"
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  /**
   * Toggle expanded view of a prompt
   * Shows/hides the full AI response
   */
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Show loading state while fetching
  if (loading) {
    return (
      <div className="history-container">
        <p>Loading your learning history...</p>
      </div>
    );
  }

  // Show error if something went wrong
  if (error) {
    return (
      <div className="history-container">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="history-container">
      <div className="history-header">
        <h1>Your Learning History</h1>
        <p className="subtitle">All the lessons you've learned</p>
      </div>

      {/* Show message if no prompts yet */}
      {prompts.length === 0 ? (
        <div className="empty-state">
          <p>You haven't asked any questions yet.</p>
          <button onClick={onNewPrompt} className="btn btn-primary">
            Ask Your First Question
          </button>
        </div>
      ) : (
        <>
          {/* Display prompt count */}
          <p className="prompt-count">Total lessons: {prompts.length}</p>

          {/* List of all prompts */}
          <div className="prompts-list">
            {prompts.map((prompt) => (
              <div key={prompt.id} className="prompt-card">
                {/* Prompt header - clickable to expand */}
                <div
                  className="prompt-card-header"
                  onClick={() => toggleExpand(prompt.id)}
                >
                  <div className="prompt-info">
                    <h3>{prompt.prompt}</h3>
                    <div className="prompt-meta">
                      <span className="category">
                        📚 {prompt.category.name}
                      </span>
                      <span className="subcategory">
                        → {prompt.subCategory.name}
                      </span>
                      <span className="date">
                        🕐 {formatDate(prompt.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* Expand/Collapse indicator */}
                  <span className={`expand-icon ${expandedId === prompt.id ? "expanded" : ""}`}>
                    ▼
                  </span>
                </div>

                {/* Prompt response - shown when expanded */}
                {expandedId === prompt.id && (
                  <div className="prompt-card-content">
                    <div className="response-text">
                      {/* Render response with line breaks */}
                      {prompt.response.split("\n").map((line, index) => (
                        <p key={index}>{line}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* New Prompt button */}
          <div className="history-actions">
            <button onClick={onNewPrompt} className="btn btn-primary">
              Ask Another Question
            </button>
          </div>
        </>
      )}
    </div>
  );
}
