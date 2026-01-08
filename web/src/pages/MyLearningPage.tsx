import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiBookOpen, HiClock, HiAcademicCap, HiArrowRight } from "react-icons/hi";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { getEnrollments, Enrollment } from "../../../src/api/enrollmentService";
import { getLearningProgress, CourseProgress } from "../../../src/api/learningProgressService";
import { requireAuth } from "../utils/auth";

export const MyLearningPage: React.FC = () => {
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [progressMap, setProgressMap] = useState<Map<number, number>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadEnrollments();
  }, []);

  const loadEnrollments = async () => {
    try {
      setLoading(true);
      setError("");
      
      const user = requireAuth(navigate);
      
      console.log("✅ Authenticated user:", {
        userId: user.userId,
        email: user.email,
        fullName: user.fullName
      });
      
      // Fetch enrollments and progress in parallel
      const [enrollmentsData, progressData] = await Promise.all([
        getEnrollments(user.userId),
        getLearningProgress(String(user.userId))
      ]);
      
      console.log("✅ API Response received:", {
        enrollments: enrollmentsData.length,
        progress: progressData.length
      });
      
      // Create a map of courseId -> progress percentage
      const progressMapping = new Map<number, number>();
      progressData.forEach((p: CourseProgress) => {
        progressMapping.set(p.courseId, p.progress);
      });
      
      setEnrollments(enrollmentsData);
      setProgressMap(progressMapping);
    } catch (err: any) {
      console.error("❌ Error loading enrollments:", err);
      
      if (err.message === "Authentication required") {
        return;
      }
      
      setError(err.message || "Failed to load your courses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCourseClick = (courseId: number) => {
    navigate(`/course/${courseId}`);
  };

  const getProgressForCourse = (courseId: number): number => {
    return progressMap.get(courseId) || 0;
  };

  if (loading) {
    return (
      <>
        <Header />
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Loading your courses...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div style={styles.pageContainer}>
        <div style={styles.contentWrapper}>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.headerContent}>
              <div style={styles.headerIcon}>
                <HiAcademicCap size={32} color="white" />
              </div>
              <div>
                <h1 style={styles.title}>My Learning</h1>
                <p style={styles.subtitle}>
                  {enrollments.length === 0 
                    ? "Start your learning journey today"
                    : `Continue your journey with ${enrollments.length} enrolled ${enrollments.length === 1 ? 'course' : 'courses'}`
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div style={styles.errorAlert}>
              <span style={styles.errorIcon}>⚠️</span>
              <div style={{ flex: 1 }}>
                <div style={styles.errorTitle}>Error Loading Courses</div>
                <div style={styles.errorText}>{error}</div>
              </div>
              <button 
                style={styles.retryButton}
                onClick={loadEnrollments}
              >
                Try Again
              </button>
            </div>
          )}

          {/* Courses Grid or Empty State */}
          {!error && enrollments.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>
                <HiBookOpen size={64} />
              </div>
              <h2 style={styles.emptyTitle}>No courses enrolled yet</h2>
              <p style={styles.emptyText}>
                Discover thousands of courses and start learning something new today. 
                Build skills that will help you advance your career.
              </p>
              <button
                style={styles.exploreButton}
                onClick={() => navigate("/")}
              >
                <HiAcademicCap size={20} />
                <span>Explore Courses</span>
              </button>
            </div>
          ) : (
            <div style={styles.coursesGrid}>
              {enrollments.map((enrollment) => {
                const progress = getProgressForCourse(enrollment.course.id);
                
                return (
                  <div
                    key={enrollment.id}
                    style={styles.courseCard}
                    className="course-card"
                    onClick={() => handleCourseClick(enrollment.course.id)}
                  >
                    <div style={styles.courseImage}>
                      <img
                        src={enrollment.course.imageUrl || 'https://via.placeholder.com/400x200/667eea/ffffff?text=Course+Image'}
                        alt={enrollment.course.title}
                        style={styles.image}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200/667eea/ffffff?text=Course+Image';
                        }}
                      />
                      <div style={styles.enrolledBadge}>
                        <HiAcademicCap size={16} />
                        <span>Enrolled</span>
                      </div>
                    </div>

                    <div style={styles.courseContent}>
                      <h3 style={styles.courseTitle}>{enrollment.course.title}</h3>
                      <p style={styles.courseInstructor}>
                        By {enrollment.course.instructor?.name || 'Unknown Instructor'}
                      </p>
                      <p style={styles.courseDescription}>
                        {enrollment.course.description}
                      </p>

                      {/* Progress Bar */}
                      <div style={styles.progressSection}>
                        <div style={styles.progressHeader}>
                          <span style={styles.progressLabel}>Course Progress</span>
                          <span style={styles.progressPercent}>{progress}%</span>
                        </div>
                        <div style={styles.progressBarContainer}>
                          <div 
                            style={{
                              ...styles.progressBarFill,
                              width: `${progress}%`
                            }}
                          />
                        </div>
                        <p style={styles.progressHint}>
                          {progress === 0 
                            ? "Start watching to track your progress" 
                            : progress === 100 
                            ? "🎉 Course completed!" 
                            : "Keep going! You're making great progress"}
                        </p>
                      </div>

                      <div style={styles.courseFooter}>
                        <div style={styles.enrolledDate}>
                          <HiClock size={14} />
                          <span>
                            Enrolled {new Date(enrollment.enrolledAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                        <button
                          style={styles.continueButton}
                          className="continue-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCourseClick(enrollment.course.id);
                          }}
                        >
                          {progress === 0 ? 'Start Course' : progress === 100 ? 'Review' : 'Continue'} 
                          <HiArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

const styles: Record<string, React.CSSProperties> = {
  pageContainer: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "40px 20px",
  },
  contentWrapper: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  loadingContainer: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  spinner: {
    width: "50px",
    height: "50px",
    border: "4px solid rgba(255,255,255,0.3)",
    borderTop: "4px solid white",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  loadingText: {
    marginTop: "20px",
    fontSize: "18px",
    color: "white",
    fontWeight: 500,
  },
  header: {
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(20px)",
    borderRadius: "24px",
    padding: "32px",
    marginBottom: "32px",
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
  },
  headerContent: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  headerIcon: {
    width: "64px",
    height: "64px",
    borderRadius: "16px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 8px 20px rgba(102, 126, 234, 0.4)",
    flexShrink: 0,
  },
  title: {
    margin: 0,
    fontSize: "32px",
    fontWeight: 800,
    color: "#1f2937",
  },
  subtitle: {
    margin: "8px 0 0 0",
    fontSize: "16px",
    color: "#6b7280",
    lineHeight: 1.5,
  },
  errorAlert: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    background: "linear-gradient(135deg, #ef4444, #dc2626)",
    color: "white",
    padding: "20px 24px",
    borderRadius: "16px",
    marginBottom: "24px",
    boxShadow: "0 10px 30px rgba(239, 68, 68, 0.3)",
  },
  errorIcon: {
    fontSize: "24px",
    flexShrink: 0,
  },
  errorTitle: {
    fontSize: "16px",
    fontWeight: 700,
    marginBottom: "4px",
  },
  errorText: {
    fontSize: "14px",
    opacity: 0.9,
  },
  retryButton: {
    padding: "10px 20px",
    background: "rgba(255, 255, 255, 0.2)",
    color: "white",
    border: "2px solid white",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s",
    whiteSpace: "nowrap",
  },
  emptyState: {
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(20px)",
    borderRadius: "24px",
    padding: "80px 40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    textAlign: "center",
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
  },
  emptyIcon: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    marginBottom: "8px",
  },
  emptyTitle: {
    margin: 0,
    fontSize: "28px",
    fontWeight: 700,
    color: "#1f2937",
  },
  emptyText: {
    margin: 0,
    fontSize: "16px",
    color: "#6b7280",
    maxWidth: "500px",
    lineHeight: 1.6,
  },
  exploreButton: {
    marginTop: "8px",
    padding: "14px 32px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 8px 20px rgba(102, 126, 234, 0.3)",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  coursesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
    gap: "24px",
  },
  courseCard: {
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(20px)",
    borderRadius: "20px",
    overflow: "hidden",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
  },
  courseImage: {
    position: "relative",
    height: "200px",
    overflow: "hidden",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  enrolledBadge: {
    position: "absolute",
    top: "16px",
    right: "16px",
    background: "linear-gradient(135deg, #10b981, #059669)",
    color: "white",
    padding: "8px 16px",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "13px",
    fontWeight: 600,
    boxShadow: "0 4px 12px rgba(16, 185, 129, 0.4)",
  },
  courseContent: {
    padding: "24px",
  },
  courseTitle: {
    margin: 0,
    fontSize: "20px",
    fontWeight: 700,
    color: "#1f2937",
    marginBottom: "8px",
    lineHeight: 1.3,
  },
  courseInstructor: {
    margin: 0,
    fontSize: "14px",
    color: "#667eea",
    fontWeight: 600,
    marginBottom: "12px",
  },
  courseDescription: {
    margin: 0,
    fontSize: "14px",
    color: "#6b7280",
    lineHeight: "1.6",
    marginBottom: "20px",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  progressSection: {
    marginBottom: "20px",
    padding: "16px",
    background: "rgba(102, 126, 234, 0.05)",
    borderRadius: "12px",
    border: "1px solid rgba(102, 126, 234, 0.1)",
  },
  progressHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  progressLabel: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#4b5563",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  progressPercent: {
    fontSize: "16px",
    fontWeight: 700,
    color: "#667eea",
  },
  progressBarContainer: {
    width: "100%",
    height: "8px",
    background: "rgba(102, 126, 234, 0.15)",
    borderRadius: "999px",
    overflow: "hidden",
    marginBottom: "8px",
  },
  progressBarFill: {
    height: "100%",
    background: "linear-gradient(90deg, #667eea, #764ba2)",
    borderRadius: "999px",
    transition: "width 0.5s ease",
  },
  progressHint: {
    margin: 0,
    fontSize: "12px",
    color: "#6b7280",
    fontStyle: "italic",
  },
  courseFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "20px",
    borderTop: "2px solid #f3f4f6",
    gap: "12px",
  },
  enrolledDate: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "13px",
    color: "#6b7280",
    flexShrink: 1,
  },
  continueButton: {
    padding: "10px 20px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    whiteSpace: "nowrap",
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
  },
};

const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .course-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
  }
  
  .continue-btn:hover,
  button[style*="exploreButton"]:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(102, 126, 234, 0.4) !important;
  }
  
  button[style*="retryButton"]:hover {
    background: rgba(255, 255, 255, 0.3) !important;
  }
  
  @media (max-width: 768px) {
    div[style*="coursesGrid"] {
      grid-template-columns: 1fr !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default MyLearningPage;