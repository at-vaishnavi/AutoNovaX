import React, { useState, useEffect, useRef } from "react";

export default function Profile({ onLogout }) {
  // State to track whether the profile sidebar is open or closed
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // State to hold the items currently in the user's cart
  const [cartItems, setCartItems] = useState([]);

  // Reference to the wrapper div to detect clicks outside (if needed later)
  const wrapperRef = useRef(null);

  // Get user info from localStorage or use default values if not available
  const name = localStorage.getItem("userName") || "User";
  const email = localStorage.getItem("userEmail") || "user@example.com";

  // Load cart items from localStorage when the component mounts
  useEffect(() => {
    // Retrieve the cart from localStorage; default to empty array if none found
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    // Main container div, positioned relative so the sidebar can be positioned absolute within it
    // Mouse enter/leave handlers to open and close the sidebar on hover
    <div
      ref={wrapperRef}
      onMouseEnter={() => setIsSidebarOpen(true)}
      onMouseLeave={() => setIsSidebarOpen(false)}
      style={{ position: "relative", display: "inline-block" }}
    >
      {/* Circle avatar showing the first letter of the user's name */}
      <div
        style={{
          backgroundColor: "#007bff",
          color: "white",
          width: 40,
          height: 40,
          borderRadius: "50%", // Circle shape
          textAlign: "center",
          lineHeight: "40px", // Vertically center the letter
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: 20,
          userSelect: "none", // Prevent text selection on double-click
        }}
        title="Profile" // Tooltip on hover
      >
        {/* Show the uppercase first letter of the user's name */}
        {name.charAt(0).toUpperCase()}
      </div>

      {/* Sidebar popup shown only when isSidebarOpen is true */}
      {isSidebarOpen && (
        <div
          style={{
            position: "absolute",
            top: 45, // Slightly below the avatar
            right: 0, // Align right with the avatar
            width: 280,
            backgroundColor: "white",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)", // Soft shadow for elevation
            padding: 15,
            borderRadius: 5,
            zIndex: 1000, // Make sure it overlays other content
            maxHeight: 300,
            overflowY: "auto", // Scroll if content overflows vertically
          }}
        >
          {/* Display user info */}
          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>

          <hr />

          {/* Cart section header with item count */}
          <h4>Your Cart ({cartItems.length})</h4>

          {/* Conditional rendering: show empty message or list of cart items */}
          {cartItems.length === 0 ? (
            <p style={{ fontSize: 14, color: "#555" }}>Your cart is empty.</p>
          ) : (
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
              }}
            >
              {/* Loop over cart items and display each */}
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  style={{
                    display: "flex",
                    marginBottom: 10,
                    alignItems: "center",
                  }}
                >
                  {/* Product image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: 40,
                      height: 40,
                      objectFit: "cover",
                      borderRadius: 4,
                    }}
                  />
                  {/* Product name and price */}
                  <div style={{ marginLeft: 10 }}>
                    <p style={{ margin: 0 }}>{item.name}</p>
                    <p style={{ margin: 0, fontWeight: "bold" }}>₹{item.price}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Logout button */}
          <button
            style={{
              marginTop: 10,
              padding: "8px 16px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
              width: "100%",
              fontWeight: "bold",
            }}
            onClick={onLogout} // Calls the passed onLogout function when clicked
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
