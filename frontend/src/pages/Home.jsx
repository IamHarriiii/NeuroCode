// src/pages/Home.jsx
import React from "react";
import CodeEditor from "../components/CodeEditor";

const Home = () => {
  return (
    <div className="p-6">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 rounded-lg shadow-lg mb-6 text-white">
        <h1 className="text-3xl font-bold mb-2">NeuroCode Playground</h1>
        <p className="text-white opacity-90">
          Advanced code analysis platform powered by neural networks.
          Write, analyze and enhance your code with AI assistance.
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <CodeEditor task="bug" />
      </div>
    </div>
  );
};

export default Home;
