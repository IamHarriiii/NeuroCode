import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";

// Components
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CodeEditor from "./components/CodeEditor";
import AuthModal from "./components/AuthModal";
import Layout from "./components/Layout";

// Services
import { connectToWebSocket } from "./services/websocketService";

function AppContent() {
  const [auth, setAuth] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check auth status on load
  useEffect(() => {
    const token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
    setAuth(!!token);

    if (location.state?.showAuth) {
      setShowAuthModal(true);
      // Clear state after showing modal
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  // Connect to WebSocket when user is authenticated
  useEffect(() => {
    if (auth) {
      connectToWebSocket((data) => {
        console.log("🧩 Received WebSocket event:", data);
        // Handle real-time collaboration or live updates here
      });
    }
  }, [auth]);

  const handleLoginSuccess = () => {
    const token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
    setAuth(!!token);
    setShowAuthModal(false);
  };

  return (
    <>
      <Routes>
        {/* Protected routes wrapped in Layout */}
        <Route
          path="/"
          element={<Layout><Home /></Layout>}
        />
        <Route
          path="/editor"
          element={
            auth ? (
              <Layout><CodeEditor /></Layout>
            ) : (
              <Navigate to="/" state={{ showAuth: true }} replace />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            auth ? (
              <Layout><Dashboard /></Layout>
            ) : (
              <Navigate to="/" state={{ showAuth: true }} replace />
            )
          }
        />
      </Routes>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          onLogin={handleLoginSuccess}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </>
  );
}

export default AppContent;