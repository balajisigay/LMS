import React from "react";

// --- Types ---
interface HeroSectionProps {
  onExplorePress?: () => void;
  onWatchDemoPress?: () => void;
}

// --- Sub-Components ---
const StatItem = ({ number, label }: { number: string; label: string }) => (
  <div className="stat-item">
    <div style={styles.statNumber}>{number}</div>
    <div style={styles.statLabel}>{label}</div>
  </div>
);

const FloatingCard = ({ 
  position, 
  children, 
  delay 
}: { 
  position: React.CSSProperties; 
  children: React.ReactNode; 
  delay: string; 
}) => (
  <div 
    className="floating-card" 
    style={{ ...styles.floatingCard, ...position, animationDelay: delay }}
  >
    {children}
  </div>
);

// --- Main Component ---
export const HeroSection: React.FC<HeroSectionProps> = ({
  onExplorePress,
  onWatchDemoPress,
}) => {
  return (
    <section style={styles.container}>
      {/* Scoped Styles for Animations & Media Queries */}
      <style>{cssStyles}</style>

      {/* Background Decor */}
      <div style={styles.blob1} />
      <div style={styles.blob2} />
      <div style={styles.gridOverlay} />

      <div style={styles.wrapper}>
        <div style={styles.grid}>
          
          {/* LEFT CONTENT */}
          <div style={styles.contentColumn}>
            {/* Badge */}
            <div style={styles.badge}>
              <span className="pulse-dot" style={styles.badgeDot} />
              <span style={styles.badgeText}>NEW V2.0 RELEASED</span>
            </div>

            {/* Headline */}
            <h1 style={styles.title}>
              Master your future with <br />
              <span style={styles.gradientText}>world-class skills.</span>
            </h1>

            {/* Description */}
            <p style={styles.description}>
              Join over 1M+ students learning from experts. Access 200,000+
              courses in coding, design, business, and more. Start your journey today.
            </p>

            {/* CTA Buttons */}
            <div style={styles.buttonRow}>
              <button 
                className="btn-primary" 
                onClick={onExplorePress} 
                style={styles.primaryBtn}
              >
                <span>Get Started</span>
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>

              <button 
                className="btn-secondary" 
                onClick={onWatchDemoPress} 
                style={styles.secondaryBtn}
              >
                <div style={styles.playIconWrapper}>
                  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 14, height: 14 }}>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Stats */}
            <div style={styles.statsContainer}>
              <StatItem number="200K+" label="Courses" />
              <div style={styles.statDivider} />
              <StatItem number="50K+" label="Mentors" />
              <div style={styles.statDivider} />
              <StatItem number="4.9/5" label="Rating" />
            </div>
          </div>

          {/* RIGHT CONTENT (Visuals) */}
          <div style={styles.imageColumn}>
            <div style={styles.imageWrapper}>
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=800&fit=crop"
                alt="Students collaborating"
                style={styles.heroImage}
              />
              <div style={styles.imageOverlay} />

              {/* Floating Elements */}
              <FloatingCard position={{ top: "10%", left: "-30px" }} delay="0s">
                 <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={styles.iconCircle}>🎓</div>
                    <div>
                      <div style={styles.cardBold}>10k+ Students</div>
                      <div style={styles.cardSmall}>Enrolled Today</div>
                    </div>
                 </div>
              </FloatingCard>

              <FloatingCard position={{ bottom: "20%", right: "-20px" }} delay="1.5s">
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <div style={{...styles.iconCircle, background: '#ecfdf5', color: '#10b981'}}>✅</div>
                  <div>
                    <div style={styles.cardBold}>Course Completed</div>
                    <div style={styles.cardSmall}>Python Advanced</div>
                  </div>
                </div>
              </FloatingCard>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- CSS Styles (Injected) ---
const cssStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
  }
  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.7); }
    70% { box-shadow: 0 0 0 10px rgba(74, 222, 128, 0); }
    100% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0); }
  }
  @keyframes blob {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
  }

  .floating-card { animation: float 6s ease-in-out infinite; }
  .pulse-dot { animation: pulse 2s infinite; }
  
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
  .btn-secondary:hover { background: rgba(255, 255, 255, 0.2) !important; }

  /* Responsive Adjustments */
  @media (max-width: 1024px) {
    .stat-item { text-align: center; }
  }
