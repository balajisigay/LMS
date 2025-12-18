import React from "react";

interface HeroSectionProps {
  onExplorePress?: () => void;
  onWatchDemoPress?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExplorePress,
  onWatchDemoPress,
}) => {
  return (
    <section style={styles.container}>
      <div style={styles.wrapper}>
        <div style={styles.grid}>
          {/* LEFT CONTENT */}
          <div style={styles.left}>
            {/* Animated Badge */}
            <div style={styles.badge}>
              <span style={styles.badgeDot}></span>
              <span style={styles.badgeText}>NEW COURSES ADDED</span>
            </div>

            {/* Title with Gradient */}
            <h1 style={styles.title}>
              Unlock your potential with{" "}
              <span style={styles.gradientText}>world-class learning</span>
            </h1>

            {/* Description */}
            <p style={styles.description}>
              Choose from 200,000+ online video courses with new additions
              published every month. Skills for your present and your future.
            </p>

            {/* Buttons */}
            <div style={styles.buttonRow}>
              <button style={styles.primaryBtn} onClick={onExplorePress}>
                <span>Explore Courses</span>
                <svg style={styles.arrowIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>

              <button style={styles.secondaryBtn} onClick={onWatchDemoPress}>
                <div style={styles.playButton}>
                  <svg style={styles.playIcon} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Stats Row */}
            <div style={styles.statsRow}>
              <div style={styles.statCard}>
                <div style={styles.statNumber}>200K+</div>
                <div style={styles.statLabel}>Online Courses</div>
              </div>
              <div style={styles.statDivider}></div>
              <div style={styles.statCard}>
                <div style={styles.statNumber}>50K+</div>
                <div style={styles.statLabel}>Expert Instructors</div>
              </div>
              <div style={styles.statDivider}></div>
              <div style={styles.statCard}>
                <div style={styles.statNumber}>1M+</div>
                <div style={styles.statLabel}>Active Students</div>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div style={styles.right}>
            {/* Main Image Container */}
            <div style={styles.imageContainer}>
              <div style={styles.imageWrapper}>
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop"
                  alt="Students learning"
                  style={styles.heroImage}
                />
                
                {/* Gradient Overlay */}
                <div style={styles.imageOverlay}></div>
              </div>

              {/* Floating Elements */}
              
              {/* Student Enrollment Card */}
              <div style={styles.floatingCard1}>
                <div style={styles.avatarGroup}>
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} style={{
                      ...styles.avatar,
                      background: `linear-gradient(135deg, ${['#667eea', '#f093fb', '#4facfe', '#43e97b'][i-1]}, ${['#764ba2', '#f5576c', '#00f2fe', '#38f9d7'][i-1]})`,
                      marginLeft: i > 1 ? '-12px' : '0',
                      zIndex: 5 - i,
                    }}>
                      <span style={styles.avatarText}>{String.fromCharCode(64 + i)}</span>
                    </div>
                  ))}
                </div>
                <div style={styles.cardContent}>
                  <div style={styles.cardTitle}>10k+ Students</div>
                  <div style={styles.cardSubtitle}>enrolled today</div>
                </div>
              </div>

              {/* Course Progress Card */}
              <div style={styles.floatingCard2}>
                <div style={styles.courseCardHeader}>
                  <div style={styles.courseIconWrapper}>
                    <svg style={styles.courseIconSvg} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <div style={styles.courseName}>Python Master</div>
                    <div style={styles.courseLevel}>Advanced Level</div>
                  </div>
                </div>
                
                <div style={styles.progressContainer}>
                  <div style={styles.progressBar}>
                    <div style={styles.progressFill}></div>
                  </div>
                  <span style={styles.progressText}>75% Complete</span>
                </div>
              </div>

              {/* Rating Badge */}
              <div style={styles.ratingBadge}>
                <svg style={styles.starIcon} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <div>
                  <div style={styles.ratingNumber}>4.9</div>
                  <div style={styles.ratingLabel}>Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div style={styles.bgCircle1}></div>
      <div style={styles.bgCircle2}></div>
      <div style={styles.bgCircle3}></div>
    </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    overflow: "hidden",
    position: "relative",
    padding: "80px 20px",
  },
  wrapper: {
    maxWidth: "1400px",
    margin: "0 auto",
    width: "100%",
    zIndex: 1,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    alignItems: "center",
    gap: "80px",
  },

  // LEFT SECTION
  left: {
    position: "relative",
    zIndex: 2,
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    background: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
    padding: "10px 20px",
    borderRadius: "30px",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    marginBottom: "24px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  },
  badgeDot: {
    width: "10px",
    height: "10px",
    background: "#4ade80",
    borderRadius: "50%",
    boxShadow: "0 0 12px #4ade80",
    animation: "pulse 2s ease-in-out infinite",
  },
  badgeText: {
    fontSize: "13px",
    fontWeight: 700,
    color: "white",
    letterSpacing: "0.5px",
  },
  title: {
    fontSize: "56px",
    lineHeight: "1.2",
    fontWeight: 800,
    color: "white",
    marginBottom: "24px",
    textShadow: "0 2px 20px rgba(0, 0, 0, 0.1)",
  },
  gradientText: {
    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  description: {
    fontSize: "18px",
    lineHeight: "1.8",
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: "40px",
    maxWidth: "540px",
  },
  buttonRow: {
    display: "flex",
    gap: "16px",
    marginBottom: "48px",
    flexWrap: "wrap",
  },
  primaryBtn: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "white",
    color: "#667eea",
    padding: "16px 32px",
    borderRadius: "16px",
    border: "none",
    fontSize: "16px",
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
    transition: "all 0.3s ease",
  },
  arrowIcon: {
    width: "20px",
    height: "20px",
  },
  secondaryBtn: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(10px)",
    color: "white",
    padding: "16px 32px",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    fontSize: "16px",
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  playButton: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "white",
    color: "#667eea",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  playIcon: {
    width: "14px",
    height: "14px",
    marginLeft: "2px",
  },
  statsRow: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(10px)",
    padding: "24px 32px",
    borderRadius: "20px",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  },
  statCard: {
    textAlign: "center",
  },
  statNumber: {
    fontSize: "28px",
    fontWeight: 800,
    color: "white",
    marginBottom: "4px",
  },
  statLabel: {
    fontSize: "12px",
    fontWeight: 600,
    color: "rgba(255, 255, 255, 0.8)",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  statDivider: {
    width: "1px",
    height: "40px",
    background: "rgba(255, 255, 255, 0.3)",
  },

  // RIGHT SECTION
  right: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    maxWidth: "600px",
  },
  imageWrapper: {
    position: "relative",
    borderRadius: "32px",
    overflow: "hidden",
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)",
  },
  heroImage: {
    width: "100%",
    height: "auto",
    display: "block",
  },
  imageOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(135deg, rgba(102, 126, 234, 0.3), rgba(118, 75, 162, 0.3))",
  },

  // FLOATING CARDS
  floatingCard1: {
    position: "absolute",
    top: "20px",
    left: "-40px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    background: "white",
    padding: "16px 20px",
    borderRadius: "20px",
    boxShadow: "0 15px 40px rgba(0, 0, 0, 0.2)",
    animation: "float 3s ease-in-out infinite",
  },
  avatarGroup: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "3px solid white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  },
  avatarText: {
    fontSize: "14px",
    fontWeight: 700,
    color: "white",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: 800,
    color: "#1f2937",
    lineHeight: 1.2,
  },
  cardSubtitle: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#6b7280",
  },

  floatingCard2: {
    position: "absolute",
    bottom: "30px",
    right: "-30px",
    background: "white",
    padding: "20px",
    borderRadius: "20px",
    width: "260px",
    boxShadow: "0 15px 40px rgba(0, 0, 0, 0.2)",
    animation: "float 3s ease-in-out infinite 1s",
  },
  courseCardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "16px",
  },
  courseIconWrapper: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  courseIconSvg: {
    width: "24px",
    height: "24px",
    color: "white",
  },
  courseName: {
    fontSize: "16px",
    fontWeight: 700,
    color: "#1f2937",
  },
  courseLevel: {
    fontSize: "12px",
    fontWeight: 600,
    color: "#6b7280",
  },
  progressContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  progressBar: {
    width: "100%",
    height: "8px",
    background: "#e5e7eb",
    borderRadius: "10px",
    overflow: "hidden",
  },
  progressFill: {
    width: "75%",
    height: "100%",
    background: "linear-gradient(90deg, #667eea, #764ba2)",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(102, 126, 234, 0.5)",
  },
  progressText: {
    fontSize: "13px",
    fontWeight: 700,
    color: "#667eea",
  },

  ratingBadge: {
    position: "absolute",
    top: "50%",
    right: "-50px",
    transform: "translateY(-50%)",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "white",
    padding: "16px 20px",
    borderRadius: "20px",
    boxShadow: "0 15px 40px rgba(0, 0, 0, 0.2)",
    animation: "float 3s ease-in-out infinite 0.5s",
  },
  starIcon: {
    width: "32px",
    height: "32px",
    color: "#fbbf24",
  },
  ratingNumber: {
    fontSize: "20px",
    fontWeight: 800,
    color: "#1f2937",
    lineHeight: 1,
  },
  ratingLabel: {
    fontSize: "11px",
    fontWeight: 600,
    color: "#6b7280",
    textTransform: "uppercase",
  },

  // BACKGROUND ELEMENTS
  bgCircle1: {
    position: "absolute",
    width: "600px",
    height: "600px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(240, 147, 251, 0.2), transparent 70%)",
    top: "-200px",
    left: "-200px",
    animation: "rotate 20s linear infinite",
  },
  bgCircle2: {
    position: "absolute",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(255, 255, 255, 0.1), transparent 70%)",
    bottom: "-100px",
    right: "10%",
    animation: "rotate 15s linear infinite reverse",
  },
  bgCircle3: {
    position: "absolute",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(245, 87, 108, 0.15), transparent 70%)",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    animation: "pulse 4s ease-in-out infinite",
  },
};

// Add CSS animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  @keyframes pulse {
    0%, 100% { 
      transform: scale(1);
      opacity: 1;
    }
    50% { 
      transform: scale(1.1);
      opacity: 0.8;
    }
  }
  
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  button:hover {
    transform: translateY(-3px) !important;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3) !important;
  }
  
  button:active {
    transform: translateY(-1px) !important;
  }

  @media (max-width: 1024px) {
    [style*="gridTemplateColumns"] {
      grid-template-columns: 1fr !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default HeroSection;