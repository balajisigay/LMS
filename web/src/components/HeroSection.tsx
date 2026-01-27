import React, { useEffect, useState, useCallback } from "react";
import { getCurrentUser } from "../utils/auth";
import { getEnrollments } from "../../../src/api/enrollmentService";
import { getLearningProgress, CourseProgress } from "../../../src/api/learningProgressService";
import { 
  HiAcademicCap, 
  HiPlay, 
  HiTrendingUp, 
  HiClock,
  HiCheckCircle,
  HiLightningBolt,
  HiStar,
  HiUsers,
  HiChartBar
} from "react-icons/hi";

interface HeroSectionProps {
  onExplorePress?: () => void;
  onWatchDemoPress?: () => void;
  onCoursePress?: (courseId: number) => void;
}

interface Enrollment {
  id: number;
  course: {
    id: number;
    title: string;
    imageUrl?: string;
    description?: string;
    instructor?: {
      name: string;
    };
  };
  enrolledAt: string;
}

interface EnrichedEnrollment extends Enrollment {
  progress: number;
  lastAccessed?: Date;
  timeSpent?: number;
}

const StatItem = ({ 
  number, 
  label, 
  icon 
}: { 
  number: string; 
  label: string;
  icon?: React.ReactNode;
}) => (
  <div className="stat-item" style={styles.statItem}>
    {icon && <div style={styles.statIcon}>{icon}</div>}
    <div>
      <div style={styles.statNumber}>{number}</div>
      <div style={styles.statLabel}>{label}</div>
    </div>
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

const EnrolledCourseCard = ({ 
  course, 
  onClick 
}: { 
  course: EnrichedEnrollment; 
  onClick: () => void; 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getStatusInfo = () => {
    if (course.progress === 100) {
      return { 
        icon: <HiCheckCircle size={16} />, 
        text: "Completed", 
        color: "#10B981",
        bg: "rgba(16, 185, 129, 0.15)"
      };
    } else if (course.progress > 50) {
      return { 
        icon: <HiTrendingUp size={16} />, 
        text: "Almost Done", 
        color: "#F59E0B",
        bg: "rgba(245, 158, 11, 0.15)"
      };
    } else if (course.progress > 0) {
      return { 
        icon: <HiLightningBolt size={16} />, 
        text: "In Progress", 
        color: "#3B82F6",
        bg: "rgba(59, 130, 246, 0.15)"
      };
    } else {
      return { 
        icon: <HiClock size={16} />, 
        text: "Start Now", 
        color: "#6B7280",
        bg: "rgba(107, 114, 128, 0.15)"
      };
    }
  };

  const status = getStatusInfo();

  return (
    <div 
      style={{
        ...styles.courseCard,
        transform: isHovered ? "translateX(8px)" : "translateX(0)",
        borderColor: isHovered ? "rgba(99, 102, 241, 0.4)" : "rgba(255, 255, 255, 0.1)",
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.courseCardImage}>
        <img 
          src={course.course.imageUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400"} 
          alt={course.course.title}
          style={{
            ...styles.courseImg,
            transform: isHovered ? "scale(1.1)" : "scale(1)"
          }}
        />
        <div style={{
          ...styles.courseOverlay,
          opacity: isHovered ? 1 : 0
        }}>
          <div style={styles.playButton}>
            <HiPlay size={18} />
          </div>
        </div>
        
        {/* Progress Badge on Image */}
        {course.progress > 0 && (
          <div style={styles.progressBadge}>
            {course.progress}%
          </div>
        )}
      </div>

      <div style={styles.courseCardContent}>
        <div>
          <h4 style={styles.courseCardTitle}>{course.course.title}</h4>
          <p style={styles.courseInstructor}>
            <HiAcademicCap size={14} />
            {course.course.instructor?.name || 'Expert Instructor'}
          </p>
        </div>
        
        <div style={styles.courseFooter}>
          <div style={styles.progressContainer}>
            <div style={styles.progressBar}>
              <div 
                style={{
                  ...styles.progressFill,
                  width: `${course.progress}%`
                }}
              >
                <div style={styles.progressShimmer} />
              </div>
            </div>
          </div>
          
          <div style={{ ...styles.statusBadge, background: status.bg, color: status.color }}>
            {status.icon}
            <span>{status.text}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const LearningStreakCard = ({ 
  streak, 
  totalTime 
}: { 
  streak: number; 
  totalTime: number; 
}) => (
  <div style={styles.streakCard}>
    <div style={styles.streakHeader}>
      <div style={styles.streakIconWrapper}>
        🔥
      </div>
      <div>
        <div style={styles.streakNumber}>{streak} Day Streak!</div>
        <div style={styles.streakSubtext}>Keep the momentum going</div>
      </div>
    </div>
    <div style={styles.streakFooter}>
      <div style={styles.streakStat}>
        <HiClock size={16} color="#94A3B8" />
        <span>{totalTime}h this week</span>
      </div>
      <div style={styles.streakStat}>
        <HiChartBar size={16} color="#94A3B8" />
        <span>+{streak * 10} XP</span>
      </div>
    </div>
  </div>
);

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExplorePress,
  onWatchDemoPress,
  onCoursePress,
}) => {
  const [enrolledCourses, setEnrolledCourses] = useState<EnrichedEnrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [stats, setStats] = useState({
    totalCourses: 200000,
    activeLearners: 50000,
    averageRating: 4.9,
    completionRate: 0,
    totalProgress: 0,
    streak: 0,
    weeklyHours: 0
  });
  const [refreshing, setRefreshing] = useState(false);

  const loadUserData = useCallback(async () => {
    try {
      const user = getCurrentUser();
      
      if (user && user.userId) {
        setIsLoggedIn(true);
        setUserName(user.fullName || user.email?.split('@')[0] || "Student");
        
        // Fetch enrollments and progress in parallel
        const [enrollments, progressData] = await Promise.all([
          getEnrollments(user.userId),
          getLearningProgress(String(user.userId))
        ]);

        // Create a map of courseId -> progress percentage
        const progressMap = new Map<number, number>();
        progressData.forEach((p: CourseProgress) => {
          progressMap.set(p.courseId, p.progress);
        });

        // Enrich enrollments with progress data
        const enrichedEnrollments: EnrichedEnrollment[] = enrollments
          .map((enrollment: Enrollment) => ({
            ...enrollment,
            progress: progressMap.get(enrollment.course.id) || 0,
            lastAccessed: new Date(), // Mock data
            timeSpent: Math.floor(Math.random() * 20) + 5 // Mock data
          }))
          .sort((a, b) => b.progress - a.progress) // Sort by progress
          .slice(0, 3); // Show top 3 courses

        setEnrolledCourses(enrichedEnrollments);

        // Calculate stats
        const totalProgress = enrichedEnrollments.reduce((sum, e) => sum + e.progress, 0);
        const avgProgress = enrichedEnrollments.length > 0 
          ? Math.round(totalProgress / enrichedEnrollments.length) 
          : 0;
        const completedCount = enrichedEnrollments.filter(e => e.progress === 100).length;
        const completionRate = enrichedEnrollments.length > 0
          ? Math.round((completedCount / enrolledEnrollments.length) * 100)
          : 0;

        // Mock streak and time data
        const streak = Math.floor(Math.random() * 30) + 1;
        const weeklyHours = enrichedEnrollments.reduce((sum, e) => sum + (e.timeSpent || 0), 0);

        setStats(prev => ({
          ...prev,
          completionRate,
          totalProgress: avgProgress,
          streak,
          weeklyHours
        }));
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadUserData();

    // Set up auto-refresh every 30 seconds
    const interval = setInterval(() => {
      if (isLoggedIn) {
        setRefreshing(true);
        loadUserData();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [loadUserData, isLoggedIn]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadUserData();
  };

  return (
    <section style={styles.container}>
      <style>{cssStyles}</style>

      {/* Background Elements */}
      <div style={styles.blob1} />
      <div style={styles.blob2} />
      <div style={styles.blob3} />
      <div style={styles.gridOverlay} />

      <div style={styles.wrapper}>
        <div style={styles.grid}>
          
          {/* LEFT CONTENT */}
          <div style={styles.contentColumn}>
            {/* Welcome Badge */}
            {isLoggedIn ? (
              <div style={styles.welcomeBadge}>
                <span className="wave">👋</span>
                <span style={styles.welcomeText}>Welcome back, {userName}!</span>
                {refreshing && <span style={styles.refreshingDot} />}
              </div>
            ) : (
              <div style={styles.badge}>
                <span className="pulse-dot" style={styles.badgeDot} />
                <span style={styles.badgeText}>🚀 START YOUR LEARNING JOURNEY</span>
              </div>
            )}

            {/* Headline */}
            <h1 style={styles.title}>
              {isLoggedIn ? (
                <>Continue your learning <br /><span style={styles.gradientText}>journey today.</span></>
              ) : (
                <>Master your future with <br /><span style={styles.gradientText}>world-class skills.</span></>
              )}
            </h1>

            {/* Description */}
            <p style={styles.description}>
              {isLoggedIn ? (
                enrolledCourses.length > 0 ? (
                  <>
                    You have <strong style={{ color: "#fff" }}>{enrolledCourses.length} active {enrolledCourses.length === 1 ? 'course' : 'courses'}</strong> with an average progress of <strong style={{ color: "#4ade80" }}>{stats.totalProgress}%</strong>. 
                    {stats.completionRate > 0 && (
                      <> Keep up the amazing work — you're {stats.completionRate}% completion rate is outstanding!</>
                    )}
                  </>
                ) : (
                  "Ready to start learning? Explore thousands of courses and begin building your expertise today."
                )
              ) : (
                `Join over 1M+ students learning from industry experts. Access ${stats.totalCourses.toLocaleString()}+ courses in coding, design, business, and more.`
              )}
            </p>

            {/* CTA Buttons */}
            <div style={styles.buttonRow}>
              <button 
                className="btn-primary" 
                onClick={onExplorePress} 
                style={styles.primaryBtn}
              >
                <span>{isLoggedIn ? 'Explore More Courses' : 'Get Started Free'}</span>
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
                  <HiPlay size={14} />
                </div>
                <span>Watch Demo</span>
              </button>

              {isLoggedIn && enrolledCourses.length > 0 && (
                <button 
                  className="btn-tertiary"
                  onClick={handleRefresh}
                  style={styles.tertiaryBtn}
                  disabled={refreshing}
                >
                  <HiTrendingUp size={16} />
                  <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
                </button>
              )}
            </div>

            {/* Stats */}
            <div style={styles.statsContainer}>
              {isLoggedIn && enrolledCourses.length > 0 ? (
                <>
                  <StatItem 
                    number={`${enrolledCourses.length}`} 
                    label="Active Courses"
                    icon={<HiAcademicCap size={20} color="#6366F1" />}
                  />
                  <div style={styles.statDivider} />
                  <StatItem 
                    number={`${stats.totalProgress}%`} 
                    label="Avg Progress"
                    icon={<HiChartBar size={20} color="#10B981" />}
                  />
                  <div style={styles.statDivider} />
                  <StatItem 
                    number={`${stats.streak}d`} 
                    label="Streak"
                    icon={<span style={{ fontSize: 20 }}>🔥</span>}
                  />
                </>
              ) : (
                <>
                  <StatItem 
                    number="200K+" 
                    label="Courses"
                    icon={<HiAcademicCap size={20} color="#6366F1" />}
                  />
                  <div style={styles.statDivider} />
                  <StatItem 
                    number="50K+" 
                    label="Expert Mentors"
                    icon={<HiUsers size={20} color="#EC4899" />}
                  />
                  <div style={styles.statDivider} />
                  <StatItem 
                    number="4.9/5" 
                    label="Avg Rating"
                    icon={<HiStar size={20} color="#F59E0B" />}
                  />
                </>
              )}
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div style={styles.imageColumn}>
            {isLoggedIn && enrolledCourses.length > 0 ? (
              // ENROLLED COURSES VIEW
              <div style={styles.enrolledCoursesContainer}>
                <div style={styles.enrolledHeader}>
                  <h3 style={styles.enrolledTitle}>
                    <HiLightningBolt size={28} style={{ color: "#F59E0B" }} />
                    Continue Learning
                  </h3>
                  <p style={styles.enrolledSubtitle}>
                    Your top {enrolledCourses.length} active {enrolledCourses.length === 1 ? 'course' : 'courses'}
                  </p>
                </div>
                
                <div style={styles.coursesGrid}>
                  {loading ? (
                    <div style={styles.loadingState}>
                      <div style={styles.spinner} />
                      <p style={styles.loadingText}>Loading your courses...</p>
                    </div>
                  ) : (
                    enrolledCourses.map((course) => (
                      <EnrolledCourseCard
                        key={course.id}
                        course={course}
                        onClick={() => onCoursePress?.(course.course.id)}
                      />
                    ))
                  )}
                </div>

                {/* Learning Streak Card */}
                {!loading && stats.streak > 0 && (
                  <LearningStreakCard 
                    streak={stats.streak}
                    totalTime={stats.weeklyHours}
                  />
                )}
              </div>
            ) : (
              // DEFAULT HERO IMAGE
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
                    <div style={styles.iconCircle}>
                      <HiUsers size={22} />
                    </div>
                    <div>
                      <div style={styles.cardBold}>10k+ Students</div>
                      <div style={styles.cardSmall}>Enrolled Today</div>
                    </div>
                  </div>
                </FloatingCard>

                <FloatingCard position={{ bottom: "20%", right: "-20px" }} delay="1.5s">
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{...styles.iconCircle, background: '#ecfdf5', color: '#10b981'}}>
                      <HiCheckCircle size={22} />
                    </div>
                    <div>
                      <div style={styles.cardBold}>Course Completed</div>
                      <div style={styles.cardSmall}>Python Advanced</div>
                    </div>
                  </div>
                </FloatingCard>

                <FloatingCard position={{ top: "50%", right: "-40px" }} delay="0.8s">
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{...styles.iconCircle, background: '#fef3c7', color: '#f59e0b'}}>
                      <HiStar size={22} />
                    </div>
                    <div>
                      <div style={styles.cardBold}>Top Rated</div>
                      <div style={styles.cardSmall}>4.9/5 Average</div>
                    </div>
                  </div>
                </FloatingCard>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

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

  @keyframes wave {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(20deg); }
    75% { transform: rotate(-20deg); }
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }

  @keyframes pulseGlow {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.95); }
  }

  .floating-card { animation: float 6s ease-in-out infinite; }
  .pulse-dot { animation: pulse 2s infinite; }
  .wave { display: inline-block; animation: wave 2s ease-in-out infinite; }
  
  .btn-primary:hover { 
    transform: translateY(-2px); 
    box-shadow: 0 20px 40px -5px rgba(99, 102, 241, 0.4); 
  }
  
  .btn-secondary:hover { 
    background: rgba(255, 255, 255, 0.15) !important; 
    border-color: rgba(255, 255, 255, 0.3) !important;
  }

  .btn-tertiary:hover:not(:disabled) {
    background: rgba(99, 102, 241, 0.15) !important;
    border-color: rgba(99, 102, 241, 0.3) !important;
  }

  .btn-tertiary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 1024px) {
    .stat-item { text-align: center; }
  }
`;

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: "relative",
    width: "100%",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
    color: "#fff",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "100px 20px 80px 20px",
  },
  
  blob1: {
    position: "absolute",
    top: "-10%",
    left: "-10%",
    width: "600px",
    height: "600px",
    background: "radial-gradient(circle, #6366f1 0%, rgba(99, 102, 241, 0) 70%)",
    borderRadius: "50%",
    filter: "blur(100px)",
    opacity: 0.4,
    animation: "blob 15s infinite",
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
    filter: "blur(100px)",
    opacity: 0.3,
    animation: "blob 18s infinite reverse",
    zIndex: 0,
  },
  
  blob3: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "400px",
    height: "400px",
    background: "radial-gradient(circle, #8b5cf6 0%, rgba(139, 92, 246, 0) 70%)",
    borderRadius: "50%",
    filter: "blur(100px)",
    opacity: 0.2,
    animation: "blob 20s infinite",
    zIndex: 0,
  },
  
  gridOverlay: {
    position: "absolute",
    inset: 0,
    backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)",
    backgroundSize: "50px 50px",
    zIndex: 0,
    pointerEvents: "none",
  },
  
  wrapper: {
    maxWidth: "1400px",
    width: "100%",
    zIndex: 1,
    position: "relative",
  },
  
  grid: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: "80px",
    justifyContent: "space-between",
  },
  
  contentColumn: {
    flex: "1 1 500px",
  },
  
  imageColumn: {
    flex: "1 1 520px",
    display: "flex",
    justifyContent: "center",
    position: "relative",
  },

  // Badges
  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 20px",
    background: "rgba(99, 102, 241, 0.1)",
    border: "1px solid rgba(99, 102, 241, 0.3)",
    borderRadius: "100px",
    marginBottom: "32px",
    backdropFilter: "blur(10px)",
  },
  
  welcomeBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 20px",
    background: "linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(59, 130, 246, 0.15))",
    border: "1px solid rgba(16, 185, 129, 0.3)",
    borderRadius: "100px",
    marginBottom: "32px",
    backdropFilter: "blur(10px)",
  },
  
  welcomeText: {
    fontSize: "14px",
    fontWeight: 700,
    color: "#e2e8f0",
  },

  refreshingDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#10B981",
    animation: "pulseGlow 2s infinite",
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
    fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
    fontWeight: 800,
    lineHeight: 1.1,
    marginBottom: "24px",
    letterSpacing: "-0.02em",
  },
  
  gradientText: {
    background: "linear-gradient(135deg, #818cf8, #c084fc, #f472b6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  
  description: {
    fontSize: "1.15rem",
    lineHeight: 1.7,
    color: "#cbd5e1",
    marginBottom: "40px",
    maxWidth: "600px",
  },
  
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
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "white",
    border: "none",
    padding: "18px 36px",
    borderRadius: "14px",
    fontSize: "1rem",
    fontWeight: 700,
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 10px 30px rgba(99, 102, 241, 0.3)",
  },
  
  secondaryBtn: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "rgba(255, 255, 255, 0.08)",
    color: "white",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    padding: "18px 36px",
    borderRadius: "14px",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s ease",
    backdropFilter: "blur(10px)",
  },

  tertiaryBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "rgba(99, 102, 241, 0.08)",
    color: "#A5B4FC",
    border: "1px solid rgba(99, 102, 241, 0.2)",
    padding: "18px 36px",
    borderRadius: "14px",
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s ease",
    backdropFilter: "blur(10px)",
  },
  
  playIconWrapper: {
    width: "28px",
    height: "28px",
    background: "white",
    borderRadius: "50%",
    color: "#0f172a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  statsContainer: {
    display: "flex",
    alignItems: "center",
    gap: "30px",
    paddingTop: "30px",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    flexWrap: "wrap",
  },

  statItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  statIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "12px",
    background: "rgba(99, 102, 241, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  
  statNumber: {
    fontSize: "1.75rem",
    fontWeight: 800,
    background: "linear-gradient(135deg, #fff, #cbd5e1)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    lineHeight: 1,
  },
  
  statLabel: {
    fontSize: "0.875rem",
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginTop: "4px",
  },
  
  statDivider: {
    width: "1px",
    height: "50px",
    background: "rgba(255, 255, 255, 0.1)",
  },

  // Hero Image (for non-logged-in users)
  imageWrapper: {
    position: "relative",
    width: "100%",
    maxWidth: "600px",
  },
  
  heroImage: {
    width: "100%",
    height: "auto",
    borderRadius: "24px",
    display: "block",
    transform: "rotate(2deg)",
    border: "4px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 30px 60px rgba(0, 0, 0, 0.4)",
  },
  
  imageOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to top, rgba(15, 23, 42, 0.6), transparent)",
    borderRadius: "24px",
    transform: "rotate(2deg)",
  },
  
  floatingCard: {
    position: "absolute",
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(16px)",
    padding: "16px 20px",
    borderRadius: "16px",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
    zIndex: 10,
    color: "#1e293b",
    minWidth: "200px",
  },
  
  cardBold: { fontWeight: 700, fontSize: "14px" },
  cardSmall: { fontSize: "12px", color: "#64748b", marginTop: "2px" },
  
  iconCircle: {
    width: "44px",
    height: "44px",
    borderRadius: "12px",
    background: "#eff6ff",
    color: "#3b82f6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    flexShrink: 0,
  },

  // Enrolled Courses Section
  enrolledCoursesContainer: {
    width: "100%",
    maxWidth: "600px",
  },
  
  enrolledHeader: {
    marginBottom: "28px",
  },
  
  enrolledTitle: {
    fontSize: "28px",
    fontWeight: 800,
    color: "#fff",
    margin: 0,
    marginBottom: "8px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  
  enrolledSubtitle: {
    fontSize: "15px",
    color: "#94a3b8",
    margin: 0,
  },
  
  coursesGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    marginBottom: "20px",
  },
  
  courseCard: {
    display: "flex",
    gap: "16px",
    background: "rgba(30, 41, 59, 0.6)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "20px",
    padding: "16px",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    backdropFilter: "blur(16px)",
  },
  
  courseCardImage: {
    width: "140px",
    height: "100px",
    borderRadius: "12px",
    overflow: "hidden",
    position: "relative",
    flexShrink: 0,
    background: "#1e293b",
  },
  
  courseImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease",
  },
  
  courseOverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0, 0, 0, 0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "opacity 0.3s ease",
  },
  
  playButton: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.95)",
    color: "#6366f1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: "bold",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
  },

  progressBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    background: "rgba(99, 102, 241, 0.95)",
    color: "white",
    padding: "4px 10px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: 700,
    backdropFilter: "blur(8px)",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
  },
  
  courseCardContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minWidth: 0,
  },
  
  courseCardTitle: {
    fontSize: "16px",
    fontWeight: 700,
    color: "#f1f5f9",
    margin: 0,
    marginBottom: "6px",
    lineHeight: 1.4,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },

  courseInstructor: {
    fontSize: "13px",
    color: "#94A3B8",
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },

  courseFooter: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  
  progressContainer: {
    flex: 1,
  },
  
  progressBar: {
    width: "100%",
    height: "8px",
    background: "rgba(30, 58, 138, 0.3)",
    borderRadius: "999px",
    overflow: "hidden",
    position: "relative",
  },
  
  progressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
    borderRadius: "999px",
    transition: "width 0.5s ease",
    position: "relative",
    overflow: "hidden",
  },

  progressShimmer: {
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
    animation: "shimmer 2s infinite",
  },

  statusBadge: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 12px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: 600,
    whiteSpace: "nowrap",
  },

  // Learning Streak Card
  streakCard: {
    background: "linear-gradient(135deg, rgba(251, 191, 36, 0.15), rgba(245, 158, 11, 0.15))",
    border: "1px solid rgba(251, 191, 36, 0.3)",
    borderRadius: "20px",
    padding: "20px 24px",
    backdropFilter: "blur(16px)",
  },

  streakHeader: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "16px",
  },

  streakIconWrapper: {
    width: "56px",
    height: "56px",
    borderRadius: "16px",
    background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    flexShrink: 0,
    boxShadow: "0 8px 24px rgba(251, 191, 36, 0.3)",
  },

  streakNumber: {
    fontSize: "18px",
    fontWeight: 800,
    color: "#fff",
    marginBottom: "4px",
  },

  streakSubtext: {
    fontSize: "13px",
    color: "#94A3B8",
  },

  streakFooter: {
    display: "flex",
    gap: "20px",
    paddingTop: "16px",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
  },

  streakStat: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13px",
    color: "#CBD5E1",
    fontWeight: 500,
  },

  // Loading State
  loadingState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
    padding: "60px 20px",
  },
  
  spinner: {
    width: "40px",
    height: "40px",
    border: "4px solid rgba(255, 255, 255, 0.1)",
    borderTop: "4px solid #6366f1",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  
  loadingText: {
    fontSize: "14px",
    color: "#94a3b8",
    margin: 0,
  },
};

export default HeroSection;