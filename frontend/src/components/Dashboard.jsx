import { useState, useEffect } from "react";
import { getCategories, getSubCategories } from "../api";
import "./Dashboard.css";

/**
 * Dashboard Component
 * Displays all categories and subcategories
 * User selects a category and subcategory to proceed to prompt submission
 */
export default function Dashboard({ onCategorySelected }) {
  // State management
  const [categories, setCategories] = useState([]); // All categories
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // Selected category
  const [subcategories, setSubcategories] = useState([]); // Subcategories of selected category
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /**
   * Load all categories when component mounts
   * This runs once when the component first appears
   */
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
        setLoading(false);
      } catch (err) {
        console.error("Error loading categories:", err);
        setError("Failed to load categories");
        setLoading(false);
      }
    };

    loadCategories();
  }, []); // Empty dependency array = run once on mount

  /**
   * Load subcategories when user selects a category
   */
  const handleCategorySelect = async (categoryId) => {
    setSelectedCategoryId(categoryId);
    setSubcategories([]); // Clear previous subcategories

    try {
      // Get subcategories for the selected category
      // Many categories already include subcategories, but we can fetch them specifically if needed
      const category = categories.find((c) => c.id === categoryId);
      if (category && category.subCategories) {
        setSubcategories(category.subCategories);
      }
    } catch (err) {
      console.error("Error loading subcategories:", err);
      setError("Failed to load subcategories");
    }
  };

  /**
   * Handle subcategory selection
   * Pass selected category and subcategory to parent component (App.jsx)
   * This moves to the PromptForm page
   */
  const handleSubcategorySelect = (category, subcategory) => {
    onCategorySelected({
      categoryId: category.id,
      categoryName: category.name,
      subCategoryId: subcategory.id,
      subCategoryName: subcategory.name,
    });
  };

  // Show loading state while fetching
  if (loading) {
    return <div className="dashboard-container"><p>Loading categories...</p></div>;
  }

  // Show error if something went wrong
  if (error) {
    return <div className="dashboard-container"><p className="error-message">{error}</p></div>;
  }

  return (
    <div className="dashboard-container">
      <h1>Select What You Want to Learn</h1>
      <p className="subtitle">Choose a category and subcategory to get started</p>

      {/* Display error message if any */}
      {error && <div className="error-message">{error}</div>}

      <div className="dashboard-content">
        {/* Categories Section */}
        <div className="categories-section">
          <h2>Categories</h2>
          <div className="categories-list">
            {categories.length === 0 ? (
              <p>No categories available. Please create some first.</p>
            ) : (
              categories.map((category) => (
                <button
                  key={category.id}
                  className={`category-btn ${
                    selectedCategoryId === category.id ? "active" : ""
                  }`}
                  onClick={() => handleCategorySelect(category.id)}
                >
                  {category.name}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Subcategories Section */}
        {selectedCategoryId && (
          <div className="subcategories-section">
            <h2>Subcategories</h2>
            <div className="subcategories-list">
              {subcategories.length === 0 ? (
                <p>No subcategories available for this category.</p>
              ) : (
                subcategories.map((subcategory) => {
                  // Find the category object to pass to handler
                  const category = categories.find(
                    (c) => c.id === selectedCategoryId
                  );
                  return (
                    <button
                      key={subcategory.id}
                      className="subcategory-btn"
                      onClick={() => handleSubcategorySelect(category, subcategory)}
                    >
                      {subcategory.name}
                      <span className="arrow">→</span>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
