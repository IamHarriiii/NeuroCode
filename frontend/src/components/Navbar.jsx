// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import logoimage from "../assets/logoimage.png"; // Path to your logo image

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-900 text-white">
      <div className="flex items-center">
        <Link to="/" className="text-xl font-bold">
          <img src={logoimage} alt="" className="h-8" />
        </Link>
      </div>
      
      <div className="flex space-x-6">
        <Link to="/" className="hover:text-teal-400 transition-colors">
          Home
        </Link>
        <Link to="/dashboard" className="hover:text-teal-400 transition-colors">
          Dashboard
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;