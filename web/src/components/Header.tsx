import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiShoppingCart, HiUser, HiMenu, HiBookOpen, HiLogout, HiCog } from "react-icons/hi";
import { getCurrentUser, clearCurrentUser } from "../utils/auth";
import { getEnrollments, Enrollment } from "../../../src/api/enrollmentService";

interface Course {
  id: number;
  title: string;
  description?: string;
  price?: number;
  imageUrl?: string;
}

interface HeaderProps {
  cartCount?: number;
}

export const Header: React.FC<HeaderProps> = ({ cartCount = 0 }) => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [myLearningOpen, setMyLearningOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState<Enrollment[]>([]);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initializeHeader();

    // Add scroll listener
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const initializeHeader = async () => {
    try {
      // Check if user is logged in
      const user = getCurrentUser();
      
      if (user && user.userId) {
        console.log("✅ User logged in:", { userId: user.userId, name: user.fullName });
        setIsLoggedIn(true);
        setUserName(user.fullName || user.email || "User");
        
        // Load user's profile image if available
        // Note: You'll need to fetch this from your user profile API
        setProfileImage(null); // Set to actual profile image URL when available
        
        // Load enrolled courses
        await loadEnrolledCourses(user.userId);
      } else {
        console.log("ℹ️ No user logged in");
        setIsLoggedIn(false);
      }

      // Load available courses from API
      await loadAvailableCourses();
    } catch (error) {
      console.error("❌ Error initializing header:", error);
    }
  };

  const loadEnrolledCourses = async (userId: number) => {
    try {
      setLoading(true);
      console.log("📚 Loading enrolled courses for userId:", userId);
      
      const enrollments = await getEnrollments(userId);
      console.log("✅ Loaded enrollments:", enrollments.length);
      
      if (enrollments.length > 0) {
        console.log("📖 Sample enrollment:", {
          courseTitle: enrollments[0].course.title,
          enrolledAt: enrollments[0].enrolledAt
        });
      }
      
      setEnrolledCourses(enrollments);
    } catch (error) {
      console.error("❌ Error loading enrolled courses:", error);
      setEnrolledCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const loadAvailableCourses = async () => {
    try {
      console.log("🔍 Loading available courses...");
      
      // Fetch courses from your API
      const response = await fetch("http://localhost:5000/api/Course", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }

      const data = await response.json();
      console.log("✅ Loaded courses:", data.length);
      
      setCourses(data);
    } catch (error) {
      console.error("❌ Error loading courses:", error);
      // Fallback to empty array if API fails
      setCourses([]);
    }
  };

  const handleLogout = () => {
    console.log("👋 Logging out user");
    clearCurrentUser();
    setIsLoggedIn(false);
    setProfileImage(null);
    setUserName("");
    setEnrolledCourses([]);
    setProfileMenuOpen(false);
    navigate("/");
  };

  return (
    <header style={{
      ...styles.container,
      ...(isScrolled ? styles.containerScrolled : {}),
    }}>
      <div style={styles.content}>
        {/* MODERN LOGO */}
        <div style={styles.logoContainer} onClick={() => navigate("/")}>
          <div style={styles.logoWrapper}>
            <div style={styles.logoIconContainer}>
              <svg style={styles.logoSvg} viewBox="0 0 40 40" fill="none">
                <path
                  d="M20 4L35 12V28L20 36L5 28V12L20 4Z"
                  fill="url(#gradient1)"
                  stroke="white"
                  strokeWidth="1.5"
                />
                <circle cx="20" cy="20" r="6" fill="white" opacity="0.9" />
                <defs>
                  <linearGradient id="gradient1" x1="5" y1="4" x2="35" y2="36">
                    <stop offset="0%" stopColor="#667eea" />
                    <stop offset="100%" stopColor="#764ba2" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div style={styles.logoTextContainer}>
              <span style={styles.logoText}>
                <span style={styles.logoSri}>Srinu</span>
                <span style={styles.logoTech}>tech</span>
                <span style={styles.logoGuru}>Guru</span>
              </span>
              <span style={styles.logoTagline}>Learn • Grow • Excel</span>
            </div>
          </div>
        </div>

        {/* DESKTOP NAVIGATION */}
        <nav style={styles.desktopNav}>
          {/* COURSES DROPDOWN */}
          <div
            style={styles.courseMenu}
            onMouseEnter={() => setCoursesOpen(true)}
            onMouseLeave={() => setTimeout(() => setCoursesOpen(false), 100)}
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
                  <h3 style={styles.dropdownTitle}>Available Courses</h3>
                  <p style={styles.dropdownSubtitle}>{courses.length} courses available</p>
                </div>
                <div style={styles.dropdownContent}>
                  {courses.length > 0 ? (
                    courses.slice(0, 6).map((course) => (
                      <div
                        key={course.id}
                        style={styles.dropdownItem}
                        onClick={() => {
                          navigate(`/course/${course.id}`);
                          setCoursesOpen(false);
                        }}
                      >
                        <div style={styles.courseIcon}>📚</div>
                        <div style={styles.courseItemContent}>
                          <span style={styles.courseItemTitle}>{course.title}</span>
                          {course.price !== undefined && (
                            <span style={styles.courseItemPrice}>
                              ${course.price.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={styles.emptyState}>
                      <p style={styles.emptyText}>No courses available</p>
                    </div>
                  )}
                  {courses.length > 6 && (
                    <div style={styles.viewAllContainer}>
                      <button
                        style={styles.viewAllButton}
                        onClick={() => {
                          navigate("/");
                          setCoursesOpen(false);
                        }}
                      >
                        View All Courses →
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* MY LEARNING DROPDOWN */}
          {isLoggedIn && (
            <div
              style={styles.courseMenu}
              onMouseEnter={() => setMyLearningOpen(true)}
              onMouseLeave={() => setTimeout(() => setMyLearningOpen(false), 100)}
            >
              <button style={styles.navButton}>
                <HiBookOpen size={18} />
                <span>My Learning</span>
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  fill="currentColor"
                  style={{
                    transform: myLearningOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s',
                  }}
                >
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </button>

              {myLearningOpen && (
                <div style={styles.dropdown}>
                  <div style={styles.dropdownHeader}>
                    <h3 style={styles.dropdownTitle}>My Enrolled Courses</h3>
                    <p style={styles.dropdownSubtitle}>
                      {enrolledCourses.length} {enrolledCourses.length === 1 ? 'course' : 'courses'}
                    </p>
                  </div>
                  <div style={styles.dropdownContent}>
                    {loading ? (
                      <div style={styles.loadingState}>
                        <div style={styles.spinner}></div>
                        <p style={styles.loadingText}>Loading courses...</p>
                      </div>
                    ) : enrolledCourses.length > 0 ? (
                      <>
                        {enrolledCourses.slice(0, 5).map((enrollment) => (
                          <div
                            key={enrollment.id}
                            style={styles.dropdownItem}
                            onClick={() => {
                              navigate(`/course/${enrollment.course.id}`);
                              setMyLearningOpen(false);
                            }}
                          >
                            <div style={styles.enrolledIcon}>✓</div>
                            <div style={styles.enrollmentInfo}>
                              <span style={styles.enrollmentTitle}>{enrollment.course.title}</span>
                              <span style={styles.enrollmentDate}>
                                Enrolled {new Date(enrollment.enrolledAt).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </span>
                            </div>
                          </div>
                        ))}
                        <div style={styles.viewAllContainer}>
                          <button
                            style={styles.viewAllButton}
                            onClick={() => {
                              navigate("/my-learning");
                              setMyLearningOpen(false);
                            }}
                          >
                            View All My Courses →
                          </button>
                        </div>
                      </>
                    ) : (
                      <div style={styles.emptyState}>
                        <p style={styles.emptyText}>No enrolled courses yet</p>
                        <button
                          style={styles.browseCourses}
                          onClick={() => {
                            navigate("/");
                            setMyLearningOpen(false);
                          }}
                        >
                          Browse Courses
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          <button style={styles.navButton} onClick={() => navigate("/about")}>
            About
          </button>
          <button style={styles.navButton} onClick={() => navigate("/contact")}>
            Contact
          </button>
        </nav>

        {/* RIGHT ACTIONS */}
        <div style={styles.rightActions}>

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

          {/* Profile / Login */}
          {isLoggedIn ? (
            <div 
              style={styles.profileDropdown}
              onMouseEnter={() => setProfileMenuOpen(true)}
              onMouseLeave={() => setTimeout(() => setProfileMenuOpen(false), 100)}
            >
              <button 
                style={styles.profileButton}
                title="Profile"
              >
                {profileImage ? (
                  <img src={profileImage} alt={userName} style={styles.profileImage} />
                ) : (
                  <div style={styles.profilePlaceholder}>
                    {userName.charAt(0).toUpperCase()}
                  </div>
                )}
              </button>

              {/* Profile Dropdown Menu */}
              {profileMenuOpen && (
                <div style={styles.profileDropdownMenu}>
                  <div style={styles.profileDropdownHeader}>
                    <div style={styles.profileDropdownAvatar}>
                      {profileImage ? (
                        <img src={profileImage} alt={userName} style={styles.profileDropdownImage} />
                      ) : (
                        <div style={styles.profileDropdownPlaceholder}>
                          {userName.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div style={styles.profileDropdownInfo}>
                      <div style={styles.profileDropdownName}>{userName}</div>
                      <div style={styles.profileDropdownEmail}>View Profile</div>
                    </div>
                  </div>

                  <div style={styles.profileDropdownDivider}></div>

                  <div style={styles.profileDropdownItems}>
                    <button
                      style={styles.profileDropdownItem}
                      onClick={() => {
                        navigate("/profile");
                        setProfileMenuOpen(false);
                      }}
                    >
                      <HiUser size={18} />
                      <span>My Profile</span>
                    </button>

                    <button
                      style={styles.profileDropdownItem}
                      onClick={() => {
                        navigate("/my-learning");
                        setProfileMenuOpen(false);
                      }}
                    >
                      <HiBookOpen size={18} />
                      <span>My Learning ({enrolledCourses.length})</span>
                    </button>

                    <button
                      style={styles.profileDropdownItem}
                      onClick={() => {
                        navigate("/settings");
                        setProfileMenuOpen(false);
                      }}
                    >
                      <HiCog size={18} />
                      <span>Settings</span>
                    </button>
                  </div>

                  <div style={styles.profileDropdownDivider}></div>

                  <button
                    style={styles.profileDropdownItemLogout}
                    onClick={handleLogout}
                  >
                    <HiLogout size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Divider */}
              <div style={styles.divider}></div>

              {/* Login Button */}
              <button 
                style={styles.loginButton} 
                onClick={() => navigate("/login")}
              >
                Log in
              </button>

              {/* Sign Up Button */}
              <button 
                style={styles.signupButton} 
                onClick={() => navigate("/login")}
              >
                Sign Up
              </button>
            </>
          )}

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
              navigate("/");
              setMobileMenuOpen(false);
            }}
          >
            Browse Courses
          </button>
          {isLoggedIn && (
            <button 
              style={styles.mobileMenuItem}
              onClick={() => {
                navigate("/my-learning");
                setMobileMenuOpen(false);
              }}
            >
              My Learning ({enrolledCourses.length})
            </button>
          )}
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
          {isLoggedIn && (
            <button 
              style={styles.mobileMenuItem}
              onClick={() => {
                navigate("/profile");
                setMobileMenuOpen(false);
              }}
            >
              Profile
            </button>
          )}
          <div style={styles.mobileDivider}></div>
          {isLoggedIn ? (
            <button 
              style={styles.mobileMenuItemAccent}
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}
            >
              Logout
            </button>
          ) : (
            <>
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
                  navigate("/login");
                  setMobileMenuOpen(false);
                }}
              >
                Join for Free
              </button>
            </>
          )}
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

  // Modern Logo
  logoContainer: {
    cursor: "pointer",
    transition: "transform 0.3s ease",
  },
  logoWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  logoIconContainer: {
    width: "48px",
    height: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "14px",
    background: "white",
    boxShadow: "0 4px 16px rgba(102, 126, 234, 0.25)",
    transition: "all 0.3s ease",
  },
  logoSvg: {
    width: "32px",
    height: "32px",
  },
  logoTextContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  logoText: {
    fontSize: "22px",
    fontWeight: 800,
    lineHeight: 1,
    display: "flex",
    alignItems: "center",
  },
  logoSri: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  logoTech: {
    color: "#1f2937",
  },
  logoGuru: {
    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  logoTagline: {
    fontSize: "9px",
    fontWeight: 600,
    color: "#9ca3af",
    letterSpacing: "1px",
    textTransform: "uppercase",
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
  enrollmentInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  enrollmentTitle: {
    fontSize: "15px",
    fontWeight: 600,
    color: "#111827",
  },
  enrollmentDate: {
    fontSize: "12px",
    color: "#6b7280",
  },
  emptyState: {
    padding: "32px 24px",
    textAlign: "center",
  },
  emptyText: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "16px",
  },
  browseCourses: {
    padding: "10px 20px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
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
  signupButton: {
    padding: "10px 20px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    border: "none",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: 600,
    color: "white",
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
  },

  // Profile Dropdown
  profileDropdown: {
    position: "relative",
  },
  profileButton: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    border: "2px solid #e5e7eb",
    background: "transparent",
    cursor: "pointer",
    overflow: "hidden",
    transition: "all 0.2s",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  profilePlaceholder: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
  },

  // Profile Dropdown Menu
  profileDropdownMenu: {
    position: "absolute",
    top: "calc(100% + 12px)",
    right: 0,
    background: "white",
    minWidth: "280px",
    borderRadius: "16px",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
    overflow: "hidden",
    zIndex: 2000,
    animation: "slideDown 0.2s ease-out",
  },
  profileDropdownHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "20px 24px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    cursor: "pointer",
  },
  profileDropdownAvatar: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    overflow: "hidden",
    border: "3px solid rgba(255, 255, 255, 0.3)",
    flexShrink: 0,
  },
  profileDropdownImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  profileDropdownPlaceholder: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255, 255, 255, 0.3)",
    color: "white",
    fontSize: "20px",
    fontWeight: "bold",
  },
  profileDropdownInfo: {
    flex: 1,
  },
  profileDropdownName: {
    fontSize: "16px",
    fontWeight: 700,
    color: "white",
    marginBottom: "2px",
  },
  profileDropdownEmail: {
    fontSize: "13px",
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: 500,
  },
  profileDropdownDivider: {
    height: "1px",
    background: "#e5e7eb",
  },
  profileDropdownItems: {
    padding: "8px",
  },
  profileDropdownItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    width: "100%",
    padding: "12px 16px",
    background: "transparent",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: 600,
    color: "#374151",
    cursor: "pointer",
    transition: "all 0.2s",
    textAlign: "left",
  },
  profileDropdownItemLogout: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    width: "100%",
    padding: "16px 24px",
    background: "transparent",
    border: "none",
    fontSize: "15px",
    fontWeight: 600,
    color: "#ef4444",
    cursor: "pointer",
    transition: "all 0.2s",
    textAlign: "left",
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

  button {
    background: #667eea;
    color: white;
    transition: background 0.2s ease;
  }

  button:active {
    opacity: 0.95;
  }
  
  [style*="logoContainer"] [style*="logoIconContainer"] {
    transform: scale(1);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  }
  
  [style*="navButton"] {
    background: rgba(102, 126, 234, 0.08);
    color: #333;
  }
  
  [style*="dropdownItem"] {
    background: #f5f5f5;
  }
  
  [style*="iconButton"] {
    background: rgba(102, 126, 234, 0.08);
    border-color: #667eea;
    color: #667eea;
  }
  
  [style*="profileDropdownItem"] {
    background: rgba(102, 126, 234, 0.08);
    color: #333;
  }
  
  [style*="profileDropdownItemLogout"] {
    background: rgba(239, 68, 68, 0.08);
  }
  
  input:focus {
    border-color: #667eea !important;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) !important;
  }

  /* Tooltip Styling */
  [title] {
    position: relative;
  }

  [title]:hover::before {
    content: attr(title);
    position: absolute;
    bottom: 125%;
    left: 50%;
    transform: translateX(-50%);
    background: white;
    color: #1a202c;
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
    white-space: nowrap;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    pointer-events: none;
  }

  [title]:hover::after {
    content: '';
    position: absolute;
    bottom: 120%;
    left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-top-color: white;
    z-index: 1000;
    pointer-events: none;
  }

  @media (max-width: 1024px) {
    [style*="desktopNav"] {
      display: none !important;
    }
    
    [style*="searchWrapper"] {
      display: none !important;
    }
    
    [style*="mobileMenuButton"] {
      display: flex !important;
    }
    
    [style*="logoTagline"] {
      display: none !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default Header;  