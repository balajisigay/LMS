import React from 'react';
import { colors, spacing, fontSize, borderRadius } from '../styles/colors';

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
        <div style={styles.content}>
          {/* Left Content */}
          <div style={styles.leftContent}>
            <div style={styles.badgeContainer}>
              <span style={styles.badge}>✨ NEW COURSES ADDED</span>
            </div>

            <h1 style={styles.title}>
              Unlock your potential with world-class learning.
            </h1>

            <p style={styles.description}>
              Choose from 200,000+ online video courses with new additions
              published every month. Skills for your present (and your future)
            </p>

            <div style={styles.buttonContainer}>
              <button
                style={styles.exploreButton}
                onClick={onExplorePress}
              >
                Explore Courses
              </button>

              <button
                style={styles.demoButton}
                onClick={onWatchDemoPress}
              >
                <span style={styles.playIcon}>▶</span>
                Watch Demo
              </button>
            </div>

            {/* Social Proof */}
            <div style={styles.socialProof}>
              <div style={styles.avatarGroup}>
                {[0, 1, 2].map((index) => (
                  <div
                    key={index}
                    style={{
                      ...styles.avatar,
                      marginLeft: index > 0 ? -spacing.md : 0,
                    }}
                  >
                    <div style={styles.avatarPlaceholder} />
                  </div>
                ))}
              </div>
              <span style={styles.socialProofText}>
                50k+ Students enrolled today
              </span>
            </div>
          </div>

          {/* Right Content - Image */}
          <div style={styles.rightContent}>
            <div style={styles.imagePlaceholder}>
              <div style={styles.imageContent}>
                <p style={styles.placeholderText}>Hero Image</p>
                <p style={styles.placeholderSubtext}>Two people learning</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    backgroundColor: colors.surfaceLight,
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
    alignItems: 'flex-start',
  },
  leftContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.lg,
  },
  badgeContainer: {
    marginBottom: spacing.md,
  },
  badge: {
    color: colors.primary,
    fontSize: fontSize.sm,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: fontSize.xxxl,
    fontWeight: '700',
    color: colors.text,
    lineHeight: 1.3,
    margin: 0,
  },
  description: {
    fontSize: fontSize.md,
    color: colors.textLight,
    lineHeight: 1.6,
    margin: 0,
  },
  buttonContainer: {
    display: 'flex',
    gap: spacing.lg,
    alignItems: 'center',
    marginTop: spacing.md,
    flexWrap: 'wrap',
  },
  exploreButton: {
    backgroundColor: colors.primary,
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    borderRadius: borderRadius.full,
    color: colors.background,
    fontSize: fontSize.md,
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  demoButton: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    backgroundColor: 'transparent',
    color: colors.primary,
    fontSize: fontSize.md,
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  playIcon: {
    fontSize: fontSize.md,
  },
  socialProof: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  avatarGroup: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
    border: `2px solid ${colors.background}`,
    overflow: 'hidden',
    display: 'flex',
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.primary,
  },
  socialProofText: {
    color: colors.textLight,
    fontSize: fontSize.sm,
    fontWeight: '500',
  },
  rightContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
  },
  imageContent: {
    textAlign: 'center',
  },
  placeholderText: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.textLight,
    marginBottom: spacing.sm,
    margin: 0,
  },
  placeholderSubtext: {
    fontSize: fontSize.md,
    color: colors.textLighter,
    margin: 0,
  },
};
