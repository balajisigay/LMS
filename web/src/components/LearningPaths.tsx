import React from 'react';
import { colors, spacing, fontSize, borderRadius } from '../styles/colors';

interface LearningPathsProps {
  onPathPress?: (pathId: string) => void;
}

const LearningPath: React.FC<{
  title: string;
  courses: string;
  duration: string;
  onPress?: () => void;
}> = ({ title, courses, duration, onPress }) => {
  return (
    <div style={styles.pathCard} onClick={onPress}>
      <div style={styles.pathIcon}>
        <span style={styles.pathNumber}>1</span>
      </div>
      <div style={styles.pathContent}>
        <h4 style={styles.pathTitle}>{title}</h4>
        <p style={styles.pathMeta}>{courses} • {duration}</p>
      </div>
      <span style={styles.pathArrow}>→</span>
    </div>
  );
};

export const LearningPaths: React.FC<LearningPathsProps> = ({ onPathPress }) => {
  const paths = [
    {
      title: 'Full Stack Developer Path',
      courses: '5 courses',
      duration: '240 hours',
      id: 'fullstack',
    },
    {
      title: 'Data Science Professional',
      courses: '6 courses',
      duration: '262 hours',
      id: 'datascience',
    },
  ];

  return (
    <section style={styles.container}>
      <div style={styles.wrapper}>
        <div style={styles.textContent}>
          <h2 style={styles.title}>Don't know where to start?</h2>
          <p style={styles.subtitle}>
            Our curated Learning Paths provide a step-by-step roadmap to master
            a new skill. From beginner to expert.
          </p>
        </div>

        <div style={styles.pathsContainer}>
          {paths.map((path, index) => (
            <LearningPath
              key={index}
              title={path.title}
              courses={path.courses}
              duration={path.duration}
              onPress={() => onPathPress?.(path.id)}
            />
          ))}
        </div>

        {/* Progress Widget */}
        <div style={styles.progressWidget}>
          <h4 style={styles.progressTitle}>Weekly Progress</h4>
          <div style={styles.progressBars}>
            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
              <div
                key={day}
                style={{
                  ...styles.progressBar,
                  height: `${30 + Math.random() * 70}%`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    backgroundColor: colors.text,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xxl,
  },
  wrapper: {
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    maxWidth: 1400,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.xxl,
  },
  textContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.background,
    margin: 0,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.background,
    opacity: 0.8,
    lineHeight: 1.6,
    margin: 0,
  },
  pathsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.lg,
  },
  pathCard: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.lg,
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  pathIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceLight,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  pathNumber: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.primary,
  },
  pathContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.xs,
  },
  pathTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    margin: 0,
  },
  pathMeta: {
    fontSize: fontSize.sm,
    color: colors.textLight,
    margin: 0,
  },
  pathArrow: {
    fontSize: fontSize.lg,
    color: colors.primary,
    flexShrink: 0,
  },
  progressWidget: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
  },
  progressTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    margin: 0,
  },
  progressBars: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: spacing.sm,
    height: 80,
  },
  progressBar: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.sm,
    minHeight: 4,
    transition: 'all 0.3s',
  },
};
