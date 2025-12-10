// src/AppRoutes.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { CourseDetailPage } from "./pages/CourseDetailPage";

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/course/:id" element={<CourseDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
