/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
        "opensans-regular": ["OpensansRegular", "sans-serif"],
        "opensans-bold": ["OpensansBold", "sans-serif"],
        "opensans-light": ["OpensansLight", "sans-serif"],
      },
    },
  },
  plugins: [],
};
