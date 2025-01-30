/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      jockey: ["Jockey One", "sans-serif"],
      poppins: ["Poppins", "sans-sarif"],
      luckiest: ["Luckiest Guy", "sans-sarif"],
      jacques: ["Jacques Francois Shadow", "serifsans-serif"],
    },
    textColor: {
      primary: "#E70612",
      secondary: "#737791",
    },
    backgroundColor: {
      primary: "#E70612",
      secondary: "#202224",
    },
  },
  plugins: [],
};
