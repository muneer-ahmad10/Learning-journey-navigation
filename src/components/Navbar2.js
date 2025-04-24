import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { 
  FaBars, FaTimes, FaHome, FaInfoCircle, 
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

    // Corrected typo from "resize" to "resize"
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
    setDrawerOpen(false);
  };

  const handleLinkClick = (path) => {
    setDrawerOpen(false);
  };

  return (
    <>
      <nav className="navbar fixed-top text-white shadow-sm d-flex align-items-center justify-content-between px-3 px-lg-5">
        <Link 
          to="/" 
          className="logo text-white fw-bold d-flex align-items-center"
          onClick={() => handleLinkClick("/")}
        >
          <span className="logo-text">MyCareerGuide</span>
          <span className="logo-highlight"></span>
        </Link>

        {!isMobile ? (
          <div className="nav-links d-flex gap-4 align-items-center">
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `nav-desktop-link ${isActive ? "active" : ""}`
              }
              onClick={() => handleLinkClick("/about")}
            >
              About
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                `nav-desktop-link ${isActive ? "active" : ""}`
              }
              onClick={() => handleLinkClick("/contact")}
            >
              Contact
            </NavLink>
            
            {isLoggedIn ? (
              <>
                <NavLink 
                  to="/dashboard" 
                  className={({ isActive }) => 
                    `nav-desktop-link ${isActive ? "active" : ""}`
                  }
                  onClick={() => handleLinkClick("/dashboard")}
                >
                  Dashboard
                </NavLink>
                <button 
                  className="logout-btn btn btn-outline-light btn-sm px-3 py-2"
                  onClick={handleLogout}
                  aria-label="Logout"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="btn btn-outline-light btn-sm px-4 py-1"
                  onClick={() => handleLinkClick("/login")}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="btn btn-primary btn-sm px-4 py-1 ms-2"
                  onClick={() => handleLinkClick("/signup")}
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        ) : (
          <button 
            className="hamburger text-white fs-4 bg-transparent border-0"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
          >
            <FaBars />
          </button>
        )}
      </nav>

      {/* Mobile Drawer with Backdrop */}
      {isMobile && (
        <>
          <div 
            className={`drawer-backdrop ${drawerOpen ? "visible" : ""}`}
            onClick={() => setDrawerOpen(false)}
          />
          
          <div className={`drawer ${drawerOpen ? "open" : ""}`}>
            <div className="drawer-header d-flex justify-content-between align-items-center px-4 py-3">
              <h5 className="mb-0 text-white">Menu</h5>
              <button 
                className="close-icon bg-transparent border-0 text-white fs-5"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close menu"
              >
                <FaTimes />
              </button>
            </div>

            <ul className="drawer-links list-unstyled px-3">
              {[
                { path: "/", icon: <FaHome />, label: "Home" },
                { path: "/about", icon: <FaInfoCircle />, label: "About" },
                { path: "/contact", icon: <FaPhoneAlt />, label: "Contact" },
                ...(isLoggedIn 
                  ? [{ path: "/dashboard", icon: <FaTachometerAlt />, label: "Dashboard" }] 
                  : [])
              ].map((item) => (
                <li key={item.path}>
                  <NavLink 
                    to={item.path} 
                    className={({ isActive }) => 
                      `nav-link d-flex justify-content-between align-items-center ${
                        isActive ? "active" : ""
                      }`
                    }
                    onClick={() => handleLinkClick(item.path)}
                  >
                    <span>
                      <span className="nav-icon me-3">{item.icon}</span>
                      {item.label}
                    </span>
                    <FaChevronRight className="text-muted" />
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="drawer-bottom px-3 py-4">
              {isLoggedIn ? (
                <button 
                  className="logout-btn w-100 d-flex align-items-center justify-content-center py-2"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className="me-3" />
                  Logout
                </button>
              ) : (
                <div className="d-grid gap-2">
                  <Link 
                    to="/login" 
                    className="auth-btn btn btn-outline-light w-100 d-flex align-items-center justify-content-center py-2"
                    onClick={() => handleLinkClick("/login")}
                  >
                    <FaSignInAlt className="me-3" />
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    className="auth-btn btn btn-primary w-100 d-flex align-items-center justify-content-center py-2"
                    onClick={() => handleLinkClick("/signup")}
                  >
                    <FaUserPlus className="me-3" />
                    Signup
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