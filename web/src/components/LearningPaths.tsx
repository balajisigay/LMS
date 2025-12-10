import React from "react";
import { colors, spacing, fontSize, borderRadius } from "../styles/colors";

interface LearningPathsProps {
  onPathPress?: (pathId: string) => void;
}

/* ------------------ LEARNING PATH CARD ------------------ */
const LearningPath: React.FC<{
  index: number;
  title: string;
  courses: string;
  duration: string;
  onPress?: () => void;
}> = ({ index, title, courses, duration, onPress }) => {
  return (
    <div style={styles.pathCard} onClick={onPress}>
      <div style={{ ...styles.pathIcon, backgroundColor: index === 0 ? "#4F46E5" : "#EC4899" }}>
        <span style={styles.pathNumber}>{index + 1}</span>
      </div>

      <div style={styles.pathContent}>
        <h4 style={styles.pathTitle}>{title}</h4>
        <p style={styles.pathMeta}>
          {courses} • {duration}
        </p>
      </div>

      <span style={styles.pathArrow}>→</span>
    </div>
  );
};

/* ------------------ WEEKLY PROGRESS WIDGET ------------------ */
const WeeklyProgress = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const values = [30, 60, 40, 80, 50, 90, 70]; // replace with real data later

  return (
    <div style={styles.progressWidget}>
      <div style={styles.progressHeader}>
        <h4 style={styles.progressTitle}>Weekly Progress</h4>
        <span style={styles.menuDots}>⋯</span>
      </div>

      <div style={styles.progressBars}>
        {values.map((val, i) => (
          <div key={i} style={styles.progressColumn}>
            <div style={{ ...styles.progressBar, height: `${val}%` }}></div>
            <span style={styles.label}>{days[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ------------------ MAIN COMPONENT ------------------ */
export const LearningPaths: React.FC<LearningPathsProps> = ({ onPathPress }) => {
  const paths = [
    { title: "Full Stack Developer Path", courses: "8 Courses", duration: "240 Hours", id: "fullstack" },
    { title: "Data Science Professional", courses: "12 Courses", duration: "340 Hours", id: "datascience" },
  ];

  return (
    <section style={styles.container}>
      <div style={styles.wrapper}>
        {/* LEFT SIDE */}
        <div style={styles.leftSection}>
          <h2 style={styles.title}>Don't know where to start?</h2>
          <p style={styles.subtitle}>
            Our curated Learning Paths provide a step-by-step roadmap to master
            a new skill, from beginner to expert.
          </p>

          <div style={styles.pathsContainer}>
            {paths.map((p, i) => (
              <LearningPath
                key={p.id}
                index={i}
                title={p.title}
                courses={p.courses}
                duration={p.duration}
                onPress={() => onPathPress?.(p.id)}
              />
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <WeeklyProgress />
      </div>
    </section>
  );
};

/* ------------------ STYLES ------------------ */
const styles: Record<string, React.CSSProperties> = {
  container: {
    backgroundColor: "#0F172A",
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xxl,
  },

  wrapper: {
    maxWidth: 1400,
    margin: "0 auto",
    padding: `0 ${spacing.lg}px`,
    display: "grid",
    gridTemplateColumns: "1fr 450px",
    gap: spacing.xxl,
  },

  /* LEFT */
  leftSection: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.xl,
  },

  title: {
    fontSize: 42,
    fontWeight: 700,
    color: "#fff",
    margin: 0,
  },

  subtitle: {
    fontSize: 18,
    color: "rgba(255,255,255,0.8)",
    lineHeight: 1.6,
    margin: 0,
  },

  pathsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.lg,
  },

  pathCard: {
    display: "flex",
    alignItems: "center",
    gap: spacing.lg,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 14,
    cursor: "pointer",
    transition: "0.2s",
  },

  pathIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },

  pathNumber: {
    color: "#fff",
    fontSize: 20,
    fontWeight: 700,
  },

  pathContent: {
    flex: 1,
  },

  pathTitle: {
    margin: 0,
    fontSize: 20,
    color: "#0F172A",
    fontWeight: 600,
  },

  pathMeta: {
    margin: 0,
    color: "#475569",
    fontSize: 14,
  },

  pathArrow: {
    fontSize: 22,
    color: "#4F46E5",
  },

  /* RIGHT — PROGRESS WIDGET */
  progressWidget: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: spacing.lg,
    display: "flex",
    flexDirection: "column",
    gap: spacing.md,
  },

  progressHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  progressTitle: {
    margin: 0,
    fontSize: 20,
    fontWeight: 600,
    color: "#0F172A",
  },

  menuDots: {
    fontSize: 24,
    cursor: "pointer",
    opacity: 0.7,
  },

  progressBars: {
    display: "flex",
    alignItems: "flex-end",
    gap: spacing.md,
    height: 160,
  },

  progressColumn: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },

  progressBar: {
    width: "100%",
    backgroundColor: "#E0E7FF",
    borderRadius: 8,
    transition: "0.3s",
  },

  label: {
    fontSize: 12,
    color: "#64748B",
  },
};
