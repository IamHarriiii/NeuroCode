// 📁 src/services/api.js
import axios from "axios";

// Set global Axios defaults for CSRF and credentials
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

// Use environment variable if available, fallback to localhost
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

/**
 * Run LLM inference on the provided code with a specific task.
 */
export const runLLMInference = async (code, task) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/infer/`,
            { code, task },
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            }
        );
        return response.data.response;
    } catch (error) {
        console.error("Inference Error:", error);
        return "❌ Error during inference.";
    }
};

/**
 * Fetch usage logs from the backend.
 */
export const getUsageLogs = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/logs/`, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Logs fetch error:", error);
        return [];
    }
};

/**
 * Open CSV download link in a new tab.
 */
export const downloadCSV = () => {
    window.open(`${BASE_URL}/api/logs/export/`, "_blank");
};