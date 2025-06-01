// tailwind.config.js
module.exports = {
    darkMode: "class",
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "var(--primary)",
                accent: "var(--accent)",
            },
        },
    },
    plugins: [],
}
  