import React from 'react';
import { colors, spacing, fontSize, borderRadius } from '../styles/colors';
import InstructorImage from "../assets/instructorimage.png";

interface InstructorSectionProps {
  onPress?: () => void;
}

export const InstructorSection: React.FC<InstructorSectionProps> = ({ onPress }) => {
  return (
    <section style={styles.container}>
      <div style={styles.wrapper}>
        <div style={styles.content}>

          {/* IMAGE */}
          <div style={styles.imageContainer}>
            <img
              src={InstructorImage}        // <-- Use imported image here
              alt="Instructor Team"
              style={styles.image}
            />
          </div>

          {/* TEXT CONTENT */}
          <div style={styles.textContent}>
            <h2 style={styles.title}>Become an Instructor</h2>
            <p style={styles.subtitle}>
              Instructors from around the world teach millions of learners on Lumina.
              We provide the tools and skills to teach what you love.
            </p>

            <button style={styles.button} onClick={onPress}>
              Start Teaching Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    backgroundColor: "#eef2ff",
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xxl,
  },
  wrapper: {
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    maxWidth: 1400,
    margin: "0 auto",
  },
  content: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: spacing.xxl,
    alignItems: "center",
  },

  // IMAGE
  imageContainer: {
    width: "100%",
  },
  image: {
    width: "100%",
    borderRadius: borderRadius.lg,
    objectFit: "cover",
    boxShadow: "0px 8px 24px rgba(0,0,0,0.08)",
  },

  // TEXT CONTENT
  textContent: {
    display: "flex",
    flexDirection: "column",
    gap: spacing.lg,
  },
  title: {
    fontSize: "36px",
    fontWeight: "700",
    margin: 0,
    color: colors.text,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.textLight,
    margin: 0,
    lineHeight: 1.6,
  },

  // BUTTON
  button: {
    backgroundColor: "#0c0c0c",
    color: "#fff",
    padding: "14px 28px",
    borderRadius: 50,
    border: "none",
    cursor: "pointer",
    fontSize: fontSize.md,
    fontWeight: "600",
    transition: "0.2s ease",
  },
};
