// src/pages/CourseDetailPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseById } from "../services/courseService";
import { addToCart } from "../../../src/api/cartService";
import { Course, CourseSection, CourseLecture, CourseReview } from "../types/course";
import { colors, spacing, fontSize, borderRadius } from "../styles/colors";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

const DEMO_USER_ID = "demoUser"; // replace later with auth user

export const CourseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set([0]));
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  useEffect(() => {
    if (id) loadCourse(id);
  }, [id]);

  const loadCourse = async (courseId: string) => {
    try {
      setLoading(true);
      const data = await getCourseById(courseId);
      setCourse(data);

      const firstVideo = data.courseSections?.[0]?.lectures?.[0]?.videoUrl;
      if (firstVideo) setSelectedVideo(firstVideo);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load course");
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (index: number) => {
    const s = new Set(expandedSections);
    s.has(index) ? s.delete(index) : s.add(index);
    setExpandedSections(s);
  };

  const handleLectureClick = (url: string) => {
    setSelectedVideo(url);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 🔥 ADD TO CART
  const handleAddToCart = async () => {
    if (!course) return;
    try {
      await addToCart(DEMO_USER_ID, course.id);
      alert("Course added to cart 🛒");
      navigate("/cart");
    } catch (err: any) {
      navigate("/cart"); // already in cart → go anyway
    }
  };

  // 🔥 BUY NOW
  const handleBuyNow = async () => {
    if (!course) return;
    try {
      await addToCart(DEMO_USER_ID, course.id);
    } catch {}
    navigate("/cart");
  };

  if (loading) return <p style={{ padding: 40 }}>Loading…</p>;
  if (!course || error)
    return <p style={{ padding: 40, color: "red" }}>{error}</p>;

  return (
    <div style={{ background: colors.background }}>
      <Header />

      {/* HEADER */}
      <div style={styles.darkHeader}>
        <h1 style={styles.courseTitle}>{course.title}</h1>
        <p style={styles.courseDescription}>{course.description}</p>
      </div>

      <div style={styles.mainContent}>
        {/* LEFT */}
        <div>
          {selectedVideo && (
            <div style={styles.videoContainer}>
              <iframe
                src={selectedVideo}
                title="Course Video"
                style={styles.videoPlayer}
                allowFullScreen
              />
            </div>
          )}

          {course.courseSections?.map((sec: CourseSection, i) => (
            <div key={i} style={styles.sectionCard}>
              <div
                style={styles.sectionHeader}
                onClick={() => toggleSection(i)}
              >
                {expandedSections.has(i) ? "▼" : "▶"} {sec.title}
              </div>

              {expandedSections.has(i) &&
                sec.lectures?.map((lec: CourseLecture, j) => (
                  <div
                    key={j}
                    style={styles.lectureRow}
                    onClick={() => handleLectureClick(lec.videoUrl)}
                  >
                    ▶ {lec.title}
                  </div>
                ))}
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <aside style={styles.rightColumn}>
          <div style={styles.priceCard}>
            <h2>₹ {course.price.toFixed(2)}</h2>

            <button
              style={styles.addToCartButton}
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>

            <button
              style={styles.buyNowButton}
              onClick={handleBuyNow}
            >
              Buy Now
            </button>

            <p style={styles.guarantee}>30-Day Money-Back Guarantee</p>
          </div>
        </aside>
      </div>

      <Footer />
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  darkHeader: {
    background: "#1c1d1f",
    color: "#fff",
    padding: 40,
  },
  courseTitle: { fontSize: 36, fontWeight: 700 },
  courseDescription: { maxWidth: 800, opacity: 0.9 },

  mainContent: {
    maxWidth: 1400,
    margin: "40px auto",
    display: "grid",
    gridTemplateColumns: "1fr 360px",
    gap: 40,
    padding: "0 24px",
  },

  videoContainer: {
    position: "relative",
    paddingBottom: "56.25%",
    marginBottom: 24,
  },
  videoPlayer: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
  },

  sectionCard: {
    border: "1px solid #ddd",
    marginBottom: 12,
  },
  sectionHeader: {
    padding: 12,
    fontWeight: 600,
    cursor: "pointer",
    background: "#f9f9f9",
  },
  lectureRow: {
    padding: "10px 16px",
    borderTop: "1px solid #eee",
    cursor: "pointer",
  },

  rightColumn: {
    position: "sticky",
    top: 80,
    height: "fit-content",
  },
  priceCard: {
    border: "1px solid #ddd",
    padding: 20,
  },
  addToCartButton: {
    width: "100%",
    padding: 12,
    background: colors.primary,
    color: "#fff",
    border: "none",
    marginBottom: 10,
    cursor: "pointer",
  },
  buyNowButton: {
    width: "100%",
    padding: 12,
    border: "1px solid #000",
    cursor: "pointer",
  },
  guarantee: {
    marginTop: 12,
    fontSize: 14,
    textAlign: "center",
  },
};
