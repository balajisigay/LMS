import React, { useState, useMemo, useEffect } from "react";
import { Course } from "../types/course";
import { addToCart } from "../../../src/api/cartService";
import { getUserId } from "../utils/getUserId";
import { getCurrentUser } from "../utils/auth";
import { getEnrollments } from "../../../src/api/enrollmentService";

// --- Types ---
interface CategoryCardProps {
  course: Course;
  isPurchased?: boolean;
  onPress?: (id: number) => void;
  onAddToCart?: (id: number) => void;
}

interface CategoriesProps {
  courses: Course[];
  loading?: boolean;
  error?: string | null;
  onCategoryPress?: (category: string) => void;
  onCoursePress?: (courseId: number) => void;
  onRetry?: () => void;
}

// --- CSS Styles (Injected) ---
// We inject this once to handle media queries and pseudo-states properly
const cssStyles = `
  :root {
    --primary: #6366f1;
    --primary-dark: #4f46e5;
    --bg-dark: #0f172a;
    --bg-card: rgba(30, 41, 59, 0.7);
    --text-main: #f8fafc;
    --text-muted: #94a3b8;
    --border: rgba(255, 255, 255, 0.1);
  }

  .page-container {
    min-height: 100vh;
    background: var(--bg-dark);
    color: var(--text-main);
    padding: 40px 20px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }

  .wrapper {
    max-width: 1400px;
    margin: 0 auto;
  }

  /* Header */
  .header-section {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 40px;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .header-title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    margin: 0;
    background: linear-gradient(to right, #fff, #94a3b8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .header-subtitle {
    color: var(--text-muted);
    margin-top: 10px;
    font-size: 1.1rem;
  }

  .view-all-btn {
    padding: 10px 24px;
    border: 1px solid var(--border);
    border-radius: 100px;
    color: var(--text-main);
    background: rgba(255,255,255,0.05);
    cursor: pointer;
    transition: all 0.2s;
    font-weight: 600;
    text-decoration: none;
  }
  .view-all-btn:hover { background: rgba(255,255,255,0.1); }

  /* Layout Grid */
  .main-layout {
    display: grid;
    grid-template-columns: 260px 1fr;
    gap: 40px;
    align-items: start;
  }

  /* Sidebar */
  .sidebar {
    position: sticky;
    top: 20px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    backdrop-filter: blur(12px);
    border-radius: 24px;
    padding: 24px;
  }

  .category-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    margin-bottom: 8px;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s;
    color: var(--text-muted);
    font-weight: 500;
  }

  .category-item:hover {
    background: rgba(255,255,255,0.05);
    color: #fff;
  }

  .category-item.active {
    background: var(--primary);
    color: #fff;
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
  }

  /* Course Grid */
  .course-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 24px;
  }

  /* Card Component */
  .course-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 20px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
  }

  .course-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    border-color: rgba(99, 102, 241, 0.5);
  }

  .card-image-wrapper {
    position: relative;
    padding-top: 60%; /* Aspect Ratio 16:9 */
    overflow: hidden;
  }

  .card-image {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  .course-card:hover .card-image { transform: scale(1.05); }

  .badge {
    position: absolute;
    top: 12px; left: 12px;
    background: rgba(16, 185, 129, 0.9);
    color: white;
    font-size: 0.75rem;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 100px;
    backdrop-filter: blur(4px);
  }

  .card-content {
    padding: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .card-title {
    font-size: 1.1rem;
    font-weight: 700;
    margin: 0 0 10px 0;
    line-height: 1.4;
    color: #fff;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .rating-row {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9rem;
    margin-bottom: 16px;
  }
  
  .star { color: #fbbf24; }
  .rating-num { font-weight: 700; color: #fff; }
  .review-count { color: var(--text-muted); font-size: 0.8rem; }

  .card-footer {
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 16px;
    border-top: 1px solid var(--border);
  }

  .price { font-size: 1.25rem; font-weight: 700; color: #fff; }
  .original-price { font-size: 0.9rem; text-decoration: line-through; color: var(--text-muted); margin-left: 8px;}

  .cart-btn {
    background: var(--primary);
    color: white;
    border: none;
    padding: 10px 16px;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  
  .cart-btn:hover:not(:disabled) { background: var(--primary-dark); }
  .cart-btn:disabled { background: #10b981; cursor: default; }

  /* Notification Toast */
  .toast {
    position: fixed;
    top: 20px; right: 20px;
    background: #10b981;
    color: white;
    padding: 12px 24px;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    font-weight: 600;
    z-index: 100;
    animation: slideIn 0.3s ease-out;
  }

  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  /* Loading & Error */
  .state-card {
    grid-column: 1 / -1;
    text-align: center;
    padding: 60px;
    background: var(--bg-card);
    border-radius: 20px;
    border: 1px solid var(--border);
  }

  .spinner {
    width: 40px; height: 40px;
    border: 3px solid rgba(255,255,255,0.1);
    border-top-color: var(--primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 20px;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* --- RESPONSIVE QUERIES --- */
  @media (max-width: 1024px) {
    .main-layout {
      grid-template-columns: 1fr; /* Stack sidebar on top */
      gap: 24px;
    }

    .sidebar {
      position: relative;
      top: 0;
      padding: 16px;
      overflow-x: auto; /* Horizontal scroll */
      white-space: nowrap;
      border-radius: 16px;
      
      /* Hide scrollbar but keep functionality */
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    .sidebar::-webkit-scrollbar { display: none; }

    .sidebar-list {
      display: flex;
      flex-direction: row;
      gap: 12px;
    }

    .category-item {
      margin: 0;
      background: rgba(255,255,255,0.05);
      padding: 10px 20px;
      border-radius: 100px;
    }
    
    .sidebar-title { display: none; } /* Hide title on mobile to save space */
  }

  @media (max-width: 600px) {
    .header-title { font-size: 2rem; }
    .course-grid { grid-template-columns: 1fr; }
  }
`;

