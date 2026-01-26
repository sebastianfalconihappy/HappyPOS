/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      /* ======================
         KEYFRAMES
      ====================== */
      keyframes: {
        /* loader que ya tenías */
        loader: {
          "0%, 100%": { height: "16px" },
          "50%": { height: "64px" },
        },

        /* slide que ya tenías */
        slideIn: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },

        /* 👉 NUEVO: fade del fondo */
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },

        /* 👉 NUEVO: zoom + subida del modal */
        scaleIn: {
          "0%": {
            opacity: 0,
            transform: "scale(0.95) translateY(10px)",
          },
          "100%": {
            opacity: 1,
            transform: "scale(1) translateY(0)",
          },
        },

        /* 👉 NUEVO: pulso suave tipo oferta */
        pulseSoft: {
          "0%, 100%": {
            boxShadow: "0 0 0 0 rgba(59,130,246,0.4)",
          },
          "50%": {
            boxShadow: "0 0 0 6px rgba(59,130,246,0)",
          },
        },
        offerPop: {
          "0%": {
            opacity: 0,
            transform: "scale(0.85) translateY(20px)",
          },
          "60%": {
            opacity: 1,
            transform: "scale(1.05) translateY(-4px)",
          },
          "100%": {
            opacity: 1,
            transform: "scale(1) translateY(0)",
          },
        },

        confettiFall: {
          "0%": {
            transform: "translateY(-100px) rotate(0deg)",
            opacity: 0,
          },
          "10%": {
            opacity: 1,
          },
          "100%": {
            transform: "translateY(600px) rotate(360deg)",
            opacity: 0,
          },
        },
      },

      /* ======================
         ANIMATIONS
      ====================== */
      animation: {
        /* loaders existentes */
        loader1: "loader 1s ease-in-out infinite",
        loader2: "loader 1s ease-in-out infinite .15s",
        loader3: "loader 1s ease-in-out infinite .3s",

        /* slide existente */
        "slide-in": "slideIn 0.25s ease-out",

        /* 👉 NUEVAS animaciones del modal */
        fadeIn: "fadeIn 0.25s ease-out",
        scaleIn: "scaleIn 0.25s ease-out",
        pulseSoft: "pulseSoft 2s infinite",
        offerPop: "offerPop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)",
        confetti: "confettiFall 1.8s ease-out forwards",

      },
    },
  },
  plugins: [],
};
