import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, fontSize, borderRadius } from '../styles/colors';

interface InstructorSectionProps {
  onPress?: () => void;
}

export const InstructorSection: React.FC<InstructorSectionProps> = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.textContent}>
          <Text style={styles.title}>Become an Instructor</Text>
          <Text style={styles.subtitle}>
            Inspire millions of learners on Lumina. We provide the tools and
            skills to teach what you know.
          </Text>
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>Start Teaching Today</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.imageContainer}>
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderText}>Team Image</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingVertical: spacing.xxl,
  },
  content: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
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
    gap: spacing.lg,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.textLight,
    lineHeight: fontSize.md * 1.6,
  },
  button: {
    backgroundColor: colors.text,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: colors.background,
    fontSize: fontSize.md,
    fontWeight: '600',
  },
});
