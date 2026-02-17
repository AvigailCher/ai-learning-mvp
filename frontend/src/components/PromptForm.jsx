import { useState } from "react";
import { createPrompt } from "../api";
import "./PromptForm.css";

/**
 * PromptForm Component
 * Allows user to submit a prompt and receive AI-generated lesson
 * Shows loading state while waiting for AI response
 * Displays the generated lesson when ready
 */
export default function PromptForm({
  userId,
  categoryId,
  categoryName,
  subCategoryId,
  subCategoryName,
  onPromptSubmitted,
}) {
  // State management
  const [prompt, setPrompt] = useState(""); // User's question/prompt
  const [loading, setLoading] = useState(false); // Loading state while AI processes
  const [response, setResponse] = useState(null); // AI-generated lesson
  const [error, setError] = useState("");

  /**
   * Handle form submission
   * Sends prompt to backend, which calls OpenAI API
   * Displays the generated lesson
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // Validation: Check if prompt is filled
    if (!prompt.trim()) {
      setError("Please enter a prompt");
      return;
    }

    setLoading(true);

    try {
      // Call backend API to create prompt and get AI response
      const result = await createPrompt({
        userId,
        categoryId,
        subCategoryId,
        prompt,
      });

      // Save the response to display it
      setResponse(result);
      setPrompt(""); // Clear form for next prompt
    } catch (err) {
      console.error("Error creating prompt:", err);
      setError(
        err.message || "Failed to generate lesson. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle "Ask Another Question" button
   * Clears the response to show the form again
   */
  const handleAskAnother = () => {
    setResponse(null);
    setPrompt("");
  };

  /**
   * Handle "View History" button
   * Moves to the PromptHistory page
   */
  const handleViewHistory = () => {
    onPromptSubmitted(true); // Signal parent to show history
  };

  return (
    <div className="prompt-form-container">
      <div className="prompt-header">
        <h1>Ask Your Question</h1>
        <p className="breadcrumb">
          {categoryName} → {subCategoryName}
        </p>
      </div>

      {/* Display error message if any */}
      {error && <div className="error-message">{error}</div>}

      {/* Show form if no response yet */}
      {!response ? (
        <form onSubmit={handleSubmit} className="prompt-form">
          <div className="form-group">
            <label htmlFor="prompt">Your Question</label>
            <textarea
              id="prompt"
              placeholder="Ask me anything about this topic..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={loading}
              rows="6"
            />
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? "Generating Lesson..." : "Submit"}
          </button>
        </form>
      ) : (
        /* Show AI response */
        <div className="response-container">
          <h2>Your Lesson</h2>
          <div className="original-prompt">
            <strong>Your Question:</strong> {response.prompt}
          </div>
          <div className="response-content">
            {/* Render markdown-like text with line breaks */}
            {response.response.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>

          {/* Action buttons */}
          <div className="response-actions">
            <button
              onClick={handleAskAnother}
              className="btn btn-secondary"
            >
              ← Ask Another Question
            </button>
            <button
              onClick={handleViewHistory}
              className="btn btn-primary"
            >
              View History →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
