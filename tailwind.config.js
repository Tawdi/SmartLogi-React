/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: 'selector', // Changed to 'selector' for manual theme toggle
    theme: {
        extend: {
            colors: {
                'background': 'rgb(var(--background)/<alpha-value>)',
                'foreground': 'rgb(var(--foreground)/<alpha-value>)',
                'primary': 'rgb(var(--primary)/<alpha-value>)',
                'card': 'rgb(var(--card)/<alpha-value>)',
            },
            animation: {
                'in': 'in 0.2s ease-out',
                'fade-in': 'fade-in 0.2s ease-out',
                'zoom-in': 'zoom-in 0.2s ease-out',
                'slide-in-right': 'slide-in-right 0.3s ease-out',
                'slide-in-left': 'slide-in-left 0.3s ease-out',
            },
            keyframes: {
                'in': {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                'fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'zoom-in': {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                'slide-in-right': {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(0)' },
                },
                'slide-in-left': {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(0)' },
                },
            },
        },
    },
    plugins: [],
}
