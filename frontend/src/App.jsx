import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CodeEditor from "./components/CodeEditor";
import AuthModal from "./components/AuthModal"; // Fix the import
import Navbar from "./components/Navbar"; // Add Navbar import

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [auth, setAuth] = useState(false);

  // Check auth status on load
  useEffect(() => {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    setAuth(!!token);
  }, []);

  return (
    <>
      <Navbar /> {/* Add Navbar here */}
      <Routes>
        {/* Public route */}
        <Route path="/" element={<Home />} />

        {/* Protected routes */}
        <Route
          path="/editor"
          element={
            auth ? (
              <CodeEditor />
            ) : (
              <Navigate to="/" state={{ showAuth: true }} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            auth ? (
              <Dashboard />
            ) : (
              <Navigate to="/" state={{ showAuth: true }} />
            )
          }
        />
      </Routes>

      {/* Auth Modal (conditionally shown) */}
      {showAuthModal && (
        <AuthModal
          onLogin={() => {
            setAuth(true);
            setShowAuthModal(false);
          }}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </>
  );
}

export default App;