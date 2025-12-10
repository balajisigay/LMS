import React from "react";
import { colors, spacing, fontSize, borderRadius } from "../styles/colors";

interface HeroSectionProps {
  onExplorePress?: () => void;
  onWatchDemoPress?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExplorePress,
  onWatchDemoPress,
}) => {
  return (
    <section style={styles.container}>
      <div style={styles.wrapper}>
        <div style={styles.grid}>
          {/* --------------------- LEFT CONTENT --------------------- */}
          <div style={styles.left}>
            {/* Badge */}
            <div style={styles.badge}>
              <span style={styles.badgeDot}></span>
              NEW COURSES ADDED
            </div>

            {/* Title */}
            <h1 style={styles.title}>
              Unlock your potential with world-class learning.
            </h1>

            {/* Description */}
            <p style={styles.description}>
              Choose from 200,000+ online video courses with new additions
              published every month. Skills for your present (and your future).
            </p>

            {/* Buttons */}
            <div style={styles.buttonRow}>
              <button style={styles.primaryBtn} onClick={onExplorePress}>
                Explore Courses
              </button>

              <button style={styles.secondaryBtn} onClick={onWatchDemoPress}>
                <span style={styles.playIcon}>▶</span> Watch Demo
              </button>
            </div>

            {/* Floating Student Badge */}
            <div style={styles.studentCard}>
              <div style={styles.avatars}>
                {[0, 1, 2].map((i) => (
                  <div key={i} style={styles.avatarCircle} />
                ))}
              </div>
              <span style={styles.studentText}>10k+ Students enrolled today</span>
            </div>
          </div>

          {/* --------------------- RIGHT CONTENT --------------------- */}
          <div style={styles.right}>
            <img
              src="/assets/hero-image.jpg"
              alt="Students learning"
              style={styles.heroImage}
            />

            {/* Floating Course Card */}
            <div style={styles.courseCard}>
              <div style={styles.courseHeader}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1822/1822899.png"
                  style={styles.courseIcon}
                />
                <span style={styles.courseTitle}>Python Master</span>
              </div>

              <div style={styles.progressBar}>
                <div style={styles.progressFill}></div>
              </div>

              <span style={styles.progressText}>75% Complete</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* --------------------- STYLES --------------------- */

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: "100%",
    paddingTop: 80,
    paddingBottom: 80,
    background: "linear-gradient(120deg,#f8e7ff,#e7f0ff,#f6e9ff)",
    overflow: "hidden",
  },
  wrapper: {
    maxWidth: 1400,
    margin: "0 auto",
    padding: "0 40px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    alignItems: "center",
    gap: 50,
  },

  /* ---------------- LEFT ---------------- */
  left: {
    position: "relative",
  },

  badge: {
    display: "inline-flex",
    alignItems: "center",
    background: "#ffffffaa",
    padding: "6px 14px",
    borderRadius: 20,
    fontSize: 13,
    fontWeight: 600,
    backdropFilter: "blur(6px)",
  },
  badgeDot: {
    width: 8,
    height: 8,
    background: "#4CAF50",
    borderRadius: "50%",
    marginRight: 8,
  },

  title: {
    fontSize: 52,
    lineHeight: 1.2,
    fontWeight: 700,
    color: "#0e0f20",
    marginTop: 20,
    marginBottom: 10,
  },

  description: {
    fontSize: 18,
    color: "#555",
    marginBottom: 30,
    lineHeight: 1.6,
  },

  buttonRow: {
    display: "flex",
    gap: 20,
    marginBottom: 40,
  },

  primaryBtn: {
    background: "#4b47ff",
    color: "#fff",
    padding: "14px 28px",
    borderRadius: 40,
    border: "none",
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
  },

  secondaryBtn: {
    background: "#fff",
    padding: "14px 28px",
    borderRadius: 40,
    border: "1px solid #ccc",
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 8,
  },

  playIcon: {
    fontSize: 16,
  },

  studentCard: {
    display: "flex",
    alignItems: "center",
    background: "#fff",
    padding: "10px 18px",
    borderRadius: 18,
    width: "fit-content",
    boxShadow: "0 6px 14px rgba(0,0,0,0.08)",
  },
  avatars: {
    display: "flex",
    marginRight: 10,
  },
  avatarCircle: {
    width: 28,
    height: 28,
    background: "#bbb",
    borderRadius: "50%",
    marginLeft: -6,
    border: "2px solid #fff",
  },
  studentText: {
    color: "#444",
    fontSize: 14,
    fontWeight: 600,
  },

  /* ---------------- RIGHT ---------------- */
  right: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
  },

  heroImage: {
    width: "100%",
    borderRadius: 24,
    objectFit: "cover",
    boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
  },

  /* Floating Course Card */
  courseCard: {
    position: "absolute",
    top: -25,
    right: -20,
    background: "#fff",
    padding: 16,
    borderRadius: 16,
    width: 220,
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  },

  courseHeader: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  courseIcon: {
    width: 26,
    height: 26,
  },
  courseTitle: {
    fontSize: 15,
    fontWeight: 700,
  },

  progressBar: {
    width: "100%",
    height: 6,
    background: "#eee",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    width: "75%",
    height: "100%",
    background: "#4b47ff",
  },
  progressText: {
    fontSize: 13,
    marginTop: 6,
    fontWeight: 600,
    color: "#666",
  },
};