// --- Components ---

const CategoryCard: React.FC<CategoryCardProps> = ({ course, isPurchased = false, onPress, onAddToCart }) => {
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setAdding(true);
    try {
      await onAddToCart?.(course.id);
    } finally {
      setTimeout(() => setAdding(false), 1500);
    }
  };

  return (
    <div className="course-card" onClick={() => onPress?.(course.id)}>
      <div className="card-image-wrapper">
        <img 
          src={course.imageUrl || "https://via.placeholder.com/400x225?text=No+Image"} 
          alt={course.title} 
          className="card-image" 
        />
        {course.badge && <span className="badge">{course.badge}</span>}
      </div>

      <div className="card-content">
        <h4 className="card-title">{course.title}</h4>

        <div className="rating-row">
          <span className="star">*</span>
          <span className="rating-num">{course.rating.toFixed(1)}</span>
          <span className="review-count">({course.reviewCount.toLocaleString()})</span>
        </div>

        <div className="card-footer">
          <div>
            <div className="price">Rs {course.price.toFixed(0)}</div>
            {course.originalPrice > course.price && (
              <span className="original-price">Rs {course.originalPrice.toFixed(0)}</span>
            )}
          </div>
          
          <button 
            className="cart-btn" 
            onClick={handleAddToCart} 
            disabled={adding || isPurchased}
          >
            {isPurchased ? (
              <>Purchased</>
            ) : adding ? (
              <>Added</>
            ) : (
              <>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add
              </>
            )}
          </button>
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
  const [cartSuccess, setCartSuccess] = useState("");
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<Set<number>>(new Set());

  const categories = useMemo(() => [
    "All Courses", "Development", "Design", "Marketing", "IT & Software", "Personal Growth", "Business", "Photography"
  ], []);

  const filteredCourses = useMemo(() => {
    if (activeCategory === "All Courses") return courses;
    return courses.filter(c => c.category?.toLowerCase() === activeCategory.toLowerCase());
  }, [courses, activeCategory]);


  useEffect(() => {
    const loadEnrolledCourses = async () => {
      try {
        const user = getCurrentUser();
        if (!user?.userId) {
          setEnrolledCourseIds(new Set());
          return;
        }

        const enrollments = await getEnrollments(String(user.userId));
        setEnrolledCourseIds(new Set(enrollments.map((enrollment) => enrollment.course.id)));
      } catch (error) {
        console.error("Failed to load enrollments:", error);
        setEnrolledCourseIds(new Set());
      }
    };

    void loadEnrolledCourses();
  }, []);
  const handleCategorySelect = (category: string) => {
    setActiveCategory(category);
    onCategoryPress?.(category);
  };

  const handleAddToCart = async (courseId: number) => {
    if (enrolledCourseIds.has(courseId)) {
      setCartSuccess("You already purchased this course.");
      setTimeout(() => setCartSuccess(""), 3000);
      return;
    }

    try {
      const userId = getUserId();
      await addToCart(userId, courseId);
      setCartSuccess("Course added to cart successfully!");
      setTimeout(() => setCartSuccess(""), 3000);
    } catch (err: any) {
      if (err.response?.status === 400) {
        setCartSuccess("Course is already in your cart!");
        setTimeout(() => setCartSuccess(""), 3000);
      } else {
        setCartSuccess("Please login to add courses to cart.");
        setTimeout(() => setCartSuccess(""), 3000);
      }
    }
  };

  return (
    <section className="page-container">
      <style>{cssStyles}</style>

      {/* Toast Notification */}
      {cartSuccess && <div className="toast">{cartSuccess}</div>}

      <div className="wrapper">
        {/* Header */}
        <div className="header-section">
          <div>
            <h2 className="header-title">Explore Courses</h2>
            <p className="header-subtitle">Discover new skills to ignite your potential</p>
          </div>
          <a href="#" className="view-all-btn">View All Categories {"->"}</a>
        </div>

        {/* Main Layout */}
        <div className="main-layout">
          
          {/* Sidebar (Vertical on Desktop, Horizontal Scroll on Mobile) */}
          <aside className="sidebar">
            <h3 className="sidebar-title" style={{ marginTop: 0, marginBottom: '20px', fontSize: '1.2rem' }}>Categories</h3>
            <div className="sidebar-list">
              {categories.map((cat) => (
                <div
                  key={cat}
                  className={`category-item ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => handleCategorySelect(cat)}
                >
                  <span>{cat}</span>
                  {activeCategory === cat && <span style={{fontSize: '1.2rem'}}>*</span>}
                </div>
              ))}
            </div>
          </aside>

          {/* Content Area */}
          <div className="content-area">
            {error ? (
              <div className="state-card">
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>!</div>
                <h3 style={{ color: '#ef4444', margin: '0 0 16px 0' }}>{error}</h3>
                <button className="view-all-btn" onClick={onRetry} style={{ background: '#ef4444', borderColor: '#ef4444' }}>
                  Try Again
                </button>
              </div>
            ) : loading ? (
              <div className="state-card">
                <div className="spinner"></div>
                <p>Loading your courses...</p>
              </div>
            ) : filteredCourses.length === 0 ? (
              <div className="state-card">
                <p>No courses found in this category.</p>
              </div>
            ) : (
              <div className="course-grid">
                {filteredCourses.map((course) => (
                  <CategoryCard
                    key={course.id}
                    course={course}
                    isPurchased={enrolledCourseIds.has(course.id)}
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

export default Categories;


