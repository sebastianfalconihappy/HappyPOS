import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../domains/auth/pages/LoginPage";
import DashboardPage from "../domains/auth/pages/DashboardPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}
