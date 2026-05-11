/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0056b3",
          dark: "#004494",
          light: "#e6f0ff",
        },
        agency: {
          purple: "#6C63FF",
          dark: "#0a0a0a",
          card: "#121212",
          gray: "#1c1c1c",
        },
        secondary: {
          DEFAULT: "#f8f9fa",
          dark: "#e9ecef",
        },
        accent: {
          DEFAULT: "#ff4d4d",
          hover: "#e60000",
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in-left': 'fadeInLeft 0.5s ease-out forwards',
        'fade-in-right': 'fadeInRight 0.5s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
      },
      keyframes: {
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
