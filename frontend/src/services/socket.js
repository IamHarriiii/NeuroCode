// 📁 frontend/src/services/socket.js
export const socket = new WebSocket("ws://localhost:8000/ws/code/dev123");

socket.onopen = () => {
    console.log("🧠 WebSocket connection established");
};

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("🧩 Received from WebSocket:", data);
    // You can add your own UI update logic here
};

socket.onclose = () => {
    console.warn("🔌 WebSocket connection closed");
};

socket.onerror = (err) => {
    console.error("❌ WebSocket error:", err);
};