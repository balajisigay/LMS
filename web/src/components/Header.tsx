import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiHeart, HiShoppingCart, HiSearch, HiUser, HiMenu, HiX } from "react-icons/hi";
import { getAllCourses } from "../services/courseService";

interface Course {
  id: number;
  title: string;
}

interface HeaderProps {
  cartCount?: number;
}

export const Header: React.FC<HeaderProps> = ({ cartCount = 0 }) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    getAllCourses()
      .then(setCourses)
      .catch(console.error);

    // Add scroll listener for header shadow
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      console.log("Searching for:", searchValue);
      // Add your search logic here
    }
  };

  return (
    <header style={{
      ...styles.container,
      ...(isScrolled ? styles.containerScrolled : {}),
    }}>
      <div style={styles.content}>
        {/* LOGO */}
        <div style={styles.logoContainer} onClick={() => navigate("/")}>
          <div style={styles.logoIcon}>
            <span style={styles.logoEmoji}>⚡</span>
          </div>
          <span style={styles.logoName}>Lumina</span>
        </div>

        {/* DESKTOP NAVIGATION */}
        <nav style={styles.desktopNav}>
          {/* COURSES DROPDOWN */}
          <div
            style={styles.courseMenu}
            onMouseEnter={() => setCoursesOpen(true)}
            onMouseLeave={() => setCoursesOpen(false)}
          >
            <button style={styles.navButton}>
              <span>Courses</span>
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 16 16" 
                fill="currentColor"
                style={{
                  transform: coursesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                }}
              >
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </button>

            {coursesOpen && (
              <div style={styles.dropdown}>
                <div style={styles.dropdownHeader}>
                  <h3 style={styles.dropdownTitle}>Explore Courses</h3>
                  <p style={styles.dropdownSubtitle}>{courses.length} courses available</p>
                </div>
                <div style={styles.dropdownContent}>
                  {courses.map((course) => (
                    <div
                      key={course.id}
                      style={styles.dropdownItem}
                      onClick={() => {
                        navigate(`/course/${course.id}`);
                        setCoursesOpen(false);
                      }}
                    >
                      <div style={styles.courseIcon}>📚</div>
                      <span>{course.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button style={styles.navButton} onClick={() => navigate("/about")}>
            About
          </button>
          <button style={styles.navButton} onClick={() => navigate("/contact")}>
            Contact
          </button>
        </nav>

        {/* SEARCH BAR */}
        <form style={styles.searchWrapper} onSubmit={handleSearch}>
          <HiSearch size={20} style={styles.searchIcon} />
          <input
            style={styles.searchInput}
            placeholder="Search for courses..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {searchValue && (
            <button
              type="button"
              onClick={() => setSearchValue("")}
              style={styles.clearButton}
            >
              <HiX size={16} />
            </button>
          )}
        </form>

        {/* RIGHT ACTIONS */}
        <div style={styles.rightActions}>
          {/* Wishlist */}
          <button 
            style={styles.iconButton}
            onClick={() => navigate("/wishlist")}
            title="Wishlist"
          >
            <HiHeart size={22} />
          </button>

          {/* Cart */}
          <button 
            style={styles.iconButton}
            onClick={() => navigate("/cart")}
            title="Shopping Cart"
          >
            <div style={styles.cartContainer}>
              <HiShoppingCart size={22} />
              {cartCount > 0 && (
                <div style={styles.cartBadge}>
                  {cartCount > 9 ? "9+" : cartCount}
                </div>
              )}
            </div>
          </button>

          {/* Profile */}
          <button 
            style={styles.iconButton}
            onClick={() => navigate("/profile")}
            title="Profile"
          >
            <HiUser size={22} />
          </button>

          {/* Divider */}
          <div style={styles.divider}></div>

          {/* Login Button */}
          <button 
            style={styles.loginButton} 
            onClick={() => navigate("/login")}
          >
            Log in
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            style={styles.mobileMenuButton}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div style={styles.mobileMenu}>
          <button 
            style={styles.mobileMenuItem}
            onClick={() => {
              navigate("/courses");
              setMobileMenuOpen(false);
            }}
          >
            Courses
          </button>
          <button 
            style={styles.mobileMenuItem}
            onClick={() => {
              navigate("/about");
              setMobileMenuOpen(false);
            }}
          >
            About
          </button>
          <button 
            style={styles.mobileMenuItem}
            onClick={() => {
              navigate("/contact");
              setMobileMenuOpen(false);
            }}
          >
            Contact
          </button>
          <button 
            style={styles.mobileMenuItem}
            onClick={() => {
              navigate("/profile");
              setMobileMenuOpen(false);
            }}
          >
            Profile
          </button>
          <div style={styles.mobileDivider}></div>
          <button 
            style={styles.mobileMenuItemPrimary}
            onClick={() => {
              navigate("/login");
              setMobileMenuOpen(false);
            }}
          >
            Log in
          </button>
          <button 
            style={styles.mobileMenuItemAccent}
            onClick={() => {
              navigate("/signup");
              setMobileMenuOpen(false);
            }}
          >
            Join for Free
          </button>
        </div>
      )}
    </header>
  );
};

/* ================= STYLES ================= */

const styles: Record<string, React.CSSProperties> = {
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.98)",
    backdropFilter: "blur(10px)",
    padding: "16px 32px",
    borderBottom: "1px solid rgba(229, 231, 235, 0.5)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    transition: "all 0.3s ease",
  },
  containerScrolled: {
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    borderBottom: "1px solid rgba(229, 231, 235, 0.8)",
  },
  content: {
    display: "flex",
    alignItems: "center",
    gap: "32px",
    maxWidth: "1600px",
    margin: "0 auto",
  },

  // Logo
  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    cursor: "pointer",
    transition: "transform 0.2s",
  },
  logoIcon: {
    width: "44px",
    height: "44px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
    transition: "transform 0.2s",
  },
  logoEmoji: {
    fontSize: "24px",
  },
  logoName: {
    fontSize: "24px",
    fontWeight: 700,
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },

  // Desktop Navigation
  desktopNav: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  navButton: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "10px 16px",
    background: "transparent",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: 600,
    color: "#374151",
    cursor: "pointer",
    transition: "all 0.2s",
  },

  // Courses Dropdown
  courseMenu: {
    position: "relative",
  },
  dropdown: {
    position: "absolute",
    top: "calc(100% + 12px)",
    left: 0,
    background: "white",
    minWidth: "320px",
    maxWidth: "400px",
    borderRadius: "16px",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
    overflow: "hidden",
    zIndex: 2000,
    animation: "slideDown 0.2s ease-out",
  },
  dropdownHeader: {
    padding: "20px 24px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
  },
  dropdownTitle: {
    fontSize: "18px",
    fontWeight: 700,
    margin: 0,
    marginBottom: "4px",
  },
  dropdownSubtitle: {
    fontSize: "13px",
    opacity: 0.9,
    margin: 0,
  },
  dropdownContent: {
    maxHeight: "400px",
    overflowY: "auto" as const,
  },
  dropdownItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "14px 24px",
    borderBottom: "1px solid #f3f4f6",
    cursor: "pointer",
    transition: "all 0.2s",
    fontSize: "15px",
    color: "#374151",
  },
  courseIcon: {
    fontSize: "20px",
  },

  // Search
  searchWrapper: {
    flex: 1,
    position: "relative",
    maxWidth: "500px",
  },
  searchIcon: {
    position: "absolute",
    top: "50%",
    left: "16px",
    transform: "translateY(-50%)",
    color: "#9ca3af",
    pointerEvents: "none",
  },
  searchInput: {
    width: "100%",
    padding: "12px 48px 12px 48px",
    borderRadius: "12px",
    border: "2px solid #e5e7eb",
    fontSize: "15px",
    outline: "none",
    transition: "all 0.2s",
    backgroundColor: "#f9fafb",
  },
  clearButton: {
    position: "absolute",
    top: "50%",
    right: "16px",
    transform: "translateY(-50%)",
    background: "#e5e7eb",
    border: "none",
    borderRadius: "50%",
    width: "24px",
    height: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "#6b7280",
    transition: "all 0.2s",
  },

  // Right Actions
  rightActions: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  iconButton: {
    width: "44px",
    height: "44px",
    borderRadius: "12px",
    background: "transparent",
    border: "2px solid #e5e7eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.2s",
    color: "#374151",
    position: "relative",
  },
  cartContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cartBadge: {
    position: "absolute",
    top: "-8px",
    right: "-8px",
    background: "linear-gradient(135deg, #ef4444, #dc2626)",
    color: "white",
    fontSize: "11px",
    fontWeight: 700,
    padding: "3px 6px",
    borderRadius: "10px",
    minWidth: "20px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(239, 68, 68, 0.4)",
  },
  divider: {
    width: "1px",
    height: "32px",
    background: "#e5e7eb",
    margin: "0 4px",
  },
  loginButton: {
    padding: "10px 20px",
    background: "white",
    border: "2px solid #e5e7eb",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: 600,
    color: "#374151",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  joinButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 24px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    border: "none",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: 700,
    color: "white",
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
  },

  // Mobile Menu
  mobileMenuButton: {
    display: "none",
    width: "44px",
    height: "44px",
    background: "transparent",
    border: "2px solid #e5e7eb",
    borderRadius: "12px",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "#374151",
  },
  mobileMenu: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    padding: "20px",
    borderTop: "1px solid #e5e7eb",
    marginTop: "16px",
  },
  mobileMenuItem: {
    padding: "14px 20px",
    background: "transparent",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: 600,
    color: "#374151",
    cursor: "pointer",
    textAlign: "left",
    transition: "all 0.2s",
  },
  mobileDivider: {
    height: "1px",
    background: "#e5e7eb",
    margin: "8px 0",
  },
  mobileMenuItemPrimary: {
    padding: "14px 20px",
    background: "white",
    border: "2px solid #e5e7eb",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: 600,
    color: "#374151",
    cursor: "pointer",
    textAlign: "center",
    transition: "all 0.2s",
  },
  mobileMenuItemAccent: {
    padding: "14px 20px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: 700,
    color: "white",
    cursor: "pointer",
    textAlign: "center",
    transition: "all 0.2s",
  },
};

