import axios from "axios";

export const apiClient = axios.create({
  baseURL: "/api",
  headers: {
    API_KEY: import.meta.env.VITE_API_KEY,
  },
});
