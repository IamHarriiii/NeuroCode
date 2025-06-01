// 📁 frontend/src/context/DarkModeProvider.jsx
import React, { createContext, useState, useEffect } from "react";

// Create context
export const DarkModeContext = createContext();

// Helper to detect system theme
const getSystemTheme = () => {
    if (typeof window !== "undefined" && window.matchMedia) {
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
};

export const DarkModeProvider = ({ children }) => {
    // State for dark mode and whether we're following system preference
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem("darkMode");
        if (saved !== null) {
            return JSON.parse(saved);
        }
        return getSystemTheme(); // Default to system preference
    });

    const [isSystemTheme, setIsSystemTheme] = useState(false);

    // Apply theme class dynamically
    useEffect(() => {
        if (isSystemTheme) {
            const systemDark = getSystemTheme();
            document.documentElement.classList.toggle("dark", systemDark);
        } else {
            document.documentElement.classList.toggle("dark", darkMode);
        }
    }, [darkMode, isSystemTheme]);

    // Save to localStorage when darkMode changes (unless system theme)
    useEffect(() => {
        if (isSystemTheme) {
            const systemDark = getSystemTheme();
            document.documentElement.classList.toggle("dark", systemDark);
        } else {
            document.documentElement.classList.toggle("dark", darkMode);
        }
    }, [darkMode, isSystemTheme]);

    // Function to toggle dark mode manually
    const toggleDarkMode = () => {
        setIsSystemTheme(false);
        setDarkMode((prev) => !prev);
    };

    // Function to reset to system preference
    const resetToSystemTheme = () => {
        setIsSystemTheme(true);
        const systemDark = getSystemTheme();
        setDarkMode(systemDark);
    };

    return (
        <DarkModeContext.Provider
            value={{
                darkMode,
                isSystemTheme,
                toggleDarkMode,
                resetToSystemTheme,
            }}
        >
            {children}
        </DarkModeContext.Provider>
    );
};