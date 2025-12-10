import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { colors, spacing, fontSize, borderRadius } from '../styles/colors';

interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => {
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
    <View style={styles.container}>
      {/* Footer Content */}
      <View style={styles.content}>
        <View style={styles.logoSection}>
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon}>
              <Text style={styles.logoText}>L</Text>
            </View>
            <Text style={styles.logoName}>Lumina</Text>
          </View>
          <Text style={styles.tagline}>
            Building a better world through education
          </Text>
        </View>

        <View style={styles.linksGrid}>
          {footerSections.map((section, index) => (
            <View key={index} style={styles.linkSection}>
              <Text style={styles.linkSectionTitle}>{section.title}</Text>
              {section.links.map((link, linkIndex) => (
                <TouchableOpacity key={linkIndex}>
                  <Text style={styles.link}>{link}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Bottom Footer */}
      <View style={styles.bottomFooter}>
        <Text style={styles.copyright}>© 2025 Lumina Inc. All rights reserved.</Text>
        <View style={styles.socialLinks}>
          <TouchableOpacity>
            <Text style={styles.socialIcon}>𝕏</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.socialIcon}>f</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.socialIcon}>in</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.socialIcon}>▶</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.text,
    paddingTop: spacing.xxl,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
    gap: spacing.xxl,
  },
  logoSection: {
    gap: spacing.md,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  logoIcon: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primary,
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
  },
  linksGrid: {
    flexDirection: 'row',
    gap: spacing.xxl,
  },
  linkSection: {
    gap: spacing.md,
  },
  linkSectionTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.background,
    marginBottom: spacing.sm,
  },
  link: {
    fontSize: fontSize.sm,
    color: colors.background,
    opacity: 0.7,
    marginBottom: spacing.sm,
  },
  divider: {
    height: 1,
    backgroundColor: colors.background,
    opacity: 0.1,
  },
  bottomFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    gap: spacing.md,
  },
  copyright: {
    fontSize: fontSize.sm,
    color: colors.background,
    opacity: 0.7,
    flex: 1,
  },
  socialLinks: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  socialIcon: {
    fontSize: fontSize.md,
    color: colors.background,
    opacity: 0.7,
    fontWeight: '600',
  },
});
