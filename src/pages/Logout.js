import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout({ onLogout }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Call the onLogout callback if provided
    if (onLogout) {
      onLogout(); 
    }

    // Redirect user to the login page after logging out
    navigate("/login");
  }, [navigate, onLogout]);

  // Simple message displayed while logging out
  return <div>Logging out...</div>;
}