`;

// --- Inline Styles ---
const styles: Record<string, React.CSSProperties> = {
  container: {
    position: "relative",
    width: "100%",
    minHeight: "100vh",
    background: "#0f172a", // Dark Slate
    color: "#fff",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "80px 20px",
  },
  // Background Blobs
  blob1: {
    position: "absolute",
    top: "-10%",
    left: "-10%",
    width: "600px",
    height: "600px",
    background: "radial-gradient(circle, #6366f1 0%, rgba(99, 102, 241, 0) 70%)",
    borderRadius: "50%",
    filter: "blur(80px)",
    opacity: 0.5,
    animation: "blob 10s infinite",
    zIndex: 0,
  },
  blob2: {
    position: "absolute",
    bottom: "-10%",
    right: "-10%",
    width: "500px",
    height: "500px",
    background: "radial-gradient(circle, #ec4899 0%, rgba(236, 72, 153, 0) 70%)",
    borderRadius: "50%",
    filter: "blur(80px)",
    opacity: 0.4,
    animation: "blob 12s infinite reverse",
    zIndex: 0,
  },
  gridOverlay: {
    position: "absolute",
    inset: 0,
    backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
    backgroundSize: "50px 50px",
    zIndex: 0,
    pointerEvents: "none",
  },
  
  // Layout
  wrapper: {
    maxWidth: "1280px",
    width: "100%",
    zIndex: 1,
    position: "relative",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "60px",
    justifyContent: "space-between",
  },
  contentColumn: {
    flex: "1 1 500px",
  },
  imageColumn: {
    flex: "1 1 500px",
    display: "flex",
    justifyContent: "center",
    position: "relative",
  },

  // Typography & Elements
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px 16px",
    background: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "100px",
    marginBottom: "32px",
    backdropFilter: "blur(10px)",
  },
  badgeDot: {
    width: "8px",
    height: "8px",
    background: "#4ade80",
    borderRadius: "50%",
  },
  badgeText: {
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.05em",
    color: "#e2e8f0",
  },
  title: {
    fontSize: "clamp(2.5rem, 5vw, 4.5rem)", // Responsive Font Size
    fontWeight: 800,
    lineHeight: 1.1,
    marginBottom: "24px",
    letterSpacing: "-0.02em",
  },
  gradientText: {
    background: "linear-gradient(to right, #818cf8, #c084fc, #f472b6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  description: {
    fontSize: "1.125rem",
    lineHeight: 1.7,
    color: "#94a3b8",
    marginBottom: "40px",
    maxWidth: "540px",
  },
  
  // Buttons
  buttonRow: {
    display: "flex",
    gap: "16px",
    marginBottom: "60px",
    flexWrap: "wrap",
  },
  primaryBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "#6366f1",
    color: "white",
    border: "none",
    padding: "16px 32px",
    borderRadius: "12px",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  secondaryBtn: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "rgba(255, 255, 255, 0.05)",
    color: "white",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    padding: "16px 32px",
    borderRadius: "12px",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  playIconWrapper: {
    width: "24px",
    height: "24px",
    background: "white",
    borderRadius: "50%",
    color: "#0f172a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  // Stats
  statsContainer: {
    display: "flex",
    alignItems: "center",
    gap: "30px",
    paddingTop: "30px",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
  },
  statNumber: {
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "white",
  },
  statLabel: {
    fontSize: "0.875rem",
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  statDivider: {
    width: "1px",
    height: "40px",
    background: "rgba(255, 255, 255, 0.1)",
  },

  // Images & Cards
  imageWrapper: {
    position: "relative",
    width: "100%",
    maxWidth: "600px",
    borderRadius: "24px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
  },
  heroImage: {
    width: "100%",
    height: "auto",
    borderRadius: "24px",
    display: "block",
    transform: "rotate(2deg)",
    border: "4px solid rgba(255, 255, 255, 0.1)",
  },
  imageOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(15, 23, 42, 0.5), transparent)",
    borderRadius: "24px",
    transform: "rotate(2deg)",
  },
  floatingCard: {
    position: "absolute",
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(12px)",
    padding: "16px 20px",
    borderRadius: "16px",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
    zIndex: 10,
    color: "#1e293b",
    minWidth: "200px",
  },
  cardBold: { fontWeight: 700, fontSize: "14px" },
  cardSmall: { fontSize: "12px", color: "#64748b" },
  iconCircle: {
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    background: "#eff6ff",
    color: "#3b82f6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
  }
};

export default HeroSection;