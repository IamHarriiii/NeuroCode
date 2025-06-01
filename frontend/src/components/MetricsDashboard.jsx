// 📁 src/components/MetricsDashboard.jsx
import React from "react";

const MetricsDashboard = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white">Your Code Activity</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Bug Predictions Card */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 p-6 rounded-xl shadow-sm border border-blue-100 dark:border-blue-700 flex flex-col items-center justify-center transition-colors duration-300">
          <div className="flex items-center justify-between w-full mb-2">
            <h3 className="text-sm text-blue-500 dark:text-blue-400 font-semibold uppercase tracking-wide">
              Bug Predictions
            </h3>
            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full transition-colors duration-300">
              <span className="text-blue-700 dark:text-blue-300 text-xl">🚀</span>
            </div>
          </div>
          <p className="text-3xl font-bold text-blue-700 dark:text-blue-300 mt-1">120</p>
          <span className="text-blue-600 dark:text-blue-400 text-xs mt-2">Total bugs predicted</span>
        </div>

        {/* Optimizations Card */}
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900 dark:to-yellow-900 p-6 rounded-xl shadow-sm border border-amber-100 dark:border-amber-700 flex flex-col items-center justify-center transition-colors duration-300">
          <div className="flex items-center justify-between w-full mb-2">
            <h3 className="text-sm text-amber-500 dark:text-amber-400 font-semibold uppercase tracking-wide">
              Optimizations
            </h3>
            <div className="bg-amber-100 dark:bg-amber-900 p-2 rounded-full transition-colors duration-300">
              <span className="text-amber-700 dark:text-amber-300 text-xl">⚡</span>
            </div>
          </div>
          <p className="text-3xl font-bold text-amber-700 dark:text-amber-300 mt-1">90</p>
          <span className="text-amber-600 dark:text-amber-400 text-xs mt-2">Code optimizations</span>
        </div>

        {/* Translations Card */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-900 p-6 rounded-xl shadow-sm border border-green-100 dark:border-green-700 flex flex-col items-center justify-center transition-colors duration-300">
          <div className="flex items-center justify-between w-full mb-2">
            <h3 className="text-sm text-green-500 dark:text-green-400 font-semibold uppercase tracking-wide">
              Translations
            </h3>
            <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full transition-colors duration-300">
              <span className="text-green-700 dark:text-green-300 text-xl">🌐</span>
            </div>
          </div>
          <p className="text-3xl font-bold text-green-700 dark:text-green-300 mt-1">45</p>
          <span className="text-green-600 dark:text-green-400 text-xs mt-2">Cross-language translations</span>
        </div>
      </div>
    </div>
  );
};

export default MetricsDashboard;