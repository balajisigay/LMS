import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { colors, spacing, fontSize, borderRadius } from '../styles/colors';

interface CourseDetailScreenProps {
  courseId?: string;
  onBack?: () => void;
}

export const CourseDetailScreen: React.FC<CourseDetailScreenProps> = ({ onBack }) => {
  const [selectedSection, setSelectedSection] = useState('overview');
  const [expandedSectionIndex, setExpandedSectionIndex] = useState<number | null>(null);

  // Sample course data
  const course = {
    id: '1',
    category: 'Development',
    subcategory: 'Python',
    title: '2024 Complete Python Bootcamp: From Zero to Hero in Python',
    badge: 'BESTSELLER',
    rating: 4.8,
    reviewCount: 984252,
    studentCount: 453763,
    instructor: {
      name: 'Dr. Angela Yu',
      title: 'Developer and Lead Instructor',
      rating: 4.7,
      students: 2214000,
      courses: 7,
      bio: 'I\'m Angela. I\'m a developer with a passion for teaching.',
    },
    price: 14.99,
    originalPrice: 84.99,
    discount: 82,
    description: 'Master Python by building 100 projects in 100 days.',
    whatYouLearn: [
      'Be able to program in Python professionally',
      'Create a portfolio of 100 Python projects',
      'Build websites, games and apps',
      'Master modern frameworks',
    ],
    courseContent: {
      totalSections: 100,
      totalLectures: 67,
      totalDuration: '58h 19m',
      sections: [
        {
          day: 'Day 1',
          title: 'Beginner - Working with Variables',
          duration: '5 sections • 50m',
          subsections: [
            { title: 'Flying to Live Console', duration: '10m' },
            { title: 'String Manipulation', duration: '8m' },
          ],
        },
        {
          day: 'Day 2',
          title: 'Beginner - Understanding Data Types',
          duration: '5 sections • 40m',
        },
        {
          day: 'Day 3',
          title: 'Beginner - Control Flow',
          duration: '8 sections • 51m',
        },
      ],
    },
    includes: [
      '65 hours on-demand video',
      '37 coding exercises',
      '22 articles',
      '220 downloadable resources',
      'Access on mobile and TV',
      'Completion certificate',
    ],
    reviews: [
      {
        name: 'John Doe',
        rating: 5,
        time: '1 month ago',
        text: 'This was exactly what I needed.',
      },
      {
        name: 'Sarah Klein',
        rating: 5,
        time: '2 weeks ago',
        text: 'Great course overall.',
      },
    ],
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Breadcrumb */}
        <Text style={styles.breadcrumb}>
          {course.category} › {course.subcategory}
        </Text>

        {/* Title and Description */}
        <Text style={styles.title}>{course.title}</Text>
        <Text style={styles.description}>{course.description}</Text>

        {/* Badge and Rating */}
        <View style={styles.metadata}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{course.badge}</Text>
          </View>

          <View style={styles.ratingRow}>
            <Text style={styles.rating}>★ {course.rating}</Text>
            <Text style={styles.reviewCount}>
              ({course.reviewCount.toLocaleString()})
            </Text>
          </View>

          <Text style={styles.studentCount}>
            {course.studentCount.toLocaleString()} students
          </Text>

          <Text style={styles.courseInfo}>
            🟢 By Dr. Angela Yu • Last updated 7 years
          </Text>
        </View>

        {/* Hero Image */}
        <View style={styles.heroImage}>
          <View style={styles.playButton}>
            <Text style={styles.playIcon}>▶</Text>
          </View>
        </View>

        {/* Price Section */}
        <View style={styles.priceSection}>
          <View style={styles.priceRow}>
            <Text style={styles.price}>${course.price}</Text>
            <Text style={styles.originalPrice}>${course.originalPrice}</Text>
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{course.discount}% OFF</Text>
            </View>
          </View>
          <Text style={styles.guarantee}>30-Day Money-Back Guarantee</Text>

          <TouchableOpacity style={styles.addToCartBtn}>
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buyNowBtn}>
            <Text style={styles.buyNowText}>Buy Now</Text>
          </TouchableOpacity>
        </View>

        {/* What you'll learn */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What you'll learn</Text>
          {course.whatYouLearn.map((item, index) => (
            <View key={index} style={styles.learningItem}>
              <Text style={styles.checkmark}>✓</Text>
              <Text style={styles.learningText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Course Content */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Course Content</Text>
          <Text style={styles.courseStats}>
            {course.courseContent.totalSections} sections •{' '}
            {course.courseContent.totalLectures} lectures •{' '}
            {course.courseContent.totalDuration}
          </Text>

          {course.courseContent.sections.map((section, index) => (
            <View key={index} style={styles.sectionItem}>
              <TouchableOpacity
                style={styles.sectionHeader}
                onPress={() =>
                  setExpandedSectionIndex(
                    expandedSectionIndex === index ? null : index
                  )
                }
              >
                <Text style={styles.toggle}>
                  {expandedSectionIndex === index ? '▼' : '▶'}
                </Text>
                <View style={styles.sectionTitleContainer}>
                  <Text style={styles.sectionSubtitle}>
                    {section.day} - {section.title}
                  </Text>
                  <Text style={styles.sectionDuration}>{section.duration}</Text>
                </View>
              </TouchableOpacity>

              {expandedSectionIndex === index && section.subsections && (
                <View style={styles.subsections}>
                  {section.subsections.map((sub, subIndex) => (
                    <View key={subIndex} style={styles.subsectionItem}>
                      <Text style={styles.bullet}>◦</Text>
                      <Text style={styles.subsectionText}>{sub.title}</Text>
                      <Text style={styles.subDuration}>{sub.duration}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}

          <TouchableOpacity style={styles.expandButton}>
            <Text style={styles.expandButtonText}>Show 90 more sections</Text>
          </TouchableOpacity>
        </View>

        {/* Instructor */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instructor</Text>
          <View style={styles.instructorCard}>
            <View style={styles.instructorImage} />
            <View style={styles.instructorInfo}>
              <Text style={styles.instructorName}>
                {course.instructor.name}
              </Text>
              <Text style={styles.instructorTitle}>
                {course.instructor.title}
              </Text>
              <Text style={styles.instructorStats}>
                ⭐ {course.instructor.rating} •{' '}
                {course.instructor.students.toLocaleString()} Students •{' '}
                {course.instructor.courses} Courses
              </Text>
            </View>
          </View>
        </View>

        {/* Includes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>This course includes:</Text>
          {course.includes.map((item, index) => (
            <Text key={index} style={styles.includeItem}>
              • {item}
            </Text>
          ))}
        </View>

        {/* Reviews */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            ⭐ {course.rating} Course Rating •{' '}
            {course.reviewCount.toLocaleString()}K Reviews
          </Text>

          {course.reviews.map((review, index) => (
            <View key={index} style={styles.reviewItem}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewName}>{review.name}</Text>
                <Text style={styles.reviewTime}>{review.time}</Text>
              </View>
              <Text style={styles.reviewStars}>{'★'.repeat(review.rating)}</Text>
              <Text style={styles.reviewText}>{review.text}</Text>
            </View>
          ))}

          <TouchableOpacity style={styles.viewAllReviews}>
            <Text style={styles.viewAllReviewsText}>View all reviews</Text>
          </TouchableOpacity>
        </View>

        {/* Training Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Training 5 or more people?</Text>
          <Text style={styles.trainingText}>
            Get your team access to 25,000+ top Lumina courses.
          </Text>
          <TouchableOpacity style={styles.businessBtn}>
            <Text style={styles.businessBtnText}>Try Lumina Business</Text>
          </TouchableOpacity>
        </View>

        {/* Share */}
        <View style={styles.shareSection}>
          <TouchableOpacity style={styles.shareBtn}>
            <Text style={styles.shareBtnText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareBtn}>
            <Text style={styles.shareBtnText}>Gift this course</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareBtn}>
            <Text style={styles.shareBtnText}>Apply Coupon</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
    zIndex: 10,
  },
  backButtonText: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.primary,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  breadcrumb: {
    fontSize: fontSize.sm,
    color: colors.textLight,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
    lineHeight: fontSize.xl * 1.3,
  },
  description: {
    fontSize: fontSize.md,
    color: colors.textLight,
    marginBottom: spacing.lg,
  },
  metadata: {
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  badge: {
    backgroundColor: '#FFC107',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    alignSelf: 'flex-start',
    marginBottom: spacing.sm,
  },
  badgeText: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: '#000',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  rating: {
    fontSize: fontSize.md,
    fontWeight: '700',
    color: colors.text,
  },
  reviewCount: {
    fontSize: fontSize.sm,
    color: colors.textLight,
  },
  studentCount: {
    fontSize: fontSize.sm,
    color: colors.textLight,
    marginTop: spacing.sm,
  },
  courseInfo: {
    fontSize: fontSize.sm,
    color: colors.textLight,
    marginTop: spacing.sm,
  },
  heroImage: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
    overflow: 'hidden',
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    fontSize: fontSize.xl,
    color: colors.background,
    fontWeight: '700',
  },
  priceSection: {
    backgroundColor: colors.surfaceLight,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  price: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
    color: colors.text,
  },
  originalPrice: {
    fontSize: fontSize.md,
    textDecorationLine: 'line-through',
    color: colors.textLight,
  },
  discountBadge: {
    backgroundColor: colors.secondary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  discountText: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: colors.background,
  },
  guarantee: {
    fontSize: fontSize.sm,
    color: colors.textLight,
  },
  addToCartBtn: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartText: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.background,
  },
  buyNowBtn: {
    backgroundColor: colors.background,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  buyNowText: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
  },
  section: {
    marginBottom: spacing.xxl,
    gap: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.text,
  },
  learningItem: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'flex-start',
  },
  checkmark: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.success,
    marginTop: spacing.xs,
  },
  learningText: {
    fontSize: fontSize.md,
    color: colors.text,
    flex: 1,
  },
  courseStats: {
    fontSize: fontSize.sm,
    color: colors.textLight,
  },
  sectionItem: {
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.md,
    alignItems: 'flex-start',
  },
  toggle: {
    fontSize: fontSize.sm,
    color: colors.textLight,
    marginTop: spacing.xs,
  },
  sectionTitleContainer: {
    flex: 1,
    gap: spacing.xs,
  },
  sectionSubtitle: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.text,
  },
  sectionDuration: {
    fontSize: fontSize.xs,
    color: colors.textLight,
  },
  subsections: {
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    padding: spacing.md,
    gap: spacing.sm,
  },
  subsectionItem: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'flex-start',
  },
  bullet: {
    fontSize: fontSize.sm,
    color: colors.textLight,
    marginTop: spacing.xs,
  },
  subsectionText: {
    fontSize: fontSize.sm,
    color: colors.textLight,
    flex: 1,
  },
  subDuration: {
    fontSize: fontSize.xs,
    color: colors.textLighter,
  },
  expandButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    marginTop: spacing.lg,
  },
  expandButtonText: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  instructorCard: {
    flexDirection: 'row',
    gap: spacing.lg,
    backgroundColor: colors.surfaceLight,
    padding: spacing.lg,
    borderRadius: borderRadius.md,
  },
  instructorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
  },
  instructorInfo: {
    flex: 1,
    gap: spacing.xs,
  },
  instructorName: {
    fontSize: fontSize.md,
    fontWeight: '700',
    color: colors.text,
  },
  instructorTitle: {
    fontSize: fontSize.sm,
    color: colors.textLight,
  },
  instructorStats: {
    fontSize: fontSize.xs,
    color: colors.textLight,
  },
  includeItem: {
    fontSize: fontSize.md,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  reviewItem: {
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.sm,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reviewName: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
  },
  reviewTime: {
    fontSize: fontSize.sm,
    color: colors.textLight,
  },
  reviewStars: {
    color: colors.warning,
    fontSize: fontSize.md,
  },
  reviewText: {
    fontSize: fontSize.sm,
    color: colors.text,
    lineHeight: fontSize.sm * 1.6,
  },
  viewAllReviews: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.full,
    marginTop: spacing.lg,
  },
  viewAllReviewsText: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  trainingText: {
    fontSize: fontSize.sm,
    color: colors.textLight,
    lineHeight: fontSize.sm * 1.5,
  },
  businessBtn: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: borderRadius.md,
  },
  businessBtnText: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.primary,
    textAlign: 'center',
  },
  shareSection: {
    gap: spacing.md,
    marginBottom: spacing.xxl,
  },
  shareBtn: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
  },
  shareBtnText: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
});
