// src/pages/CourseDetailPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseById } from "../services/courseService";
import { addToCart } from "../../../src/api/cartService";
import { Course, CourseSection, CourseLecture } from "../types/course";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { updateProgress } from "../../../src/api/learningProgressService";
import { getCurrentUser, requireAuth } from "../utils/auth";
import { checkEnrollment } from "../../../src/api/enrollmentService";

export const CourseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set([0]));
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);

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

      const user = getCurrentUser();
      if (user?.userId) {
        const enrolled = await checkEnrollment(String(user.userId), data.id);
        setIsEnrolled(enrolled);
      } else {
        setIsEnrolled(false);
      }
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

  const parseDurationToSeconds = (duration?: string): number => {
  if (!duration) return 0;
  const value = duration.trim().toLowerCase();

  if (value.includes(":")) {
    const parts = value.split(":").map((p) => Number(p));
    if (parts.length === 2 && parts.every((n) => Number.isFinite(n))) {
      return parts[0] * 60 + parts[1];
    }
    if (parts.length === 3 && parts.every((n) => Number.isFinite(n))) {
      return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }
  }

  const hourMatch = value.match(/(\d+)\s*h/);
  const minuteMatch = value.match(/(\d+)\s*m/);
  const secondMatch = value.match(/(\d+)\s*s/);

  const hours = hourMatch ? Number(hourMatch[1]) : 0;
  const minutes = minuteMatch ? Number(minuteMatch[1]) : 0;
  const seconds = secondMatch ? Number(secondMatch[1]) : 0;

  const total = hours * 3600 + minutes * 60 + seconds;
  if (total > 0) return total;

  const plainMinutes = Number(value);
  if (Number.isFinite(plainMinutes) && plainMinutes > 0) {
    return plainMinutes * 60;
  }

  return 0;
};

  const handleLectureClick = async (url: string, duration?: string) => {
    setSelectedVideo(url);
    window.scrollTo({ top: 0, behavior: "smooth" });
    try {
      const user = getCurrentUser();
      if (!user || !course) return;

      const watchedSeconds = parseDurationToSeconds(duration);
      await updateProgress(String(user.userId), course.id, watchedSeconds > 0 ? watchedSeconds : undefined);
      window.dispatchEvent(new CustomEvent("progress-updated"));
    } catch (err) {
      console.error("Failed to update progress", err);
    }
  };

  const handleAddToCart = async () => {
    if (!course) return;
    try {
      const user = requireAuth(navigate);
      if (isEnrolled) {
        alert("You already purchased this course.");
        return;
      }
      await addToCart(user.userId, course.id);
      navigate("/cart");
    } catch (err) { console.error(err); }
  };

  if (loading) return <div style={styles.loadingContainer}><div className="spinner"></div></div>;
  if (!course || error) return <div style={styles.errorContainer}>{error || "Course not found"}</div>;

  return (
    <div style={styles.pageWrapper}>
      <Header />
      
      {/* 1. Dark Hero Section - High Professionalism */}
      <section style={styles.heroSection}>
        <div style={styles.container}>
          <div style={styles.heroContent}>
            <div style={styles.badge}>{course.category}</div>
            <h1 style={styles.title}>{course.title}</h1>
            <p style={styles.subtitle}>{course.description}</p>
            
            <div style={styles.metaRow}>
              <span style={styles.rating}><span style={{color: '#FCD34D'}}>★</span> {course.rating.toFixed(1)}</span>
              <span style={styles.metaDivider}>|</span>
              <span>{course.studentCount.toLocaleString()} Students</span>
              <span style={styles.metaDivider}>|</span>
              <span>Created by <strong style={{color: '#fff'}}>Expert Instructor</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Content Area */}
      <main style={styles.container}>
        <div style={styles.mainGrid}>
          
          {/* Left Side: Video & Curriculum */}
          <div style={styles.leftCol}>
            {selectedVideo && (
              <div style={styles.videoWrapper}>
                <iframe
                  src={selectedVideo}
                  title="Course Video"
                  style={styles.videoIframe}
                  allowFullScreen
                />
              </div>
            )}

            <div style={styles.sectionHeader}>
              <h2 style={styles.subheading}>Course Content</h2>
              <span style={styles.metaText}>{course.courseSections?.length} sections • 42 lectures</span>
            </div>

            <div style={styles.curriculum}>
              {course.courseSections?.map((sec, i) => (
                <div key={i} style={styles.accordionItem}>
                  <div style={styles.accordionHeader} onClick={() => toggleSection(i)}>
                    <span style={{transform: expandedSections.has(i) ? 'rotate(90deg)' : 'rotate(0deg)', transition: '0.2s'}}>▶</span>
                    <span style={styles.accordionTitle}>{sec.title}</span>
                  </div>
                  
                  {expandedSections.has(i) && (
                    <div style={styles.lectureList}>
                      {sec.lectures?.map((lec, j) => (
                        <div 
                          key={j} 
                          style={styles.lectureRow(lec.videoUrl === selectedVideo)}
                          onClick={() => handleLectureClick(lec.videoUrl, lec.duration)}
                        >
                          <span style={styles.playIcon}>⏵</span>
                          <span style={styles.lectureTitle}>{lec.title}</span>
                          <span style={styles.lectureDuration}>{lec.duration || "00:00"}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Sticky Action Card */}
          
        
        </div>
      </main>
      <Footer />
    </div>
  );
};

// --- Professional Style Object ---
const styles: any = {
  pageWrapper: {
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    fontFamily: '"Inter", system-ui, sans-serif',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
  },
  heroSection: {
    backgroundColor: '#1c1d1f', // Professional Dark Gray
    padding: '60px 0',
    color: '#fff',
    marginBottom: '32px',
  },
  heroContent: { maxWidth: '700px' },
  badge: {
    display: 'inline-block',
    padding: '4px 12px',
    backgroundColor: '#c084fc',
    color: '#fff',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: '16px',
  },
  title: { fontSize: '36px', fontWeight: '800', marginBottom: '16px' },
  subtitle: { fontSize: '18px', color: '#d1d5db', lineHeight: '1.5', marginBottom: '24px' },
  metaRow: { display: 'flex', gap: '12px', alignItems: 'center', fontSize: '14px', color: '#9ca3af' },
  metaDivider: { color: '#4b5563' },
  rating: { color: '#f59e0b', fontWeight: '700' },
  
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 350px',
    gap: '40px',
    position: 'relative',
  },
  
  // Left Column
  videoWrapper: {
    width: '100%',
    aspectRatio: '16/9',
    backgroundColor: '#000',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
    marginBottom: '40px',
  },
  videoIframe: { width: '100%', height: '100%', border: 'none' },
  sectionHeader: { marginBottom: '24px' },
  subheading: { fontSize: '24px', fontWeight: '700', color: '#1f2937' },
  metaText: { fontSize: '14px', color: '#6b7280' },

  curriculum: { border: '1px solid #e5e7eb', borderRadius: '8px', backgroundColor: '#fff' },
  accordionItem: { borderBottom: '1px solid #e5e7eb' },
  accordionHeader: {
    padding: '16px 24px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    backgroundColor: '#f9fafb',
    fontWeight: '600',
  },
  lectureList: { backgroundColor: '#fff' },
  lectureRow: (active: boolean) => ({
    padding: '12px 24px 12px 48px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    backgroundColor: active ? '#f3f4f6' : 'transparent',
    borderBottom: '1px solid #f3f4f6',
    transition: '0.2s',
    color: active ? '#7c3aed' : '#374151',
  }),
  lectureTitle: { flex: 1, fontSize: '14px' },
  lectureDuration: { color: '#9ca3af', fontSize: '12px' },

  // Right Column (Sticky Card)
  rightCol: { position: 'relative' },
  stickyCard: {
    position: 'sticky',
    top: '24px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
    overflow: 'hidden',
    border: '1px solid #e5e7eb',
  },
  cardImage: { width: '100%', height: '200px', objectFit: 'cover' },
  cardBody: { padding: '24px' },
  priceRow: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' },
  currentPrice: { fontSize: '32px', fontWeight: '800', color: '#1f2937' },
  oldPrice: { fontSize: '16px', color: '#9ca3af', textDecoration: 'line-through' },
  primaryBtn: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#7c3aed',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '700',
    fontSize: '16px',
    cursor: 'pointer',
    marginBottom: '12px',
  },
  secondaryBtn: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#fff',
    color: '#1f2937',
    border: '1px solid #1f2937',
    borderRadius: '8px',
    fontWeight: '700',
    fontSize: '16px',
    cursor: 'pointer',
  },
  guaranteeText: { textAlign: 'center', fontSize: '12px', color: '#6b7280', marginTop: '16px' },
  includesList: { marginTop: '24px', fontSize: '14px', color: '#4b5563', lineHeight: '2' },
};

