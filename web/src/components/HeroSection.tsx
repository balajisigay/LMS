import React, { useEffect, useState, useCallback } from "react";
import { getCurrentUser } from "../utils/auth";
import { getEnrollments } from "../../../src/api/enrollmentService";
import { getLearningProgress, CourseProgress } from "../../../src/api/learningProgressService";
import {
  HiAcademicCap,
  HiPlay,
  HiClock,
  HiCheckCircle,
  HiLightningBolt,
  HiStar,
  HiUsers,
  HiChartBar,
  HiArrowRight,
  HiRefresh,
} from "react-icons/hi";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
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
    instructor?: { name: string };
  };
  enrolledAt: string;
}

interface EnrichedEnrollment extends Enrollment {
  progress: number;
  lastAccessed?: Date;
  timeSpent?: number;
}

/* ─────────────────────────────────────────────
   COURSE STATUS
───────────────────────────────────────────── */
const getCourseStatus = (progress: number) => {
  if (progress === 100) return { label: "Completed",   color: "var(--hs-green)",  bg: "var(--hs-green-s)"  };
  if (progress > 50)   return { label: "Almost Done",  color: "var(--hs-amber)",  bg: "var(--hs-amber-s)"  };
  if (progress > 0)    return { label: "In Progress",  color: "var(--hs-accent)", bg: "var(--hs-accent-s)" };
  return               { label: "Not Started",         color: "var(--hs-muted)",  bg: "var(--hs-surface-3)"};
};

