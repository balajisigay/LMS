import React, { useEffect, useMemo, useState } from "react";
import { colors, spacing, fontSize, borderRadius } from "../styles/colors";
import { getLearningProgress } from "../../../src/api/learningProgressService";

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
  const [hovered, setHovered] = useState(false);
  const accent =
    index === 0
      ? "linear-gradient(135deg, #4F46E5, #6366F1)"
      : "linear-gradient(135deg, #EC4899, #F97316)";

  return (
    <div
      style={{
        ...styles.pathCard,
        boxShadow: hovered
          ? "0 18px 40px rgba(15,23,42,0.28)"
          : "0 10px 25px rgba(15,23,42,0.16)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        border: hovered
          ? "1px solid rgba(79,70,229,0.25)"
          : "1px solid #e5e7eb",
      }}
      onClick={onPress}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ ...styles.pathIcon, backgroundImage: accent }}>
        <span style={styles.pathNumber}>{index + 1}</span>
      </div>

      <div style={styles.pathContent}>
        <h4 style={styles.pathTitle}>{title}</h4>
        <p style={styles.pathMeta}>
          {courses} • {duration} • {progress}%
        </p>
      </div>

      <span style={styles.pathArrow}>→</span>
    </div>
  );
};

/* ------------------ WEEKLY PROGRESS ------------------ */
const WeeklyProgress: React.FC<{ values: number[] }> = ({ values }) => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const safeValues = values.length
    ? values.slice(0, 7)
    : [0, 0, 0, 0, 0, 0, 0];

  const { avg, bestDay } = useMemo(() => {
    const sum = safeValues.reduce((a, b) => a + b, 0);
    const avg = Math.round(sum / safeValues.length);
    const max = Math.max(...safeValues);
    const idx = safeValues.indexOf(max);
    return { avg, bestDay: days[idx] };
  }, [safeValues]);

  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <div style={styles.progressWidget}>
      <div style={styles.progressHeader}>
        <div>
          <h4 style={styles.progressTitle}>Weekly Progress</h4>
          <p style={styles.progressSubtitle}>
            Avg {avg}% completion • Best day: {bestDay}
          </p>
        </div>
        <span style={styles.menuDots}>⋯</span>
      </div>

      <div style={styles.progressBars}>
        {safeValues.map((val, i) => (
          <div
            key={i}
            style={styles.progressColumn}
            onMouseEnter={() => setHoverIndex(i)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <div style={styles.progressTrack}>
              <div
                style={{
                  ...styles.progressBar,
                  height: `${val}%`,
                  background:
                    hoverIndex === i
                      ? "linear-gradient(180deg, #4F46E5, #22C55E)"
                      : "linear-gradient(180deg, #6366F1, #4F46E5)",
                }}
              />
            </div>
            <span style={styles.label}>{days[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ------------------ MAIN COMPONENT ------------------ */
export const LearningPaths: React.FC<LearningPathsProps> = ({
  onPathPress,
}) => {
  const [courses, setCourses] = useState<CourseProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.userId) {
      setLoading(false);
      return;
    }

    getLearningProgress(user.userId)
      .then(setCourses)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const weeklyValues = useMemo(
    () => courses.map((c) => c.progress),
    [courses]
  );

  return (
    <section style={styles.container}>
      <div style={styles.innerGradient} />
      <div style={styles.wrapper}>
        {/* LEFT SIDE */}
        <div style={styles.leftSection}>
          <p style={styles.kicker}>Guided roadmaps</p>
          <h2 style={styles.title}>Don't know where to start?</h2>
          <p style={styles.subtitle}>
            Continue learning from where you stopped.
          </p>

          <div style={styles.pathsContainer}>
            {!loading && courses.length === 0 && (
              <p style={{ color: "#CBD5F5" }}>
                You have not enrolled in any courses yet.
              </p>
            )}

            {courses.map((c, i) => (
              <LearningPath
                key={c.courseId}
                index={i}
                title={c.title}
                courses="Enrolled"
                duration="In progress"
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
    background:
      "radial-gradient(circle at top left, #1D4ED8 0, #0F172A 45%, #020617 100%)",
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xxl,
    overflow: "hidden",
  },

  innerGradient: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(circle at 10% 20%, rgba(59,130,246,0.28), transparent 55%), radial-gradient(circle at 80% 10%, rgba(236,72,153,0.3), transparent 55%)",
    opacity: 0.9,
    pointerEvents: "none",
  },

  wrapper: {
    position: "relative",
    maxWidth: 1400,
    margin: "0 auto",
    padding: `0 ${spacing.lg}px`,
    display: "grid",
    gridTemplateColumns: "minmax(0,1.4fr) minmax(0,0.9fr)",
    gap: spacing.xxl,
    alignItems: "stretch",
  },

  /* LEFT */
  leftSection: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.lg,
    color: "#E5E7EB",
  },

  kicker: {
    margin: 0,
    fontSize: 13,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "rgba(148,163,184,0.9)",
    fontWeight: 600,
  },

  title: {
    fontSize: 40,
    fontWeight: 800,
    color: "#F9FAFB",
    margin: 0,
  },

  subtitle: {
    fontSize: 16,
    color: "rgba(209,213,219,0.9)",
    lineHeight: 1.7,
    margin: 0,
    maxWidth: 540,
  },

  pathsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.lg,
    marginTop: spacing.md,
  },

  pathCard: {
    display: "flex",
    alignItems: "center",
    gap: spacing.lg,
    background:
      "linear-gradient(135deg, rgba(15,23,42,0.98), rgba(15,23,42,0.94))",
    padding: 20,
    borderRadius: 18,
    cursor: "pointer",
    transition: "all 0.18s ease-out",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
  },

  pathIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    boxShadow: "0 10px 26px rgba(15,23,42,0.55)",
  },

  pathNumber: {
    color: "#fff",
    fontSize: 20,
    fontWeight: 700,
  },

  pathContent: {
    flex: 1,
    minWidth: 0,
  },

  pathTitle: {
    margin: 0,
    fontSize: 18,
    color: "#E5E7EB",
    fontWeight: 600,
  },

  pathMeta: {
    margin: "4px 0 0 0",
    color: "#9CA3AF",
    fontSize: 13,
  },

  pathArrow: {
    fontSize: 22,
    color: "#A5B4FC",
    transition: "transform 0.18s ease-out",
  },

  /* RIGHT — PROGRESS WIDGET */
  progressWidget: {
    background:
      "linear-gradient(145deg, rgba(15,23,42,0.96), rgba(15,23,42,0.98))",
    borderRadius: 22,
    padding: spacing.lg,
    display: "flex",
    flexDirection: "column",
    gap: spacing.md,
    boxShadow: "0 24px 55px rgba(15,23,42,0.8)",
    border: "1px solid rgba(148,163,184,0.25)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
  },

  progressHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: spacing.md,
  },

  progressTitle: {
    margin: 0,
    fontSize: 18,
    fontWeight: 600,
    color: "#F9FAFB",
  },

  progressSubtitle: {
    margin: "4px 0 0 0",
    fontSize: 13,
    color: "#9CA3AF",
  },

  menuDots: {
    fontSize: 22,
    cursor: "pointer",
    opacity: 0.7,
    color: "#9CA3AF",
  },

  progressBars: {
    display: "flex",
    alignItems: "flex-end",
    gap: spacing.md,
    height: 180,
    marginTop: spacing.md,
  },

  progressColumn: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },

  progressTrack: {
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(180deg, rgba(30,64,175,0.2), rgba(15,23,42,0.8))",
    borderRadius: 999,
    padding: 4,
    display: "flex",
    alignItems: "flex-end",
  },

  progressBar: {
    width: "100%",
    borderRadius: 999,
    transition: "all 0.2s ease-out",
  },

  label: {
    fontSize: 11,
    color: "#64748B",
  },

  /* Optional: basic responsiveness */
  "@media (max-width: 960px)": {} as any,
};
