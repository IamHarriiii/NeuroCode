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
    // State to hold dark mode status
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem("darkMode");
        if (saved !== null) {
            return JSON.parse(saved);
        }
        return getSystemTheme(); // Default to system preference
    });

    const [isSystemTheme, setIsSystemTheme] = useState(false);

    // Apply theme dynamically
    useEffect(() => {
        if (isSystemTheme) {
            const systemDark = getSystemTheme();
            if (systemDark) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
            return;
        }

        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode, isSystemTheme]);

    // Save to localStorage whenever darkMode changes
    useEffect(() => {
        if (!isSystemTheme) {
            localStorage.setItem("darkMode", JSON.stringify(darkMode));
        } else {
            localStorage.removeItem("darkMode");
        }
    }, [darkMode, isSystemTheme]);

    const toggleDarkMode = () => {
        setIsSystemTheme(false);
        setDarkMode(!darkMode);
    };

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