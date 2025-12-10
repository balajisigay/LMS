import React from 'react';
import { colors, spacing, fontSize, borderRadius } from '../styles/colors';

interface HeaderProps {
  onLoginPress?: () => void;
  onJoinPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onLoginPress,
  onJoinPress,
}) => {
  return (
    <header style={styles.container}>
      <div style={styles.content}>
        {/* Logo */}
        <div style={styles.logoContainer}>
          <div style={styles.logoIcon}>
            <span style={styles.logoText}>L</span>
          </div>
          <span style={styles.logoName}>Lumina</span>
        </div>

        {/* Right Actions */}
        <div style={styles.rightActions}>
          <button
            style={styles.loginButton}
            onClick={onLoginPress}
          >
            Log in
          </button>
          <button
            style={styles.joinButton}
            onClick={onJoinPress}
          >
            Join for free
          </button>
        </div>
      </div>
    </header>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    backgroundColor: colors.background,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    borderBottom: `1px solid ${colors.border}`,
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    maxWidth: 1400,
    marginLeft: 'auto',
    marginRight: 'auto',
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
    color: colors.text,
  },
  rightActions: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.lg,
  },
  loginButton: {
    background: 'none',
    border: 'none',
    color: colors.text,
    fontSize: fontSize.md,
    fontWeight: '500',
    cursor: 'pointer',
    padding: 0,
    transition: 'opacity 0.2s',
  },
  joinButton: {
    backgroundColor: colors.text,
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
    borderRadius: borderRadius.full,
    color: colors.background,
    fontSize: fontSize.md,
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    transition: 'opacity 0.2s',
  },
};
