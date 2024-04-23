/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        one: "#0C2A31",
        two: "#081C21",
        three: "#396C23",
        four: "#498B2D"
      }
    },
  },
  plugins: [],
}

