import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiShoppingCart, HiUser, HiMenu, HiBookOpen, HiLogout, HiCog, HiX, HiSearch } from "react-icons/hi";
import { getCurrentUser, clearCurrentUser } from "../utils/auth";
import { getEnrollments, Enrollment } from "../../../src/api/enrollmentService";
import { getAllCourses } from "../services/courseService";

interface Course {
  id: number;
  title: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  category?: string;
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
  const [courseSearch, setCourseSearch] = useState("");

  useEffect(() => {
    initializeHeader();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const initializeHeader = async () => {
    try {
      const user = getCurrentUser();
      
      if (user && user.userId) {
        console.log("✅ User logged in:", { userId: user.userId, name: user.fullName });
        setIsLoggedIn(true);
        setUserName(user.fullName || user.email || "User");
        setProfileImage(null);
        await loadEnrolledCourses(user.userId);
      } else {
        console.log("ℹ️ No user logged in");
        setIsLoggedIn(false);
      }

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
      
      const data = await getAllCourses();
      console.log("✅ Loaded courses:", data.length);
      
      setCourses(data);
    } catch (error) {
      console.error("❌ Error loading courses:", error);
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

  // Group courses by category
  const coursesByCategory = courses.reduce((acc, course) => {
    const category = course.category || "Other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(course);
    return acc;
  }, {} as Record<string, Course[]>);

  // Filter courses based on search
  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(courseSearch.toLowerCase())
  );

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-content">
          {/* Logo */}
          <div className="logo-container" onClick={() => navigate("/")}>
            <div className="logo-wrapper">
              <div className="logo-icon">
                <svg viewBox="0 0 40 40" fill="none">
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
              <div className="logo-text-container">
                <span className="logo-text">
                  <span className="logo-sri">Srinu</span>
                  <span className="logo-tech">tech</span>
                  <span className="logo-guru">Guru</span>
                </span>
                <span className="logo-tagline">Learn • Grow • Excel</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            {/* Courses Dropdown */}
            <div
              className="nav-dropdown"
              onMouseEnter={() => setCoursesOpen(true)}
              onMouseLeave={() => setCoursesOpen(false)}
            >
              <button className="nav-button">
                <span>Courses</span>
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  fill="currentColor"
                  className={`dropdown-arrow ${coursesOpen ? 'open' : ''}`}
                >
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </button>

              {coursesOpen && (
                <div className="dropdown-mega">
                  <div className="dropdown-search">
                    <HiSearch className="search-icon" />
                    <input
                      type="text"
                      placeholder="Search courses..."
                      value={courseSearch}
                      onChange={(e) => setCourseSearch(e.target.value)}
                      className="search-input"
                    />
                  </div>

                  {courseSearch ? (
                    // Search Results View
                    <div className="dropdown-section">
                      <h3 className="section-title">Search Results ({filteredCourses.length})</h3>
                      <div className="courses-list">
                        {filteredCourses.length > 0 ? (
                          filteredCourses.map((course) => (
                            <div
                              key={course.id}
                              className="course-item"
                            >
                              <div className="course-image">
                                {course.imageUrl ? (
                                  <img src={course.imageUrl} alt={course.title} />
                                ) : (
                                  <div className="course-placeholder">📚</div>
                                )}
                              </div>
                              <div className="course-info">
                                <div className="course-title">{course.title}</div>
                                <div className="course-meta">
                                  {course.category && (
                                    <span className="course-category">{course.category}</span>
                                  )}
                                  {course.price !== undefined && (
                                    <span className="course-price">₹{course.price.toFixed(2)}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="empty-state">
                            <p>No courses found matching "{courseSearch}"</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    // Category View
                    <div className="dropdown-categories">
                      {Object.keys(coursesByCategory).length > 0 ? (
                        Object.entries(coursesByCategory).map(([category, categoryCourses]) => (
                          <div key={category} className="category-section">
                            <h3 className="category-title">
                              {category} <span className="category-count">({categoryCourses.length})</span>
                            </h3>
                            <div className="courses-list">
                              {categoryCourses.map((course) => (
                                <div
                                  key={course.id}
                                  className="course-item"
                                >
                                  <div className="course-image">
                                    {course.imageUrl ? (
                                      <img src={course.imageUrl} alt={course.title} />
                                    ) : (
                                      <div className="course-placeholder">📚</div>
                                    )}
                                  </div>
                                  <div className="course-info">
                                    <div className="course-title">{course.title}</div>
                                    {course.price !== undefined && (
                                      <div className="course-price">₹{course.price.toFixed(2)}</div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="empty-state">
                          <p>No courses available at the moment</p>
                        </div>
                      )}
                      
                      {courses.length > 0 && (
                        <div className="dropdown-footer">
                          <button
                            className="view-all-courses-btn"
                            onClick={() => {
                              navigate("/");
                              setCoursesOpen(false);
                            }}
                          >
                            View All {courses.length} Courses →
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* My Learning Dropdown */}
            {isLoggedIn && (
              <div
                className="nav-dropdown"
                onMouseEnter={() => setMyLearningOpen(true)}
                onMouseLeave={() => setMyLearningOpen(false)}
              >
                <button className="nav-button">
                  <HiBookOpen size={18} />
                  <span>My Learning</span>
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 16 16" 
                    fill="currentColor"
                    className={`dropdown-arrow ${myLearningOpen ? 'open' : ''}`}
                  >
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
                  </svg>
                </button>

                {myLearningOpen && (
                  <div className="dropdown-menu">
                    <div className="dropdown-header">
                      <h3 className="dropdown-title">My Enrolled Courses</h3>
                      <p className="dropdown-subtitle">
                        {enrolledCourses.length} {enrolledCourses.length === 1 ? 'course' : 'courses'}
                      </p>
                    </div>
                    <div className="dropdown-content">
                      {loading ? (
                        <div className="loading-state">
                          <div className="spinner"></div>
                          <p>Loading courses...</p>
                        </div>
                      ) : enrolledCourses.length > 0 ? (
                        <>
                          {enrolledCourses.slice(0, 5).map((enrollment) => (
                            <div
                              key={enrollment.id}
                              className="enrollment-item"
                              onClick={() => {
                                navigate(`/course/${enrollment.course.id}`);
                                setMyLearningOpen(false);
                              }}
                            >
                              <div className="enrolled-badge">✓</div>
                              <div className="enrollment-info">
                                <div className="enrollment-title">{enrollment.course.title}</div>
                                <div className="enrollment-date">
                                  Enrolled {new Date(enrollment.enrolledAt).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                  })}
                                </div>
                              </div>
                            </div>
                          ))}
                          <button
                            className="view-all-btn"
                            onClick={() => {
                              navigate("/my-learning");
                              setMyLearningOpen(false);
                            }}
                          >
                            View All My Courses →
                          </button>
                        </>
                      ) : (
                        <div className="empty-state">
                          <p>No enrolled courses yet</p>
                          <button
                            className="browse-btn"
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

            <button className="nav-button" onClick={() => navigate("/about")}>
              About
            </button>
            <button className="nav-button" onClick={() => navigate("/contact")}>
              Contact
            </button>
          </nav>

          {/* Right Actions */}
          <div className="right-actions">
            {/* Cart */}
            <button 
              className="icon-button"
              onClick={() => navigate("/cart")}
              title="Shopping Cart"
            >
              <HiShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="cart-badge">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </button>

            {/* Profile / Login */}
            {isLoggedIn ? (
              <div 
                className="profile-dropdown"
                onMouseEnter={() => setProfileMenuOpen(true)}
                onMouseLeave={() => setProfileMenuOpen(false)}
              >
                <button className="profile-button">
                  {profileImage ? (
                    <img src={profileImage} alt={userName} />
                  ) : (
                    <div className="profile-avatar">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                  )}
                </button>

                {profileMenuOpen && (
                  <div className="profile-menu">
                    <div className="profile-menu-header">
                      <div className="profile-menu-avatar">
                        {profileImage ? (
                          <img src={profileImage} alt={userName} />
                        ) : (
                          <div className="profile-avatar">
                            {userName.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className="profile-menu-info">
                        <div className="profile-name">{userName}</div>
                        <div className="profile-link">View Profile</div>
                      </div>
                    </div>

                    <div className="menu-divider"></div>

                    <div className="menu-items">
                      <button
                        className="menu-item"
                        onClick={() => {
                          navigate("/profile");
                          setProfileMenuOpen(false);
                        }}
                      >
                        <HiUser size={18} />
                        <span>My Profile</span>
                      </button>

                      <button
                        className="menu-item"
                        onClick={() => {
                          navigate("/my-learning");
                          setProfileMenuOpen(false);
                        }}
                      >
                        <HiBookOpen size={18} />
                        <span>My Learning ({enrolledCourses.length})</span>
                      </button>

                      <button
                        className="menu-item"
                        onClick={() => {
                          navigate("/settings");
                          setProfileMenuOpen(false);
                        }}
                      >
                        <HiCog size={18} />
                        <span>Settings</span>
                      </button>
                    </div>

                    <div className="menu-divider"></div>

                    <button className="menu-item logout" onClick={handleLogout}>
                      <HiLogout size={18} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="auth-divider"></div>
                <button className="login-btn" onClick={() => navigate("/auth")}>
                  Log in
                </button>
                <button className="signup-btn" onClick={() => navigate("/auth")}>
                  Sign Up
                </button>
              </>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu">
            <button 
              className="mobile-menu-item"
              onClick={() => {
                navigate("/");
                setMobileMenuOpen(false);
              }}
            >
              Browse Courses
            </button>
            {isLoggedIn && (
              <button 
                className="mobile-menu-item"
                onClick={() => {
                  navigate("/my-learning");
                  setMobileMenuOpen(false);
                }}
              >
                My Learning ({enrolledCourses.length})
              </button>
            )}
            <button 
              className="mobile-menu-item"
              onClick={() => {
                navigate("/about");
                setMobileMenuOpen(false);
              }}
            >
              About
            </button>
            <button 
              className="mobile-menu-item"
              onClick={() => {
                navigate("/contact");
                setMobileMenuOpen(false);
              }}
            >
              Contact
            </button>
            {isLoggedIn && (
              <button 
                className="mobile-menu-item"
                onClick={() => {
                  navigate("/profile");
                  setMobileMenuOpen(false);
                }}
              >
                Profile
              </button>
            )}
            <div className="mobile-divider"></div>
            {isLoggedIn ? (
              <button 
                className="mobile-menu-item accent"
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
                  className="mobile-menu-item primary"
                  onClick={() => {
                    navigate("/auth");
                    setMobileMenuOpen(false);
                  }}
                >
                  Log in
                </button>
                <button 
                  className="mobile-menu-item accent"
                  onClick={() => {
                    navigate("/auth");
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

      <style>{`
        /* Header Base Styles */
        .header {
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(10px);
          padding: 16px 32px;
          border-bottom: 1px solid rgba(229, 231, 235, 0.5);
          position: sticky;
          top: 0;
          z-index: 1000;
          transition: all 0.3s ease;
        }

        .header.scrolled {
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border-bottom: 1px solid rgba(229, 231, 235, 0.8);
        }

        .header-content {
          display: flex;
          align-items: center;
          gap: 32px;
          max-width: 1600px;
          margin: 0 auto;
        }

        /* Logo Styles */
        .logo-container {
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .logo-container:hover {
          transform: scale(1.02);
        }

        .logo-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          background: white;
          box-shadow: 0 4px 16px rgba(102, 126, 234, 0.25);
          transition: all 0.3s ease;
        }

        .logo-icon svg {
          width: 32px;
          height: 32px;
        }

        .logo-text-container {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .logo-text {
          font-size: 22px;
          font-weight: 800;
          line-height: 1;
          display: flex;
          align-items: center;
        }

        .logo-sri {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .logo-tech {
          color: #1f2937;
        }

        .logo-guru {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .logo-tagline {
          font-size: 9px;
          font-weight: 600;
          color: #9ca3af;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        /* Desktop Navigation */
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 1;
        }

        .nav-dropdown {
          position: relative;
        }

        .nav-button {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 16px;
          background: transparent;
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          color: #374151;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .nav-button:hover {
          background: rgba(102, 126, 234, 0.08);
          color: #667eea;
        }

        .dropdown-arrow {
          transition: transform 0.2s ease;
        }

        .dropdown-arrow.open {
          transform: rotate(180deg);
        }

        /* Mega Dropdown for Courses */
        .dropdown-mega {
          position: absolute;
          top: calc(100% + 12px);
          left: 0;
          background: white;
          min-width: 800px;
          max-width: 900px;
          max-height: 600px;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          overflow: hidden;
          z-index: 2000;
          animation: slideDown 0.2s ease-out;
        }

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

        /* Search in Dropdown */
        .dropdown-search {
          padding: 20px 24px;
          border-bottom: 1px solid #e5e7eb;
          position: relative;
          background: #f9fafb;
        }

        .search-icon {
          position: absolute;
          left: 36px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          pointer-events: none;
        }

        .search-input {
          width: 100%;
          padding: 12px 16px 12px 40px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 15px;
          outline: none;
          transition: all 0.2s;
        }

        .search-input:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        /* Categories Layout */
        .dropdown-categories {
          padding: 24px;
          max-height: 500px;
          overflow-y: auto;
          display: grid;
          gap: 32px;
        }

        .category-section {
          border-bottom: 1px solid #f3f4f6;
          padding-bottom: 24px;
        }

        .category-section:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .category-title {
          font-size: 16px;
          font-weight: 700;
          color: #111827;
          margin: 0 0 16px 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .category-count {
          font-size: 13px;
          color: #6b7280;
          font-weight: 500;
        }

        /* Course List */
        .courses-list {
          display: grid;
          gap: 12px;
        }

        .course-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border-radius: 12px;
          cursor: default;
          transition: all 0.2s ease;
        }

        .course-item:hover {
          background: #f9fafb;
        }

        .course-image {
          width: 60px;
          height: 60px;
          border-radius: 10px;
          overflow: hidden;
          flex-shrink: 0;
          background: linear-gradient(135deg, #667eea, #764ba2);
        }

        .course-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .course-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          background: linear-gradient(135deg, #667eea, #764ba2);
        }

        .course-info {
          flex: 1;
          min-width: 0;
        }

        .course-title {
          font-size: 14px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 4px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .course-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
        }

        .course-category {
          color: #6b7280;
          padding: 2px 8px;
          background: #f3f4f6;
          border-radius: 4px;
        }

        .course-price {
          color: #667eea;
          font-weight: 600;
        }

        .view-more-btn {
          margin-top: 12px;
          padding: 8px 16px;
          background: transparent;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          color: #667eea;
          cursor: pointer;
          transition: all 0.2s;
          width: 100%;
        }

        .view-more-btn:hover {
          background: rgba(102, 126, 234, 0.08);
          border-color: #667eea;
        }

        .dropdown-footer {
          padding: 16px 24px;
          background: #f9fafb;
          border-top: 1px solid #e5e7eb;
        }

        .view-all-courses-btn {
          width: 100%;
          padding: 12px 24px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .view-all-courses-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }

        /* Regular Dropdown Menu */
        .dropdown-menu {
          position: absolute;
          top: calc(100% + 12px);
          left: 0;
          background: white;
          min-width: 320px;
          max-width: 400px;
          border-radius: 16px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          overflow: hidden;
          z-index: 2000;
          animation: slideDown 0.2s ease-out;
        }

        .dropdown-header {
          padding: 20px 24px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .dropdown-title {
          font-size: 18px;
          font-weight: 700;
          margin: 0 0 4px 0;
        }

        .dropdown-subtitle {
          font-size: 13px;
          opacity: 0.9;
          margin: 0;
        }

        .dropdown-content {
          max-height: 400px;
          overflow-y: auto;
        }

        .enrollment-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 24px;
          border-bottom: 1px solid #f3f4f6;
          cursor: pointer;
          transition: all 0.2s;
        }

        .enrollment-item:hover {
          background: #f9fafb;
        }

        .enrolled-badge {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #10b981;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 700;
          flex-shrink: 0;
        }

        .enrollment-info {
          flex: 1;
          min-width: 0;
        }

        .enrollment-title {
          font-size: 15px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 4px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .enrollment-date {
          font-size: 12px;
          color: #6b7280;
        }

        .view-all-btn {
          width: 100%;
          padding: 14px 24px;
          background: transparent;
          border: none;
          border-top: 1px solid #e5e7eb;
          font-size: 14px;
          font-weight: 600;
          color: #667eea;
          cursor: pointer;
          transition: all 0.2s;
          text-align: center;
        }

        .view-all-btn:hover {
          background: rgba(102, 126, 234, 0.08);
        }

        .loading-state,
        .empty-state {
          padding: 32px 24px;
          text-align: center;
        }

        .spinner {
          width: 32px;
          height: 32px;
          border: 3px solid rgba(102, 126, 234, 0.2);
          border-top-color: #667eea;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: 0 auto 12px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .empty-state p {
          font-size: 14px;
          color: #6b7280;
          margin: 0 0 16px 0;
        }

        .browse-btn {
          padding: 10px 20px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .browse-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        /* Right Actions */
        .right-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .icon-button {
          position: relative;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: transparent;
          border: 2px solid #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          color: #374151;
        }

        .icon-button:hover {
          background: rgba(102, 126, 234, 0.08);
          border-color: #667eea;
          color: #667eea;
        }

        .cart-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: white;
          font-size: 11px;
          font-weight: 700;
          padding: 3px 6px;
          border-radius: 10px;
          min-width: 20px;
          text-align: center;
          box-shadow: 0 2px 8px rgba(239, 68, 68, 0.4);
        }

        .auth-divider {
          width: 1px;
          height: 32px;
          background: #e5e7eb;
          margin: 0 4px;
        }

        .login-btn {
          padding: 10px 20px;
          background: white;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          color: #374151;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .login-btn:hover {
          background: #f9fafb;
          border-color: #667eea;
          color: #667eea;
        }

        .signup-btn {
          padding: 10px 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          color: white;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        .signup-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        /* Profile Dropdown */
        .profile-dropdown {
          position: relative;
        }

        .profile-button {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 2px solid #e5e7eb;
          background: transparent;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.2s ease;
          padding: 0;
        }

        .profile-button:hover {
          border-color: #667eea;
          transform: scale(1.05);
        }

        .profile-button img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .profile-avatar {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          font-size: 18px;
          font-weight: 700;
        }

        .profile-menu {
          position: absolute;
          top: calc(100% + 12px);
          right: 0;
          background: white;
          min-width: 280px;
          border-radius: 16px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          overflow: hidden;
          z-index: 2000;
          animation: slideDown 0.2s ease-out;
        }

        .profile-menu-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 20px 24px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          cursor: pointer;
        }

        .profile-menu-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid rgba(255, 255, 255, 0.3);
          flex-shrink: 0;
        }

        .profile-menu-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .profile-menu-info {
          flex: 1;
        }

        .profile-name {
          font-size: 16px;
          font-weight: 700;
          color: white;
          margin-bottom: 2px;
        }

        .profile-link {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 500;
        }

        .menu-divider {
          height: 1px;
          background: #e5e7eb;
        }

        .menu-items {
          padding: 8px;
        }

        .menu-item {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 12px 16px;
          background: transparent;
          border: none;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          color: #374151;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }

        .menu-item:hover {
          background: rgba(102, 126, 234, 0.08);
          color: #667eea;
        }

        .menu-item.logout {
          padding: 16px 24px;
          color: #ef4444;
          border-radius: 0;
        }

        .menu-item.logout:hover {
          background: rgba(239, 68, 68, 0.08);
        }

        /* Mobile Menu */
        .mobile-menu-toggle {
          display: none;
          width: 44px;
          height: 44px;
          background: transparent;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #374151;
          transition: all 0.2s;
        }

        .mobile-menu-toggle:hover {
          background: rgba(102, 126, 234, 0.08);
          border-color: #667eea;
          color: #667eea;
        }

        .mobile-menu {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 20px;
          border-top: 1px solid #e5e7eb;
          margin-top: 16px;
          animation: slideDown 0.2s ease-out;
        }

        .mobile-menu-item {
          padding: 14px 20px;
          background: transparent;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
          color: #374151;
          cursor: pointer;
          text-align: left;
          transition: all 0.2s;
        }

        .mobile-menu-item:hover {
          background: rgba(102, 126, 234, 0.08);
          color: #667eea;
        }

        .mobile-divider {
          height: 1px;
          background: #e5e7eb;
          margin: 8px 0;
        }

        .mobile-menu-item.primary {
          background: white;
          border: 2px solid #e5e7eb;
          text-align: center;
        }

        .mobile-menu-item.accent {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          text-align: center;
        }

        .mobile-menu-item.accent:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .dropdown-mega {
            min-width: 600px;
          }
        }

        @media (max-width: 1024px) {
          .desktop-nav {
            display: none;
          }

          .logo-tagline {
            display: none;
          }

          .mobile-menu-toggle {
            display: flex;
          }

          .auth-divider {
            display: none;
          }

          .login-btn,
          .signup-btn {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .header {
            padding: 12px 16px;
          }

          .header-content {
            gap: 16px;
          }

          .logo-icon {
            width: 40px;
            height: 40px;
          }

          .logo-icon svg {
            width: 28px;
            height: 28px;
          }

          .logo-text {
            font-size: 18px;
          }

          .dropdown-mega {
            left: 50%;
            transform: translateX(-50%);
            min-width: 90vw;
            max-width: 95vw;
          }

          .dropdown-categories {
            padding: 16px;
          }

          .course-item {
            padding: 10px;
          }

          .course-image {
            width: 50px;
            height: 50px;
          }
        }

        @media (max-width: 480px) {
          .icon-button {
            width: 40px;
            height: 40px;
          }

          .profile-button {
            width: 40px;
            height: 40px;
          }
        }
      `}</style>
    </>
  );
};

export default Header;


