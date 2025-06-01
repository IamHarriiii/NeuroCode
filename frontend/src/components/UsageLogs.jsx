// 📁 src/components/UsageLogs.jsx
import React, { useEffect, useState } from "react";
import { getUsageLogs, downloadCSV } from "../services/api";

const UsageLogs = () => {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const data = await getUsageLogs();
      setLogs(data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Usage Activity</h2>
        <button
          onClick={downloadCSV}
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white py-2 px-4 rounded-md flex items-center gap-2 shadow-sm transition-colors"
          disabled={isLoading || logs.length === 0}
        >
          <span>⬇</span> Export Logs
        </button>
      </div>

      {/* Table Container */}
      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : logs.length === 0 ? (
        <div className="text-center py-10 text-gray-500 dark:text-gray-400">
          No usage logs available
        </div>
      ) : (
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
                <tr
                  key={idx}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
                >
                  <td className="px-4 py-3 text-gray-800 dark:text-gray-200">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 font-mono text-sm text-gray-600 dark:text-gray-400">
                    {log.session_id.slice(0, 8)}...
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-sm">
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
      )}
    </div>
  );
};

export default UsageLogs;