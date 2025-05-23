import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { runLLMInference } from "../services/api";
import TaskSelector from './TaskSelector';

const CodeEditor = () => {
  const [code, setCode] = useState("// Start coding...");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTask, setSelectedTask] = useState("bug"); // Task state here

  const handleRun = async () => {
    setIsRunning(true);
    try {
      const result = await runLLMInference(code, selectedTask); // Use selectedTask
      setOutput(result);
    } catch (error) {
      setOutput("Error: " + error.message);
    } finally {
      setIsRunning(false);
    }
  };

  // Add this function to handle task running from the selector
  const handleRunTask = handleRun;

  return (
    <div className="flex flex-col gap-4">
      {/* Task Selector UI */}
      <TaskSelector
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
        onRunTask={handleRunTask}
      />
      <CodeMirror
        value={code}
        height="300px"
        extensions={[javascript()]}
        onChange={(value) => setCode(value)}
        className="border rounded shadow-md p-2"
        theme="light"
      />
      <button
        onClick={handleRun}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        disabled={isRunning}
      >
        {isRunning ? "Processing..." : "Run LLM Task"}
      </button>
      <div className="bg-gray-100 p-4 rounded">
        <h3 className="font-bold mb-2">Output:</h3>
        <pre className="whitespace-pre-wrap">{output}</pre>
      </div>
    </div>
  );
};

export default CodeEditor;