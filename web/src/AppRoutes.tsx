// src/AppRoutes.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { CourseDetailPage } from "./pages/CourseDetailPage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import MyLearningPage from "./pages/MyLearningPage";
import { ContactPage } from "./pages/ContactPage";
import { AboutPage } from "./pages/AboutPage";
import AdminRouter from './admin/AdminRouter';
import AdminCourseCRUD from "./admin/pages/AdminCourseCRUD";
import { Chatbot } from "./components/Chatbot";





export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Chatbot />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/course/:id" element={<CourseDetailPage />} />
        <Route path="/login" element={<LandingPage />} />
        <Route path="/auth" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/my-learning" element={<MyLearningPage />} />
        <Route path="/contact" element={<ContactPage />} />   {/* NEW ROUTE */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/admin/*" element={<AdminRouter />} />
        <Route path="/admin/course-crud" element={<AdminCourseCRUD />} />





      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
