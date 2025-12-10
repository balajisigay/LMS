import React from 'react';
import { colors, spacing, fontSize } from '../styles/colors';

export const TrustedPartners: React.FC = () => {
  const partners = ['Google', 'Spotify', 'Airbnb', 'Amazon', 'Meta'];

  return (
    <section style={styles.container}>
      <div style={styles.wrapper}>
        <h3 style={styles.title}>TRUSTED BY INNOVATORS AT</h3>
        <div style={styles.partnersContent}>
          {partners.map((partner, index) => (
            <div key={index} style={styles.partnerItem}>
              <span style={styles.partnerName}>{partner}</span>
            </div>
          ))}
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
    borderBottom: `1px solid ${colors.border}`,
  },
  wrapper: {
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    maxWidth: 1400,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  title: {
    textAlign: 'center',
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.textLight,
    letterSpacing: 0.5,
    marginBottom: spacing.xl,
    margin: 0,
  },
  partnersContent: {
    display: 'flex',
    gap: spacing.xxl,
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  partnerItem: {
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
  },
  partnerName: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.textLighter,
  },
};
