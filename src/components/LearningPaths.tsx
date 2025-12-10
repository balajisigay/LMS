import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { colors, spacing, fontSize, borderRadius } from '../styles/colors';

interface LearningPathProps {
  onPress?: () => void;
}

interface LearningPathsProps {
  onPathPress?: (pathId: string) => void;
}

const LearningPath: React.FC<LearningPathProps & { title: string; courses: string; duration: string }> = ({
  title,
  courses,
  duration,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.pathCard} onPress={onPress}>
      <View style={styles.pathIcon}>
        <Text style={styles.pathNumber}>1</Text>
      </View>
      <View style={styles.pathContent}>
        <Text style={styles.pathTitle}>{title}</Text>
        <Text style={styles.pathMeta}>{courses} • {duration}</Text>
      </View>
      <Text style={styles.pathArrow}>→</Text>
    </TouchableOpacity>
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
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.textContent}>
          <Text style={styles.title}>Don't know where to start?</Text>
          <Text style={styles.subtitle}>
            Our curated Learning Paths provide a step-by-step roadmap to master
            a new skill. From beginner to expert.
          </Text>
        </View>

        <View style={styles.pathsContainer}>
          {paths.map((path, index) => (
            <LearningPath
              key={index}
              title={path.title}
              courses={path.courses}
              duration={path.duration}
              onPress={() => onPathPress?.(path.id)}
            />
          ))}
        </View>

        {/* Progress Widget */}
        <View style={styles.progressWidget}>
          <Text style={styles.progressTitle}>Weekly Progress</Text>
          <View style={styles.progressBars}>
            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
              <View
                key={day}
                style={[
                  styles.progressBar,
                  { height: `${30 + Math.random() * 70}%` },
                ]}
              />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.text,
    paddingVertical: spacing.xxl,
  },
  content: {
    paddingHorizontal: spacing.lg,
    gap: spacing.xxl,
  },
  textContent: {
    gap: spacing.md,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.background,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.background,
    opacity: 0.8,
    lineHeight: fontSize.md * 1.6,
  },
  pathsContainer: {
    gap: spacing.lg,
  },
  pathCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
  },
  pathIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pathNumber: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.primary,
  },
  pathContent: {
    flex: 1,
    gap: spacing.xs,
  },
  pathTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
  },
  pathMeta: {
    fontSize: fontSize.sm,
    color: colors.textLight,
  },
  pathArrow: {
    fontSize: fontSize.lg,
    color: colors.primary,
  },
  progressWidget: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    gap: spacing.md,
  },
  progressTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
  },
  progressBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
    height: 80,
  },
  progressBar: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.sm,
    minHeight: 4,
  },
});
