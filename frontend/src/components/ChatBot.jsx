// src/components/ChatBot.jsx
import React, { useState } from "react";
import { runLLMInference } from "../services/api";

const ChatBot = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChat = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    try {
      const res = await runLLMInference(query, "chat");
      setResponse(res);
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-3 w-3 rounded-full bg-green-500"></div>
        <h2 className="text-xl font-bold text-gray-800">AI Assistant</h2>
      </div>
      
      <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border-0 p-4 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Ask NeuroCode Chatbot..."
          rows={4}
        />
      </div>
      
      <button
        onClick={handleChat}
        disabled={isLoading}
        className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-sm flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </>
        ) : (
          <>💬 Ask</>
        )}
      </button>
      
      {response && (
        <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 shadow-inner mt-2">
          <h3 className="font-bold mb-3 text-gray-700 border-b pb-2">Chat Response:</h3>
          <div className="whitespace-pre-wrap bg-white p-4 rounded border border-gray-200">
            {response}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;