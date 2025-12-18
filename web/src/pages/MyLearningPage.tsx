import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getEnrollments, Enrollment } from "../../../src/api/enrollmentService";
import { HiBookOpen, HiClock, HiAcademicCap } from "react-icons/hi";

export const MyLearningPage: React.FC = () => {
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadEnrollments();
  }, []);

  const loadEnrollments = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      
      if (!user.userId) {
        navigate("/login");
        return;
      }

      const data = await getEnrollments(user.userId);
      setEnrollments(data);
    } catch (err: any) {
      setError(err.message || "Failed to load enrollments");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading your courses...</p>
      </div>
    );
  }

  return (
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
                Continue your journey with {enrollments.length} enrolled {enrollments.length === 1 ? 'course' : 'courses'}
              </p>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div style={styles.errorAlert}>
            <span style={styles.errorIcon}>⚠️</span>
            {error}
          </div>
        )}

        {/* Courses Grid */}
        {enrollments.length === 0 ? (
          <div style={styles.emptyState}>
            <HiBookOpen size={64} color="#9ca3af" />
            <h2 style={styles.emptyTitle}>No courses enrolled yet</h2>
            <p style={styles.emptyText}>
              Start your learning journey by exploring our course catalog
            </p>
            <button
              style={styles.exploreButton}
              onClick={() => navigate("/")}
            >
              Explore Courses
            </button>
          </div>
        ) : (
          <div style={styles.coursesGrid}>
            {enrollments.map((enrollment) => (
              <div
                key={enrollment.id}
                style={styles.courseCard}
                onClick={() => navigate(`/course/${enrollment.course.id}`)}
              >
                <div style={styles.courseImage}>
                  <img
                    src={enrollment.course.imageUrl}
                    alt={enrollment.course.title}
                    style={styles.image}
                  />
                  <div style={styles.enrolledBadge}>
                    <HiAcademicCap size={16} />
                    <span>Enrolled</span>
                  </div>
                </div>

                <div style={styles.courseContent}>
                  <h3 style={styles.courseTitle}>{enrollment.course.title}</h3>
                  <p style={styles.courseInstructor}>
                    {enrollment.course.instructor.name}
                  </p>
                  <p style={styles.courseDescription}>
                    {enrollment.course.description}
                  </p>

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
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/course/${enrollment.course.id}`);
                      }}
                    >
                      Continue Learning →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
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
  },
  errorAlert: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "linear-gradient(135deg, #ef4444, #dc2626)",
    color: "white",
    padding: "16px 24px",
    borderRadius: "16px",
    marginBottom: "24px",
    fontSize: "15px",
    fontWeight: 500,
    boxShadow: "0 10px 30px rgba(239, 68, 68, 0.3)",
  },
  errorIcon: {
    fontSize: "20px",
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
    maxWidth: "400px",
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
  courseFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "20px",
    borderTop: "2px solid #f3f4f6",
  },
  enrolledDate: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "13px",
    color: "#6b7280",
  },
  continueButton: {
    padding: "8px 16px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s",
  },
};

// Add keyframe animation
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  [style*="courseCard"]:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
  }
  
  [style*="exploreButton"]:hover,
  [style*="continueButton"]:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(102, 126, 234, 0.4) !important;
  }
`;
document.head.appendChild(styleSheet);

export default MyLearningPage;