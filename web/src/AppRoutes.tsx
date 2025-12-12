// src/AppRoutes.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { CourseDetailPage } from "./pages/CourseDetailPage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";


export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/course/:id" element={<CourseDetailPage />} />
        <Route path="/login" element={<LoginPage />} />   {/* REQUIRED */}
        <Route path="/cart" element={<CartPage />} />


      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
