/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        loader: {
          "0%, 100%": { height: "16px" },
          "50%": { height: "64px" },
        },
      },
      animation: {
        loader1: "loader 1s ease-in-out infinite",
        loader2: "loader 1s ease-in-out infinite .15s",
        loader3: "loader 1s ease-in-out infinite .3s",
      },
    },
  },
  plugins: [],
}
