
import { useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
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
  // currentPage no longer needed, routing is handled by react-router

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
  const navigate = useNavigate();
  const handleUserRegistered = (userData, isExistingUser = false) => {
    setUser(userData);
    // Navigate to the correct page
    if (isExistingUser) {
      navigate("/history");
    } else {
      navigate("/dashboard");
    }
  };

  /**
   * Handle category selection
   * Saves selected category and moves to PromptForm page
   * @param {object} categoryData - Category info selected by user
   */
  const handleCategorySelected = (categoryData) => {
    setSelectedCategory(categoryData);
    navigate("/prompt-form");
  };

  /**
   * Handle prompt submission
   * Moves to PromptHistory page to show learning history
   */
  const handlePromptSubmitted = () => {
    navigate("/history");
  };

  /**
   * Handle new prompt request
   * Resets to dashboard to select new category/subcategory
   */
  const handleNewPrompt = () => {
    setSelectedCategory(null);
    navigate("/dashboard");
  };

  return (
    <div className="app">
      <header className="app-header">
          <h1>🎓 AI Learning MVP</h1>
          {user && <p className="user-info">Welcome, {user.name}!</p>}
          <nav style={{ marginTop: "1rem", display: "flex", gap: "1.5rem", justifyContent: "center", alignItems: "center" }}>
            <button onClick={() => navigate("/register")}
              style={{ background: "none", border: "none", color: "#222", fontSize: "1.15rem", fontWeight: "bold", padding: 0, cursor: "pointer", letterSpacing: "0.03em" }}>
              Register
            </button>
            <button onClick={() => navigate("/dashboard")} disabled={!user}
              style={{ background: "none", border: "none", color: "#222", fontSize: "1.15rem", fontWeight: "bold", padding: 0, cursor: "pointer", letterSpacing: "0.03em", opacity: user ? 1 : 0.5 }}>
              Dashboard
            </button>
            <button onClick={() => navigate("/history")} disabled={!user}
              style={{ background: "none", border: "none", color: "#222", fontSize: "1.15rem", fontWeight: "bold", padding: 0, cursor: "pointer", letterSpacing: "0.03em", opacity: user ? 1 : 0.5 }}>
              History
            </button>
            <button onClick={() => navigate("/admin")} disabled={!user}
              style={{ background: "none", border: "none", color: "#222", fontSize: "1.15rem", fontWeight: "bold", padding: 0, cursor: "pointer", letterSpacing: "0.03em", opacity: user ? 1 : 0.5 }}>
              Admin Dashboard
            </button>
          </nav>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/register" element={<Register onUserRegistered={handleUserRegistered} />} />
            <Route path="/dashboard" element={user ? <Dashboard onCategorySelected={handleCategorySelected} /> : <Navigate to="/register" />} />
            <Route path="/prompt-form" element={user && selectedCategory ? <PromptForm userId={user.id} categoryId={selectedCategory.categoryId} categoryName={selectedCategory.categoryName} subCategoryId={selectedCategory.subCategoryId} subCategoryName={selectedCategory.subCategoryName} onPromptSubmitted={handlePromptSubmitted} /> : <Navigate to="/dashboard" />} />
            <Route path="/history" element={user ? <PromptHistory userId={user.id} onNewPrompt={handleNewPrompt} /> : <Navigate to="/register" />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<Navigate to="/register" />} />
          </Routes>
        </main>
        <footer className="app-footer">
          <p>© 2026 AI Learning MVP - Learn with AI</p>
        </footer>
      </div>
  );
}

export default App;