/* ─────────────────────────────────────────────
   COURSE CARD
───────────────────────────────────────────── */
const CourseCard: React.FC<{ course: EnrichedEnrollment; onClick: () => void }> = ({ course, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const status = getCourseStatus(course.progress);

  return (
    <div
      className={`hs-course-card${hovered ? " hs-course-card--hover" : ""}`}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail */}
      <div className="hs-thumb">
        <img
          src={course.course.imageUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400"}
          alt={course.course.title}
          className={`hs-thumb-img${hovered ? " hs-thumb-img--zoom" : ""}`}
        />
        <div className={`hs-thumb-overlay${hovered ? " hs-thumb-overlay--show" : ""}`}>
          <span className="hs-play-btn"><HiPlay size={16} /></span>
        </div>
        {course.progress > 0 && (
          <span className="hs-prog-badge">{course.progress}%</span>
        )}
      </div>

      {/* Body */}
      <div className="hs-card-body">
        <div>
          <h4 className="hs-card-title">{course.course.title}</h4>
          <p className="hs-card-instructor">
            <HiAcademicCap size={13} />
            {course.course.instructor?.name || "Expert Instructor"}
          </p>
        </div>

        <div className="hs-card-footer">
          {/* Progress bar */}
          <div className="hs-bar-wrap">
            <div className="hs-bar">
              <div className="hs-bar-fill" style={{ width: `${course.progress}%` }}>
                <div className="hs-bar-shimmer" />
              </div>
            </div>
          </div>
          {/* Status chip */}
          <span className="hs-status-chip" style={{ color: status.color, background: status.bg }}>
            {status.label}
          </span>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   STREAK CARD
───────────────────────────────────────────── */
const StreakCard: React.FC<{ streak: number; totalTime: number }> = ({ streak, totalTime }) => (
  <div className="hs-streak-card">
    <div className="hs-streak-left">
      <span className="hs-streak-emoji">🔥</span>
      <div>
        <p className="hs-streak-num">{streak}-day streak</p>
        <p className="hs-streak-sub">Keep the momentum going</p>
      </div>
    </div>
    <div className="hs-streak-right">
      <span className="hs-streak-stat"><HiClock size={13} /> {totalTime}h this week</span>
      <span className="hs-streak-stat"><HiChartBar size={13} /> +{streak * 10} XP earned</span>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   FLOATING CARD (guest hero)
───────────────────────────────────────────── */
const FloatCard: React.FC<{
  style?: React.CSSProperties;
  delay?: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  bold: string;
  small: string;
}> = ({ style, delay, icon, iconBg, iconColor, bold, small }) => (
  <div className="hs-float-card" style={{ ...style, animationDelay: delay }}>
    <span className="hs-float-icon" style={{ background: iconBg, color: iconColor }}>{icon}</span>
    <div>
      <p className="hs-float-bold">{bold}</p>
      <p className="hs-float-small">{small}</p>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export const HeroSection: React.FC<HeroSectionProps> = ({
  onExplorePress,
  onWatchDemoPress,
  onCoursePress,
}) => {
  const [enrolledCourses, setEnrolledCourses] = useState<EnrichedEnrollment[]>([]);
  const [loading, setLoading]   = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    totalCourses: 200000, activeLearners: 50000,
    completionRate: 0, totalProgress: 0, streak: 0, weeklyHours: 0,
  });

  const loadUserData = useCallback(async () => {
    try {
      const user = getCurrentUser();
      if (user?.userId) {
        setIsLoggedIn(true);
        setUserName(user.fullName || user.email?.split("@")[0] || "Student");

        const [enrollments, progressData] = await Promise.all([
          getEnrollments(String(user.userId)),
          getLearningProgress(String(user.userId)),
        ]);

        const progressMap = new Map<number, number>();
        progressData.forEach((p: CourseProgress) => progressMap.set(p.courseId, p.progress));

        const enriched: EnrichedEnrollment[] = enrollments
          .map((e: Enrollment) => ({
            ...e,
            progress: progressMap.get(e.course.id) || 0,
            lastAccessed: new Date(),
            timeSpent: Math.floor(Math.random() * 20) + 5,
          }))
          .sort((a: EnrichedEnrollment, b: EnrichedEnrollment) => b.progress - a.progress)
          .slice(0, 3);

        setEnrolledCourses(enriched);

        const avg = enriched.length ? Math.round(enriched.reduce((s, e) => s + e.progress, 0) / enriched.length) : 0;
        const completed = enriched.filter((e) => e.progress === 100).length;
        const streak = Math.floor(Math.random() * 30) + 1;
        const weeklyHours = enriched.reduce((s, e) => s + (e.timeSpent || 0), 0);

        setStats((p) => ({
          ...p,
          completionRate: enriched.length ? Math.round((completed / enriched.length) * 100) : 0,
          totalProgress: avg,
          streak,
          weeklyHours,
        }));
      } else {
        setIsLoggedIn(false);
      }
    } catch (e) {
      console.error("Error loading hero data:", e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadUserData();
    const iv = setInterval(() => { if (isLoggedIn) { setRefreshing(true); loadUserData(); } }, 30000);
    return () => clearInterval(iv);
  }, [loadUserData, isLoggedIn]);

  return (
    <section className="hs-root">
      {/* Subtle grid texture */}
      <div className="hs-grid-tex" />
      {/* Decorative rings */}
      <div className="hs-ring hs-ring-1" />
      <div className="hs-ring hs-ring-2" />

      <div className="hs-wrap">
        <div className="hs-columns">

          {/* ═══════════════════════════════════
              LEFT — TEXT
          ═══════════════════════════════════ */}
          <div className="hs-left">

            {/* Eyebrow badge */}
            {isLoggedIn ? (
              <div className="hs-badge hs-badge--welcome">
                <span className="hs-wave">👋</span>
                <span className="hs-badge-text">Welcome back, <strong>{userName}</strong></span>
                {refreshing && <span className="hs-refresh-dot" />}
              </div>
            ) : (
              <div className="hs-badge">
                <span className="hs-pulse-dot" />
                <span className="hs-badge-text">Start your learning journey</span>
              </div>
            )}

            {/* Headline */}
            <h1 className="hs-headline">
              {isLoggedIn ? (
                <>Continue your<br /><em className="hs-em">learning journey.</em></>
              ) : (
                <>Master your future with<br /><em className="hs-em">world-class skills.</em></>
              )}
            </h1>

            {/* Description */}
            <p className="hs-desc">
              {isLoggedIn && enrolledCourses.length > 0 ? (
                <>You have <strong>{enrolledCourses.length} active {enrolledCourses.length === 1 ? "course" : "courses"}</strong> with an average progress of{" "}
                  <strong className="hs-progress-highlight">{stats.totalProgress}%</strong>.
                  {stats.completionRate > 0 && <> You've completed {stats.completionRate}% of your enrolled courses — outstanding work.</>}</>
              ) : isLoggedIn ? (
                "Ready to start learning? Explore thousands of courses and begin building your expertise today."
              ) : (
                `Join over 1M+ students learning from industry experts. Access ${stats.totalCourses.toLocaleString()}+ courses in coding, design, business, and more.`
              )}
            </p>

            {/* CTAs */}
            <div className="hs-actions">
              <button className="hs-btn-primary" onClick={onExplorePress}>
                {isLoggedIn ? "Explore More Courses" : "Get Started Free"}
                <HiArrowRight size={16} />
              </button>

              {!isLoggedIn && (
                <button className="hs-btn-ghost" onClick={onWatchDemoPress}>
                  <span className="hs-play-wrap"><HiPlay size={13} /></span>
                  Watch Demo
                </button>
              )}

              {isLoggedIn && enrolledCourses.length > 0 && (
                <button
                  className={`hs-btn-ghost${refreshing ? " hs-btn-ghost--loading" : ""}`}
                  onClick={() => { setRefreshing(true); loadUserData(); }}
                  disabled={refreshing}
                >
                  <HiRefresh size={15} className={refreshing ? "hs-spin" : ""} />
                  {refreshing ? "Refreshing…" : "Refresh"}
                </button>
              )}
            </div>

            {/* Stats strip */}
            <div className="hs-stats-strip">
              {isLoggedIn && enrolledCourses.length > 0 ? (
                <>
                  <div className="hs-stat">
                    <span className="hs-stat-num">{enrolledCourses.length}</span>
                    <span className="hs-stat-lbl">Active Courses</span>
                  </div>
                  <span className="hs-stat-div" />
                  <div className="hs-stat">
                    <span className="hs-stat-num">{stats.totalProgress}%</span>
                    <span className="hs-stat-lbl">Avg Progress</span>
                  </div>
                  <span className="hs-stat-div" />
                  <div className="hs-stat">
                    <span className="hs-stat-num">{stats.streak}d</span>
                    <span className="hs-stat-lbl">Streak 🔥</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="hs-stat">
                    <span className="hs-stat-num">200K+</span>
                    <span className="hs-stat-lbl">Courses</span>
                  </div>
                  <span className="hs-stat-div" />
                  <div className="hs-stat">
                    <span className="hs-stat-num">50K+</span>
                    <span className="hs-stat-lbl">Expert Mentors</span>
                  </div>
                  <span className="hs-stat-div" />
                  <div className="hs-stat">
                    <span className="hs-stat-num">4.9★</span>
                    <span className="hs-stat-lbl">Avg Rating</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* ═══════════════════════════════════
              RIGHT — VISUAL
          ═══════════════════════════════════ */}
          <div className="hs-right">

            {isLoggedIn && enrolledCourses.length > 0 ? (
              /* ── ENROLLED VIEW ── */
              <div className="hs-enrolled-panel">
                <div className="hs-enrolled-hdr">
                  <HiLightningBolt size={18} className="hs-bolt" />
                  <div>
                    <h3 className="hs-enrolled-title">Continue Learning</h3>
                    <p className="hs-enrolled-sub">Your {enrolledCourses.length} most recent {enrolledCourses.length === 1 ? "course" : "courses"}</p>
                  </div>
                </div>

                <div className="hs-courses-list">
                  {loading ? (
                    <div className="hs-loading-state">
                      <span className="hs-loader" />
                      <p className="hs-loading-txt">Loading your courses…</p>
                    </div>
                  ) : (
                    enrolledCourses.map((c) => (
                      <CourseCard key={c.id} course={c} onClick={() => onCoursePress?.(c.course.id)} />
                    ))
                  )}
                </div>

                {!loading && stats.streak > 0 && (
                  <StreakCard streak={stats.streak} totalTime={stats.weeklyHours} />
                )}
              </div>
            ) : (
              /* ── GUEST HERO IMAGE ── */
              <div className="hs-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=800&fit=crop"
                  alt="Students collaborating"
                  className="hs-hero-img"
                />
                <div className="hs-img-overlay" />

                <FloatCard
                  style={{ top: "8%", left: "-32px" }}
                  delay="0s"
                  icon={<HiUsers size={18} />}
                  iconBg="var(--hs-accent-s)" iconColor="var(--hs-accent)"
                  bold="10k+ Students" small="Enrolled Today"
                />
                <FloatCard
                  style={{ bottom: "20%", right: "-28px" }}
                  delay="1.4s"
                  icon={<HiCheckCircle size={18} />}
                  iconBg="var(--hs-green-s)" iconColor="var(--hs-green)"
                  bold="Course Completed" small="Python Advanced"
                />
                <FloatCard
                  style={{ top: "50%", right: "-36px" }}
                  delay="0.8s"
                  icon={<HiStar size={18} />}
                  iconBg="var(--hs-amber-s)" iconColor="var(--hs-amber)"
                  bold="Top Rated" small="4.9 / 5 Average"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── INLINE STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        /* ── TOKENS ── */
        :root {
          --hs-ink:        #0e0f13;
          --hs-ink-soft:   #3d4154;
          --hs-ink-muted:  #8b90a8;
          --hs-surface:    #ffffff;
          --hs-surface-2:  rgba(255,255,255,.06);
          --hs-surface-3:  rgba(255,255,255,.12);
          --hs-border:     rgba(255,255,255,.10);
          --hs-accent:     #1a56db;
          --hs-accent-s:   rgba(26,86,219,.15);
          --hs-green:      #16a34a;
          --hs-green-s:    rgba(22,163,74,.15);
          --hs-amber:      #b45309;
          --hs-amber-s:    rgba(180,83,9,.15);
          --hs-gold:       #c9a84c;
          --hs-muted:      rgba(255,255,255,.38);
          --hs-font-d:     'Playfair Display', Georgia, serif;
          --hs-font-b:     'DM Sans', 'Helvetica Neue', sans-serif;
          --hs-t:          .22s cubic-bezier(.4,0,.2,1);
        }

        /* ── SECTION ── */
        .hs-root {
          position: relative;
          width: 100%;
          min-height: 100vh;
          background: var(--hs-ink);
          color: #fff;
          font-family: var(--hs-font-b);
          -webkit-font-smoothing: antialiased;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding: 100px 24px 80px;
        }

        /* Subtle grid texture */
        .hs-grid-tex {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
          background-size: 52px 52px;
          pointer-events: none;
        }

        /* Decorative rings */
        .hs-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(201,168,76,.07);
          pointer-events: none;
        }
        .hs-ring-1 { width: 700px; height: 700px; bottom: -300px; right: -200px; animation: hs-spin 90s linear infinite; }
        .hs-ring-2 { width: 380px; height: 380px; top: -120px; left: -80px;  animation: hs-spin 70s linear infinite reverse; }

        @keyframes hs-spin { to { transform: rotate(360deg); } }

        /* Wrapper */
        .hs-wrap {
          max-width: 1280px;
          width: 100%;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .hs-columns {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 72px;
          align-items: center;
        }

        /* ═══════════════════════════════════
           LEFT COLUMN
        ═══════════════════════════════════ */
        .hs-left {
          animation: hs-fade-up .55s ease both;
        }

        @keyframes hs-fade-up {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Badge */
        .hs-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 16px;
          background: var(--hs-surface-2);
          border: 1px solid var(--hs-border);
          border-radius: 99px;
          margin-bottom: 28px;
          backdrop-filter: blur(8px);
        }

        .hs-badge--welcome {
          border-color: rgba(201,168,76,.25);
          background: rgba(201,168,76,.08);
        }

        .hs-badge-text {
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,.8);
        }

        .hs-badge-text strong { color: #fff; font-weight: 700; }

        .hs-pulse-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--hs-gold);
          animation: hs-pulse 2.4s ease infinite;
        }

        @keyframes hs-pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(201,168,76,.6); }
          60%      { box-shadow: 0 0 0 8px rgba(201,168,76,.0); }
        }

        .hs-wave { display: inline-block; animation: hs-wave 2s ease-in-out infinite; }
        @keyframes hs-wave {
          0%,100% { transform: rotate(0deg); }
          25%      { transform: rotate(18deg); }
          75%      { transform: rotate(-18deg); }
        }

        .hs-refresh-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--hs-gold);
          animation: hs-glow 1.6s ease infinite;
        }
        @keyframes hs-glow {
          0%,100% { opacity: 1; }
          50%      { opacity: .3; }
        }

        /* Headline */
        .hs-headline {
          font-family: var(--hs-font-d);
          font-size: clamp(36px, 4.5vw, 62px);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin: 0 0 22px;
          color: #fff;
        }

        .hs-em {
          font-style: italic;
          color: var(--hs-gold);
        }

        /* Description */
        .hs-desc {
          font-size: 15.5px;
          line-height: 1.8;
          color: rgba(255,255,255,.58);
          margin: 0 0 36px;
          max-width: 500px;
          font-weight: 300;
        }

        .hs-desc strong { color: rgba(255,255,255,.9); font-weight: 600; }
        .hs-progress-highlight { color: var(--hs-gold); }

        /* CTA buttons */
        .hs-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 48px;
        }

        .hs-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 13px 28px;
          background: #fff;
          color: var(--hs-ink);
          border: none;
          border-radius: 10px;
          font-family: var(--hs-font-b);
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: transform var(--hs-t), box-shadow var(--hs-t);
          box-shadow: 0 4px 16px rgba(255,255,255,.12);
          letter-spacing: .01em;
        }
        .hs-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(255,255,255,.18);
        }

        .hs-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 13px 22px;
          background: transparent;
          color: rgba(255,255,255,.72);
          border: 1px solid rgba(255,255,255,.18);
          border-radius: 10px;
          font-family: var(--hs-font-b);
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background var(--hs-t), border-color var(--hs-t), color var(--hs-t);
        }
        .hs-btn-ghost:hover:not(:disabled) {
          background: rgba(255,255,255,.07);
          border-color: rgba(255,255,255,.3);
          color: #fff;
        }
        .hs-btn-ghost--loading { opacity: .5; cursor: not-allowed; }

        .hs-play-wrap {
          width: 24px; height: 24px;
          border-radius: 50%;
          background: rgba(255,255,255,.15);
          display: flex; align-items: center; justify-content: center;
        }

        .hs-spin { animation: hs-spin .6s linear infinite; }

        /* Stats strip */
        .hs-stats-strip {
          display: flex;
          align-items: center;
          gap: 28px;
          flex-wrap: wrap;
          padding-top: 28px;
          border-top: 1px solid rgba(255,255,255,.08);
        }

        .hs-stat {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .hs-stat-num {
          font-family: var(--hs-font-d);
          font-size: 26px;
          font-weight: 700;
          color: #fff;
          line-height: 1;
          letter-spacing: -0.02em;
        }

        .hs-stat-lbl {
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: .06em;
          text-transform: uppercase;
          color: rgba(255,255,255,.35);
        }

        .hs-stat-div {
          width: 1px; height: 36px;
          background: rgba(255,255,255,.1);
        }

        /* ═══════════════════════════════════
           RIGHT COLUMN
        ═══════════════════════════════════ */
        .hs-right {
          display: flex;
          justify-content: center;
          position: relative;
          animation: hs-fade-up .65s ease both .15s;
        }

        /* ── HERO IMAGE (guest) ── */
        .hs-img-wrap {
          position: relative;
          width: 100%;
          max-width: 520px;
        }

        .hs-hero-img {
          width: 100%;
          border-radius: 20px;
          display: block;
          transform: rotate(1.5deg);
          border: 1px solid rgba(255,255,255,.1);
          box-shadow: 0 32px 64px rgba(0,0,0,.5);
        }

        .hs-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(14,15,19,.55), transparent 55%);
          border-radius: 20px;
          transform: rotate(1.5deg);
          pointer-events: none;
        }

        /* Floating cards */
        .hs-float-card {
          position: absolute;
          background: rgba(255,255,255,.96);
          backdrop-filter: blur(16px);
          padding: 14px 18px;
          border-radius: 14px;
          box-shadow: 0 16px 40px rgba(0,0,0,.22);
          display: flex;
          align-items: center;
          gap: 12px;
          z-index: 10;
          color: var(--hs-ink);
          min-width: 188px;
          animation: hs-float 6s ease-in-out infinite;
        }

        @keyframes hs-float {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }

        .hs-float-icon {
          width: 38px; height: 38px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .hs-float-bold  { font-size: 13px; font-weight: 700; color: var(--hs-ink); margin: 0; }
        .hs-float-small { font-size: 12px; color: var(--hs-ink-muted); margin: 2px 0 0; }

        /* ── ENROLLED PANEL ── */
        .hs-enrolled-panel {
          width: 100%;
          max-width: 520px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .hs-enrolled-hdr {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--hs-border);
        }

        .hs-bolt { color: var(--hs-gold); flex-shrink: 0; margin-top: 3px; }

        .hs-enrolled-title {
          font-family: var(--hs-font-d);
          font-size: 22px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 3px;
          letter-spacing: -0.01em;
        }

        .hs-enrolled-sub {
          font-size: 13px;
          color: rgba(255,255,255,.4);
          margin: 0;
          font-weight: 400;
        }

        /* Courses list */
        .hs-courses-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        /* Course card */
        .hs-course-card {
          display: flex;
          gap: 14px;
          background: rgba(255,255,255,.05);
          border: 1px solid var(--hs-border);
          border-radius: 14px;
          padding: 14px;
          cursor: pointer;
          transition: background var(--hs-t), border-color var(--hs-t), transform var(--hs-t);
        }

        .hs-course-card--hover {
          background: rgba(255,255,255,.09);
          border-color: rgba(201,168,76,.3);
          transform: translateX(4px);
        }

        .hs-thumb {
          width: 120px; height: 84px;
          border-radius: 10px;
          overflow: hidden;
          position: relative;
          flex-shrink: 0;
          background: rgba(255,255,255,.05);
        }

        .hs-thumb-img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform var(--hs-t);
        }
        .hs-thumb-img--zoom { transform: scale(1.08); }

        .hs-thumb-overlay {
          position: absolute; inset: 0;
          background: rgba(0,0,0,.45);
          display: flex; align-items: center; justify-content: center;
          opacity: 0;
          transition: opacity var(--hs-t);
        }
        .hs-thumb-overlay--show { opacity: 1; }

        .hs-play-btn {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,.95);
          color: var(--hs-ink);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,.25);
        }

        .hs-prog-badge {
          position: absolute;
          top: 7px; right: 7px;
          background: rgba(14,15,19,.85);
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 6px;
          border: 1px solid rgba(255,255,255,.12);
        }

        .hs-card-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-width: 0;
        }

        .hs-card-title {
          font-size: 14px;
          font-weight: 600;
          color: rgba(255,255,255,.92);
          margin: 0 0 5px;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .hs-card-instructor {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          color: rgba(255,255,255,.4);
          margin: 0;
          font-weight: 400;
        }

        .hs-card-footer {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .hs-bar-wrap { flex: 1; }

        .hs-bar {
          width: 100%; height: 5px;
          background: rgba(255,255,255,.1);
          border-radius: 99px;
          overflow: hidden;
        }

        .hs-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--hs-gold), rgba(201,168,76,.65));
          border-radius: 99px;
          transition: width .6s ease;
          position: relative;
          overflow: hidden;
        }

        .hs-bar-shimmer {
          position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.35), transparent);
          animation: hs-shimmer 2.4s infinite;
        }
        @keyframes hs-shimmer { to { left: 100%; } }

        .hs-status-chip {
          font-size: 11px;
          font-weight: 600;
          padding: 3px 9px;
          border-radius: 6px;
          white-space: nowrap;
        }

        /* Streak card */
        .hs-streak-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          background: rgba(201,168,76,.08);
          border: 1px solid rgba(201,168,76,.2);
          border-radius: 14px;
          gap: 16px;
        }

        .hs-streak-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .hs-streak-emoji {
          font-size: 26px;
          line-height: 1;
        }

        .hs-streak-num {
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 3px;
        }

        .hs-streak-sub {
          font-size: 12px;
          color: rgba(255,255,255,.4);
          margin: 0;
        }

        .hs-streak-right {
          display: flex;
          flex-direction: column;
          gap: 5px;
          align-items: flex-end;
        }

        .hs-streak-stat {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 500;
          color: rgba(255,255,255,.45);
        }

        /* Loading state */
        .hs-loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          padding: 48px 0;
        }

        .hs-loader {
          display: block;
          width: 32px; height: 32px;
          border: 3px solid rgba(255,255,255,.1);
          border-top-color: var(--hs-gold);
          border-radius: 50%;
          animation: hs-spin .7s linear infinite;
        }

        .hs-loading-txt {
          font-size: 13px;
          color: rgba(255,255,255,.35);
          margin: 0;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 960px) {
          .hs-columns {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          .hs-right { order: -1; }
          .hs-enrolled-panel,
          .hs-img-wrap { max-width: 100%; }
        }

        @media (max-width: 600px) {
          .hs-root { padding: 80px 20px 60px; }
          .hs-actions { flex-direction: column; align-items: flex-start; }
          .hs-btn-primary, .hs-btn-ghost { width: 100%; justify-content: center; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
