// 📁 src/pages/Dashboard.jsx
import React from "react";
import UsageLogs from "../components/UsageLogs";
import MetricsDashboard from "../components/MetricsDashboard";
import ChatBot from "../components/ChatBot";

const Dashboard = () => {
  return (
    <div className="p-6 flex flex-col gap-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* Header */}
      <header className="flex items-center gap-3 border-b pb-4 mb-2 dark:border-gray-700">
        <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-2 rounded-full shadow-md">
          <span className="text-white text-xl">📊</span>
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text dark:text-white">
          NeuroCode Dashboard
        </h1>
      </header>

      {/* Metrics Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <MetricsDashboard />
      </div>

      {/* Usage Logs Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <UsageLogs />
      </div>

      {/* AI Assistant Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <ChatBot />
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-500 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        © {new Date().getFullYear()} NeuroCode. All rights reserved.
      </footer>
    </div>
  );
};

export default Dashboard;