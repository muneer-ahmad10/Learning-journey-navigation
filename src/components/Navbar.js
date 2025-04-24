// Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaHome, FaInfoCircle, FaPhoneAlt, FaSignInAlt, FaUserPlus, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";
import "../styles/Navbar.css"; // Adjust the path as necessary

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setDrawerOpen(false);
  };

  return (
    <>
      <nav className="navbar fixed-top text-white shadow d-flex align-items-center justify-content-between px-3">
        <Link to="/" className="logo text-white fw-bold">MyCareerGuide</Link>
        {!isMobile ? (
          <div className="nav-links d-flex gap-3">
            <Link to="/about" className="text-white text-decoration-none">About</Link>
            <Link to="/contact" className="text-white text-decoration-none">Contact</Link>
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="text-white text-decoration-none">Dashboard</Link>
                <button className="logout-btn btn btn-outline-light btn-sm" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white text-decoration-none">Login</Link>
                <Link to="/signup" className="text-white text-decoration-none">Signup</Link>
              </>
            )}
          </div>
        ) : (
          <div className="hamburger text-white fs-4" onClick={() => setDrawerOpen(true)}>
            <FaBars />
          </div>
        )}
      </nav>

      {isMobile && (
        <div className={`drawer ${drawerOpen ? "open" : ""}`}>
          <div className="drawer-header">
            <FaTimes className="close-icon" onClick={() => setDrawerOpen(false)} />
          </div>
          <ul className="drawer-links">
            <li>
              <NavLink to="/" onClick={() => setDrawerOpen(false)} className="nav-link" end>
                <FaHome className="nav-icon" /> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" onClick={() => setDrawerOpen(false)} className="nav-link">
                <FaInfoCircle className="nav-icon" /> About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" onClick={() => setDrawerOpen(false)} className="nav-link">
                <FaPhoneAlt className="nav-icon" /> Contact
              </NavLink>
            </li>
            {isLoggedIn && (
              <li>
                <NavLink to="/dashboard" onClick={() => setDrawerOpen(false)} className="nav-link">
                  <FaTachometerAlt className="nav-icon" /> Dashboard
                </NavLink>
              </li>
            )}
          </ul>

          <div className="drawer-bottom">
            {isLoggedIn ? (
              <button className="logout-btn" onClick={handleLogout}>
                <FaSignOutAlt className="nav-icon" /> Logout
              </button>
            ) : (
              <>
                <Link to="/login" onClick={() => setDrawerOpen(false)} className="auth-btn">
                  <FaSignInAlt className="nav-icon" /> Login
                </Link>
                <Link to="/signup" onClick={() => setDrawerOpen(false)} className="auth-btn">
                  <FaUserPlus className="nav-icon" /> Signup
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
