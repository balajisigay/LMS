import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { colors, spacing, fontSize, borderRadius } from '../styles/colors';

interface HeroSectionProps {
  onExplorePress?: () => void;
  onWatchDemoPress?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExplorePress,
  onWatchDemoPress,
}) => {
  const windowWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Left Content */}
        <View style={styles.leftContent}>
          <View style={styles.badgeContainer}>
            <Text style={styles.badge}>✨ NEW COURSES ADDED</Text>
          </View>

          <Text style={styles.title}>Unlock your potential with world-class learning.</Text>

          <Text style={styles.description}>
            Choose from 200,000+ online video courses with new additions published every month. Skills for your present (and your future)
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.exploreButton}
              onPress={onExplorePress}
            >
              <Text style={styles.exploreButtonText}>Explore Courses</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.demoButton}
              onPress={onWatchDemoPress}
            >
              <Text style={styles.playIcon}>▶</Text>
              <Text style={styles.demoButtonText}>Watch Demo</Text>
            </TouchableOpacity>
          </View>

          {/* Social Proof */}
          <View style={styles.socialProof}>
            <View style={styles.avatarGroup}>
              {[0, 1, 2].map((index) => (
                <View
                  key={index}
                  style={[
                    styles.avatar,
                    { marginLeft: index > 0 ? -spacing.md : 0 },
                  ]}
                >
                  <View
                    style={[
                      styles.avatarPlaceholder,
                      { backgroundColor: colors.primary },
                    ]}
                  />
                </View>
              ))}
            </View>
            <Text style={styles.socialProofText}>
              50k+ Students enrolled today
            </Text>
          </View>
        </View>

        {/* Right Content - Image */}
        <View style={styles.rightContent}>
          <View style={styles.imagePlaceholder}>
            <View style={styles.imageContent}>
              <Text style={styles.placeholderText}>Hero Image</Text>
              <Text style={styles.placeholderSubtext}>Two people learning</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surfaceLight,
    paddingVertical: spacing.xxl,
  },
  content: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    gap: spacing.xxl,
    alignItems: 'flex-start',
  },
  leftContent: {
    flex: 1,
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
    lineHeight: fontSize.xxxl * 1.3,
  },
  description: {
    fontSize: fontSize.md,
    color: colors.textLight,
    lineHeight: fontSize.md * 1.6,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: spacing.lg,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  exploreButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.full,
  },
  exploreButtonText: {
    color: colors.background,
    fontSize: fontSize.md,
    fontWeight: '600',
  },
  demoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  playIcon: {
    fontSize: fontSize.md,
    color: colors.primary,
  },
  demoButtonText: {
    color: colors.primary,
    fontSize: fontSize.md,
    fontWeight: '600',
  },
  socialProof: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  avatarGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
    borderWidth: 2,
    borderColor: colors.background,
    overflow: 'hidden',
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialProofText: {
    color: colors.textLight,
    fontSize: fontSize.sm,
    fontWeight: '500',
  },
  rightContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 5,
  },
  imageContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.textLight,
    marginBottom: spacing.sm,
  },
  placeholderSubtext: {
    fontSize: fontSize.md,
    color: colors.textLighter,
  },
});
