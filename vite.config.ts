import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 🔵 API DE PRODUCTOS (NO TOCAR)
      "/api": {
        target: "http://192.168.10.138:8087",
        changeOrigin: true,
        secure: false,
      },

      // 🟣 API DE CRÉDITOS / OPERACIONES
      "/creditos": {
        target: "http://192.168.10.138:8096",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/creditos/, "/api"),
      },
    },
  },
});