// Add CSS for animations and hover effects
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Hover Effects */
  button:hover {
    transform: translateY(-2px);
  }

  button:active {
    transform: translateY(0);
  }

  /* Logo Hover */
  [style*="logoContainer"]:hover [style*="logoIcon"] {
    transform: rotate(-10deg) scale(1.05);
  }

  /* Nav Button Hover */
  [style*="navButton"]:hover {
    background: #f3f4f6 !important;
    color: #667eea !important;
  }

  /* Dropdown Item Hover */
  [style*="dropdownItem"]:hover {
    background: #f9fafb !important;
    padding-left: 28px !important;
  }

  /* Icon Button Hover */
  [style*="iconButton"]:hover {
    background: #f3f4f6 !important;
    border-color: #667eea !important;
    color: #667eea !important;
  }

  /* Search Focus */
  input[style*="searchInput"]:focus {
    border-color: #667eea !important;
    background: white !important;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) !important;
  }

  /* Login Button Hover */
  [style*="loginButton"]:hover {
    background: #f9fafb !important;
    border-color: #667eea !important;
    color: #667eea !important;
  }

  /* Join Button Hover */
  [style*="joinButton"]:hover {
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4) !important;
  }

  /* Clear Button Hover */
  [style*="clearButton"]:hover {
    background: #d1d5db !important;
  }

  /* Mobile Styles */
  @media (max-width: 1024px) {
    [style*="desktopNav"] {
      display: none !important;
    }
    
    [style*="searchWrapper"] {
      max-width: 300px !important;
    }
    
    [style*="mobileMenuButton"] {
      display: flex !important;
    }
  }

  @media (max-width: 768px) {
    [style*="searchWrapper"] {
      display: none !important;
    }
    
    [style*="iconButton"] {
      width: 40px !important;
      height: 40px !important;
    }
    
    [style*="loginButton"],
    [style*="joinButton"] {
      display: none !important;
    }
  }

  /* Scrollbar for dropdown */
  [style*="dropdownContent"]::-webkit-scrollbar {
    width: 6px;
  }

  [style*="dropdownContent"]::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  [style*="dropdownContent"]::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 3px;
  }

  [style*="dropdownContent"]::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }
`;
document.head.appendChild(styleSheet);