import axios from "axios";
// Create axios instance with backend URL
// This centralizes all API calls and makes them easy to manage
const API_URL = "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Register a new user
 * @param {string} name - User's name
 * @param {string} phone - User's phone number (must be unique)
 * @returns {Promise} User object with id, name, phone
 */
export const registerUser = async (name, phone) => {
  try {
    const response = await api.post("/users", { name, phone });
    return response.data;
  } catch (error) {
    // If backend returns validation error, throw the full response.data
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw error.message;
  }
};

/**
 * Get user by phone number (for login)
 * Checks if user exists without creating new account
 * @param {string} phone - User's phone number
 * @returns {Promise} User object if exists, or throws error if not found
 */
export const getUserByPhone = async (phone) => {
  try {
    const response = await api.get("/users/by-phone", {
      params: { phone },
    });
    return response.data;
  } catch (error) {
    // Re-throw the error so component can handle 404
    throw error.response?.data?.error || error;
  }
};

/**
 * Get all categories from database
 * @returns {Promise} Array of categories with their subcategories
 */
export const getCategories = async () => {
  try {
    const response = await api.get("/categories");
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || error.message;
  }
};

/**
 * Get subcategories for a specific category
 * @param {number} categoryId - The category ID
 * @returns {Promise} Array of subcategories
 */
export const getSubCategories = async (categoryId) => {
  try {
    const response = await api.get("/sub-categories", {
      params: { categoryId },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || error.message;
  }
};

/**
 * Submit a prompt and get AI-generated lesson
 * @param {object} data - Prompt data
 * @param {number} data.userId - User ID
 * @param {number} data.categoryId - Category ID
 * @param {number} data.subCategoryId - Subcategory ID
 * @param {string} data.prompt - User's prompt/question
 * @returns {Promise} Created prompt with AI response
 */
export const createPrompt = async (data) => {
  try {
    const response = await api.post("/prompts", data);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || error.message;
  }
};

/**
 * Get all prompts/learning history for a specific user
 * @param {number} userId - User ID
 * @returns {Promise} Array of user's prompts with responses
 */
export const getUserPrompts = async (userId) => {
  try {
    const response = await api.get(`/prompts/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.error || error.message;
  }
};

export { api };
