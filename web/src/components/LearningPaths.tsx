import React, { useEffect, useMemo, useState, useCallback } from "react";

/* ================= TYPES ================= */

interface LearningPathsProps {
  onPathPress?: (courseId: string) => void;
}

interface CourseProgress {
  courseId: number;
  title: string;
  progress: number;
}

/* ------------------ LEARNING PATH CARD ------------------ */
const LearningPath: React.FC<{
  index: number;
  title: string;
  courses: string;
  duration: string;
  progress: number;
  onPress?: () => void;
}> = ({ index, title, courses, duration, progress, onPress }) => {
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
      <div style={{ ...styles.pathIcon, backgroundImage: accent }}>
        <span style={styles.pathNumber}>{index + 1}</span>
      </div>

      <div style={styles.pathContent}>
        <h4 style={styles.pathTitle}>{title}</h4>
        <div style={styles.pathMetaContainer}>
          <span style={styles.pathBadge}>{courses}</span>
          <span style={styles.pathDivider}>•</span>
          <span style={styles.pathStatus}>{duration}</span>
        </div>

        {/* Progress Bar */}
        <div style={styles.progressBarContainer}>
          <div style={styles.progressBarTrack}>
            <div
              style={{
                ...styles.progressBarFill,
                width: `${progress}%`,
                backgroundImage: accent,
              }}
            >
              <div style={styles.progressShimmer} />
            </div>
          </div>
          <span style={styles.progressText}>{progress}%</span>
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
const WeeklyProgress: React.FC<{ values: number[] }> = ({ values }) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const safeValues = useMemo(() => {
    if (values.length === 0) return [0, 0, 0, 0, 0, 0, 0];

    const paddedValues = [...values.slice(0, 7)];
    while (paddedValues.length < 7) {
      paddedValues.push(0);
    }
    return paddedValues;
  }, [values]);

  const { avg, bestDay, maxValue, totalProgress } = useMemo(() => {
    const nonZeroValues = safeValues.filter((v) => v > 0);
    const sum = safeValues.reduce((a, b) => a + b, 0);
    const avg = nonZeroValues.length > 0 ? Math.round(sum / nonZeroValues.length) : 0;
    const max = Math.max(...safeValues);
    const idx = safeValues.indexOf(max);
    return { avg, bestDay: days[idx], maxValue: max, totalProgress: sum };
  }, [safeValues]);

  return (
    <div style={styles.progressWidget}>
      <div style={styles.progressHeader}>
        <div>
          <h4 style={styles.progressTitle}>Weekly Progress</h4>
          <p style={styles.progressSubtitle}>
            {avg > 0
              ? `Average ${avg}% • Best: ${bestDay} (${maxValue}%)`
              : "Start learning to track your progress"}
          </p>
        </div>
        {totalProgress > 0 && (
          <div style={styles.statsChip}>
            <span style={styles.statsNumber}>{totalProgress}</span>
            <span style={styles.statsLabel}>pts</span>
          </div>
        )}
      </div>

      <div style={styles.progressBars}>
        {safeValues.map((val, i) => (
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

      {avg === 0 && (
        <div style={styles.emptyProgressMessage}>
          <span style={styles.emptyProgressIcon}>📊</span>
          <p style={styles.emptyProgressText}>
            Your weekly progress will appear here once you start learning
          </p>
        </div>
      )}
    </div>
  );
};

/* ------------------ MAIN COMPONENT ------------------ */
export const LearningPaths: React.FC<LearningPathsProps> = ({ onPathPress }) => {
  const [courses, setCourses] = useState<CourseProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock data for demonstration
  const mockCourses: CourseProgress[] = [
    { courseId: 1, title: "React Fundamentals & Hooks", progress: 75 },
    { courseId: 2, title: "Advanced TypeScript Patterns", progress: 45 },
    { courseId: 3, title: "Full-Stack Development", progress: 30 },
  ];

  const loadProgress = useCallback(async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCourses(mockCourses);
      setError(null);
    } catch (err) {
      console.error("Failed to load learning progress", err);
      setError("Failed to load progress");
      setCourses([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  const weeklyValues = useMemo(() => courses.map((c) => c.progress), [courses]);

  return (
    <section style={styles.container}>
      <div style={styles.innerGradient} />

      <div style={styles.wrapper}>
        {/* LEFT SIDE */}
        <div style={styles.leftSection}>
          <div style={styles.headerSection}>
            <span style={styles.kicker}>
              <span style={styles.kickerIcon}>🎯</span>
              Guided Learning Paths
            </span>
            <h2 style={styles.title}>Continue Your Journey</h2>
            <p style={styles.subtitle}>
              Pick up right where you left off and keep building your skills with
              personalized learning paths.
            </p>
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
              </div>
            )}

            {!loading &&
              !error &&
              courses.map((c, i) => (
                <LearningPath
                  key={c.courseId}
                  index={i}
                  title={c.title}
                  courses="Enrolled"
                  duration={c.progress === 100 ? "✓ Completed" : "In Progress"}
                  progress={c.progress}
                  onPress={() => onPathPress?.(String(c.courseId))}
                />
              ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <WeeklyProgress values={weeklyValues} />
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
    width: 56,
    height: 56,
    borderRadius: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
    position: "relative",
    overflow: "hidden",
  },

  pathNumber: {
    color: "#fff",
    fontSize: 22,
    fontWeight: 700,
    position: "relative",
    zIndex: 1,
  },

  pathContent: {
    flex: 1,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },

  pathTitle: {
    margin: 0,
    fontSize: 18,
    color: "#F1F5F9",
    fontWeight: 600,
    letterSpacing: "-0.01em",
  },

  pathMetaContainer: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },

  pathBadge: {
    fontSize: 12,
    color: "#A5B4FC",
    background: "rgba(79,70,229,0.15)",
    padding: "4px 10px",
    borderRadius: 6,
    fontWeight: 600,
  },

  pathDivider: {
    color: "#475569",
  },

  pathStatus: {
    fontSize: 13,
    color: "#94A3B8",
    fontWeight: 500,
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
  },

  progressSubtitle: {
    margin: "6px 0 0 0",
    fontSize: 13,
    color: "#94A3B8",
    lineHeight: 1.5,
  },

  statsChip: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "rgba(79,70,229,0.15)",
    padding: "8px 16px",
    borderRadius: 12,
    border: "1px solid rgba(79,70,229,0.3)",
  },

  statsNumber: {
    fontSize: 20,
    fontWeight: 700,
    color: "#A5B4FC",
    lineHeight: 1,
  },

  statsLabel: {
    fontSize: 10,
    color: "#94A3B8",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginTop: 2,
  },

  progressBars: {
    display: "flex",
    alignItems: "flex-end",
    gap: 12,
    height: 200,
    marginTop: 8,
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

  emptyProgressMessage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    padding: 24,
    marginTop: 16,
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
`;
document.head.appendChild(styleSheet);

export default LearningPaths;