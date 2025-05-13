// src/services/api.js
import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const runLLMInference = async (code, task) => {
  try {
    const response = await axios.post(`${BASE_URL}/infer/`, { code, task });
    return response.data.response;
  } catch (error) {
    console.error("Inference Error:", error);
    return "❌ Error during inference.";
  }
};

export const getUsageLogs = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/logs/");
    return response.data;
  } catch (error) {
    console.error("Logs fetch error:", error);
    return [];
  }
};

export const downloadCSV = () => {
  window.open("http://localhost:8000/api/logs/export/", "_blank");
};
