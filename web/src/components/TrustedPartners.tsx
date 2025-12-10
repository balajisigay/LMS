import React from "react";
import { colors, spacing, fontSize } from "../styles/colors";
import {
  FaGoogle,
  FaSpotify,
  FaAirbnb,
  FaAmazon,
  FaMeta,
} from "react-icons/fa6"; // Make sure you install react-icons

export const TrustedPartners: React.FC = () => {
  const partners = [
    { name: "Google", icon: <FaGoogle size={28} /> },
    { name: "Spotify", icon: <FaSpotify size={28} /> },
    { name: "Airbnb", icon: <FaAirbnb size={28} /> },
    { name: "Amazon", icon: <FaAmazon size={28} /> },
    { name: "Meta", icon: <FaMeta size={28} /> },
  ];

  return (
    <section style={styles.container}>
      <div style={styles.wrapper}>
        <h3 style={styles.title}>TRUSTED BY INNOVATORS AT</h3>

        <div style={styles.partnersContent}>
          {partners.map((item, index) => (
            <div key={index} style={styles.partnerItem}>
              <div style={styles.icon}>{item.icon}</div>
              <span style={styles.partnerName}>{item.name}</span>
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
  },
  wrapper: {
    paddingLeft: spacing.lg,
    paddingRight: spacing.lg,
    maxWidth: 1400,
    marginLeft: "auto",
    marginRight: "auto",
  },
  title: {
    textAlign: "center",
    fontSize: fontSize.sm,
    fontWeight: 600,
    color: colors.textLight,
    letterSpacing: 1,
    marginBottom: spacing.xl,
  },
  partnersContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.xxl,
    flexWrap: "wrap",
  },
  partnerItem: {
    display: "flex",
    alignItems: "center",
    gap: spacing.sm,
    opacity: 0.65,
  },
  icon: {
    display: "flex",
    alignItems: "center",
  },
  partnerName: {
    fontSize: fontSize.md,
    fontWeight: 600,
    color: colors.textLighter,
  },
};
