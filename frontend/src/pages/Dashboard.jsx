// src/pages/Dashboard.jsx
import React from "react";
import UsageLogs from "../components/UsageLogs";
import MetricsDashboard from "../components/MetricsDashboard";
import ChatBot from "../components/ChatBot";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors duration-300">
      {/* Header */}
      <header className="flex items-center gap-3 border-b pb-4 mb-6 dark:border-gray-700">
        <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-3 rounded-full shadow-md">
          <span className="text-white text-xl">📊</span>
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text dark:text-white">
          NeuroCode Dashboard
        </h1>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <MetricsDashboard />
        <UsageLogs />
        <ChatBot />
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-500 dark:text-gray-400 mt-10 pt-6 border-t dark:border-gray-700">
        © {new Date().getFullYear()} NeuroCode. All rights reserved.
      </footer>
    </div>
  );
};

export default Dashboard;