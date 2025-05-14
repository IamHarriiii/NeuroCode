import React ,{ useEffect } from "react";
import AuthPage from "../pages/AuthPage";

export default function AuthModal({ onLogin, onClose }) {
    // Close modal on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>
                <AuthPage onLogin={onLogin} />
            </div>
        </div>
    );
}