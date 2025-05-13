// 📁 frontend/src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/AuthPage";
import CodeEditor from "./components/CodeEditor";

const App = () => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    setAuth(!!token);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />

            {/* 🔐 Auth protected routes */}
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
              element={<AuthPage onLogin={() => setAuth(true)} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;