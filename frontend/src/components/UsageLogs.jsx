// 📁 src/components/UsageLogs.jsx
import React, { useEffect, useState } from "react";
import { getUsageLogs, downloadCSV } from "../services/api";

const UsageLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    const data = await getUsageLogs();
    setLogs(data);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-5 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Usage Activity</h2>
        <button
          onClick={downloadCSV}
          className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors flex items-center gap-2 shadow-sm"
        >
          <span>⬇</span> Export Logs
        </button>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto border border-gray-200 dark:border-gray-600 rounded-lg shadow">
        <table className="table-auto w-full text-left">
          {/* Table Header */}
          <thead className="bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
            <tr>
              <th className="px-4 py-3 text-gray-600 dark:text-gray-300">Timestamp</th>
              <th className="px-4 py-3 text-gray-600 dark:text-gray-300">Session ID</th>
              <th className="px-4 py-3 text-gray-600 dark:text-gray-300">Action</th>
              <th className="px-4 py-3 text-gray-600 dark:text-gray-300">Code Snippet</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {logs.map((log, idx) => (
              <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
                <td className="px-4 py-3 text-gray-800 dark:text-gray-200">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
                <td className="px-4 py-3 font-mono text-sm text-gray-600 dark:text-gray-400">
                  {log.session_id}
                </td>
                <td className="px-4 py-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm">
                    {log.action}
                  </span>
                </td>
                <td className="px-4 py-3 truncate max-w-xs">
                  <code className="bg-gray-100 dark:bg-gray-900 px-1 py-0.5 rounded text-sm text-gray-800 dark:text-gray-200">
                    {log.code.slice(0, 50)}...
                  </code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsageLogs;