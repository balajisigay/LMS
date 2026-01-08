// src/pages/CourseDetailPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseById } from "../services/courseService";
import { addToCart } from "../../../src/api/cartService";
import { Course, CourseSection, CourseLecture, CourseReview } from "../types/course";
import { colors, spacing, fontSize, borderRadius } from "../styles/colors";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { updateProgress } from "../../../src/api/learningProgressService";
import { getCurrentUser, requireAuth } from "../utils/auth";




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

const handleLectureClick = async (url: string) => {
  setSelectedVideo(url);
  window.scrollTo({ top: 0, behavior: "smooth" });

  try {
    const user = getCurrentUser();

    if (!user || !course) {
      console.warn("User not logged in, skipping progress update");
      return;
    }

    await updateProgress(String(user.userId), course.id);
    console.log("✅ Course progress updated for user:", user.userId);
    
    // 🔥 Dispatch custom event to notify LearningPaths component
    window.dispatchEvent(new CustomEvent("progress-updated"));
    console.log("🔔 Progress update event dispatched");
    
  } catch (err) {
    console.error("❌ Failed to update progress", err);
  }
};



  // 🔥 ADD TO CART
const handleAddToCart = async () => {
  if (!course) return;

  try {
    const user = requireAuth(navigate); // 🔐 redirects if not logged in

    await addToCart(user.userId, course.id);
    alert("Course added to cart 🛒");
    navigate("/cart");
  } catch (err) {
    console.error(err);
  }
};


  // 🔥 BUY NOW
const handleBuyNow = async () => {
  if (!course) return;

  try {
    const user = requireAuth(navigate);

    await addToCart(user.userId, course.id);
    navigate("/cart");
  } catch (err) {
    console.error(err);
  }
};

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.modernSpinner}></div>
        <p style={styles.loadingText}>Loading course details...</p>
      </div>
    );
  }

  if (!course || error) {
    return (
      <div style={styles.errorContainer}>
        <div style={styles.modernErrorCard}>
          <span style={styles.modernErrorIcon}>⚠️</span>
          <span style={styles.modernErrorText}>{error || "Course not found"}</span>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.modernPageContainer}>
      <Header />
      
      {/* Modern Hero Header */}
      <div style={styles.modernHeroHeader}>
        <div style={styles.modernHeroGradient}></div>
        <div style={styles.modernHeroContent}>
          <div style={styles.modernBreadcrumbs}>
            <span style={styles.modernBreadcrumb}>Courses</span>
            <span style={styles.modernBreadcrumbSeparator}>/</span>
            <span style={styles.modernBreadcrumbActive}>{course.category}</span>
          </div>
          <h1 style={styles.modernCourseTitle}>{course.title}</h1>
          <p style={styles.modernCourseDescription}>{course.description}</p>
          <div style={styles.modernCourseMeta}>
            <div style={styles.modernMetaItem}>
              <span style={styles.modernStarIcon}>★</span>
              <span style={styles.modernRating}>{course.rating.toFixed(1)}</span>
              <span style={styles.modernReviewCount}>(
                {course.reviewCount.toLocaleString()})</span>
            </div>
            <div style={styles.modernMetaItem}>
              <span style={styles.modernStudentsIcon}>👥</span>
              <span>{course.studentCount.toLocaleString()} students</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Main Content */}
      <div style={styles.modernMainContent}>
        <div style={styles.modernLeftColumn}>
          {/* Video Player */}
          {selectedVideo && (
            <div style={styles.modernVideoCard}>
              <div style={styles.modernVideoContainer}>
                <iframe
                  src={selectedVideo}
                  title="Course Video"
                  style={styles.modernVideoPlayer}
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* Course Sections */}
          <div style={styles.modernSectionsContainer}>
            {course.courseSections?.map((sec: CourseSection, i) => (
              <div key={i} style={styles.modernSectionCard}>
                <div
                  style={styles.modernSectionHeader}
                  onClick={() => toggleSection(i)}
                >
                  <div style={styles.modernSectionIcon}>
                    {expandedSections.has(i) ? "▼" : "▶"}
                  </div>
                  <span style={styles.modernSectionTitle}>{sec.title}</span>
                  <span style={styles.modernLectureCount}>
                    {sec.lectures?.length || 0} lectures
                  </span>
                </div>

                {expandedSections.has(i) &&
                  sec.lectures?.map((lec: CourseLecture, j) => (
                    <div
                      key={j}
                      style={styles.modernLectureRow(lec.videoUrl === selectedVideo)}
                      onClick={() => handleLectureClick(lec.videoUrl)}
                    >
                      <div style={styles.modernLectureDot}></div>
                      <span style={styles.modernLectureTitle}>{lec.title}</span>
                      <span style={styles.modernLectureDuration}>5:23</span>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>

        {/* Modern Right Column */}
        <aside style={styles.modernRightColumn}>
          <div style={styles.modernPriceCard}>
            <div style={styles.modernPriceHeader}>
              <span style={styles.modernPriceLabel}>Price</span>
              <div style={styles.modernPriceSection}>
                <span style={styles.modernCurrentPrice}>
                  ${course.price.toFixed(2)}
                </span>
                {course.originalPrice > course.price && (
                  <span style={styles.modernOriginalPrice}>
                    ${course.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            <button
              style={styles.modernAddToCartButton}
              onClick={handleAddToCart}
            >
              <span>🛒 Add to Cart</span>
            </button>

            <button
              style={styles.modernBuyNowButton}
              onClick={handleBuyNow}
            >
              <span>💳 Buy Now</span>
            </button>

            <div style={styles.modernGuaranteeSection}>
              <div style={styles.modernGuaranteeIcon}>✓</div>
              <span style={styles.modernGuaranteeText}>
                30-Day Money-Back Guarantee
              </span>
            </div>

            <div style={styles.modernInstructorCard}>
              <div style={styles.modernInstructorAvatar}></div>
              <div>
                <span style={styles.modernInstructorName}>
                  {course.instructor?.name || "Instructor"}
                </span>
                <span style={styles.modernInstructorCourses}>
                  {course.instructor?.courses || 0} courses
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <Footer />
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  // Page Container
  modernPageContainer: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    minHeight: '100vh',
  },

  // Loading & Error
  loadingContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  modernSpinner: {
    width: '60px',
    height: '60px',
    border: '4px solid rgba(255,255,255,0.3)',
    borderTop: '4px solid white',
    borderRadius: '50%',
    animation: 'modernSpin 1s linear infinite',
  },
  loadingText: {
    marginTop: '24px',
    fontSize: '18px',
    color: 'white',
    fontWeight: 500,
  },
  errorContainer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  modernErrorCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    borderRadius: '24px',
    padding: '40px 48px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    boxShadow: '0 25px 50px rgba(239, 68, 68, 0.15)',
  },
  modernErrorIcon: {
    fontSize: '28px',
  },
  modernErrorText: {
    fontSize: '18px',
    color: '#dc2626',
    fontWeight: 600,
  },

  // Hero Header
  modernHeroHeader: {
    position: 'relative',
    padding: '80px 40px',
    overflow: 'hidden',
  },
  modernHeroGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3))',
  },
  modernHeroContent: {
    position: 'relative',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  modernBreadcrumbs: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '24px',
  },
  modernBreadcrumb: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: 500,
  },
  modernBreadcrumbActive: {
    fontSize: '14px',
    color: 'white',
    fontWeight: 600,
  },
  modernBreadcrumbSeparator: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.5)',
  },
  modernCourseTitle: {
    fontSize: '48px',
    fontWeight: 800,
    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    margin: '0 0 20px 0',
    lineHeight: '1.2',
  },
  modernCourseDescription: {
    fontSize: '20px',
    color: 'rgba(255, 255, 255, 0.95)',
    lineHeight: '1.6',
    marginBottom: '32px',
    maxWidth: '800px',
  },
  modernCourseMeta: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  modernMetaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: 500,
  },
  modernStarIcon: {
    fontSize: '20px',
    color: '#fbbf24',
  },
  modernRating: {
    fontWeight: 700,
    color: 'white',
  },
  modernReviewCount: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  modernStudentsIcon: {
    fontSize: '18px',
  },

  // Main Content
  modernMainContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 40px 80px',
    display: 'grid',
    gridTemplateColumns: '1fr 380px',
    gap: '48px',
  },

  // Left Column
  modernLeftColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },

  // Video
  modernVideoCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    overflow: 'hidden',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
  },
  modernVideoContainer: {
    position: 'relative',
    paddingBottom: '56.25%',
    height: 0,
  },
  modernVideoPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: '24px',
  },

  // Sections
  modernSectionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  modernSectionCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  },
  modernSectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '24px 32px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  modernSectionIcon: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    fontWeight: 600,
  },
  modernSectionTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#1f2937',
    flex: 1,
  },
  modernLectureCount: {
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: 500,
  },
  modernLectureRow: (isActive: boolean) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '20px 32px',
    cursor: 'pointer',
    background: isActive ? 'rgba(102, 126, 234, 0.1)' : 'transparent',
    transition: 'all 0.3s ease',
    borderTop: '1px solid rgba(0, 0, 0, 0.05)',
  }),
  modernLectureDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
  },
  modernLectureTitle: {
    fontSize: '15px',
    color: '#1f2937',
    fontWeight: 500,
    flex: 1,
  },
  modernLectureDuration: {
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: 500,
  },

  // Right Column
  modernRightColumn: {
    position: 'sticky',
    top: '120px',
    height: 'fit-content',
  },
  modernPriceCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    padding: '40px 32px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
  },
  modernPriceHeader: {
    marginBottom: '32px',
  },
  modernPriceLabel: {
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '8px',
    display: 'block',
  },
  modernPriceSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '4px',
  },
  modernCurrentPrice: {
    fontSize: '36px',
    fontWeight: 800,
    background: 'linear-gradient(135deg, #10b981, #059669)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  modernOriginalPrice: {
    fontSize: '16px',
    color: '#9ca3af',
    textDecoration: 'line-through',
  },
  modernAddToCartButton: {
    width: '100%',
    padding: '18px 24px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    border: 'none',
    borderRadius: '16px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    marginBottom: '16px',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)',
  },
  modernBuyNowButton: {
    width: '100%',
    padding: '18px 24px',
    background: 'linear-gradient(135deg, #10b981, #059669)',
    color: 'white',
    border: 'none',
    borderRadius: '16px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    marginBottom: '24px',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
  },
  modernGuaranteeSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '20px',
    background: 'rgba(16, 185, 129, 0.1)',
    borderRadius: '16px',
    marginBottom: '24px',
  },
  modernGuaranteeIcon: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: '#10b981',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  modernGuaranteeText: {
    fontSize: '15px',
    color: '#1f2937',
    fontWeight: 500,
  },
  modernInstructorCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '20px',
    background: 'rgba(249, 250, 251, 0.8)',
    borderRadius: '16px',
    border: '1px solid rgba(0, 0, 0, 0.05)',
  },
  modernInstructorAvatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
  },
  modernInstructorName: {
    display: 'block',
    fontSize: '16px',
    fontWeight: 600,
    color: '#1f2937',
  },
  modernInstructorCourses: {
    fontSize: '14px',
    color: '#6b7280',
  },
};

// Add modern animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes modernSpin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .modernSectionHeader:hover {
    background: rgba(102, 126, 234, 0.05);
  }
  
  .modernAddToCartButton:hover,
  .modernBuyNowButton:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
  }
  
  .modernLectureRow:hover {
    background: rgba(102, 126, 234, 0.15) !important;
    transform: translateX(8px);
  }
`;
document.head.appendChild(styleSheet);
