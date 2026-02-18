
import { useState } from "react";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import PromptForm from "./components/PromptForm";
import PromptHistory from "./components/PromptHistory";
import AdminDashboard from "./components/AdminDashboard";
import "./App.css";

/**
 * Main App Component
 * Manages the overall application flow and state
 * Routes between different pages: Register → Dashboard → PromptForm → PromptHistory
 * 
 * App State:
 * - currentPage: which page to display
 * - user: logged-in user information
 * - selectedCategory: category and subcategory selected by user
 */
function App() {
  // Current page state: determines which component to show
  // Values: "register", "dashboard", "prompt-form", "history", "admin"
  const [currentPage, setCurrentPage] = useState("register");

  // User information after registration
  // Contains: { id, name, phone }
  const [user, setUser] = useState(null);

  // Selected category information
  // Contains: { categoryId, categoryName, subCategoryId, subCategoryName }
  const [selectedCategory, setSelectedCategory] = useState(null);

  /**
   * Handle user registration
   * NEW user → goes to Dashboard
   * EXISTING user → goes straight to History
   * @param {object} userData - User object returned from API
   * @param {boolean} isExistingUser - Whether user already existed
   */
  const handleUserRegistered = (userData, isExistingUser = false) => {
    setUser(userData); // Save user ID for API calls
    
    // Existing users go straight to history
    // New users go to dashboard to select category
    const nextPage = isExistingUser ? "history" : "dashboard";
    setCurrentPage(nextPage);
  };

  /**
   * Handle category selection
   * Saves selected category and moves to PromptForm page
   * @param {object} categoryData - Category info selected by user
   */
  const handleCategorySelected = (categoryData) => {
    setSelectedCategory(categoryData); // Save category info
    setCurrentPage("prompt-form"); // Move to next page
  };

  /**
   * Handle prompt submission
   * Moves to PromptHistory page to show learning history
   */
  const handlePromptSubmitted = () => {
    setCurrentPage("history"); // Move to history page
  };

  /**
   * Handle new prompt request
   * Resets to dashboard to select new category/subcategory
   */
  const handleNewPrompt = () => {
    setCurrentPage("dashboard"); // Go back to category selection
    setSelectedCategory(null); // Clear previous selection
  };

  return (
    <div className="app">
      {/* Navigation header */}
      <header className="app-header">
        <h1>🎓 AI Learning MVP</h1>
        {/* Show user info if logged in */}
        {user && <p className="user-info">Welcome, {user.name}!</p>}
        {/* Admin navigation button (for demo, always visible) */}
  <nav style={{ marginTop: "1rem", display: "flex", gap: "1.5rem", justifyContent: "center", alignItems: "center" }}>
          <button
            onClick={() => setCurrentPage("register")}
            style={{
              background: "none",
              border: "none",
              color: "#222",
              fontSize: "1.15rem",
              fontWeight: "bold",
              padding: 0,
              cursor: "pointer",
              letterSpacing: "0.03em"
            }}
          >Register</button>
          <button
            onClick={() => setCurrentPage("dashboard")}
            disabled={!user}
            style={{
              background: "none",
              border: "none",
              color: "#222",
              fontSize: "1.15rem",
              fontWeight: "bold",
              padding: 0,
              cursor: "pointer",
              letterSpacing: "0.03em",
              opacity: user ? 1 : 0.5
            }}
          >Dashboard</button>
          <button
            onClick={() => setCurrentPage("history")}
            disabled={!user}
            style={{
              background: "none",
              border: "none",
              color: "#222",
              fontSize: "1.15rem",
              fontWeight: "bold",
              padding: 0,
              cursor: "pointer",
              letterSpacing: "0.03em",
              opacity: user ? 1 : 0.5
            }}
          >History</button>
          <button
            onClick={() => setCurrentPage("admin")}
            style={{
              background: "none",
              border: "none",
              color: "#222",
              fontSize: "1.15rem",
              fontWeight: "bold",
              padding: 0,
              cursor: "pointer",
              letterSpacing: "0.03em"
            }}
          >Admin Dashboard</button>
        </nav>
      </header>

      {/* Main content area - displays different components based on currentPage */}
      <main className="app-main">
        {/* Page 1: User Registration */}
        {currentPage === "register" && (
          <Register onUserRegistered={handleUserRegistered} />
        )}

        {/* Page 2: Category Selection */}
        {currentPage === "dashboard" && user && (
          <Dashboard onCategorySelected={handleCategorySelected} />
        )}

        {/* Page 3: Prompt Submission */}
        {currentPage === "prompt-form" && user && selectedCategory && (
          <PromptForm
            userId={user.id}
            categoryId={selectedCategory.categoryId}
            categoryName={selectedCategory.categoryName}
            subCategoryId={selectedCategory.subCategoryId}
            subCategoryName={selectedCategory.subCategoryName}
            onPromptSubmitted={handlePromptSubmitted}
          />
        )}

        {/* Page 4: Learning History */}
        {currentPage === "history" && user && (
          <PromptHistory userId={user.id} onNewPrompt={handleNewPrompt} />
        )}

        {/* Admin Dashboard Page */}
        {currentPage === "admin" && <AdminDashboard />}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>© 2026 AI Learning MVP - Learn with AI</p>
      </footer>
    </div>
  );
}

export default App;
