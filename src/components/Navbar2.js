import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { 
  FaBars, FaTimes, FaInfoCircle, 
  FaPhoneAlt, FaSignInAlt, FaUserPlus, 
  FaSignOutAlt, FaTachometerAlt, FaChevronRight 
} from "react-icons/fa";
import "../styles/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setDrawerOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Listen for changes in localStorage across the app
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };
    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
    setDrawerOpen(false);
  };

  const handleLinkClick = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <nav className="navbar fixed-top text-white shadow-sm d-flex align-items-center justify-content-between px-3 px-lg-5">
        <Link to="/" className="logo text-white fw-bold d-flex align-items-center" onClick={handleLinkClick}>
          <span className="logo-text">Learning Journey</span>
        </Link>

        {!isMobile ? (
          <div className="nav-links d-flex gap-4 align-items-center">
            <NavLink to="/about" className={({ isActive }) => `nav-desktop-link ${isActive ? "active" : ""}`} onClick={handleLinkClick}>
              About
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => `nav-desktop-link ${isActive ? "active" : ""}`} onClick={handleLinkClick}>
              Contact
            </NavLink>

            {isLoggedIn ? (
              <>
                <NavLink to="/dashboard" className={({ isActive }) => `nav-desktop-link ${isActive ? "active" : ""}`} onClick={handleLinkClick}>
                  Dashboard
                </NavLink>
                <button className="btn btn-outline-light btn-sm px-3 py-2" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-light btn-sm px-4 py-1" onClick={handleLinkClick}>
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary btn-sm px-4 py-1 ms-2" onClick={handleLinkClick}>
                  Signup
                </Link>
              </>
            )}
          </div>
        ) : (
          <button className="hamburger text-white fs-4 bg-transparent border-0" onClick={() => setDrawerOpen(true)}>
            <FaBars />
          </button>
        )}
      </nav>

      {/* Mobile Drawer */}
      {isMobile && (
        <>
          <div className={`drawer-backdrop ${drawerOpen ? "visible" : ""}`} onClick={() => setDrawerOpen(false)} />
          <div className={`drawer ${drawerOpen ? "open" : ""}`}>
            <div className="drawer-header d-flex justify-content-between align-items-center px-4 py-3">
              <h5 className="mb-0 text-white">Menu</h5>
              <button className="close-icon bg-transparent border-0 text-white fs-5" onClick={() => setDrawerOpen(false)}>
                <FaTimes />
              </button>
            </div>

            <ul className="drawer-links list-unstyled px-3">
              <li>
                <NavLink to="/about" className={({ isActive }) => `nav-link d-flex justify-content-between align-items-center ${isActive ? "active" : ""}`} onClick={handleLinkClick}>
                  <span><FaInfoCircle className="me-2" /> About</span>
                  <FaChevronRight className="text-muted" />
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={({ isActive }) => `nav-link d-flex justify-content-between align-items-center ${isActive ? "active" : ""}`} onClick={handleLinkClick}>
                  <span><FaPhoneAlt className="me-2" /> Contact</span>
                  <FaChevronRight className="text-muted" />
                </NavLink>
              </li>

              {isLoggedIn && (
                <li>
                  <NavLink to="/dashboard" className={({ isActive }) => `nav-link d-flex justify-content-between align-items-center ${isActive ? "active" : ""}`} onClick={handleLinkClick}>
                    <span><FaTachometerAlt className="me-2" /> Dashboard</span>
                    <FaChevronRight className="text-muted" />
                  </NavLink>
                </li>
              )}
            </ul>

            <div className="drawer-bottom px-3 py-4">
              {isLoggedIn ? (
                <button className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center py-2" onClick={handleLogout}>
                  <FaSignOutAlt className="me-2" /> Logout
                </button>
              ) : (
                <div className="d-grid gap-2">
                  <Link to="/login" className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center py-2" onClick={handleLinkClick}>
                    <FaSignInAlt className="me-2" /> Login
                  </Link>
                  <Link to="/signup" className="btn btn-primary w-100 d-flex align-items-center justify-content-center py-2" onClick={handleLinkClick}>
                    <FaUserPlus className="me-2" /> Signup
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
