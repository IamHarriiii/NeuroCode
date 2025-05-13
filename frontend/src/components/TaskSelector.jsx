// 📁 frontend/src/components/TaskSelector.jsx
import React from 'react';

export default function TaskSelector({ selectedTask, setSelectedTask }) {
  const tasks = [
    { label: "Bug Prediction", value: "bug" },
    { label: "Code Optimization", value: "optimize" },
    { label: "Translation", value: "translate" },
    { label: "Documentation", value: "doc" },
    { label: "Chatbot (Ask AI)", value: "chat" },
  ];

  return (
    <div className="flex gap-2 flex-wrap justify-center mb-4">
      {tasks.map((task) => (
        <button
          key={task.value}
          className={`px-4 py-2 rounded-lg shadow-sm border ${
            selectedTask === task.value
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700"
          }`}
          onClick={() => setSelectedTask(task.value)}
        >
          {task.label}
        </button>
      ))}
    </div>
  );
}