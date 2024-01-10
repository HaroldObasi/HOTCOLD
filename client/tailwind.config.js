/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        dela: ['"Dela Gothic One"', "cursive"],
        denk: ['"Denk One"', "sans-serif"]
      }
    },
    colors: {
      black: "#000000",
      darkgray: "#363636",
      white: "#FFFFFF",
      darkblue: "#21A2FF",
      lightblue: "#A8EAFE",
      orange: "#FFB774",
      lightorange: "#FFC61D",
      gold: "#FFF500",
      graybg: "rgba(230,230,230,.6)",
      transparent: "#00000000"
    }
  },
  plugins: []
};
