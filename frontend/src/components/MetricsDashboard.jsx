// src/components/MetricsDashboard.jsx
import React from "react";

const MetricsDashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-sm border border-blue-100 flex items-center justify-between">
        <div>
          <h3 className="text-sm text-blue-500 font-semibold uppercase tracking-wide">Bug Predictions</h3>
          <p className="text-3xl font-bold text-blue-700 mt-1">120</p>
        </div>
        <div className="bg-blue-100 p-3 rounded-full">
          <span className="text-blue-700 text-xl">🚀</span>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-6 rounded-xl shadow-sm border border-amber-100 flex items-center justify-between">
        <div>
          <h3 className="text-sm text-amber-500 font-semibold uppercase tracking-wide">Optimizations</h3>
          <p className="text-3xl font-bold text-amber-700 mt-1">90</p>
        </div>
        <div className="bg-amber-100 p-3 rounded-full">
          <span className="text-amber-700 text-xl">⚡</span>
        </div>
      </div>
      
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl shadow-sm border border-green-100 flex items-center justify-between">
        <div>
          <h3 className="text-sm text-green-500 font-semibold uppercase tracking-wide">Translations</h3>
          <p className="text-3xl font-bold text-green-700 mt-1">45</p>
        </div>
        <div className="bg-green-100 p-3 rounded-full">
          <span className="text-green-700 text-xl">🌐</span>
        </div>
      </div>
    </div>
  );
};

export default MetricsDashboard;