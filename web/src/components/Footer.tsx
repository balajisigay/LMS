import React from 'react';
import { colors, spacing, fontSize, borderRadius } from '../styles/colors';

export const Footer: React.FC = () => {
  const footerSections = [
    {
      title: 'Learn',
      links: ['Development', 'Business', 'Design', 'Music'],
    },
    {
      title: 'Community',
      links: ['Instructors', 'Developers', 'Data Insights'],
    },
    {
      title: 'Company',
      links: ['About', 'Contact', 'Blog'],
    },
  ];

  return (
    <footer style={styles.container}>
      {/* Footer Content */}
      <div style={styles.wrapper}>
        <div style={styles.content}>
          <div style={styles.logoSection}>
            <div style={styles.logoContainer}>
              <div style={styles.logoIcon}>
                <span style={styles.logoText}>L</span>
              </div>
              <span style={styles.logoName}>Lumina</span>
            </div>
            <p style={styles.tagline}>Building a better world through education</p>
          </div>

          <div style={styles.linksGrid}>
            {footerSections.map((section, index) => (
              <div key={index} style={styles.linkSection}>
                <h4 style={styles.linkSectionTitle}>{section.title}</h4>
                {section.links.map((link, linkIndex) => (
                  <a key={linkIndex} style={styles.link}>
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={styles.divider} />

      {/* Bottom Footer */}
      <div style={styles.wrapper}>
        <div style={styles.bottomFooter}>
          <p style={styles.copyright}>© 2025 Lumina Inc. All rights reserved.</p>
          <div style={styles.socialLinks}>
            <a style={styles.socialIcon}>𝕏</a>
            <a style={styles.socialIcon}>f</a>
            <a style={styles.socialIcon}>in</a>
            <a style={styles.socialIcon}>▶</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    backgroundColor: colors.text,
    paddingTop: spacing.xxl,
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
    gridTemplateColumns: '1fr 2fr',
    gap: spacing.xxl,
    paddingBottom: spacing.xxl,
  },
  logoSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.sm,
  },
  logoIcon: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: colors.background,
    fontSize: fontSize.lg,
    fontWeight: '700',
  },
  logoName: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.background,
  },
  tagline: {
    fontSize: fontSize.sm,
    color: colors.background,
    opacity: 0.7,
    margin: 0,
  },
  linksGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: spacing.xxl,
  },
  linkSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
  },
  linkSectionTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.background,
    marginBottom: spacing.sm,
    margin: 0,
  },
  link: {
    fontSize: fontSize.sm,
    color: colors.background,
    opacity: 0.7,
    marginBottom: spacing.sm,
    textDecoration: 'none',
    cursor: 'pointer',
    display: 'block',
    transition: 'opacity 0.2s',
  },
  divider: {
    height: 1,
    backgroundColor: colors.background,
    opacity: 0.1,
  },
  bottomFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    gap: spacing.md,
    flexWrap: 'wrap',
  },
  copyright: {
    fontSize: fontSize.sm,
    color: colors.background,
    opacity: 0.7,
    flex: 1,
    margin: 0,
  },
  socialLinks: {
    display: 'flex',
    gap: spacing.lg,
  },
  socialIcon: {
    fontSize: fontSize.md,
    color: colors.background,
    opacity: 0.7,
    fontWeight: '600',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'opacity 0.2s',
  },
};
