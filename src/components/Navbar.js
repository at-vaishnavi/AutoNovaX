import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import profilePhoto from "../assets/profile.png";
import cartIcon from "../assets/cart.png";

function Navbar({ isLoggedIn, onLogout, cartCount }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogoutClick = () => {
    if (onLogout) onLogout();
    setShowDropdown(false);
    navigate("/login");
  };

  const name = localStorage.getItem("userName") || "User";
  const email = localStorage.getItem("userEmail") || "user@example.com";

  return (
    <nav className="navbar">
      <h2 className="logo">AutoNovaX</h2>

      <ul className="nav-links">
        <li><Link to="/home">HOME</Link></li>
        <li><Link to="/about">ABOUT</Link></li>
        <li><Link to="/distributors">DISTRIBUTORS & STOCKISTS</Link></li>
        <li><Link to="/products">PRODUCTS</Link></li>
        <li><Link to="/faq">FAQ</Link></li>
        <li><Link to="/contact">CONTACT</Link></li>
        <li>
          <Link to="/cart" className="cart-link" aria-label="Cart">
            <img src={cartIcon} alt="Cart" className="cart-icon" />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </li>
      </ul>

      {isLoggedIn && (
        <div className="profile-menu" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="profile-icon"
            aria-label="Profile Menu"
          >
            <img src={profilePhoto} alt="Profile" className="profile-photo" />
          </button>

          {showDropdown && (
            <div className="profile-dropdown">
              <p><strong>Name:</strong> {name}</p>
              <p><strong>Email:</strong> {email}</p>
              <p><strong>Password:</strong> ********</p>
              <button onClick={handleLogoutClick}>Logout</button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
