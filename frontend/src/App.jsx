// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/AuthPage";
import CodeEditor from "./components/CodeEditor";

const App = () => {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    setAuth(!!token);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {auth && <Navbar />}
        <div className={auth ? "pt-16" : ""}>
          <Routes>
            <Route
              path="/"
              element={auth ? <Home /> : <Navigate to="/auth" />}
            />
            <Route
              path="/dashboard"
              element={auth ? <Dashboard /> : <Navigate to="/auth" />}
            />
            <Route
              path="/editor"
              element={auth ? <CodeEditor /> : <Navigate to="/auth" />}
            />
            <Route
              path="/auth"
              element={!auth ? <AuthPage onLogin={() => setAuth(true)} /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;