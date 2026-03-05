import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

export default function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();

  // State to toggle between Signup and Login forms
  const [isSignup, setIsSignup] = useState(false);

  // State to hold form inputs for name, email and password
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Control whether to show the fingerprint login button
  const [showFingerprint, setShowFingerprint] = useState(false);

  // Control loading state for fingerprint login simulation
  const [isFingerprintLoading, setIsFingerprintLoading] = useState(false);

  // Demo user credentials for the fake fingerprint login feature
  const demoEmail = "vaishnavivaish1106@gmail.com";
  const demoPassword = "Vaish@11";
  const demoName = "Vaishnavi";

  // Check if email matches demo email to show fingerprint button
  const checkEmailForFingerprint = (email) => {
    return email.toLowerCase().trim() === demoEmail;
  };

  // Handle input changes in form fields
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    // Reset fingerprint button visibility when email changes
    if (e.target.name === "email") {
      setShowFingerprint(false);
    }
  };

  // When user leaves the email input field, check if fingerprint login should be shown
  const handleEmailBlur = () => {
    setShowFingerprint(checkEmailForFingerprint(formData.email));
  };

  // When user focuses password input, check fingerprint button visibility again
  const handlePasswordFocus = () => {
    setShowFingerprint(checkEmailForFingerprint(formData.email));
  };

  // Handle form submission for both signup and login
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      // Signup form validation:
      // 1. Valid email format
      // 2. Only Gmail addresses allowed
      // 3. Password at least 8 characters long
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isEmailValid = emailRegex.test(formData.email);
      const isGmail = formData.email.toLowerCase().endsWith("@gmail.com");
      const isPasswordValid = formData.password.length >= 8;

      if (!isEmailValid) return alert("Please enter a valid email.");
      if (!isGmail) return alert("Only Gmail addresses are allowed.");
      if (!isPasswordValid) return alert("Password must be at least 8 characters.");

      // Save the new user data in localStorage (demo only, not secure)
      localStorage.setItem(formData.email, formData.password);
      localStorage.setItem("userName", formData.name);

      alert("Account created successfully! Please login now.");

      // Reset form and switch to login mode after signup
      setIsSignup(false);
      setFormData({ name: "", email: "", password: "" });
      setShowFingerprint(false);
    } else {
      // Login form submission

      // Get stored password from localStorage
      const storedPassword = localStorage.getItem(formData.email);

      if (!storedPassword) return alert("User does not exist.");
      if (storedPassword !== formData.password) return alert("Incorrect password.");

      alert("Login successful!");

      // Save login session info in localStorage
      localStorage.setItem("userEmail", formData.email);
      localStorage.setItem("userName", localStorage.getItem("userName") || demoName);
      localStorage.setItem("isLoggedIn", "true");

      // Update app login state and navigate to profile page
      setIsLoggedIn(true);
      navigate("/profile");
    }
  };

  // Toggle between signup and login forms
  const toggleForm = () => {
    setIsSignup((prev) => !prev);
    setFormData({ name: "", email: "", password: "" });
    setShowFingerprint(false);
  };

  // Simulate fingerprint login for demo user
  const handleFakeFingerprintLogin = () => {
    setIsFingerprintLoading(true);

    setTimeout(() => {
      // If demo user is not saved yet, save demo credentials
      if (!localStorage.getItem(demoEmail)) {
        localStorage.setItem(demoEmail, demoPassword);
        localStorage.setItem("userName", demoName);
      }
      // Save demo user login info in localStorage
      localStorage.setItem("userEmail", demoEmail);
      localStorage.setItem("isLoggedIn", "true");

      // Update app login state and stop loading
      setIsLoggedIn(true);
      setIsFingerprintLoading(false);

      // Navigate to profile page after login
      navigate("/profile");
    }, 2000); // simulate 2 seconds delay for fingerprint auth
  };

  return (
    <div className="login-page">
      {/* Left side contains the form */}
      <div className="login-left">
        <form onSubmit={handleSubmit} className="login-form">
          {/* Heading changes based on form type */}
          <h2>{isSignup ? "Create Account" : "Sign In"}</h2>

          {/* Show name input only during signup */}
          {isSignup && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="login-input"
            />
          )}

          {/* Email input */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleEmailBlur}
            required
            className="login-input"
            autoComplete="username"
            disabled={isFingerprintLoading}
          />

          {/* Password input */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            onFocus={handlePasswordFocus}
            required
            className="login-input"
            autoComplete={isSignup ? "new-password" : "current-password"}
            disabled={isFingerprintLoading}
          />

          {/* Submit button */}
          <button type="submit" className="login-button" disabled={isFingerprintLoading}>
            {isSignup ? "Create Account" : "Sign In"}
          </button>

          {/* Show fingerprint login button only in login mode when applicable */}
          {!isSignup && showFingerprint && (
            <button
              type="button"
              onClick={handleFakeFingerprintLogin}
              className="fingerprint-button"
              disabled={isFingerprintLoading}
            >
              {isFingerprintLoading ? "⌛ Logging in..." : "🔒 Login with Fingerprint"}
            </button>
          )}

          {/* Toggle between Signup and Login */}
          <p className="toggle-text">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <span
              className="toggle-link"
              onClick={toggleForm}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleForm();
                }
              }}
            >
              {isSignup ? "Sign In" : "Create new"}
            </span>
          </p>
        </form>
      </div>

      {/* Right side can be used for images or decorations */}
      <div className="login-right"></div>
    </div>
  );
}
