import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiShoppingCart, HiUser, HiMenu, HiX, HiBookOpen, HiLogout, HiCog, HiSearch } from "react-icons/hi";

interface Course {
  id: number;
  title: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  category?: string;
}

interface Enrollment {
  id: number;
  course: Course;
  enrolledAt: string;
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
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userName, setUserName] = useState("John Doe");
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for demonstration
  const mockCourses: Course[] = [
    { id: 1, title: "React Fundamentals & Hooks", price: 49.99, category: "Development", imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400" },
    { id: 2, title: "Advanced TypeScript Patterns", price: 59.99, category: "Development", imageUrl: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400" },
    { id: 3, title: "Node.js Complete Guide", price: 54.99, category: "Development", imageUrl: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400" },
    { id: 4, title: "UI/UX Design Masterclass", price: 44.99, category: "Design", imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400" },
    { id: 5, title: "Digital Marketing Strategy", price: 39.99, category: "Marketing", imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400" },
    { id: 6, title: "Python for Data Science", price: 64.99, category: "Development", imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400" },
    { id: 7, title: "Full-Stack Web Development", price: 79.99, category: "Development", imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400" },
    { id: 8, title: "Graphic Design Essentials", price: 34.99, category: "Design", imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400" },
  ];

  const mockEnrollments: Enrollment[] = [
    { id: 1, course: mockCourses[0], enrolledAt: "2025-01-15T10:00:00Z" },
    { id: 2, course: mockCourses[1], enrolledAt: "2025-01-10T14:30:00Z" },
    { id: 3, course: mockCourses[5], enrolledAt: "2025-01-05T09:15:00Z" },
  ];

  useEffect(() => {
    // Simulate loading courses
    setTimeout(() => {
      setCourses(mockCourses);
      setEnrolledCourses(mockEnrollments);
    }, 500);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    console.log("Logging out...");
    setIsLoggedIn(false);
    setProfileMenuOpen(false);
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedCourses = filteredCourses.reduce((acc, course) => {
    const category = course.category || "Other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(course);
    return acc;
  }, {} as Record<string, Course[]>);

  return (
    <header style={{
      ...styles.container,
      ...(isScrolled ? styles.containerScrolled : {}),
    }}>
      <div style={styles.content}>
        {/* LOGO */}
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
          {/* COURSES DROPDOWN - ENHANCED */}
          <div
            style={styles.courseMenu}
            onMouseEnter={() => setCoursesOpen(true)}
            onMouseLeave={() => setTimeout(() => setCoursesOpen(false), 200)}
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
                  transition: 'transform 0.3s ease',
                }}
              >
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </button>

            {coursesOpen && (
              <div style={styles.megaDropdown}>
                {/* Search Bar */}
                <div style={styles.dropdownSearchContainer}>
                  <HiSearch style={styles.searchIcon} />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={styles.dropdownSearch}
                  />
                </div>

                {/* Course Categories */}
                <div style={styles.megaContent}>
                  {Object.keys(groupedCourses).length > 0 ? (
                    Object.entries(groupedCourses).map(([category, categoryCourses]) => (
                      <div key={category} style={styles.categorySection}>
                        <h4 style={styles.categoryTitle}>
                          {category}
                          <span style={styles.categoryCount}>({categoryCourses.length})</span>
                        </h4>
                        <div style={styles.categoryGrid}>
                          {categoryCourses.map((course) => (
                            <div
                              key={course.id}
                              style={styles.courseCard}
                            >
                              <div style={styles.courseCardImage}>
                                <img 
                                  src={course.imageUrl || "https://via.placeholder.com/300x160"} 
                                  alt={course.title}
                                  style={styles.courseImage}
                                />
                              </div>
                              <div style={styles.courseCardContent}>
                                <h5 style={styles.courseCardTitle}>{course.title}</h5>
                                <div style={styles.courseCardFooter}>
                                  <span style={styles.coursePrice}>${course.price?.toFixed(2)}</span>
                                  <span style={styles.courseArrow}>→</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={styles.emptySearch}>
                      <p style={styles.emptyText}>No courses found matching "{searchQuery}"</p>
                    </div>
                  )}
                </div>

                {/* View All Footer */}
                <div style={styles.dropdownFooter}>
                  <button
                    style={styles.viewAllButton}
                    onClick={() => {
                      navigate("/courses");
                      setCoursesOpen(false);
                    }}
                  >
                    View All {courses.length} Courses →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* MY LEARNING DROPDOWN */}
          {isLoggedIn && (
            <div
              style={styles.courseMenu}
              onMouseEnter={() => setMyLearningOpen(true)}
              onMouseLeave={() => setTimeout(() => setMyLearningOpen(false), 200)}
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
                    transition: 'transform 0.3s ease',
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
                    {enrolledCourses.length > 0 ? (
                      <>
                        {enrolledCourses.map((enrollment) => (
                          <div
                            key={enrollment.id}
                            style={styles.enrollmentItem}
                            onClick={() => {
                              navigate(`/course/${enrollment.course.id}`);
                              setMyLearningOpen(false);
                            }}
                          >
                            <div style={styles.enrollmentImage}>
                              <img 
                                src={enrollment.course.imageUrl || "https://via.placeholder.com/60"} 
                                alt={enrollment.course.title}
                                style={styles.enrollmentImg}
                              />
                            </div>
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
                            <div style={styles.enrolledBadge}>✓</div>
                          </div>
                        ))}
                        <div style={styles.viewAllContainer}>
                          <button
                            style={styles.viewAllButtonAlt}
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
              onMouseLeave={() => setTimeout(() => setProfileMenuOpen(false), 200)}
            >
              <button style={styles.profileButton}>
                <div style={styles.profilePlaceholder}>
                  {userName.charAt(0).toUpperCase()}
                </div>
              </button>

              {profileMenuOpen && (
                <div style={styles.profileDropdownMenu}>
                  <div style={styles.profileDropdownHeader}>
                    <div style={styles.profileDropdownAvatar}>
                      <div style={styles.profileDropdownPlaceholder}>
                        {userName.charAt(0).toUpperCase()}
                      </div>
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
              <div style={styles.divider}></div>
              <button style={styles.loginButton} onClick={() => navigate("/login")}>
                Log in
              </button>
              <button style={styles.signupButton} onClick={() => navigate("/login")}>
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

const styles: Record<string, React.CSSProperties> = {
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.98)",
    backdropFilter: "blur(20px)",
    padding: "16px 32px",
    borderBottom: "1px solid rgba(229, 231, 235, 0.5)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  containerScrolled: {
    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.06)",
    borderBottom: "1px solid rgba(229, 231, 235, 0.8)",
  },
  content: {
    display: "flex",
    alignItems: "center",
    gap: "32px",
    maxWidth: "1600px",
    margin: "0 auto",
  },
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
    boxShadow: "0 8px 24px rgba(102, 126, 234, 0.2)",
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
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: 600,
    color: "#374151",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  courseMenu: {
    position: "relative",
  },
  
  // MEGA DROPDOWN STYLES
  megaDropdown: {
    position: "absolute",
    top: "calc(100% + 16px)",
    left: "-100px",
    background: "white",
    width: "900px",
    maxHeight: "600px",
    borderRadius: "24px",
    boxShadow: "0 24px 60px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.05)",
    overflow: "hidden",
    zIndex: 2000,
    animation: "slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  
  dropdownSearchContainer: {
    position: "relative",
    padding: "24px 24px 16px 24px",
    borderBottom: "1px solid #f3f4f6",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  
  searchIcon: {
    position: "absolute",
    left: "38px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#9ca3af",
    fontSize: "18px",
  },
  
  dropdownSearch: {
    width: "100%",
    padding: "14px 20px 14px 44px",
    borderRadius: "12px",
    border: "2px solid rgba(255,255,255,0.3)",
    fontSize: "15px",
    outline: "none",
    transition: "all 0.2s ease",
    background: "rgba(255,255,255,0.95)",
  },
  
  megaContent: {
    maxHeight: "450px",
    overflowY: "auto" as const,
    padding: "24px",
  },
  
  categorySection: {
    marginBottom: "32px",
  },
  
  categoryTitle: {
    fontSize: "16px",
    fontWeight: 700,
    color: "#111827",
    marginBottom: "16px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  
  categoryCount: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#6b7280",
    background: "#f3f4f6",
    padding: "2px 8px",
    borderRadius: "6px",
  },
  
  categoryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
  },
  
  courseCard: {
    display: "flex",
    flexDirection: "column",
    background: "#f9fafb",
    borderRadius: "16px",
    overflow: "hidden",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    border: "2px solid transparent",
  },
  
  courseCardImage: {
    width: "100%",
    height: "120px",
    overflow: "hidden",
    background: "#e5e7eb",
  },
  
  courseImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.4s ease",
  },
  
  courseCardContent: {
    padding: "14px",
  },
  
  courseCardTitle: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#111827",
    marginBottom: "8px",
    lineHeight: 1.4,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  
  courseCardFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  
  coursePrice: {
    fontSize: "16px",
    fontWeight: 700,
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  
  courseArrow: {
    fontSize: "18px",
    color: "#9ca3af",
    transition: "transform 0.2s ease",
  },
  
  dropdownFooter: {
    padding: "16px 24px",
    borderTop: "1px solid #f3f4f6",
    background: "#fafafa",
  },
  
  viewAllButton: {
    width: "100%",
    padding: "14px 24px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  
  emptySearch: {
    padding: "40px",
    textAlign: "center",
  },

  // Standard Dropdown (My Learning)
  dropdown: {
    position: "absolute",
    top: "calc(100% + 16px)",
    left: 0,
    background: "white",
    minWidth: "380px",
    maxWidth: "420px",
    borderRadius: "20px",
    boxShadow: "0 24px 60px rgba(0, 0, 0, 0.12)",
    overflow: "hidden",
    zIndex: 2000,
    animation: "slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  },
  dropdownHeader: {
    padding: "24px",
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
  enrollmentItem: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "16px 20px",
    borderBottom: "1px solid #f3f4f6",
    cursor: "pointer",
    transition: "all 0.2s ease",
    position: "relative",
  },
  enrollmentImage: {
    width: "60px",
    height: "60px",
    borderRadius: "10px",
    overflow: "hidden",
    flexShrink: 0,
    background: "#f3f4f6",
  },
  enrollmentImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  enrollmentInfo: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  enrollmentTitle: {
    fontSize: "15px",
    fontWeight: 600,
    color: "#111827",
    lineHeight: 1.3,
  },
  enrollmentDate: {
    fontSize: "12px",
    color: "#6b7280",
  },
  enrolledBadge: {
    width: "24px",
    height: "24px",
    background: "#10b981",
    color: "white",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: 700,
    flexShrink: 0,
  },
  viewAllContainer: {
    padding: "16px 20px",
    borderTop: "1px solid #f3f4f6",
  },
  viewAllButtonAlt: {
    width: "100%",
    padding: "12px",
    background: "transparent",
    border: "2px solid #e5e7eb",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: 600,
    color: "#374151",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  emptyState: {
    padding: "40px 24px",
    textAlign: "center",
  },
  emptyText: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "16px",
  },
  browseCourses: {
    padding: "12px 24px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  rightActions: {
    marginLeft: "auto",
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
    transition: "all 0.2s ease",
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
    boxShadow: "0 4px 12px rgba(239, 68, 68, 0.4)",
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
    transition: "all 0.2s ease",
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
    transition: "all 0.2s ease",
    boxShadow: "0 4px 16px rgba(102, 126, 234, 0.3)",
  },
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
    transition: "all 0.2s ease",
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
  profileDropdownMenu: {
    position: "absolute",
    top: "calc(100% + 16px)",
    right: 0,
    background: "white",
    minWidth: "280px",
    borderRadius: "20px",
    boxShadow: "0 24px 60px rgba(0, 0, 0, 0.12)",
    overflow: "hidden",
    zIndex: 2000,
    animation: "slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
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
    transition: "all 0.2s ease",
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
    transition: "all 0.2s ease",
    textAlign: "left",
  },
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
    transition: "all 0.2s ease",
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
    transition: "all 0.2s ease",
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
    transition: "all 0.2s ease",
  },
};

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

  [style*="navButton"]:hover {
    background: rgba(102, 126, 234, 0.08);
  }
  
  [style*="courseCard"]:hover {
    border-color: #667eea;
    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.15);
  }
  
  [style*="courseCard"]:hover [style*="courseImage"] {
    transform: scale(1.1);
  }
  
  [style*="courseCard"]:hover [style*="courseArrow"] {
    transform: translateX(4px);
    color: #667eea;
  }
  
  [style*="enrollmentItem"]:hover {
    background: #f9fafb;
  }
  
  [style*="iconButton"]:hover {
    background: rgba(102, 126, 234, 0.08);
    border-color: #667eea;
  }
  
  [style*="profileDropdownItem"]:hover {
    background: rgba(102, 126, 234, 0.08);
  }
  
  [style*="loginButton"]:hover {
    background: #f9fafb;
    border-color: #667eea;
  }
  
  [style*="signupButton"]:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
  }
  
  [style*="viewAllButton"]:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
  }
  
  [style*="viewAllButtonAlt"]:hover {
    background: #f9fafb;
    border-color: #667eea;
  }

  input:focus {
    border-color: rgba(255,255,255,0.6) !important;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.2) !important;
  }

  @media (max-width: 1024px) {
    [style*="desktopNav"] {
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