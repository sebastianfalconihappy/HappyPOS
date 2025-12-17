import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://192.168.10.138:8087",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
