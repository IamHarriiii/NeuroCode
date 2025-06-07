import React, { useState } from "react";
import axios from "axios";

const FeedbackForm = () => {
    const [formData, setFormData] = useState({
        prompt: "",
        chosen: "",
        rejected: "",
        task: "bug",
    });

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8000/rlhf/feedback/", formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });
            alert("Feedback submitted!");
            setFormData({ ...formData, chosen: "", rejected: "" });
        } catch (err) {
            console.error("Error submitting feedback:", err);
            alert("Failed to submit feedback.");
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">📝 Submit Feedback</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Prompt</label>
                    <textarea
                        name="prompt"
                        value={formData.prompt}
                        onChange={handleChange}
                        className="w-full border dark:border-gray-600 rounded p-2 dark:bg-gray-900"
                        rows={3}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Chosen Output</label>
                    <textarea
                        name="chosen"
                        value={formData.chosen}
                        onChange={handleChange}
                        className="w-full border dark:border-gray-600 rounded p-2 dark:bg-gray-900"
                        rows={3}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Rejected Output</label>
                    <textarea
                        name="rejected"
                        value={formData.rejected}
                        onChange={handleChange}
                        className="w-full border dark:border-gray-600 rounded p-2 dark:bg-gray-900"
                        rows={3}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Task Type</label>
                    <select
                        name="task"
                        value={formData.task}
                        onChange={handleChange}
                        className="w-full border dark:border-gray-600 rounded p-2 dark:bg-gray-900"
                    >
                        <option value="bug">Bug Prediction</option>
                        <option value="optimize">Code Optimization</option>
                        <option value="doc">Documentation</option>
                        <option value="chat">Chatbot</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2 px-4 rounded"
                >
                    ➕ Submit Feedback
                </button>
            </form>
        </div>
    );
};

export default FeedbackForm;