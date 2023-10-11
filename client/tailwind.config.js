/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'dela': ['"Dela Gothic One"', 'cursive'],
        'denk': ['"Denk One"', 'sans-serif']

      }
    },
  },
  plugins: [],
};
