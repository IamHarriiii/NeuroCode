/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                // Light Mode Defaults
                background: {
                    DEFAULT: "#f9fafb",
                    light: "#f3f4f6",
                    dark: "#1f2937",
                },
                text: {
                    DEFAULT: "#111827",
                    light: "#f9fafb",
                    muted: "#6b7280",
                },
                accent: {
                    DEFAULT: "#4f46e5",
                    light: "#c7d2fe",
                    dark: "#6366f1",
                },
                secondary: {
                    DEFAULT: "#f59e0b",
                    dark: "#fbbf24",
                },
                // Dynamic Theme Colors using CSS Variables
                primary: {
                    DEFAULT: "var(--primary)",
                },
                accent: {
                    DEFAULT: "var(--accent)",
                },
            },
        },
    },
    plugins: [],
    darkMode: "class",
  };