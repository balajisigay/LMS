import React, { useState, useMemo } from "react";
import { Course } from "../types/course";
import { colors, spacing, fontSize, borderRadius } from "../styles/colors";

interface CategoriesProps {
  courses: Course[];
  loading?: boolean;
  error?: string | null;
  onCategoryPress?: (category: string) => void;
  onCoursePress?: (courseId: number) => void;
  onRetry?: () => void;
}

interface CategoryCardProps {
  course: Course;
  onPress?: (id: number) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ course, onPress }) => {
  return (
    <div style={styles.card} onClick={() => onPress?.(course.id)}>
      {/* Course Thumbnail */}
      <div style={styles.cardImage}>
        {course.imageUrl ? (
          <img src={course.imageUrl} alt={course.title} style={styles.cardImageReal} />
        ) : (
          <div style={styles.cardImagePlaceholder}>No Image</div>
        )}
      </div>

      {/* Content */}
      <div style={styles.cardContent}>
        {/* Badge */}
        {course.badge && <span style={styles.badge}>{course.badge}</span>}

        {/* Title */}
        <h4 style={styles.cardTitle}>{course.title}</h4>

        {/* Instructor */}
        <p style={styles.cardInstructor}>
          {course.instructor?.name ?? "Unknown"} &bull; {course.instructor?.courses ?? 0} courses
        </p>

        {/* Rating + Reviews */}
        <div style={styles.ratingContainer}>
          <span style={styles.ratingStar}>★ {course.rating.toFixed(1)}</span>
          <span style={styles.reviewCount}>({course.reviewCount.toLocaleString()})</span>
        </div>

        {/* Footer */}
        <div style={styles.cardFooter}>
          <span style={styles.students}>
            {course.studentCount?.toLocaleString()} Students
          </span>
          <div style={styles.priceContainer}>
            <span style={styles.price}>${course.price.toFixed(2)}</span>
            {course.originalPrice > course.price && (
              <span style={styles.originalPrice}>${course.originalPrice.toFixed(2)}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Categories: React.FC<CategoriesProps> = ({
  courses,
  loading = false,
  error = null,
  onCategoryPress,
  onCoursePress,
  onRetry,
}) => {
  const [activeCategory, setActiveCategory] = useState("All Courses");

  const categories = useMemo(
    () => [
      "All Courses",
      "Development",
      "Design",
      "Marketing",
      "IT & Software",
      "Personal Growth",
    ],
    []
  );

  return (
    <section style={styles.container}>
      <div style={styles.wrapper}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.headerTitle}>Explore Top Categories</h2>
          <p style={styles.headerSubtitle}>Find the right path for your career goals.</p>
          <a style={styles.viewAllLink}>View all categories →</a>
        </div>

        {/* Category Chips */}
        <div style={styles.categoriesContent}>
          {categories.map((cat) => (
            <button
              key={cat}
              style={{
                ...styles.categoryChip,
                ...(activeCategory === cat ? styles.categoryChipActive : {}),
              }}
              onClick={() => {
                setActiveCategory(cat);
                onCategoryPress?.(cat);
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Error UI */}
        {error && (
          <div style={styles.errorBox}>
            <span style={styles.errorText}>⚠️ {error}</span>
            <button style={styles.retryButton} onClick={onRetry}>
              Retry
            </button>
          </div>
        )}

        {/* Loading UI */}
        {loading && (
          <div style={styles.loadingContainer}>
            <p style={styles.loadingText}>Loading courses...</p>
          </div>
        )}

        {/* Course Grid */}
        {!loading && (
          <div style={styles.courseGrid}>
            {courses.map((course) => (
              <CategoryCard key={course.id} course={course} onPress={onCoursePress} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

/* -------------------------------------- */
/*               STYLES                  */
/* -------------------------------------- */

const styles: Record<string, React.CSSProperties> = {
  container: {
    background: colors.background,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xxl,
  },
  wrapper: {
    maxWidth: 1400,
    margin: "0 auto",
    padding: `0 ${spacing.lg}px`,
  },

  /* Header */
  header: {
    marginBottom: spacing.lg,
  },
  headerTitle: {
    fontSize: fontSize.xl,
    fontWeight: 700,
    marginBottom: spacing.xs,
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: fontSize.sm,
    color: colors.textLight,
    marginBottom: spacing.sm,
  },
  viewAllLink: {
    fontSize: fontSize.sm,
    color: colors.primary,
    fontWeight: 600,
    cursor: "pointer",
  },

  /* Category Chips */
  categoriesContent: {
    display: "flex",
    gap: spacing.md,
    flexWrap: "wrap",
    marginBottom: spacing.lg,
  },
  categoryChip: {
    padding: `${spacing.sm}px ${spacing.lg}px`,
    borderRadius: borderRadius.full,
    background: colors.surfaceLight,
    border: `1px solid ${colors.border}`,
    fontSize: fontSize.sm,
    fontWeight: 600,
    cursor: "pointer",
  },
  categoryChipActive: {
    background: colors.text,
    borderColor: colors.text,
    color: colors.white,
  },

  /* Cards */
  courseGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: spacing.lg,
  },
  card: {
    borderRadius: borderRadius.md,
    border: `1px solid ${colors.border}`,
    overflow: "hidden",
    background: colors.white,
    cursor: "pointer",
    transition: "0.2s ease",
  },
  cardImage: {
    width: "100%",
    aspectRatio: "16/9",
    background: colors.surfaceLight,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardImageReal: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  cardImagePlaceholder: {
    fontSize: fontSize.md,
    color: colors.textLight,
  },

  cardContent: {
    padding: spacing.md,
  },

  badge: {
    fontSize: fontSize.xs,
    fontWeight: 700,
    color: colors.primary,
  },

  cardTitle: {
    fontSize: fontSize.sm,
    fontWeight: 600,
    margin: `${spacing.xs}px 0`,
    lineHeight: 1.4,
    color: colors.text,
  },

  cardInstructor: {
    fontSize: fontSize.xs,
    color: colors.textLight,
    marginBottom: spacing.xs,
  },

  ratingContainer: {
    display: "flex",
    alignItems: "center",
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  ratingStar: {
    fontSize: fontSize.sm,
    fontWeight: 600,
    color: colors.warning,
  },
  reviewCount: {
    fontSize: fontSize.xs,
    color: colors.textLight,
  },

  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.sm,
  },
  students: {
    fontSize: fontSize.xs,
    color: colors.textLight,
  },

  priceContainer: {
    display: "flex",
    gap: spacing.xs,
    alignItems: "center",
  },
  price: {
    fontSize: fontSize.sm,
    fontWeight: 700,
  },
  originalPrice: {
    fontSize: fontSize.xs,
    color: colors.textLight,
    textDecoration: "line-through",
  },

  /* Error */
  errorBox: {
    padding: spacing.md,
    background: "#fee2e2",
    border: "1px solid #dc2626",
    borderRadius: borderRadius.md,
    marginBottom: spacing.lg,
    display: "flex",
    justifyContent: "space-between",
  },
  errorText: {
    color: "#dc2626",
    fontSize: fontSize.sm,
  },
  retryButton: {
    background: "#dc2626",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: 4,
    cursor: "pointer",
  },

  /* Loading */
  loadingContainer: {
    padding: spacing.xl,
    textAlign: "center",
  },
  loadingText: {
    fontSize: fontSize.md,
    color: colors.textLight,
  },
};
