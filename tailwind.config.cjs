/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#005F5E",
          50: "#E6FAFA",
          100: "#CCF0F0",
          200: "#99E1E1",
          300: "#66D2D2",
          400: "#33C3C3",
          500: "#005F5E",
          600: "#005251",
          700: "#004544",
          800: "#003837",
          900: "#002B2A",
        },
        secondary: {
          DEFAULT: "#2A4365",
          50: "#EBF0F9",
          100: "#D7E1F3",
          200: "#AFC3E7",
          300: "#87A5DB",
          400: "#5F87CF",
          500: "#2A4365",
          600: "#243A58",
          700: "#1E314B",
          800: "#18283E",
          900: "#121F31",
        },
        verified: {
          DEFAULT: "#059669",
          light: "#ECFDF5",
        },
        unverified: {
          DEFAULT: "#D97706",
          light: "#FFFBEB",
        },
        background: {
          light: "#F8FAFC",
          dark: "#0F172A",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-in": "slideIn 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
