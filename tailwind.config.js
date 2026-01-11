/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#09090b",
                foreground: "#fafafa",
                primary: {
                    DEFAULT: "#8b5cf6",
                    foreground: "#ffffff",
                },
                secondary: {
                    DEFAULT: "#27272a",
                    foreground: "#fafafa",
                },
                accent: {
                    DEFAULT: "#3f3f46",
                    foreground: "#fafafa",
                },
                muted: {
                    DEFAULT: "#27272a",
                    foreground: "#a1a1aa",
                },
                card: {
                    DEFAULT: "#18181b",
                    foreground: "#fafafa",
                },
                border: "#27272a",
            },
            animation: {
                'vibrant-pulse': 'pulse-vibrant 2s infinite',
            },
            keyframes: {
                'pulse-vibrant': {
                    '0%': { transform: 'scale(0.95)', opacity: '0.5' },
                    '50%': { transform: 'scale(1.05)', opacity: '1' },
                    '100%': { transform: 'scale(0.95)', opacity: '0.5' },
                }
            }
        },
    },
    plugins: [],
}
