import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiShoppingCart,
  HiUser,
  HiMenu,
  HiBookOpen,
  HiLogout,
  HiX,
  HiSearch,
  HiChevronDown,
  HiAcademicCap,
  HiArrowRight,
} from "react-icons/hi";
import { getCurrentUser, clearCurrentUser } from "../utils/auth";
import { getEnrollments, Enrollment } from "../../../src/api/enrollmentService";
import { getCart, CART_UPDATED_EVENT } from "../../../src/api/cartService";
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

export const Header: React.FC<HeaderProps> = ({ cartCount }) => {
  const navigate = useNavigate();

  const [courses, setCourses]                   = useState<Course[]>([]);
  const [coursesOpen, setCoursesOpen]           = useState(false);
  const [myLearningOpen, setMyLearningOpen]     = useState(false);
  const [profileMenuOpen, setProfileMenuOpen]   = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen]     = useState(false);
  const [isScrolled, setIsScrolled]             = useState(false);
  const [enrolledCourses, setEnrolledCourses]   = useState<Enrollment[]>([]);
  const [isLoggedIn, setIsLoggedIn]             = useState(false);
  const [userName, setUserName]                 = useState("");
  const [loading, setLoading]                   = useState(false);
  const [courseSearch, setCourseSearch]         = useState("");
  const [internalCartCount, setInternalCartCount] = useState(0);
  const [currentUserId, setCurrentUserId]       = useState<number | null>(null);

  /* ── init ── */
  useEffect(() => {
    initializeHeader();

    const onScroll  = () => setIsScrolled(window.scrollY > 8);
    const onCart    = () => { if (currentUserId) void loadCartCount(currentUserId); };
    const onFocus   = () => { if (currentUserId) void loadCartCount(currentUserId); };

    window.addEventListener("scroll", onScroll);
    window.addEventListener(CART_UPDATED_EVENT, onCart as EventListener);
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener(CART_UPDATED_EVENT, onCart as EventListener);
      window.removeEventListener("focus", onFocus);
    };
  }, [currentUserId]);

  const initializeHeader = async () => {
    try {
      const user = getCurrentUser();
      if (user?.userId) {
        setIsLoggedIn(true);
        setCurrentUserId(user.userId);
        setUserName(user.fullName || user.email || "User");
        await Promise.all([loadEnrolledCourses(user.userId), loadCartCount(user.userId)]);
      } else {
        setIsLoggedIn(false);
        setCurrentUserId(null);
        setInternalCartCount(0);
      }
      await loadAvailableCourses();
    } catch (e) { console.error("Header init error:", e); }
  };

  const loadEnrolledCourses = async (userId: number) => {
    try {
      setLoading(true);
      setEnrolledCourses(await getEnrollments(String(userId)));
    } catch { setEnrolledCourses([]); }
    finally { setLoading(false); }
  };

  const loadAvailableCourses = async () => {
    try { setCourses(await getAllCourses()); }
    catch { setCourses([]); }
  };

  const loadCartCount = async (userId: number) => {
    try {
      const r = await getCart(String(userId));
      setInternalCartCount(Array.isArray(r.data) ? r.data.length : 0);
    } catch { setInternalCartCount(0); }
  };

  const handleLogout = () => {
    clearCurrentUser();
    setIsLoggedIn(false);
    setUserName("");
    setCurrentUserId(null);
    setInternalCartCount(0);
    setEnrolledCourses([]);
    setProfileMenuOpen(false);
    navigate("/");
  };

  /* derived */
  const resolvedCartCount = typeof cartCount === "number" ? cartCount : internalCartCount;
  const coursesByCategory = courses.reduce<Record<string, Course[]>>((acc, c) => {
    const cat = c.category || "Other";
    (acc[cat] = acc[cat] || []).push(c);
    return acc;
  }, {});
  const filteredCourses = courseSearch
    ? courses.filter(c => c.title.toLowerCase().includes(courseSearch.toLowerCase()))
    : [];
  const initials = userName.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();

  return (
    <>
      <header className={`hd-root${isScrolled ? " hd-root--scrolled" : ""}`}>
        <div className="hd-inner">

          {/* Back button */}
          {/* ── LOGO ── */}
          <div className="hd-logo" onClick={() => navigate("/")}>
            <span className="hd-logo-icon">⚡</span>
            <div className="hd-logo-text">
              <span className="hd-logo-brand">Srinu tech</span>
              <span className="hd-logo-tag">Guru</span>
            </div>
          </div>

          {/* ── DESKTOP NAV ── */}
          <nav className="hd-nav">

            {/* Courses mega-dropdown */}
            <div className="hd-dd-wrap" onMouseEnter={() => setCoursesOpen(true)} onMouseLeave={() => { setCoursesOpen(false); setCourseSearch(""); }}>
              <button className={`hd-nav-btn${coursesOpen ? " hd-nav-btn--open" : ""}`}>
                Courses <HiChevronDown size={14} className={`hd-chevron${coursesOpen ? " hd-chevron--up" : ""}`} />
              </button>

              {coursesOpen && (
                <div className="hd-mega">
                  {/* Search */}
                  <div className="hd-mega-search">
                    <HiSearch size={15} className="hd-search-icon" />
                    <input
                      type="text"
                      placeholder="Search courses…"
                      value={courseSearch}
                      onChange={e => setCourseSearch(e.target.value)}
                      className="hd-search-input"
                      autoFocus
                    />
                  </div>

                  <div className="hd-mega-body">
                    {courseSearch ? (
                      /* Search results */
                      <div className="hd-mega-col">
                        <p className="hd-col-label">Results ({filteredCourses.length})</p>
                        {filteredCourses.length > 0 ? filteredCourses.map(c => (
                          <CourseRow key={c.id} course={c} onClick={() => { navigate(`/course/${c.id}`); setCoursesOpen(false); }} />
                        )) : (
                          <p className="hd-empty">No courses match "{courseSearch}"</p>
                        )}
                      </div>
                    ) : (
                      /* Category columns */
                      <>
                        {Object.entries(coursesByCategory).map(([cat, list]) => (
                          <div key={cat} className="hd-mega-col">
                            <p className="hd-col-label">{cat} <span className="hd-col-count">{list.length}</span></p>
                            {list.slice(0, 4).map(c => (
                              <CourseRow key={c.id} course={c} onClick={() => { navigate(`/course/${c.id}`); setCoursesOpen(false); }} />
                            ))}
                          </div>
                        ))}
                      </>
                    )}
                  </div>

                  {courses.length > 0 && !courseSearch && (
                    <div className="hd-mega-footer">
                      <button className="hd-mega-cta" onClick={() => { navigate("/"); setCoursesOpen(false); }}>
                        View all {courses.length} courses <HiArrowRight size={14} />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* My Learning dropdown */}
            {isLoggedIn && (
              <div className="hd-dd-wrap" onMouseEnter={() => setMyLearningOpen(true)} onMouseLeave={() => setMyLearningOpen(false)}>
                <button className={`hd-nav-btn${myLearningOpen ? " hd-nav-btn--open" : ""}`}>
                  <HiBookOpen size={15} /> My Learning <HiChevronDown size={14} className={`hd-chevron${myLearningOpen ? " hd-chevron--up" : ""}`} />
                </button>

                {myLearningOpen && (
                  <div className="hd-dropdown">
                    <div className="hd-dd-header">
                      <p className="hd-dd-title">My Enrolled Courses</p>
                      <span className="hd-dd-count">{enrolledCourses.length}</span>
                    </div>
                    <div className="hd-dd-body">
                      {loading ? (
                        <div className="hd-dd-loading"><span className="hd-spinner" /> Loading…</div>
                      ) : enrolledCourses.length > 0 ? (
                        <>
                          {enrolledCourses.slice(0, 5).map(e => (
                            <button key={e.id} className="hd-enrollment-row" onClick={() => { navigate(`/course/${e.course.id}`); setMyLearningOpen(false); }}>
                              <span className="hd-enroll-check">✓</span>
                              <div className="hd-enroll-info">
                                <p className="hd-enroll-title">{e.course.title}</p>
                                <p className="hd-enroll-date">Enrolled {new Date(e.enrolledAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                              </div>
                            </button>
                          ))}
                          <button className="hd-dd-footer-btn" onClick={() => { navigate("/my-learning"); setMyLearningOpen(false); }}>
                            View all my courses <HiArrowRight size={13} />
                          </button>
                        </>
                      ) : (
                        <div className="hd-dd-empty">
                          <HiAcademicCap size={28} />
                          <p>No enrolled courses yet</p>
                          <button className="hd-dd-browse" onClick={() => { navigate("/"); setMyLearningOpen(false); }}>Browse Courses</button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            <button className="hd-nav-btn" onClick={() => navigate("/about")}>About</button>
            <button className="hd-nav-btn" onClick={() => navigate("/contact")}>Contact</button>
          </nav>

          {/* ── RIGHT ACTIONS ── */}
          <div className="hd-actions">

            {/* Cart */}
            <button className="hd-icon-btn" onClick={() => navigate("/cart")} title="Cart">
              <HiShoppingCart size={19} />
              {resolvedCartCount > 0 && (
                <span className="hd-cart-badge">{resolvedCartCount > 9 ? "9+" : resolvedCartCount}</span>
              )}
            </button>

            {isLoggedIn ? (
              /* Profile dropdown */
              <div className="hd-dd-wrap" onMouseEnter={() => setProfileMenuOpen(true)} onMouseLeave={() => setProfileMenuOpen(false)}>
                <button className="hd-avatar-btn">
                  <span className="hd-avatar">{initials}</span>
                </button>

                {profileMenuOpen && (
                  <div className="hd-profile-menu">
                    {/* Header */}
                    <div className="hd-pm-header" onClick={() => { navigate("/profile"); setProfileMenuOpen(false); }}>
                      <span className="hd-pm-avatar">{initials}</span>
                      <div>
                        <p className="hd-pm-name">{userName}</p>
                        <p className="hd-pm-link">View profile <HiArrowRight size={11} /></p>
                      </div>
                    </div>

                    <div className="hd-pm-divider" />

                    <div className="hd-pm-items">
                      {[
                        { icon: <HiUser size={15} />, label: "My Profile", path: "/profile" },
                        { icon: <HiBookOpen size={15} />, label: `My Learning (${enrolledCourses.length})`, path: "/my-learning" },
                        // { icon: <HiCog size={15} />, label: "Settings", path: "/settings" },
                      ].map(item => (
                        <button key={item.path} className="hd-pm-item" onClick={() => { navigate(item.path); setProfileMenuOpen(false); }}>
                          {item.icon} {item.label}
                        </button>
                      ))}
                    </div>

                    <div className="hd-pm-divider" />

                    <button className="hd-pm-item hd-pm-item--danger" onClick={handleLogout}>
                      <HiLogout size={15} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hd-auth-btns">
                <button className="hd-login-btn" onClick={() => navigate("/auth")}>Log in</button>
                <button className="hd-signup-btn" onClick={() => navigate("/auth")}>Sign Up</button>
              </div>
            )}

            {/* Mobile toggle */}
            <button className="hd-mobile-toggle" onClick={() => setMobileMenuOpen(v => !v)}>
              {mobileMenuOpen ? <HiX size={20} /> : <HiMenu size={20} />}
            </button>
          </div>
        </div>

        {/* ── MOBILE MENU ── */}
        {mobileMenuOpen && (
          <div className="hd-mobile-menu">
            {[
              { label: "Browse Courses", path: "/" },
              ...(isLoggedIn ? [{ label: `My Learning (${enrolledCourses.length})`, path: "/my-learning" }] : []),
              { label: "About", path: "/about" },
              { label: "Contact", path: "/contact" },
              ...(isLoggedIn ? [{ label: "Profile", path: "/profile" }] : []),
            ].map(item => (
              <button key={item.path} className="hd-mobile-item" onClick={() => { navigate(item.path); setMobileMenuOpen(false); }}>
                {item.label}
              </button>
            ))}

            <div className="hd-mobile-divider" />

            {isLoggedIn ? (
              <button className="hd-mobile-item hd-mobile-item--danger" onClick={() => { handleLogout(); setMobileMenuOpen(false); }}>
                <HiLogout size={15} /> Logout
              </button>
            ) : (
              <div className="hd-mobile-auth">
                <button className="hd-mobile-login" onClick={() => { navigate("/auth"); setMobileMenuOpen(false); }}>Log in</button>
                <button className="hd-mobile-signup" onClick={() => { navigate("/auth"); setMobileMenuOpen(false); }}>Sign Up Free</button>
              </div>
            )}
          </div>
        )}
      </header>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600;700&display=swap');

        /* ── TOKENS ── */
        :root {
          --hd-ink:        #0e0f13;
          --hd-ink-soft:   #3d4154;
          --hd-ink-muted:  #8b90a8;
          --hd-surface:    #ffffff;
          --hd-surface-2:  #f6f6fb;
          --hd-border:     #e3e3ed;
          --hd-accent:     #1a56db;
          --hd-accent-s:   #eef2fd;
          --hd-gold:       #c9a84c;
          --hd-green:      #16a34a;
          --hd-green-s:    #f0fdf4;
          --hd-error:      #be185d;
          --hd-font-d:     'Playfair Display', Georgia, serif;
          --hd-font-b:     'DM Sans', 'Helvetica Neue', sans-serif;
          --hd-shadow:     0 1px 3px rgba(14,15,19,.06), 0 4px 16px rgba(14,15,19,.06);
          --hd-shadow-lg:  0 8px 32px rgba(14,15,19,.12), 0 2px 8px rgba(14,15,19,.06);
          --hd-t:          .18s cubic-bezier(.4,0,.2,1);
          --hd-r:          10px;
        }

        /* ── ROOT ── */
        .hd-root {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: rgba(255,255,255,.97);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--hd-border);
          font-family: var(--hd-font-b);
          -webkit-font-smoothing: antialiased;
          transition: box-shadow var(--hd-t), border-color var(--hd-t);
        }

        .hd-root--scrolled {
          box-shadow: var(--hd-shadow);
          border-color: rgba(227,227,237,.9);
        }

        .hd-inner {
          display: flex;
          align-items: center;
          gap: 28px;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 28px;
          height: 64px;
        }

        /* ── BACK BUTTON ── */
        .hd-back {
          width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          border: 1px solid var(--hd-border);
          border-radius: var(--hd-r);
          background: transparent;
          color: var(--hd-ink-muted);
          cursor: pointer;
          flex-shrink: 0;
          transition: color var(--hd-t), border-color var(--hd-t), background var(--hd-t);
        }
        .hd-back:hover { color: var(--hd-ink); border-color: var(--hd-ink-soft); background: var(--hd-surface-2); }

        /* ── LOGO ── */
        .hd-logo {
          display: flex;
          align-items: center;
          gap: 9px;
          cursor: pointer;
          flex-shrink: 0;
          text-decoration: none;
        }

        .hd-logo-icon {
          font-size: 20px;
          filter: drop-shadow(0 0 6px rgba(201,168,76,.5));
          line-height: 1;
        }

        .hd-logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1;
        }

        .hd-logo-brand {
          font-family: var(--hd-font-d);
          font-size: 17px;
          font-weight: 800;
          color: var(--hd-ink);
          letter-spacing: -0.01em;
        }

        .hd-logo-tag {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: var(--hd-gold);
          margin-top: 1px;
        }

        /* ── DESKTOP NAV ── */
        .hd-nav {
          display: flex;
          align-items: center;
          gap: 2px;
          flex: 1;
        }

        .hd-dd-wrap { position: relative; }

        .hd-nav-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 8px 13px;
          background: transparent;
          border: none;
          border-radius: var(--hd-r);
          font-family: var(--hd-font-b);
          font-size: 13.5px;
          font-weight: 600;
          color: var(--hd-ink-soft);
          cursor: pointer;
          transition: background var(--hd-t), color var(--hd-t);
          white-space: nowrap;
        }
        .hd-nav-btn:hover,
        .hd-nav-btn--open { background: var(--hd-surface-2); color: var(--hd-ink); }

        .hd-chevron { transition: transform var(--hd-t); }
        .hd-chevron--up { transform: rotate(180deg); }

        /* ── MEGA DROPDOWN ── */
        .hd-mega {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          background: var(--hd-surface);
          border: 1px solid var(--hd-border);
          border-radius: 16px;
          box-shadow: var(--hd-shadow-lg);
          width: min(860px, calc(100vw - 24px));
          min-width: 0;
          max-width: 860px;
          max-height: calc(100vh - 120px);
          z-index: 2000;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          animation: hd-drop .18s ease both;
        }

        @keyframes hd-drop {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .hd-mega-search {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 18px;
          border-bottom: 1px solid var(--hd-border);
          background: var(--hd-surface-2);
        }

        .hd-search-icon { color: var(--hd-ink-muted); flex-shrink: 0; }

        .hd-search-input {
          flex: 1;
          border: none;
          background: transparent;
          font-family: var(--hd-font-b);
          font-size: 13.5px;
          color: var(--hd-ink);
          outline: none;
        }
        .hd-search-input::placeholder { color: var(--hd-ink-muted); }

        .hd-mega-body {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 0;
          max-height: none;
          flex: 1;
          min-height: 0;
          overflow-y: auto;
          padding: 20px;
          gap: 24px;
        }

        .hd-mega-col { display: flex; flex-direction: column; gap: 4px; }

        .hd-col-label {
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: var(--hd-ink-muted);
          margin: 0 0 8px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .hd-col-count {
          background: var(--hd-surface-2);
          border: 1px solid var(--hd-border);
          border-radius: 99px;
          font-size: 10px;
          padding: 1px 7px;
          font-weight: 600;
          color: var(--hd-ink-muted);
        }

        .hd-empty {
          font-size: 13px;
          color: var(--hd-ink-muted);
          padding: 12px 0;
          font-style: italic;
        }

        .hd-mega-footer {
          border-top: 1px solid var(--hd-border);
          padding: 12px 20px;
          background: var(--hd-surface-2);
        }

        .hd-mega-cta {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 9px 18px;
          background: var(--hd-ink);
          color: #fff;
          border: none;
          border-radius: var(--hd-r);
          font-family: var(--hd-font-b);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: background var(--hd-t), transform var(--hd-t);
        }
        .hd-mega-cta:hover { background: var(--hd-ink-soft); transform: translateY(-1px); }

        /* ── COURSE ROW ── */
        .hd-course-row {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px;
          border-radius: var(--hd-r);
          cursor: pointer;
          border: none;
          background: transparent;
          width: 100%;
          text-align: left;
          transition: background var(--hd-t);
        }
        .hd-course-row:hover { background: var(--hd-surface-2); }

        .hd-course-thumb {
          width: 36px; height: 36px;
          border-radius: 8px;
          background: var(--hd-surface-2);
          border: 1px solid var(--hd-border);
          overflow: hidden;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        }
        .hd-course-thumb img { width: 100%; height: 100%; object-fit: cover; }

        .hd-course-info { flex: 1; min-width: 0; }
        .hd-course-name {
          font-size: 13px;
          font-weight: 600;
          color: var(--hd-ink);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: block;
        }
        .hd-course-price { font-size: 11.5px; color: var(--hd-accent); font-weight: 600; margin-top: 1px; display: block; }

        /* ── STANDARD DROPDOWN ── */
        .hd-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          background: var(--hd-surface);
          border: 1px solid var(--hd-border);
          border-radius: 16px;
          box-shadow: var(--hd-shadow-lg);
          min-width: 320px;
          max-width: 380px;
          z-index: 2000;
          overflow: hidden;
          animation: hd-drop .18s ease both;
        }

        .hd-dd-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-bottom: 1px solid var(--hd-border);
          background: var(--hd-surface-2);
        }

        .hd-dd-title {
          font-size: 13px;
          font-weight: 700;
          color: var(--hd-ink);
          margin: 0;
        }

        .hd-dd-count {
          font-size: 11px;
          font-weight: 700;
          padding: 2px 8px;
          background: var(--hd-surface);
          border: 1px solid var(--hd-border);
          border-radius: 99px;
          color: var(--hd-ink-muted);
        }

        .hd-dd-body { max-height: 360px; overflow-y: auto; }

        .hd-dd-loading {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 20px;
          font-size: 13px;
          color: var(--hd-ink-muted);
        }

        .hd-enrollment-row {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          width: 100%;
          padding: 14px 20px;
          border: none;
          background: transparent;
          border-bottom: 1px solid var(--hd-border);
          cursor: pointer;
          text-align: left;
          transition: background var(--hd-t);
        }
        .hd-enrollment-row:hover { background: var(--hd-surface-2); }
        .hd-enrollment-row:last-of-type { border-bottom: none; }

        .hd-enroll-check {
          width: 22px; height: 22px;
          border-radius: 50%;
          background: var(--hd-green-s);
          color: var(--hd-green);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .hd-enroll-info { flex: 1; min-width: 0; }
        .hd-enroll-title {
          font-size: 13px;
          font-weight: 600;
          color: var(--hd-ink);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin: 0 0 3px;
        }
        .hd-enroll-date { font-size: 11.5px; color: var(--hd-ink-muted); margin: 0; }

        .hd-dd-footer-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          width: 100%;
          padding: 13px 20px;
          background: transparent;
          border: none;
          border-top: 1px solid var(--hd-border);
          font-family: var(--hd-font-b);
          font-size: 13px;
          font-weight: 600;
          color: var(--hd-accent);
          cursor: pointer;
          transition: background var(--hd-t);
        }
        .hd-dd-footer-btn:hover { background: var(--hd-accent-s); }

        .hd-dd-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          padding: 32px 20px;
          color: var(--hd-ink-muted);
          font-size: 13px;
        }
        .hd-dd-empty p { margin: 0; }
        .hd-dd-browse {
          padding: 8px 16px;
          background: var(--hd-ink);
          color: #fff;
          border: none;
          border-radius: var(--hd-r);
          font-family: var(--hd-font-b);
          font-size: 12.5px;
          font-weight: 600;
          cursor: pointer;
          transition: background var(--hd-t);
        }
        .hd-dd-browse:hover { background: var(--hd-ink-soft); }

        /* ── RIGHT ACTIONS ── */
        .hd-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-left: auto;
        }

        .hd-icon-btn {
          position: relative;
          width: 38px; height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--hd-border);
          border-radius: var(--hd-r);
          background: transparent;
          color: var(--hd-ink-soft);
          cursor: pointer;
          transition: color var(--hd-t), border-color var(--hd-t), background var(--hd-t);
        }
        .hd-icon-btn:hover { color: var(--hd-ink); border-color: var(--hd-ink-soft); background: var(--hd-surface-2); }

        .hd-cart-badge {
          position: absolute;
          top: -6px; right: -6px;
          background: var(--hd-error);
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          padding: 2px 5px;
          border-radius: 99px;
          min-width: 18px;
          text-align: center;
          line-height: 1.4;
          border: 2px solid #fff;
        }

        .hd-auth-btns { display: flex; align-items: center; gap: 8px; }

        .hd-login-btn {
          padding: 8px 16px;
          background: transparent;
          border: 1px solid var(--hd-border);
          border-radius: var(--hd-r);
          font-family: var(--hd-font-b);
          font-size: 13.5px;
          font-weight: 600;
          color: var(--hd-ink-soft);
          cursor: pointer;
          transition: color var(--hd-t), border-color var(--hd-t), background var(--hd-t);
        }
        .hd-login-btn:hover { color: var(--hd-ink); border-color: var(--hd-ink-soft); background: var(--hd-surface-2); }

        .hd-signup-btn {
          padding: 8px 16px;
          background: var(--hd-ink);
          color: #fff;
          border: none;
          border-radius: var(--hd-r);
          font-family: var(--hd-font-b);
          font-size: 13.5px;
          font-weight: 600;
          cursor: pointer;
          transition: background var(--hd-t), transform var(--hd-t);
          box-shadow: 0 1px 3px rgba(14,15,19,.2);
        }
        .hd-signup-btn:hover { background: var(--hd-ink-soft); transform: translateY(-1px); }

        /* ── PROFILE ── */
        .hd-avatar-btn {
          width: 36px; height: 36px;
          border-radius: 50%;
          border: 1.5px solid var(--hd-border);
          background: transparent;
          padding: 0;
          cursor: pointer;
          overflow: hidden;
          transition: border-color var(--hd-t), transform var(--hd-t);
        }
        .hd-avatar-btn:hover { border-color: var(--hd-gold); transform: scale(1.06); }

        .hd-avatar {
          width: 100%; height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--hd-ink);
          color: #fff;
          font-size: 13px;
          font-weight: 700;
          font-family: var(--hd-font-d);
          border-radius: 50%;
        }

        .hd-profile-menu {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background: var(--hd-surface);
          border: 1px solid var(--hd-border);
          border-radius: 16px;
          box-shadow: var(--hd-shadow-lg);
          min-width: 260px;
          z-index: 2000;
          overflow: hidden;
          animation: hd-drop .18s ease both;
        }

        .hd-pm-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          background: var(--hd-ink);
          cursor: pointer;
          transition: background var(--hd-t);
        }
        .hd-pm-header:hover { background: var(--hd-ink-soft); }

        .hd-pm-avatar {
          width: 38px; height: 38px;
          border-radius: 50%;
          background: rgba(255,255,255,.12);
          border: 1.5px solid rgba(255,255,255,.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--hd-font-d);
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          flex-shrink: 0;
        }

        .hd-pm-name {
          font-size: 13.5px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 3px;
        }

        .hd-pm-link {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11.5px;
          color: rgba(255,255,255,.5);
          margin: 0;
        }

        .hd-pm-divider { height: 1px; background: var(--hd-border); }

        .hd-pm-items { padding: 6px; }

        .hd-pm-item {
          display: flex;
          align-items: center;
          gap: 9px;
          width: 100%;
          padding: 10px 14px;
          background: transparent;
          border: none;
          border-radius: var(--hd-r);
          font-family: var(--hd-font-b);
          font-size: 13.5px;
          font-weight: 600;
          color: var(--hd-ink-soft);
          cursor: pointer;
          transition: background var(--hd-t), color var(--hd-t);
          text-align: left;
        }
        .hd-pm-item:hover { background: var(--hd-surface-2); color: var(--hd-ink); }

        .hd-pm-item--danger {
          margin: 4px 6px 6px;
          width: calc(100% - 12px);
          color: var(--hd-error);
        }
        .hd-pm-item--danger:hover { background: rgba(190,24,93,.06); color: var(--hd-error); }

        /* ── SPINNER ── */
        .hd-spinner {
          display: inline-block;
          width: 14px; height: 14px;
          border: 2px solid var(--hd-border);
          border-top-color: var(--hd-accent);
          border-radius: 50%;
          animation: hd-spin .7s linear infinite;
        }
        @keyframes hd-spin { to { transform: rotate(360deg); } }

        /* ── MOBILE TOGGLE ── */
        .hd-mobile-toggle {
          display: none;
          width: 36px; height: 36px;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--hd-border);
          border-radius: var(--hd-r);
          background: transparent;
          color: var(--hd-ink-soft);
          cursor: pointer;
          transition: color var(--hd-t), background var(--hd-t);
        }
        .hd-mobile-toggle:hover { color: var(--hd-ink); background: var(--hd-surface-2); }

        /* ── MOBILE MENU ── */
        .hd-mobile-menu {
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 12px 20px 20px;
          border-top: 1px solid var(--hd-border);
          animation: hd-drop .2s ease both;
        }

        .hd-mobile-item {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 12px 14px;
          background: transparent;
          border: none;
          border-radius: var(--hd-r);
          font-family: var(--hd-font-b);
          font-size: 14px;
          font-weight: 600;
          color: var(--hd-ink-soft);
          cursor: pointer;
          text-align: left;
          transition: background var(--hd-t), color var(--hd-t);
          width: 100%;
        }
        .hd-mobile-item:hover { background: var(--hd-surface-2); color: var(--hd-ink); }
        .hd-mobile-item--danger { color: var(--hd-error); }
        .hd-mobile-item--danger:hover { background: rgba(190,24,93,.06); }

        .hd-mobile-divider { height: 1px; background: var(--hd-border); margin: 6px 0; }

        .hd-mobile-auth { display: flex; gap: 10px; margin-top: 4px; }

        .hd-mobile-login {
          flex: 1;
          padding: 11px;
          background: transparent;
          border: 1px solid var(--hd-border);
          border-radius: var(--hd-r);
          font-family: var(--hd-font-b);
          font-size: 14px;
          font-weight: 600;
          color: var(--hd-ink-soft);
          cursor: pointer;
        }

        .hd-mobile-signup {
          flex: 1;
          padding: 11px;
          background: var(--hd-ink);
          color: #fff;
          border: none;
          border-radius: var(--hd-r);
          font-family: var(--hd-font-b);
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1024px) {
          .hd-nav { display: none; }
          .hd-mobile-toggle { display: flex; }
          .hd-auth-btns { display: none; }
        }

        @media (max-width: 600px) {
          .hd-inner { padding: 0 16px; gap: 16px; }
          .hd-logo-tag { display: none; }
        }
      `}</style>
    </>
  );
};

/* ─────────────────────────────────────────────
   COURSE ROW (used in mega dropdown)
───────────────────────────────────────────── */
const CourseRow: React.FC<{ course: { id: number; title: string; imageUrl?: string; price?: number }; onClick: () => void }> = ({ course, onClick }) => (
  <button className="hd-course-row" onClick={onClick}>
    <span className="hd-course-thumb">
      {course.imageUrl ? <img src={course.imageUrl} alt={course.title} /> : "📚"}
    </span>
    <span className="hd-course-info">
      <span className="hd-course-name">{course.title}</span>
      {course.price !== undefined && <span className="hd-course-price">₹{course.price.toFixed(2)}</span>}
    </span>
  </button>
);

export default Header;
