// 📁 src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import logoimage from "../assets/logoimage.png";
import DarkModeToggle from "./DarkModeToggle";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-900 text-white shadow-md">
      {/* Logo Section */}
      <div className="flex items-center">
        <Link to="/" className="text-xl font-bold">
          <img src={logoimage} alt="Logo" className="h-8" />
        </Link>
      </div>

      {/* Navigation Links and Theme Toggle */}
      <div className="flex items-center space-x-6">
        <Link to="/" className="hover:text-teal-400 transition-colors">Home</Link>
        <Link to="/dashboard" className="hover:text-teal-400 transition-colors">Dashboard</Link>
        <DarkModeToggle /> {/* Dark mode toggle button here */}
      </div>
    </nav>
  );
};

export default Navbar;