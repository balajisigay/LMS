// src/pages/LandingPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCourses } from "../services/courseService";
import { Course } from "../types/course";
import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { TrustedPartners } from "../components/TrustedPartners";
import { LearningPaths } from "../components/LearningPaths";
import { InstructorSection } from "../components/InstructorSection";
import { Footer } from "../components/Footer";
import { Categories } from "../components/Categories";
import { addToCart, getCart } from "../../../src/api/cartService";
import { getCurrentUser, isAuthenticated, requireAuth } from "../utils/auth";

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 🔥 cart count state
  const [cartCount, setCartCount] = useState(0);
  const [userId, setUserId] = useState<number | null>(null);

  /* ------------------------------------------- */
  /*           CHECK AUTH & LOAD USER            */
  /* ------------------------------------------- */
  useEffect(() => {
    try {
      if (isAuthenticated()) {
        const user = getCurrentUser();
        if (user) {
          setUserId(user.userId);
        }
      }
    } catch (err) {
      // User not logged in - cart will be unavailable
      setUserId(null);
    }
  }, []);

  /* ------------------------------------------- */
  /*             LOAD COURSES                    */
  /* ------------------------------------------- */
  useEffect(() => void loadCourses(), []);

  const loadCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllCourses();
      setCourses(data);
    } catch (err: any) {
      setError(err?.message ?? "Failed to load courses");
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  /* ------------------------------------------- */
  /*             LOAD CART COUNT                 */
  /* ------------------------------------------- */
  useEffect(() => {
    if (!userId) return;

    const loadCart = async () => {
      try {
        const res = await getCart(userId);
        setCartCount(res.data.length);
      } catch (err) {
        console.error("Failed to fetch cart");
        setCartCount(0);
      }
    };
    loadCart();
  }, [userId]);

  /* ------------------------------------------- */
  /*     CLICK COURSE → ADD TO CART + NAV        */
  /* ------------------------------------------- */
  const handleCoursePress = async (courseId: number) => {
    if (!userId) {
      navigate("/login");
      return;
    }

    try {
      await addToCart(userId, courseId);

      // update cart badge instantly
      setCartCount((prev) => prev + 1);

      navigate("/cart");
    } catch (err) {
      console.error("Add to cart failed", err);
    }
  };

  return (
    <>
      {/* 🔥 Pass cartCount to Header (0 if not logged in) */}
      <Header
        cartCount={userId ? cartCount : 0}
        onLoginPress={() => navigate("/login")}
        onJoinPress={() => navigate("/register")}
      />

      <HeroSection
        onExplorePress={() => navigate("/courses")}
        onWatchDemoPress={() => navigate("/demo")}
      />

      <TrustedPartners />

      <Categories
        courses={courses}
        loading={loading}
        error={error}
        onCategoryPress={(cat) => console.log("category", cat)}
        onCoursePress={handleCoursePress}
        onRetry={loadCourses}
      />

      <LearningPaths onPathPress={(id) => console.log("path:", id)} />
      <InstructorSection onPress={() => navigate("/teach")} />
      <Footer />
    </>
  );
};

export default LandingPage;
