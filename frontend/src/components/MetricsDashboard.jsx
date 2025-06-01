// 📁 src/components/MetricsDashboard.jsx
import React from "react";

const MetricsDashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Bug Predictions Card */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 p-6 rounded-xl shadow-sm border border-blue-100 dark:border-blue-700 flex items-center justify-between transition-colors duration-300">
        <div>
          <h3 className="text-sm text-blue-500 dark:text-blue-400 font-semibold uppercase tracking-wide">
            Bug Predictions
          </h3>
          <p className="text-3xl font-bold text-blue-700 dark:text-blue-300 mt-1">120</p>
        </div>
        <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full transition-colors duration-300">
          <span className="text-blue-700 dark:text-blue-300 text-xl">🚀</span>
        </div>
      </div>

      {/* Optimizations Card */}
      <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900 dark:to-yellow-900 p-6 rounded-xl shadow-sm border border-amber-100 dark:border-amber-700 flex items-center justify-between transition-colors duration-300">
        <div>
          <h3 className="text-sm text-amber-500 dark:text-amber-400 font-semibold uppercase tracking-wide">
            Optimizations
          </h3>
          <p className="text-3xl font-bold text-amber-700 dark:text-amber-300 mt-1">90</p>
        </div>
        <div className="bg-amber-100 dark:bg-amber-900 p-3 rounded-full transition-colors duration-300">
          <span className="text-amber-700 dark:text-amber-300 text-xl">⚡</span>
        </div>
      </div>

      {/* Translations Card */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900 dark:to-emerald-900 p-6 rounded-xl shadow-sm border border-green-100 dark:border-green-700 flex items-center justify-between transition-colors duration-300">
        <div>
          <h3 className="text-sm text-green-500 dark:text-green-400 font-semibold uppercase tracking-wide">
            Translations
          </h3>
          <p className="text-3xl font-bold text-green-700 dark:text-green-300 mt-1">45</p>
        </div>
        <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full transition-colors duration-300">
          <span className="text-green-700 dark:text-green-300 text-xl">🌐</span>
        </div>
      </div>
    </div>
  );
};

export default MetricsDashboard;