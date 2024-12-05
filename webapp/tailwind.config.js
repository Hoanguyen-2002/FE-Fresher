/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "black-1": "#000000",
      "black-2": "#121212",
      "grey": "rgba(18, 18, 18, 0.8)",
      "blue": "#233C6B",
      "soft-red": "rgba(241, 83, 83, 0.8)",
      "red": "rgba(241, 83, 83, 1)",
      "white": "#FFFFFF",
      "custom-blue": "rgba(201, 240, 255, 0.5)",
      "custom-red": "rgba(255, 202, 202, 0.5)",
    },
    extend: {},
  },
  plugins: [],
}

