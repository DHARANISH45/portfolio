/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6", // Blue color
        secondary: "#8b5cf6", // Purple color
        accent: "#f472b6", // Pink color for accents
      }
    },
  },
  plugins: [],
}