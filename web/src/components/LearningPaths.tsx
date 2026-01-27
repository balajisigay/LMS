import React, { useEffect, useMemo, useState, useCallback } from "react";
import { getEnrollments, Enrollment } from "../../../src/api/enrollmentService";
import { getLearningProgress, CourseProgress } from "../../../src/api/learningProgressService";
import { requireAuth } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { 
  HiAcademicCap, 
  HiClock, 
  HiCheckCircle, 
  HiChartBar,
  HiLightningBolt,
  HiTrendingUp
} from "react-icons/hi";

/* ================= TYPES ================= */

interface LearningPathsProps {
  onPathPress?: (courseId: string) => void;
}

interface EnrichedCourse {
  id: number;
  title: string;
  progress: number;
  enrolledAt: Date;
  instructor: string;
  totalLessons?: number;
  completedLessons?: number;
  estimatedTime?: string;
  imageUrl?: string;
}

/* ------------------ LEARNING PATH CARD ------------------ */
const LearningPath: React.FC<{
  course: EnrichedCourse;
  index: number;
  onPress?: () => void;
}> = ({ course, index, onPress }) => {
  const [isHovered, setIsHovered] = useState(false);

  const accent =
    index % 3 === 0
      ? "linear-gradient(135deg, #4F46E5, #7C3AED)"
      : index % 3 === 1
      ? "linear-gradient(135deg, #EC4899, #F43F5E)"
      : "linear-gradient(135deg, #10B981, #14B8A6)";

  const glowColor =
    index % 3 === 0
      ? "rgba(79, 70, 229, 0.4)"
      : index % 3 === 1
      ? "rgba(236, 72, 153, 0.4)"
      : "rgba(16, 185, 129, 0.4)";

  const getStatusInfo = () => {
    if (course.progress === 100) {
      return { icon: <HiCheckCircle size={16} />, text: "Completed", color: "#10B981" };
    } else if (course.progress > 0) {
      return { icon: <HiLightningBolt size={16} />, text: "In Progress", color: "#F59E0B" };
    } else {
      return { icon: <HiClock size={16} />, text: "Not Started", color: "#6B7280" };
    }
  };

  const status = getStatusInfo();

  const daysSinceEnrollment = Math.floor(
    (new Date().getTime() - new Date(course.enrolledAt).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div
      style={{
        ...styles.pathCard,
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: isHovered
          ? `0 20px 40px rgba(15,23,42,0.3), 0 0 0 1px ${glowColor}`
          : "0 8px 24px rgba(15,23,42,0.2)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onPress}
    >
      {/* Course Image/Icon */}
      <div style={{ ...styles.pathIcon, backgroundImage: accent }}>
        {course.imageUrl ? (
          <img 
            src={course.imageUrl} 
            alt={course.title}
            style={styles.courseImage}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <HiAcademicCap size={28} color="white" />
        )}
        {course.progress === 100 && (
          <div style={styles.completedBadge}>
            <HiCheckCircle size={20} color="#10B981" />
          </div>
        )}
      </div>

      <div style={styles.pathContent}>
        <div style={styles.pathHeader}>
          <h4 style={styles.pathTitle}>{course.title}</h4>
          <div style={{ ...styles.statusBadge, background: `${status.color}22`, color: status.color }}>
            {status.icon}
            <span>{status.text}</span>
          </div>
        </div>

        <p style={styles.instructorName}>
          <HiAcademicCap size={14} />
          {course.instructor}
        </p>

        <div style={styles.pathMetaContainer}>
          {course.completedLessons !== undefined && course.totalLessons !== undefined && (
            <>
              <span style={styles.pathBadge}>
                {course.completedLessons}/{course.totalLessons} lessons
              </span>
              <span style={styles.pathDivider}>•</span>
            </>
          )}
          {course.estimatedTime && (
            <>
              <span style={styles.pathMeta}>
                <HiClock size={12} />
                {course.estimatedTime}
              </span>
              <span style={styles.pathDivider}>•</span>
            </>
          )}
          <span style={styles.pathMeta}>
            Enrolled {daysSinceEnrollment === 0 ? 'today' : `${daysSinceEnrollment}d ago`}
          </span>
        </div>

        {/* Progress Bar */}
        <div style={styles.progressBarContainer}>
          <div style={styles.progressBarTrack}>
            <div
              style={{
                ...styles.progressBarFill,
                width: `${course.progress}%`,
                backgroundImage: accent,
              }}
            >
              <div style={styles.progressShimmer} />
            </div>
          </div>
          <span style={styles.progressText}>{course.progress}%</span>
        </div>
      </div>

      <div style={styles.pathArrowContainer}>
        <span
          style={{
            ...styles.pathArrow,
            transform: isHovered ? "translateX(4px)" : "translateX(0)",
          }}
        >
          →
        </span>
      </div>
    </div>
  );
};

/* ------------------ WEEKLY PROGRESS ------------------ */
const WeeklyProgress: React.FC<{ courses: EnrichedCourse[] }> = ({ courses }) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Calculate weekly progress based on actual course data
  const { weeklyValues, stats } = useMemo(() => {
    // Mock weekly progress calculation - in real app, this would come from API
    const values = courses.length > 0 
      ? courses.slice(0, 7).map(c => Math.min(c.progress, 100))
      : [0, 0, 0, 0, 0, 0, 0];

    // Pad with zeros if needed
    while (values.length < 7) {
      values.push(0);
    }

    const nonZeroValues = values.filter((v) => v > 0);
    const sum = values.reduce((a, b) => a + b, 0);
    const avg = nonZeroValues.length > 0 ? Math.round(sum / nonZeroValues.length) : 0;
    const max = Math.max(...values);
    const maxIndex = values.indexOf(max);

    return {
      weeklyValues: values,
      stats: {
        avg,
        bestDay: days[maxIndex],
        maxValue: max,
        totalProgress: sum,
        activeDays: nonZeroValues.length,
      }
    };
  }, [courses]);

  const totalCourses = courses.length;
  const completedCourses = courses.filter(c => c.progress === 100).length;
  const inProgressCourses = courses.filter(c => c.progress > 0 && c.progress < 100).length;

  return (
    <div style={styles.progressWidget}>
      {/* Header with Stats */}
      <div style={styles.progressHeader}>
        <div>
          <h4 style={styles.progressTitle}>
            <HiChartBar size={24} />
            Learning Analytics
          </h4>
          <p style={styles.progressSubtitle}>
            {stats.avg > 0
              ? `Average ${stats.avg}% progress • Best: ${stats.bestDay} (${stats.maxValue}%)`
              : "Start learning to track your progress"}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statIcon}>
            <HiAcademicCap size={20} color="#4F46E5" />
          </div>
          <div>
            <div style={styles.statValue}>{totalCourses}</div>
            <div style={styles.statLabel}>Total Courses</div>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, background: "rgba(16, 185, 129, 0.15)" }}>
            <HiCheckCircle size={20} color="#10B981" />
          </div>
          <div>
            <div style={styles.statValue}>{completedCourses}</div>
            <div style={styles.statLabel}>Completed</div>
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={{ ...styles.statIcon, background: "rgba(245, 158, 11, 0.15)" }}>
            <HiTrendingUp size={20} color="#F59E0B" />
          </div>
          <div>
            <div style={styles.statValue}>{inProgressCourses}</div>
            <div style={styles.statLabel}>In Progress</div>
          </div>
        </div>
      </div>

      {/* Weekly Progress Bars */}
      <div style={styles.weeklySection}>
        <h5 style={styles.weeklySectionTitle}>Weekly Activity</h5>
        <div style={styles.progressBars}>
          {weeklyValues.map((val, i) => (
            <div
              key={i}
              style={styles.progressColumn}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {hoveredIndex === i && val > 0 && (
                <div style={styles.tooltip}>{val}%</div>
              )}
              <div style={styles.progressTrack}>
                <div
                  style={{
                    ...styles.progressBar,
                    height: `${val}%`,
                    background:
                      val > 0
                        ? "linear-gradient(180deg, #818CF8, #4F46E5)"
                        : "transparent",
                    opacity: hoveredIndex === i ? 1 : hoveredIndex !== null ? 0.5 : 1,
                  }}
                />
              </div>
              <span
                style={{
                  ...styles.label,
                  fontWeight: hoveredIndex === i ? 600 : 500,
                  color: hoveredIndex === i ? "#E0E7FF" : "#64748B",
                }}
              >
                {days[i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {totalCourses === 0 && (
        <div style={styles.emptyProgressMessage}>
          <span style={styles.emptyProgressIcon}>📊</span>
          <p style={styles.emptyProgressText}>
            Enroll in courses to start tracking your learning progress
          </p>
        </div>
      )}
    </div>
  );
};

/* ------------------ MAIN COMPONENT ------------------ */
export const LearningPaths: React.FC<LearningPathsProps> = ({ onPathPress }) => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<EnrichedCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadProgress = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const user = requireAuth(navigate);
      
      // Fetch enrollments and progress in parallel
      const [enrollmentsData, progressData] = await Promise.all([
        getEnrollments(user.userId),
        getLearningProgress(String(user.userId))
      ]);

      // Create a map of courseId -> progress percentage
      const progressMap = new Map<number, number>();
      progressData.forEach((p: CourseProgress) => {
        progressMap.set(p.courseId, p.progress);
      });

      // Enrich course data
      const enrichedCourses: EnrichedCourse[] = enrollmentsData.map((enrollment: Enrollment) => ({
        id: enrollment.course.id,
        title: enrollment.course.title,
        progress: progressMap.get(enrollment.course.id) || 0,
        enrolledAt: new Date(enrollment.enrolledAt),
        instructor: enrollment.course.instructor?.name || 'Unknown Instructor',
        imageUrl: enrollment.course.imageUrl,
        estimatedTime: '2-4 hours', // Could be calculated from course data
        totalLessons: 12, // Should come from course data
        completedLessons: Math.floor((progressMap.get(enrollment.course.id) || 0) / 100 * 12),
      }));

      // Sort by most recently enrolled
      enrichedCourses.sort((a, b) => b.enrolledAt.getTime() - a.enrolledAt.getTime());

      setCourses(enrichedCourses);
    } catch (err: any) {
      console.error("Failed to load learning progress:", err);
      
      if (err.message === "Authentication required") {
        return;
      }
      
      setError(err.message || "Failed to load progress");
      setCourses([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadProgress();

    // Set up auto-refresh every 30 seconds for real-time updates
    const interval = setInterval(() => {
      setRefreshing(true);
      loadProgress();
    }, 30000);

    return () => clearInterval(interval);
  }, [loadProgress]);

  const handleCourseClick = (courseId: number) => {
    if (onPathPress) {
      onPathPress(String(courseId));
    } else {
      navigate(`/course/${courseId}`);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadProgress();
  };

  return (
    <section style={styles.container}>
      <div style={styles.innerGradient} />

      <div style={styles.wrapper}>
        {/* LEFT SIDE */}
        <div style={styles.leftSection}>
          <div style={styles.headerSection}>
            <span style={styles.kicker}>
              <span style={styles.kickerIcon}>🎯</span>
              Your Learning Journey
              {refreshing && <span style={styles.refreshingDot} />}
            </span>
            <h2 style={styles.title}>Continue Your Progress</h2>
            <p style={styles.subtitle}>
              {courses.length > 0 
                ? `You're enrolled in ${courses.length} ${courses.length === 1 ? 'course' : 'courses'}. Keep up the great work!`
                : "Discover courses and start your learning journey today."
              }
            </p>
            {courses.length > 0 && (
              <button style={styles.refreshButton} onClick={handleRefresh}>
                <HiTrendingUp size={16} />
                Refresh Progress
              </button>
            )}
          </div>

          <div style={styles.pathsContainer}>
            {loading && (
              <div style={styles.loadingState}>
                <div style={styles.loadingSpinner} />
                <p style={styles.loadingText}>Loading your courses...</p>
              </div>
            )}

            {!loading && error && (
              <div style={styles.errorState}>
                <span style={styles.errorIcon}>⚠️</span>
                <div>
                  <p style={styles.errorText}>{error}</p>
                  <button style={styles.retryButton} onClick={loadProgress}>
                    Try Again
                  </button>
                </div>
              </div>
            )}

            {!loading && !error && courses.length === 0 && (
              <div style={styles.emptyState}>
                <span style={styles.emptyIcon}>🚀</span>
                <p style={styles.emptyText}>Ready to start learning?</p>
                <p style={styles.emptySubtext}>
                  Explore our courses and begin your journey today
                </p>
                <button 
                  style={styles.exploreButton}
                  onClick={() => navigate("/")}
                >
                  <HiAcademicCap size={20} />
                  Explore Courses
                </button>
              </div>
            )}

            {!loading &&
              !error &&
              courses.map((course, index) => (
                <LearningPath
                  key={course.id}
                  course={course}
                  index={index}
                  onPress={() => handleCourseClick(course.id)}
                />
              ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <WeeklyProgress courses={courses} />
      </div>
    </section>
  );
};

/* ------------------ STYLES ------------------ */
const styles: Record<string, React.CSSProperties> = {
  container: {
    position: "relative",
    background: "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)",
    paddingTop: 80,
    paddingBottom: 80,
    overflow: "hidden",
  },

  innerGradient: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(circle at 20% 30%, rgba(79,70,229,0.15), transparent 50%), radial-gradient(circle at 80% 20%, rgba(236,72,153,0.12), transparent 50%), radial-gradient(circle at 40% 80%, rgba(16,185,129,0.1), transparent 50%)",
    pointerEvents: "none",
  },

  wrapper: {
    position: "relative",
    maxWidth: 1400,
    margin: "0 auto",
    padding: "0 32px",
    display: "grid",
    gridTemplateColumns: "1.5fr 1fr",
    gap: 48,
    alignItems: "start",
  },

  /* LEFT */
  leftSection: {
    display: "flex",
    flexDirection: "column",
    gap: 32,
  },

  headerSection: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  kicker: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontSize: 13,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: "#A5B4FC",
    fontWeight: 700,
    background: "rgba(79,70,229,0.1)",
    padding: "8px 16px",
    borderRadius: 8,
    border: "1px solid rgba(79,70,229,0.2)",
    alignSelf: "flex-start",
  },

  kickerIcon: {
    fontSize: 16,
  },

  refreshingDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#10B981",
    animation: "pulse 2s infinite",
    marginLeft: 4,
  },

  title: {
    fontSize: 48,
    fontWeight: 800,
    background: "linear-gradient(135deg, #F9FAFB 0%, #CBD5E1 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    margin: 0,
    lineHeight: 1.2,
  },

  subtitle: {
    fontSize: 17,
    color: "#94A3B8",
    lineHeight: 1.6,
    margin: 0,
    maxWidth: 560,
  },

  refreshButton: {
    marginTop: 8,
    padding: "10px 20px",
    background: "rgba(79,70,229,0.15)",
    color: "#A5B4FC",
    border: "1px solid rgba(79,70,229,0.3)",
    borderRadius: 10,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-start",
  },

  pathsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },

  pathCard: {
    display: "flex",
    alignItems: "center",
    gap: 20,
    background: "rgba(30, 41, 59, 0.6)",
    padding: 24,
    borderRadius: 20,
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: "1px solid rgba(148,163,184,0.1)",
  },

  pathIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
    position: "relative",
    overflow: "hidden",
  },

  courseImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: 16,
  },

  completedBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    width: 24,
    height: 24,
    borderRadius: "50%",
    background: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
  },

  pathContent: {
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },

  pathHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },

  pathTitle: {
    margin: 0,
    fontSize: 18,
    color: "#F1F5F9",
    fontWeight: 600,
    letterSpacing: "-0.01em",
    flex: 1,
  },

  statusBadge: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "4px 10px",
    borderRadius: 6,
    fontSize: 12,
    fontWeight: 600,
    whiteSpace: "nowrap",
  },

  instructorName: {
    margin: 0,
    fontSize: 13,
    color: "#94A3B8",
    display: "flex",
    alignItems: "center",
    gap: 6,
  },

  pathMetaContainer: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },

  pathBadge: {
    fontSize: 12,
    color: "#A5B4FC",
    background: "rgba(79,70,229,0.15)",
    padding: "4px 10px",
    borderRadius: 6,
    fontWeight: 600,
  },

  pathMeta: {
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    gap: 4,
  },

  pathDivider: {
    color: "#475569",
    fontSize: 12,
  },

  progressBarContainer: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginTop: 4,
  },

  progressBarTrack: {
    flex: 1,
    height: 8,
    background: "rgba(30,64,175,0.25)",
    borderRadius: 999,
    overflow: "hidden",
    position: "relative",
  },

  progressBarFill: {
    height: "100%",
    borderRadius: 999,
    transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    overflow: "hidden",
  },

  progressShimmer: {
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
    animation: "shimmer 2s infinite",
  },

  progressText: {
    fontSize: 14,
    fontWeight: 700,
    color: "#A5B4FC",
    minWidth: 45,
    textAlign: "right",
  },

  pathArrowContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    borderRadius: 12,
    background: "rgba(79,70,229,0.1)",
    border: "1px solid rgba(79,70,229,0.2)",
  },

  pathArrow: {
    fontSize: 20,
    color: "#A5B4FC",
    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    display: "block",
  },

  /* RIGHT — PROGRESS WIDGET */
  progressWidget: {
    background: "rgba(30, 41, 59, 0.6)",
    borderRadius: 24,
    padding: 28,
    display: "flex",
    flexDirection: "column",
    gap: 24,
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    border: "1px solid rgba(148,163,184,0.15)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    position: "sticky",
    top: 32,
  },

  progressHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 16,
  },

  progressTitle: {
    margin: 0,
    fontSize: 20,
    fontWeight: 700,
    color: "#F9FAFB",
    letterSpacing: "-0.01em",
    display: "flex",
    alignItems: "center",
    gap: 10,
  },

  progressSubtitle: {
    margin: "6px 0 0 0",
    fontSize: 13,
    color: "#94A3B8",
    lineHeight: 1.5,
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 12,
  },

  statCard: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    background: "rgba(79,70,229,0.08)",
    padding: 12,
    borderRadius: 12,
    border: "1px solid rgba(79,70,229,0.15)",
  },

  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    background: "rgba(79,70,229,0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  statValue: {
    fontSize: 20,
    fontWeight: 700,
    color: "#F9FAFB",
    lineHeight: 1,
  },

  statLabel: {
    fontSize: 11,
    color: "#94A3B8",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginTop: 2,
  },

  weeklySection: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },

  weeklySectionTitle: {
    margin: 0,
    fontSize: 15,
    fontWeight: 600,
    color: "#CBD5E1",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  progressBars: {
    display: "flex",
    alignItems: "flex-end",
    gap: 12,
    height: 160,
  },

  progressColumn: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    position: "relative",
    cursor: "pointer",
  },

  progressTrack: {
    width: "100%",
    height: "100%",
    background: "rgba(30,58,138,0.2)",
    borderRadius: 999,
    padding: 3,
    display: "flex",
    alignItems: "flex-end",
    border: "1px solid rgba(79,70,229,0.1)",
  },

  progressBar: {
    width: "100%",
    borderRadius: 999,
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 -4px 12px rgba(79,70,229,0.3)",
  },

  label: {
    fontSize: 12,
    color: "#64748B",
    transition: "all 0.2s ease",
    fontWeight: 500,
  },

  tooltip: {
    position: "absolute",
    bottom: "calc(100% + 12px)",
    fontSize: 13,
    fontWeight: 700,
    color: "#F9FAFB",
    background: "rgba(79,70,229,0.95)",
    padding: "6px 12px",
    borderRadius: 8,
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    whiteSpace: "nowrap",
    zIndex: 10,
  },

  // States
  loadingState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 16,
    padding: 60,
  },

  loadingSpinner: {
    width: 48,
    height: 48,
    border: "4px solid rgba(165,180,252,0.2)",
    borderTop: "4px solid #A5B4FC",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },

  loadingText: {
    margin: 0,
    color: "#94A3B8",
    fontSize: 15,
    fontWeight: 500,
  },

  errorState: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    padding: 24,
    background: "rgba(239,68,68,0.1)",
    borderRadius: 16,
    border: "1px solid rgba(239,68,68,0.3)",
  },

  errorIcon: {
    fontSize: 28,
  },

  errorText: {
    margin: "0 0 8px 0",
    color: "#FCA5A5",
    fontSize: 15,
    fontWeight: 500,
  },

  retryButton: {
    background: "rgba(239,68,68,0.2)",
    color: "#FCA5A5",
    border: "1px solid rgba(239,68,68,0.4)",
    padding: "6px 14px",
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },

  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    padding: 60,
    background: "rgba(79,70,229,0.08)",
    borderRadius: 20,
    border: "1px solid rgba(165,180,252,0.2)",
  },

  emptyIcon: {
    fontSize: 56,
  },

  emptyText: {
    margin: 0,
    color: "#E0E7FF",
    fontSize: 18,
    fontWeight: 600,
  },

  emptySubtext: {
    margin: 0,
    color: "#94A3B8",
    fontSize: 14,
  },

  exploreButton: {
    marginTop: 12,
    padding: "12px 24px",
    background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
    color: "white",
    border: "none",
    borderRadius: 10,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: 8,
    boxShadow: "0 4px 12px rgba(79,70,229,0.3)",
  },

  emptyProgressMessage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    padding: 24,
    background: "rgba(79,70,229,0.08)",
    borderRadius: 16,
    border: "1px solid rgba(165,180,252,0.15)",
  },

  emptyProgressIcon: {
    fontSize: 36,
  },

  emptyProgressText: {
    margin: 0,
    color: "#94A3B8",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 1.5,
  },
};

// Animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  button[style*="refreshButton"]:hover {
    background: rgba(79,70,229,0.25) !important;
    transform: translateY(-1px);
  }

  button[style*="exploreButton"]:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(79,70,229,0.4) !important;
  }

  button[style*="retryButton"]:hover {
    background: rgba(239,68,68,0.3) !important;
  }

  @media (max-width: 1024px) {
    div[style*="wrapper"] {
      grid-template-columns: 1fr !important;
    }
  }

  @media (max-width: 768px) {
    div[style*="statsGrid"] {
      grid-template-columns: 1fr !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default LearningPaths;