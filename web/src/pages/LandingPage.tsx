// src/pages/LandingPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCourses } from "../services/courseService";
import { Course } from "../types/course";
import { Header } from "../components/Header";
import { HeroSection } from "../components/HeroSection";
import { TrustedPartners } from "../components/TrustedPartners";
import { LearningPaths } from "../components/LearningPaths";
import { Footer } from "../components/Footer";
import { Categories } from "../components/Categories";

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
  /*             CLICK COURSE                    */
  /* ------------------------------------------- */
  const handleCoursePress = async (courseId: number) => {
    navigate(`/course/${courseId}`);
  };

  return (
    <>
      <Header />

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
      <Footer />
    </>
  );
};

export default LandingPage;
