import { useState } from "react";
import { registerUser, getUserByPhone } from "../api";
import "./Register.css";

/**
 * Register/Login Component
 * SIMPLE: Everyone enters name + phone
 * - If phone exists → Login (no save to database)
 * - If phone doesn't exist → Create account (save to database)
 */
export default function Register({ onUserRegistered }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /**
   * Handle form submission - SIMPLE LOGIC
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Both name and phone are ALWAYS required
    if (!name.trim() || !phone.trim()) {
      setError("Name and phone are required");
      return;
    }

    setLoading(true);

    try {
      // Check if user already exists by phone
      let existingUser = null;
      try {
        existingUser = await getUserByPhone(phone);
      } catch (err) {
        // User doesn't exist - that's fine, existingUser stays null
      }

      if (existingUser) {
        // User exists - login them and send them straight to history
        // Signal parent that this is an EXISTING user (not new)
        onUserRegistered(existingUser, true); // true = isExistingUser
        setLoading(false);
        return;
      }

      // User doesn't exist - create new account
      try {
        const newUser = await registerUser(name, phone);
        // Signal parent that this is a NEW user
        onUserRegistered(newUser, false); // false = isNewUser
      } catch (err) {
        // If we get here and it says phone already exists,
        // it means the user was created between our check and now
        // Just login with that phone
        if (err.message && err.message.includes("already registered")) {
          const user = await getUserByPhone(phone);
          onUserRegistered(user, true); // Treat as existing user
        } else {
          setError(err.message || "Registration failed");
          setLoading(false);
        }
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1>🎓 AI Learning MVP</h1>
        <p className="subtitle">Enter your details to login or register</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={loading}
            />
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? "Processing..." : "Continue"}
          </button>
        </form>

        <p className="info-message">
          If your phone exists, you'll be logged in.<br/>
          If it's new, your account will be created.
        </p>
      </div>
    </div>
  );
}
