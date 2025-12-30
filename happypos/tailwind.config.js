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
        slideIn: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
      animation: {
        loader1: "loader 1s ease-in-out infinite",
        loader2: "loader 1s ease-in-out infinite .15s",
        loader3: "loader 1s ease-in-out infinite .3s",

         "slide-in": "slideIn 0.25s ease-out",
      },
    },
  },
  plugins: [],
}
