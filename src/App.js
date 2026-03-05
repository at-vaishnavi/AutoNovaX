import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import About from "./pages/About";
import Distributors from "./pages/Distributors";
import FAQ from "./pages/Faq";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import "./styles/style1.css";

// Layout component wraps pages and applies different container styles
// depending on whether the current route is the home page or not.
function Layout() {
  const location = useLocation();
  const isHomePage = location.pathname === "/home";

  return (
    <div className={isHomePage ? "home-page" : "page-container"}>
      {/* Outlet renders the nested route components */}
      <Outlet />
    </div>
  );
}

// Component to protect routes from unauthorized access.
// If user is not logged in, redirect to login page with a message stored in sessionStorage.
function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    sessionStorage.setItem("redirectMessage", "Please login to view this page.");
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  // State for tracking if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // State to avoid multiple reload checks on page refresh
  const [checkedRefresh, setCheckedRefresh] = useState(false);

  // State to hold the total count of items in cart
  const [cartCount, setCartCount] = useState(0);

  // Hooks to navigate programmatically and get current location path
  const navigate = useNavigate();
  const location = useLocation();

  // Function to update the cart count from localStorage cartItems
  const updateCartCount = () => {
    // Parse cart items array from localStorage, fallback to empty array
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

    // Sum up quantity of each cart item (default quantity 1 if missing)
    const totalQty = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

    // Update state with the total quantity
    setCartCount(totalQty);
  };

  // Effect runs once or when dependencies change,
  // checks login status and handles page reload redirects
  useEffect(() => {
    // Check if user is logged in (stored in localStorage)
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);

    // If logged in and refresh check not yet done
    if (loggedIn && !checkedRefresh) {
      // Use Navigation Timing API to check if page was reloaded
      const navigationEntries = performance.getEntriesByType("navigation");
      const isReload = navigationEntries.length > 0 && navigationEntries[0].type === "reload";

      // If reloaded and not on home page, redirect to home
      if (isReload && location.pathname !== "/home") {
        navigate("/home", { replace: true });
      }

      // Mark refresh as checked to avoid rerunning this logic
      setCheckedRefresh(true);
    }
  }, [checkedRefresh, location.pathname, navigate]);

  // Effect to update cart count on component mount and when localStorage changes
  useEffect(() => {
    updateCartCount();

    // Listen to 'storage' event to detect changes in other tabs/windows
    window.addEventListener("storage", updateCartCount);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  // Function to handle logout: clear localStorage, update state, redirect to login
  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* Navbar with props for login state, logout function, and cart count */}
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} cartCount={cartCount} />

      {/* Routes setup */}
      <Routes>
        {/* Redirect root path based on login state */}
        <Route
          path="/"
          element={<Navigate to={isLoggedIn ? "/profile" : "/login"} replace />}
        />

        {/* Login page route: redirect if already logged in */}
        <Route
          path="/login"
          element={
            isLoggedIn ? <Navigate to="/profile" replace /> : <Login setIsLoggedIn={setIsLoggedIn} />
          }
        />

        {/* Protected routes wrapper */}
        <Route
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* Nested protected routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/products"
            element={<ProductList updateCartCount={updateCartCount} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/distributors" element={<Distributors />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart updateCartCount={updateCartCount} />} />

          {/* Catch-all route redirects to profile */}
          <Route path="*" element={<Navigate to="/profile" replace />} />
        </Route>
      </Routes>
    </>
  );
}

// AppWrapper wraps App component with Router context for routing to work
export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
