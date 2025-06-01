// 📁 src/components/CodeEditor.jsx
import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { cpp } from "@codemirror/lang-cpp";
import { rust } from "@codemirror/lang-rust";
import { runLLMInference } from "../services/api";
import TaskSelector from "./TaskSelector";

const CodeEditor = () => {
  const [code, setCode] = useState("// Start coding...");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTask, setSelectedTask] = useState("bug");
  const [language, setLanguage] = useState("javascript");

  // Automatically switch language based on task
  useEffect(() => {
    if (selectedTask === "translate") {
      setLanguage("python"); // Default translation to Python
    } else {
      setLanguage("javascript"); // Default bug/optimize to JS
    }
  }, [selectedTask]);

  const getLanguageExtension = () => {
    switch (language) {
      case "javascript":
        return javascript({ jsx: true });
      case "typescript":
        return javascript({ typescript: true });
      case "python":
        return python();
      case "java":
        return java();
      case "c":
      case "cpp":
        return cpp();
      case "rust":
        return rust();
      default:
        return [];
    }
  };

  const handleRun = async () => {
    setIsRunning(true);
    try {
      const result = await runLLMInference(code, selectedTask);
      setOutput(result);
    } catch (error) {
      setOutput("Error: " + error.message);
    } finally {
      setIsRunning(false);
    }
  };

  const handleRunTask = handleRun;

  return (
    <div className="flex flex-col gap-4 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
      {/* Language Selector */}
      <div className="flex justify-between items-center">
        <label htmlFor="language-select" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Language:
        </label>
        <select
          id="language-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded px-3 py-1.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="c">C</option>
          <option value="cpp">C++</option>
          <option value="rust">Rust</option>
        </select>
      </div>

      {/* Task Selector */}
      <TaskSelector
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
        onRunTask={handleRunTask}
      />

      {/* Code Editor */}
      <CodeMirror
        value={code}
        height="300px"
        extensions={[getLanguageExtension()]}
        onChange={(value) => setCode(value)}
        theme="dracula"
        className="border dark:border-gray-700 rounded shadow-md"
      />

      {/* Run Button */}
      <button
        onClick={handleRun}
        disabled={isRunning}
        className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white py-2 px-4 rounded transition-colors disabled:opacity-70"
      >
        {isRunning ? "Processing..." : "Run LLM Task"}
      </button>

      {/* Output Area */}
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
        <h3 className="font-bold mb-2 text-gray-800 dark:text-gray-200">Output:</h3>
        <pre className="whitespace-pre-wrap text-gray-800 dark:text-gray-300">{output}</pre>
      </div>
    </div>
  );
};

export default CodeEditor;