import React, { useState } from "react";
import { colors, spacing, fontSize, borderRadius } from "../styles/colors";
import { HiHeart, HiShoppingCart, HiSearch } from "react-icons/hi";

interface HeaderProps {
  onSearch?: (value: string) => void;
  onLoginPress?: () => void;
  onJoinPress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onLoginPress,
  onJoinPress,
  onSearch,
}) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchValue);
  };

  return (
    <header style={styles.container}>
      <div style={styles.content}>
        
        {/* Logo */}
        <div style={styles.logoContainer}>
          <div style={styles.logoIcon}>
            <span style={styles.logoText}>⚡</span>
          </div>
          <span style={styles.logoName}>Lumina.</span>
        </div>

        {/* ⭐ SEARCH ONLY (Categories removed) */}
        <form style={styles.searchWrapper} onSubmit={handleSubmit}>
          <HiSearch size={18} style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search for courses..."
            style={styles.searchInput}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </form>

        {/* Right Actions */}
        <div style={styles.rightActions}>
          <HiHeart size={22} style={styles.icon} />

          <div style={styles.cartContainer}>
            <HiShoppingCart size={22} style={styles.icon} />
            <div style={styles.cartBadge}>2</div>
          </div>

          <button style={styles.loginButton} onClick={onLoginPress}>
            Log in
          </button>

          <button style={styles.joinButton} onClick={onJoinPress}>
            Join for Free
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
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: 1500,
    margin: "0 auto",
    padding: `0 ${spacing.lg}px`,
    gap: spacing.lg,
  },

  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: spacing.sm,
  },
  logoIcon: {
    width: 34,
    height: 34,
    borderRadius: borderRadius.md,
    background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: { color: "white", fontSize: fontSize.lg, fontWeight: "700" },
  logoName: { fontSize: fontSize.xl, fontWeight: "600", color: colors.text },

  /* Search */
  searchWrapper: {
    flex: 1,
    position: "relative",
    display: "flex",
    maxWidth: 600,
  },
  searchIcon: {
    position: "absolute",
    left: 14,
    top: "50%",
    transform: "translateY(-50%)",
    opacity: 0.6,
  },
  searchInput: {
    width: "100%",
    padding: "10px 18px 10px 40px",
    borderRadius: borderRadius.full,
    border: `1px solid ${colors.border}`,
    fontSize: fontSize.md,
    backgroundColor: "#f9fafb",
    outline: "none",
  },

  rightActions: {
    display: "flex",
    alignItems: "center",
    gap: spacing.lg,
  },
  icon: { cursor: "pointer" },

  cartContainer: { position: "relative", cursor: "pointer" },
  cartBadge: {
    position: "absolute",
    top: "-6px",
    right: "-10px",
    backgroundColor: "#ec4899",
    color: "white",
    fontSize: "10px",
    fontWeight: "700",
    padding: "2px 6px",
    borderRadius: "50%",
  },

  loginButton: {
    background: "transparent",
    border: `1px solid ${colors.border}`,
    padding: "8px 18px",
    borderRadius: borderRadius.full,
    cursor: "pointer",
  },

  joinButton: {
    backgroundColor: "#0f172a",
    color: "white",
    padding: "10px 22px",
    borderRadius: borderRadius.full,
    border: "none",
    fontWeight: 600,
    cursor: "pointer",
  },
};
