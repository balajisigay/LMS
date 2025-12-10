import React from 'react';
import { colors, spacing, fontSize, borderRadius } from '../styles/colors';

interface InstructorSectionProps {
  onPress?: () => void;
}

export const InstructorSection: React.FC<InstructorSectionProps> = ({ onPress }) => {
  return (
    <section style={styles.container}>
      <div style={styles.wrapper}>
        <div style={styles.content}>
          <div style={styles.textContent}>
            <h2 style={styles.title}>Become an Instructor</h2>
            <p style={styles.subtitle}>
              Inspire millions of learners on Lumina. We provide the tools and
              skills to teach what you know.
            </p>
            <button style={styles.button} onClick={onPress}>
              Start Teaching Today
            </button>
          </div>

          <div style={styles.imageContainer}>
            <div style={styles.imagePlaceholder}>
              <span style={styles.placeholderText}>Team Image</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    backgroundColor: colors.background,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xxl,
  },
  wrapper: {
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    maxWidth: 1400,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: spacing.xxl,
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  imagePlaceholder: {
    width: '100%',
    aspectRatio: 1.2,
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.lg,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  placeholderText: {
    fontSize: fontSize.md,
    color: colors.textLight,
    fontWeight: '600',
  },
  textContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.lg,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.text,
    margin: 0,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.textLight,
    lineHeight: 1.6,
    margin: 0,
  },
  button: {
    backgroundColor: colors.text,
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    borderRadius: borderRadius.md,
    color: colors.background,
    fontSize: fontSize.md,
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    alignSelf: 'flex-start',
    transition: 'all 0.2s',
  },
};
