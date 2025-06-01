// src/services/websocketService.js
let socket;

export const connectToWebSocket = (onMessageCallback) => {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
        socket = new WebSocket(import.meta.env.VITE_WS_URL || "ws://localhost:8000/ws/code/dev123");

        socket.onopen = () => {
            console.log("🧠 NeuroCode WS connected");
        };

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                onMessageCallback(data);
            } catch (err) {
                console.error("Failed to parse WebSocket message", err);
            }
        };

        socket.onclose = () => {
            console.warn("🔌 WebSocket connection closed");
        };

        socket.onerror = (err) => {
            console.error("❌ WebSocket error:", err);
        };
    }

    return socket;
};

export const sendMessage = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
    } else {
        console.warn("WebSocket not ready. Message queued.");
        setTimeout(() => sendMessage(message), 1000);
    }
};

export default { connectToWebSocket, sendMessage };