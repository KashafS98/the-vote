/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1200px",
      xl: "1440px",
    },
    fontFamily: {
      sans: ["Raleway", "sans-serif"],
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      colors: {
        primary: "#7e5bef",
        blue: "#1fb6ff",
        purple: "#7e5bef",
        grey: "#87809d",
        pink: "#ff49db",
        orange: "#ff7849",
        green: "#13ce66",
        yellow: "#ffc82c",
      },
    },
    safelist: [
      "bg-purple",
      "text-white",
      // any other conditional classes
    ],
  },
  plugins: [],
};
