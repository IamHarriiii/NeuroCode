// 📁 src/components/ChatBot.jsx
import React, { useState } from "react";
import { runLLMInference } from "../services/api";

const ChatBot = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [previousResponse, setPreviousResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackStatus, setFeedbackStatus] = useState(null); // 'upvoted', 'downvoted', null

  const handleChat = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const res = await runLLMInference(query, "chat");
      setPreviousResponse(response);
      setResponse(res);
      setFeedbackStatus(null); // Reset feedback status on new query
    } catch (error) {
      console.error("Chat error:", error);
      setResponse("Sorry, an error occurred while processing your request.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleChat();
    }
  };

  const handleUpvote = () => {
    sendFeedback(query, response, previousResponse || "");
    setFeedbackStatus("upvoted");
  };

  const handleDownvote = () => {
    sendFeedback(query, previousResponse || "", response);
    setFeedbackStatus("downvoted");
  };

  const sendFeedback = (prompt, chosen, rejected) => {
    fetch("http://localhost:8000/rlhf/feedback/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify({
        prompt,
        chosen,
        rejected,
        task: "chat", // optional: helps categorize feedback
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Feedback failed");
        return res.json();
      })
      .catch((err) => {
        console.error("Failed to submit feedback:", err);
        alert("Could not submit feedback. Please try again later.");
      });
  };

  return (
    <div className="flex flex-col gap-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">AI Assistant</h2>
      </div>

      {/* Input Area */}
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask NeuroCode Chatbot..."
        rows={4}
        className="w-full p-4 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-md bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 transition-colors duration-200"
        disabled={isLoading}
      />

      {/* Ask Button */}
      <button
        onClick={handleChat}
        disabled={isLoading || !query.trim()}
        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 px-4 rounded-lg transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-70"
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

      {/* Response Output */}
      {response && (
        <div className="bg-gray-50 dark:bg-gray-900 p-5 rounded-lg border border-gray-200 dark:border-gray-700 shadow-inner mt-2 transition-colors duration-300">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-2.5 w-2.5 rounded-full bg-blue-500"></div>
            <h3 className="font-bold text-gray-700 dark:text-gray-300">Chat Response:</h3>
          </div>
          <div className="whitespace-pre-wrap bg-white dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200">
            {response}
          </div>

          {/* Feedback Buttons */}
          <div className="mt-4 flex gap-2">
            <button
              onClick={handleUpvote}
              disabled={feedbackStatus === "upvoted"}
              className={`px-3 py-1 rounded flex items-center gap-1 ${feedbackStatus === "upvoted"
                  ? "bg-green-100 text-green-700"
                  : "bg-green-500 hover:bg-green-600 text-white"
                }`}
            >
              👍 Upvote
            </button>

            <button
              onClick={handleDownvote}
              disabled={feedbackStatus === "downvoted"}
              className={`px-3 py-1 rounded flex items-center gap-1 ${feedbackStatus === "downvoted"
                  ? "bg-red-100 text-red-700"
                  : "bg-red-500 hover:bg-red-600 text-white"
                }`}
            >
              👎 Downvote
            </button>
          </div>
        </div>
      )}

      {/* Feedback Status */}
      {feedbackStatus === "upvoted" && (
        <p className="text-green-600 text-sm mt-2">✅ Thanks! Your upvote helps improve the model.</p>
      )}
      {feedbackStatus === "downvoted" && (
        <p className="text-red-600 text-sm mt-2">❌ Thanks! We'll use this feedback to train the model.</p>
      )}
    </div>
  );
};

export default ChatBot;