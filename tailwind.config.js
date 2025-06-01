/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // 롤 테마
                "lol-primary": "#1e88e5",
                "lol-secondary": "#3b82f6",
                "lol-accent": "#2563eb",

                // 발로란트 테마
                "valorant-primary": "#ff4655",
                "valorant-secondary": "#0f1419",
                "valorant-accent": "#ff4655",

                // 공통 색상
                neutral: {
                    50: "#f8fafc",
                    100: "#f1f5f9",
                    200: "#e2e8f0",
                    300: "#cbd5e1",
                    400: "#94a3b8",
                    500: "#64748b",
                    600: "#475569",
                    700: "#334155",
                    800: "#1e293b",
                    900: "#0f172a",
                },
            },
            fontFamily: {
                pretendard: ["Pretendard", "system-ui", "sans-serif"],
            },
            spacing: {
                18: "4.5rem",
                88: "22rem",
            },
        },
    },
    plugins: [],
};
