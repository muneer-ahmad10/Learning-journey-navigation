import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar2 from '../src/components/Navbar2';
import Home from '../src/components/Home';
import SignupPage from '../src/components/SignupPage';
import About from '../src/components/About';
import Contact from '../src/components/Contact';
import Login from '../src/components/Login';
import PasswordReset from "../src/components/PasswordReset";
import Dashboard from "../src/components/DashboardFin";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Navbar2 isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <div className="main-content">
        <Routes>
          {/* Home route changes based on login */}
          <Route path="/" element={isLoggedIn ? <Dashboard /> : <Home />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reset" element={<PasswordReset />} />
          {/* Dashboard route protected */}
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
