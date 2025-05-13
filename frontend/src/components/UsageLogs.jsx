// src/components/UsageLogs.jsx
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
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Usage Activity</h2>
        <button
          onClick={downloadCSV}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2 shadow-sm"
        >
          <span>⬇️</span> Export Logs
        </button>
      </div>
      
      <div className="overflow-x-auto border border-gray-200 rounded-lg shadow">
        <table className="table-auto w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-gray-600">Timestamp</th>
              <th className="px-4 py-3 text-gray-600">Session ID</th>
              <th className="px-4 py-3 text-gray-600">Action</th>
              <th className="px-4 py-3 text-gray-600">Code Snippet</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {logs.map((log, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-3">{new Date(log.timestamp).toLocaleString()}</td>
                <td className="px-4 py-3 font-mono text-sm">{log.session_id}</td>
                <td className="px-4 py-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-sm">
                    {log.action}
                  </span>
                </td>
                <td className="px-4 py-3 truncate max-w-xs">
                  <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">
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