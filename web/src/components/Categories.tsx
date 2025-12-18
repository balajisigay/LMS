import React, { useState, useMemo, useEffect } from "react";
import { Course } from "../types/course";
import { addToCart } from "../../../src/api/cartService";

/* -------------------------------------------------- */
/*                  CATEGORY CARD COMPONENT            */
/* -------------------------------------------------- */

interface CategoryCardProps {
  course: Course;
  onPress?: (id: number) => void;
  onAddToCart?: (id: number) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ course, onPress, onAddToCart }) => {
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    setAdding(true);
    try {
      await onAddToCart?.(course.id);
    } finally {
      setTimeout(() => setAdding(false), 1000);
    }
  };

  return (
    <div 
      style={styles.modernCard} 
      onClick={() => onPress?.(course.id)}
    >
      {/* Image */}
      <div style={styles.modernCardImage}>
        {course.imageUrl ? (
          <img src={course.imageUrl} alt={course.title} style={styles.modernCardImageReal} />
        ) : (
          <div style={styles.modernCardImagePlaceholder}>
            <span>No Image</span>
          </div>
        )}
      </div>

      {/* Content Overlay */}
      <div style={styles.modernCardOverlay}>
        {/* Badge */}
        {course.badge && (
          <span style={styles.modernBadge}>{course.badge}</span>
        )}

        {/* Title */}
        <h4 style={styles.modernCardTitle}>{course.title}</h4>

        {/* Rating & Reviews */}
        <div style={styles.modernRatingSection}>
          <div style={styles.modernRating}>
            <span style={styles.modernStar}>★</span>
            <span style={styles.modernRatingText}>{course.rating.toFixed(1)}</span>
          </div>
          <span style={styles.modernReviewCount}>
            ({course.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Footer */}
        <div style={styles.modernCardFooter}>
          <div style={styles.modernStudents}>
            {course.studentCount.toLocaleString()} students
          </div>
          <div style={styles.modernPriceSection}>
            <span style={styles.modernPrice}>₹{course.price.toFixed(2)}</span>
            {course.originalPrice > course.price && (
              <span style={styles.modernOriginalPrice}>₹{course.originalPrice.toFixed(2)}</span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          style={{
            ...styles.addToCartBtn,
            ...(adding ? styles.addingBtn : {}),
          }}
          onClick={handleAddToCart}
          disabled={adding}
        >
          {adding ? "✓ Added!" : "🛒 Add to Cart"}
        </button>
      </div>
    </div>
  );
};

/* -------------------------------------------------- */
/*                  MAIN CATEGORIES COMPONENT          */
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
  const [cartSuccess, setCartSuccess] = useState("");

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

  const handleAddToCart = async (courseId: number) => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const userId = user.userId?.toString() || "demoUser";
      
      await addToCart(userId, courseId);
      
      setCartSuccess("Course added to cart! 🎉");
      setTimeout(() => setCartSuccess(""), 3000);
    } catch (err: any) {
      console.error("Add to cart failed:", err);
      if (err.response?.status === 400) {
        setCartSuccess("Already in cart!");
        setTimeout(() => setCartSuccess(""), 3000);
      }
    }
  };

  return (
    <section style={styles.modernContainer}>
      <div style={styles.modernWrapper}>
        {/* Cart Success Message */}
        {cartSuccess && (
          <div style={styles.cartSuccessAlert}>
            <span>✓</span>
            {cartSuccess}
          </div>
        )}

        {/* Modern Header */}
        <div style={styles.modernHeader}>
          <div style={styles.modernHeaderContent}>
            <h2 style={styles.modernHeaderTitle}>Explore Top Categories</h2>
            <p style={styles.modernHeaderSubtitle}>Find the right path for your career goals</p>
          </div>
          <a style={styles.modernViewAll}>View all categories →</a>
        </div>

        {/* Modern Layout */}
        <div style={styles.modernMainLayout}>
          {/* Modern Sidebar */}
          <aside style={styles.modernSidebar}>
            <div style={styles.modernSidebarHeader}>
              <h3 style={styles.modernSidebarTitle}>Categories</h3>
            </div>
            <div style={styles.modernSidebarList}>
              {categories.map((cat) => (
                <div
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  style={{
                    ...styles.modernSidebarItem,
                    ...(activeCategory === cat ? styles.modernSidebarItemActive : {}),
                  }}
                >
                  <span>{cat}</span>
                  {activeCategory === cat && (
                    <div style={styles.modernSidebarIndicator}></div>
                  )}
                </div>
              ))}
            </div>
          </aside>

          {/* Modern Content Area */}
          <div style={styles.modernContentArea}>
            {error && (
              <div style={styles.modernErrorCard}>
                <div style={styles.modernErrorContent}>
                  <span style={styles.modernErrorIcon}>⚠️</span>
                  <span style={styles.modernErrorText}>{error}</span>
                </div>
                <button style={styles.modernRetryButton} onClick={onRetry}>
                  Retry
                </button>
              </div>
            )}

            {loading && (
              <div style={styles.modernLoadingCard}>
                <div style={styles.modernSpinner}></div>
                <p style={styles.modernLoadingText}>Loading courses...</p>
              </div>
            )}

            {!loading && !error && (
              <div style={styles.modernCourseGrid}>
                {filteredCourses.map((course) => (
                  <CategoryCard 
                    key={course.id} 
                    course={course} 
                    onPress={onCoursePress}
                    onAddToCart={handleAddToCart}
                  />
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
/*                        STYLES                      */
/* -------------------------------------------------- */

const styles: Record<string, React.CSSProperties> = {
  // Container
  modernContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '60px 20px',
  },
  modernWrapper: {
    maxWidth: '1400px',
    margin: '0 auto',
  },

  // Cart Success Alert
  cartSuccessAlert: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    background: 'linear-gradient(135deg, #10b981, #059669)',
    color: 'white',
    padding: '16px 24px',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    boxShadow: '0 10px 30px rgba(16, 185, 129, 0.4)',
    zIndex: 9999,
    animation: 'slideIn 0.3s ease-out',
  },

  // Header
  modernHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '48px',
    flexWrap: 'wrap',
    gap: '16px',
  },
  modernHeaderContent: {
    flex: 1,
  },
  modernHeaderTitle: {
    fontSize: '40px',
    fontWeight: 800,
    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    margin: 0,
    lineHeight: '1.2',
  },
  modernHeaderSubtitle: {
    fontSize: '18px',
    color: 'rgba(255, 255, 255, 0.9)',
    margin: '8px 0 0 0',
    fontWeight: 400,
  },
  modernViewAll: {
    fontSize: '16px',
    fontWeight: 600,
    color: 'rgba(255, 255, 255, 0.95)',
    textDecoration: 'none',
    padding: '12px 24px',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '50px',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
  },

  // Main Layout
  modernMainLayout: {
    display: 'grid',
    gridTemplateColumns: '300px 1fr',
    gap: '48px',
    alignItems: 'start',
  },

  // Sidebar
  modernSidebar: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '24px',
    padding: '32px',
    height: 'fit-content',
    position: 'sticky',
    top: '100px',
  },
  modernSidebarHeader: {
    marginBottom: '24px',
  },
  modernSidebarTitle: {
    fontSize: '20px',
    fontWeight: 700,
    background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    margin: 0,
  },
  modernSidebarList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  modernSidebarItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 20px',
    borderRadius: '16px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 500,
    color: 'rgba(255, 255, 255, 0.8)',
    transition: 'all 0.3s ease',
  },
  modernSidebarItemActive: {
    background: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    transform: 'translateX(4px)',
  },
  modernSidebarIndicator: {
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    background: 'white',
  },

  // Content Area
  modernContentArea: {
    width: '100%',
  },

  // Course Grid
  modernCourseGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '24px',
  },

  // Modern Cards
  modernCard: {
    borderRadius: '24px',
    overflow: 'hidden',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    height: '480px',
  },
  modernCardImage: {
    width: '100%',
    height: '50%',
    position: 'relative',
    overflow: 'hidden',
  },
  modernCardImageReal: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.4s ease',
  },
  modernCardImagePlaceholder: {
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '14px',
    fontWeight: 500,
  },
  modernCardOverlay: {
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    height: '60%',
    background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.95))',
    padding: '32px 24px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  modernBadge: {
    fontSize: '12px',
    color: '#10b981',
    fontWeight: 700,
    padding: '4px 12px',
    background: 'rgba(16, 185, 129, 0.2)',
    borderRadius: '20px',
    alignSelf: 'flex-start',
    marginBottom: '12px',
  },
  modernCardTitle: {
    fontSize: '20px',
    fontWeight: 700,
    color: 'white',
    margin: '0 0 16px 0',
    lineHeight: '1.3',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  modernRatingSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
  },
  modernRating: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  modernStar: {
    fontSize: '18px',
    color: '#fbbf24',
  },
  modernRatingText: {
    fontSize: '16px',
    fontWeight: 700,
    color: 'white',
  },
  modernReviewCount: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  modernCardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  modernStudents: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: 500,
  },
  modernPriceSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '2px',
  },
  modernPrice: {
    fontSize: '24px',
    fontWeight: 800,
    color: 'white',
    lineHeight: '1',
  },
  modernOriginalPrice: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.6)',
    textDecoration: 'line-through',
  },

  // Add to Cart Button
  addToCartBtn: {
    width: '100%',
    padding: '12px 20px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
  },
  addingBtn: {
    background: 'linear-gradient(135deg, #10b981, #059669)',
  },

  // Error States
  modernErrorCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(239, 68, 68, 0.2)',
    borderRadius: '24px',
    padding: '32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 20px 40px rgba(239, 68, 68, 0.1)',
  },
  modernErrorContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  modernErrorIcon: {
    fontSize: '24px',
  },
  modernErrorText: {
    fontSize: '16px',
    color: '#dc2626',
    fontWeight: 600,
  },
  modernRetryButton: {
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

  // Loading States
  modernLoadingCard: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(20px)',
    borderRadius: '24px',
    padding: '60px 32px',
    textAlign: 'center',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  modernSpinner: {
    width: '48px',
    height: '48px',
    border: '3px solid rgba(255, 255, 255, 0.3)',
    borderTop: '3px solid rgba(255, 255, 255, 0.8)',
    borderRadius: '50%',
    animation: 'modernSpin 1s linear infinite',
    margin: '0 auto 24px',
  },
  modernLoadingText: {
    fontSize: '18px',
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: 500,
    margin: 0,
  },
};

// Add modern animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes modernSpin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(100px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  [style*="modernCard"]:hover {
    transform: translateY(-12px) scale(1.02);
    box-shadow: 0 35px 60px rgba(0, 0, 0, 0.15);
  }
  
  [style*="modernCard"]:hover [style*="modernCardImageReal"] {
    transform: scale(1.1);
  }
  
  [style*="modernViewAll"]:hover {
    background: rgba(255, 255, 255, 0.95);
    color: #667eea;
    transform: translateY(-2px);
  }
  
  [style*="modernSidebarItem"]:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    transform: translateX(8px);
  }
  
  [style*="modernRetryButton"]:hover,
  [style*="addToCartBtn"]:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
  }
`;
document.head.appendChild(styleSheet);