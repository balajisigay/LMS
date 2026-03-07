// src/pages/LandingPage.tsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  const location = useLocation();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /* ------------------------------------------- */
  /*             LOAD COURSES                    */
  /* ------------------------------------------- */
  useEffect(() => void loadCourses(), []);

  useEffect(() => {
    if (location.hash === "#explore-courses") {
      const section = document.getElementById("explore-courses");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location.hash]);

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
        onExplorePress={() => navigate("/#explore-courses")}
        onWatchDemoPress={() => navigate("/#explore-courses")}
      />

      <TrustedPartners />

      <div id="explore-courses">
        <Categories
          courses={courses}
          loading={loading}
          error={error}
          onCategoryPress={(cat) => console.log("category", cat)}
          onCoursePress={handleCoursePress}
          onRetry={loadCourses}
        />
      </div>

      <LearningPaths onPathPress={(id) => console.log("path:", id)} />
      <Footer />
    </>
  );
};

export default LandingPage;
