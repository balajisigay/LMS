import React, { useState, useMemo, useEffect } from "react";
import { Course } from "../types/course";
import { colors, spacing, fontSize, borderRadius } from "../styles/colors";

/* -------------------------------------------------- */
/*                 CATEGORY CARD COMPONENT            */
/* -------------------------------------------------- */

interface CategoryCardProps {
  course: Course;
  onPress?: (id: number) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ course, onPress }) => {
  return (
    <div style={styles.card} onClick={() => onPress?.(course.id)}>
      {/* Image */}
      <div style={styles.cardImage}>
        {course.imageUrl ? (
          <img src={course.imageUrl} alt={course.title} style={styles.cardImageReal} />
        ) : (
          <div style={styles.cardImagePlaceholder}>No Image</div>
        )}
      </div>

      {/* Content */}
      <div style={styles.cardContent}>
        {course.badge && <span style={styles.badge}>{course.badge}</span>}

        <h4 style={styles.cardTitle}>{course.title}</h4>

        <p style={styles.cardInstructor}>
          {course.instructor?.name ?? "Unknown"} • {course.instructor?.courses ?? 0} courses
        </p>

        {/* Rating */}
        <div style={styles.ratingContainer}>
          <span style={styles.ratingStar}>★ {course.rating.toFixed(1)}</span>
          <span style={styles.reviewCount}>({course.reviewCount.toLocaleString()})</span>
        </div>

        {/* Footer */}
        <div style={styles.cardFooter}>
          <span style={styles.students}>{course.studentCount.toLocaleString()} Students</span>
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

/* -------------------------------------------------- */
/*                 MAIN CATEGORIES COMPONENT          */
/* -------------------------------------------------- */

interface CategoriesProps {
  courses: Course[];
  loading?: boolean;
  error?: string | null;
  onCategoryPress?: (category: string) => void;
  onCoursePress?: (courseId: number) => void;
  onRetry?: () => void;
}

export const Categories: React.FC<CategoriesProps> = ({
  courses,
  loading = false,
  error = null,
  onCategoryPress,
  onCoursePress,
  onRetry,
}) => {
  const [activeCategory, setActiveCategory] = useState("All Courses");
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);

  useEffect(() => {
    setFilteredCourses(courses);
  }, [courses]);

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

  const handleCategorySelect = (category: string) => {
    setActiveCategory(category);
    onCategoryPress?.(category);

    if (category === "All Courses") {
      setFilteredCourses(courses);
    } else {
      setFilteredCourses(
        courses.filter(
          (course) => course.category?.toLowerCase() === category.toLowerCase()
        )
      );
    }
  };

  return (
    <section style={styles.container}>
      <div style={styles.wrapper}>

        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.headerTitle}>Explore Top Categories</h2>
          <p style={styles.headerSubtitle}>Find the right path for your career goals.</p>
          <a style={styles.viewAllLink}>View all categories →</a>
        </div>

        {/* LAYOUT (Sidebar + Courses) */}
        <div style={styles.mainLayout}>

          {/* SIDEBAR */}
          <aside style={styles.sidebar}>
            <h3 style={styles.sidebarTitle}>Categories</h3>

            {categories.map((cat) => (
              <div
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                style={{
                  ...styles.sidebarItem,
                  ...(activeCategory === cat ? styles.sidebarItemActive : {}),
                }}
              >
                {cat}
              </div>
            ))}
          </aside>

          {/* CONTENT AREA */}
          <div style={styles.contentArea}>
            {error && (
              <div style={styles.errorBox}>
                <span style={styles.errorText}>⚠️ {error}</span>
                <button style={styles.retryButton} onClick={onRetry}>
                  Retry
                </button>
              </div>
            )}

            {loading && (
              <div style={styles.loadingContainer}>
                <p style={styles.loadingText}>Loading courses...</p>
              </div>
            )}

            {!loading && (
              <div style={styles.courseGrid}>
                {filteredCourses.map((course) => (
                  <CategoryCard key={course.id} course={course} onPress={onCoursePress} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

/* -------------------------------------------------- */
/*                         STYLES                     */
/* -------------------------------------------------- */

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
    color: colors.text,
    marginBottom: spacing.xs,
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

  /* Layout */
  mainLayout: {
    display: "grid",
    gridTemplateColumns: "260px 1fr",
    gap: spacing.xl,
  },

  /* Sidebar */
  sidebar: {
    background: colors.white,
    border: `1px solid ${colors.border}`,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    height: "fit-content",
    position: "sticky",
    top: 90,
  },
  sidebarTitle: {
    fontSize: fontSize.md,
    fontWeight: 700,
    marginBottom: spacing.md,
  },
  sidebarItem: {
    background: colors.surfaceLight,
    padding: `${spacing.sm}px ${spacing.md}px`,
    borderRadius: borderRadius.sm,
    cursor: "pointer",
    marginBottom: spacing.sm,
    transition: "0.2s",
    fontSize: fontSize.sm,
  },
  sidebarItemActive: {
    background: colors.primary,
    color: colors.white,
  },

  contentArea: {
    width: "100%",
  },

  /* Course Grid */
  courseGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: spacing.lg,
  },

  /* Cards */
  card: {
    borderRadius: borderRadius.md,
    border: `1px solid ${colors.border}`,
    overflow: "hidden",
    background: colors.white,
    cursor: "pointer",
    transition: "0.25s ease",
  },
  cardImage: {
    width: "100%",
    aspectRatio: "16/9",
    background: colors.surfaceLight,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
    color: colors.primary,
    fontWeight: 700,
  },
  cardTitle: {
    fontSize: fontSize.sm,
    fontWeight: 600,
    margin: `${spacing.xs}px 0`,
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
    fontWeight: 700,
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
    textDecoration: "line-through",
    color: colors.textLight,
  },

  /* Error */
  errorBox: {
    background: "#fee2e2",
    border: "1px solid #dc2626",
    padding: spacing.md,
    borderRadius: borderRadius.md,
    display: "flex",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
  },
  errorText: {
    color: "#dc2626",
    fontSize: fontSize.sm,
  },
  retryButton: {
    background: "#dc2626",
    color: "white",
    padding: "6px 12px",
    borderRadius: 6,
    cursor: "pointer",
  },

  /* Loading */
  loadingContainer: {
    textAlign: "center",
    padding: spacing.xl,
  },
  loadingText: {
    fontSize: fontSize.md,
    color: colors.textLight,
  },
};
