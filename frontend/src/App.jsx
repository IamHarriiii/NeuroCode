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

  // Check auth status on load or route change
  useEffect(() => {
    const token = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
    setAuth(!!token);

    // Show modal if redirected with auth request
    if (location.state?.showAuth) {
      setShowAuthModal(true);
      // Clear state to prevent modal persistence on refresh
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  // Connect to WebSocket only when authenticated
  useEffect(() => {
    if (auth) {
      const unsubscribe = connectToWebSocket((data) => {
        console.log("🧩 Real-time event received:", data);
        // Handle real-time collaboration or live updates here
      });

      // Return cleanup function if connectToWebSocket returns one
      return () => {
        if (typeof unsubscribe === 'function') {
          unsubscribe();
        }
      };
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
        <Route path="/" element={<Layout><Home /></Layout>} />

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