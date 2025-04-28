import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar2 from '../src/components/Navbar2';
import Home from '../src/components/Home';
import SignupPage from '../src/components/SignupPage';
import About from '../src/components/About' 
import Contact from '../src/components/Contact';
import Login from '../src/components/Login';
import PasswordReset from "../src/components/PasswordReset";
function App() {
  return (
    <Router>
      <Navbar2 />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Reset" element={<PasswordReset />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
