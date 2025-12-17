import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { colors, spacing, fontSize, borderRadius } from "../styles/colors";
import { HiHeart, HiShoppingCart, HiSearch } from "react-icons/hi";
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getAllCourses()
      .then(setCourses)
      .catch(console.error);
  }, []);

  return (
    <header style={styles.container}>
      <div style={styles.content}>
        {/* LOGO */}
        <div style={styles.logoContainer} onClick={() => navigate("/")}>
          <div style={styles.logoIcon}>⚡</div>
          <span style={styles.logoName}>Lumina.</span>
        </div>

        {/* COURSES */}
        <div
          style={styles.courseMenu}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <span style={styles.courseText}>Courses</span>

          {open && (
            <div style={styles.dropdown}>
              {courses.map((course) => (
                <div
                  key={course.id}
                  style={styles.dropdownItem}
                  onClick={() => navigate(`/course/${course.id}`)}
                >
                  {course.title}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SEARCH */}
        <form style={styles.searchWrapper}>
          <HiSearch size={18} style={styles.searchIcon} />
          <input
            style={styles.searchInput}
            placeholder="Search for courses..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </form>

        {/* RIGHT */}
        <div style={styles.rightActions}>
          <HiHeart size={22} />

          <div style={styles.cartContainer} onClick={() => navigate("/cart")}>
            <HiShoppingCart size={22} />
            <div style={styles.cartBadge}>{cartCount}</div>
          </div>

          <button style={styles.loginButton} onClick={() => navigate("/login")}>
            Log in
          </button>

          <button style={styles.joinButton}>Join for Free</button>
        </div>
      </div>
    </header>
  );
};

/* ================= STYLES ================= */

const styles: Record<string, React.CSSProperties> = {
  container: {
    backgroundColor: colors.background,
    padding: spacing.md,
    borderBottom: `1px solid ${colors.border}`,
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  content: {
    display: "flex",
    alignItems: "center",
    gap: spacing.lg,
    maxWidth: 1500,
    margin: "0 auto",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: spacing.sm,
    cursor: "pointer",
  },
  logoIcon: {
    width: 34,
    height: 34,
    borderRadius: borderRadius.md,
    background: "linear-gradient(135deg,#8b5cf6,#ec4899)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoName: {
    fontSize: fontSize.xl,
    fontWeight: 600,
  },

  courseMenu: {
    position: "relative",
    cursor: "pointer",
  },
  courseText: {
    fontWeight: 500,
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    left: 0,
    background: "white",
    minWidth: 240,
    borderRadius: borderRadius.md,
    boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
    overflow: "hidden",
    zIndex: 2000,
  },
  dropdownItem: {
    padding: "12px 16px",
    borderBottom: "1px solid #eee",
    cursor: "pointer",
  },

  searchWrapper: {
    flex: 1,
    position: "relative",
    maxWidth: 500,
  },
  searchIcon: {
    position: "absolute",
    top: "50%",
    left: 14,
    transform: "translateY(-50%)",
  },
  searchInput: {
    width: "100%",
    padding: "10px 16px 10px 40px",
    borderRadius: borderRadius.full,
    border: `1px solid ${colors.border}`,
  },

  rightActions: {
    display: "flex",
    alignItems: "center",
    gap: spacing.lg,
  },
  cartContainer: {
    position: "relative",
    cursor: "pointer",
  },
  cartBadge: {
    position: "absolute",
    top: -6,
    right: -10,
    backgroundColor: "#ec4899",
    color: "white",
    fontSize: 10,
    padding: "2px 6px",
    borderRadius: "50%",
  },

  loginButton: {
    background: "transparent",
    border: `1px solid ${colors.border}`,
    padding: "8px 18px",
    borderRadius: borderRadius.full,
    cursor: "pointer",
  },
  joinButton: {
    background: "#0f172a",
    color: "white",
    padding: "10px 22px",
    borderRadius: borderRadius.full,
    border: "none",
    cursor: "pointer",
  },
};
