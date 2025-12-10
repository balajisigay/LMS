import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { colors, spacing, fontSize, borderRadius } from '../styles/colors';

interface CategoryCardProps {
  title: string;
  instructor: string;
  students: number;
  rating: number;
  reviews: number;
  price: number;
  onPress?: () => void;
}

interface CategoriesProps {
  onCategoryPress?: (category: string) => void;
  onCoursePress?: (courseId: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  instructor,
  students,
  rating,
  reviews,
  price,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardImage}>
        <Text style={styles.cardImagePlaceholder}>Course</Text>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.cardInstructor}>{instructor}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.stars}>★ {rating}</Text>
          <Text style={styles.reviews}>({reviews})</Text>
        </View>
        <View style={styles.cardFooter}>
          <Text style={styles.students}>{students}+ Students</Text>
          <Text style={styles.price}>${price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const Categories: React.FC<CategoriesProps> = ({
  onCategoryPress,
  onCoursePress,
}) => {
  const [activeCategory, setActiveCategory] = useState('All Courses');

  const categories = [
    'All Courses',
    'Development',
    'Design',
    'Marketing',
    'IT & Software',
    'Personal Growth',
  ];

  const courses: CategoryCardProps[] = [
    {
      title: 'Complete Python Bootcamp: Go from zero to hero in Python',
      instructor: 'Dr Grady / 21 courses',
      students: 3000,
      rating: 4.8,
      reviews: 831,
      price: 14.99,
    },
    {
      title: 'The Web Developer Bootcamp',
      instructor: 'Dr Black',
      students: 2000,
      rating: 4.7,
      reviews: 1523,
      price: 24.99,
    },
    {
      title: 'UI/UX Design Masterclass: Figma to WebFlow',
      instructor: '',
      students: 1500,
      rating: 4.9,
      reviews: 756,
      price: 19.99,
    },
    {
      title: 'Financial Analysis and Investing for Beginners',
      instructor: '',
      students: 2500,
      rating: 4.8,
      reviews: 1243,
      price: 49.99,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore Top Categories</Text>
        <Text style={styles.headerSubtitle}>
          Find the right path for your career goals.
        </Text>
        <TouchableOpacity>
          <Text style={styles.viewAllLink}>View all categories →</Text>
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesScroll}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryChip,
              activeCategory === category && styles.categoryChipActive,
            ]}
            onPress={() => {
              setActiveCategory(category);
              onCategoryPress?.(category);
            }}
          >
            <Text
              style={[
                styles.categoryChipText,
                activeCategory === category && styles.categoryChipTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Courses Grid */}
      <View style={styles.coursesGrid}>
        {courses.map((course, index) => (
          <CategoryCard
            key={index}
            {...course}
            onPress={() => onCoursePress?.(`course-${index}`)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingVertical: spacing.xxl,
    gap: spacing.lg,
  },
  header: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  headerTitle: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: fontSize.sm,
    color: colors.textLight,
  },
  viewAllLink: {
    fontSize: fontSize.sm,
    color: colors.primary,
    fontWeight: '600',
    marginTop: spacing.sm,
  },
  categoriesScroll: {
    marginHorizontal: -spacing.lg,
  },
  categoriesContent: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  categoryChip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surfaceLight,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryChipActive: {
    backgroundColor: colors.text,
    borderColor: colors.text,
  },
  categoryChipText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.text,
  },
  categoryChipTextActive: {
    color: colors.background,
  },
  coursesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.lg,
    gap: spacing.lg,
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardImage: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImagePlaceholder: {
    fontSize: fontSize.md,
    color: colors.textLight,
    fontWeight: '600',
  },
  cardContent: {
    padding: spacing.md,
    gap: spacing.sm,
  },
  cardTitle: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.text,
    lineHeight: fontSize.sm * 1.4,
  },
  cardInstructor: {
    fontSize: fontSize.xs,
    color: colors.textLight,
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  stars: {
    fontSize: fontSize.sm,
    color: colors.warning,
    fontWeight: '600',
  },
  reviews: {
    fontSize: fontSize.xs,
    color: colors.textLight,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  students: {
    fontSize: fontSize.xs,
    color: colors.textLight,
  },
  price: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: colors.text,
  },
});
