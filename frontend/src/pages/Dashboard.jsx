// src/pages/Dashboard.jsx
import React from "react";
import UsageLogs from "../components/UsageLogs";
import MetricsDashboard from "../components/MetricsDashboard";
import ChatBot from "../components/ChatBot";

const Dashboard = () => {
  return (
    <div className="p-6 flex flex-col gap-6 bg-gray-50 min-h-screen">
      <header className="flex items-center gap-3 border-b pb-4 mb-2">
        <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-2 rounded shadow-md">
          <span className="text-white text-xl font-bold">📊</span>
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
          NeuroCode Dashboard
        </h1>
      </header>
      <div className="bg-white rounded-lg shadow-lg p-5 border border-gray-200">
        <MetricsDashboard />
      </div>
      <div className="bg-white rounded-lg shadow-lg p-5 border border-gray-200">
        <UsageLogs />
      </div>
      <div className="bg-white rounded-lg shadow-lg p-5 border border-gray-200">
        <ChatBot />
      </div>
      <footer className="text-center text-gray-500 mt-4 pt-4 border-t">
        © 2025 NeuroCode. All rights reserved.
      </footer>
    </div>
  );
};

export default Dashboard;