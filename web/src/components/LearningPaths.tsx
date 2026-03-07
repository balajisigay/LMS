import React, { useEffect, useMemo, useState, useCallback } from "react";
import { getEnrollments, Enrollment } from "../../../src/api/enrollmentService";
import { getLearningProgress, CourseProgress } from "../../../src/api/learningProgressService";
import { requireAuth } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import {
  HiAcademicCap,
  HiClock,
  HiCheckCircle,
  HiChartBar,
  HiLightningBolt,
  HiRefresh,
  HiArrowRight,
} from "react-icons/hi";

/* ─── INJECT STYLES ─────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  .lp-root *, .lp-root *::before, .lp-root *::after { box-sizing: border-box; }

  .lp-root {
    font-family: 'DM Sans', sans-serif;
    background: #0d0e11;
    padding: 72px 0 80px;
    position: relative;
    overflow: hidden;
  }

  /* mesh bg */
  .lp-mesh {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      radial-gradient(ellipse 60% 50% at 10% 20%, rgba(201,168,76,0.06), transparent),
      radial-gradient(ellipse 50% 60% at 90% 80%, rgba(201,168,76,0.04), transparent),
      radial-gradient(ellipse 40% 40% at 50% 50%, rgba(255,255,255,0.015), transparent);
  }

  .lp-wrapper {
    position: relative;
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 40px;
    display: grid;
    grid-template-columns: 1fr 380px;
    gap: 48px;
    align-items: start;
  }

  /* ── Section Header ── */
  .lp-header { margin-bottom: 40px; }

  .lp-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #c9a84c;
    margin-bottom: 18px;
  }
  .lp-eyebrow-line {
    width: 28px;
    height: 1px;
    background: #c9a84c;
    opacity: 0.6;
  }

  .lp-title {
    font-family: 'Playfair Display', serif;
    font-size: 2.6rem;
    font-weight: 700;
    color: #f0f1f5;
    letter-spacing: -0.025em;
    line-height: 1.15;
    margin: 0 0 14px;
  }

  .lp-subtitle {
    font-size: 0.95rem;
    color: #555868;
    line-height: 1.65;
    margin: 0;
    max-width: 520px;
  }

  .lp-refresh-btn {
    margin-top: 20px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: none;
    border: 1px solid #1e2028;
    color: #7b7f93;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.04em;
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
  }
  .lp-refresh-btn:hover { border-color: #c9a84c40; color: #c9a84c; }
  .lp-refresh-btn svg { transition: transform 0.4s; }
  .lp-refresh-btn:hover svg { transform: rotate(180deg); }

  .lp-refreshing-dot {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #4ade80;
    box-shadow: 0 0 6px #4ade8060;
    margin-left: 4px;
    animation: lp-pulse 1.8s infinite;
  }
  @keyframes lp-pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

  /* ── Course Cards ── */
  .lp-list { display: flex; flex-direction: column; gap: 12px; }

  .lp-card {
    display: grid;
    grid-template-columns: 64px 1fr auto;
    align-items: center;
    gap: 20px;
    background: #13151a;
    border: 1px solid #1e2028;
    border-radius: 16px;
    padding: 20px 22px;
    cursor: pointer;
    transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
    animation: lp-fadeup 0.35s ease backwards;
    text-decoration: none;
  }
  .lp-card:hover {
    border-color: #c9a84c30;
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(0,0,0,0.25);
  }
  @keyframes lp-fadeup {
    from { opacity:0; transform:translateY(16px); }
    to   { opacity:1; transform:translateY(0); }
  }

  .lp-thumb {
    width: 64px;
    height: 64px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
  }
  .lp-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 14px;
  }
  .lp-thumb-badge {
    position: absolute;
    top: -3px;
    right: -3px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #0d0e11;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .lp-card-body { min-width: 0; }

  .lp-card-top {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 5px;
  }

  .lp-card-title {
    font-size: 0.97rem;
    font-weight: 600;
    color: #e8e9ef;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
  }

  .lp-status {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    padding: 3px 9px;
    border-radius: 20px;
    flex-shrink: 0;
  }

  .lp-card-meta {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
  }
  .lp-meta-item {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.78rem;
    color: #3a3d4d;
    font-weight: 400;
  }
  .lp-meta-dot { width: 3px; height: 3px; border-radius: 50%; background: #2a2d3a; }

  .lp-progress-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .lp-track {
    flex: 1;
    height: 4px;
    background: #1e2028;
    border-radius: 999px;
    overflow: hidden;
  }
  .lp-fill {
    height: 100%;
    border-radius: 999px;
    transition: width 0.6s cubic-bezier(.4,0,.2,1);
    position: relative;
    overflow: hidden;
  }
  .lp-fill::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
    animation: lp-shimmer 2.2s infinite;
  }
  @keyframes lp-shimmer { from{transform:translateX(-100%)} to{transform:translateX(100%)} }

  .lp-pct {
    font-size: 0.78rem;
    font-weight: 700;
    color: #7b7f93;
    min-width: 36px;
    text-align: right;
  }

  .lp-card-arrow {
    width: 34px;
    height: 34px;
    border-radius: 10px;
    border: 1px solid #1e2028;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #3a3d4d;
    flex-shrink: 0;
    transition: all 0.2s;
  }
  .lp-card:hover .lp-card-arrow {
    border-color: #c9a84c40;
    color: #c9a84c;
    transform: translateX(2px);
  }

  /* ── States ── */
  .lp-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 64px 32px;
  }
  .lp-spinner {
    width: 36px;
    height: 36px;
    border: 3px solid #1e2028;
    border-top-color: #c9a84c;
    border-radius: 50%;
    animation: lp-spin 0.75s linear infinite;
  }
  @keyframes lp-spin { to { transform: rotate(360deg); } }
  .lp-loading p { color: #3a3d4d; font-size: 0.88rem; margin: 0; }

  .lp-error {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px 24px;
    background: #1a0e0e;
    border: 1px solid #3d1316;
    border-radius: 14px;
  }
  .lp-error p { color: #f87171; font-size: 0.88rem; margin: 0 0 8px; }
  .lp-retry {
    background: none;
    border: 1px solid #6b1e22;
    color: #f87171;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.78rem;
    font-weight: 600;
    padding: 5px 12px;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.2s;
  }
  .lp-retry:hover { background: #2a1012; }

  .lp-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 64px 32px;
    background: #13151a;
    border: 1px dashed #1e2028;
    border-radius: 20px;
    text-align: center;
  }
  .lp-empty-icon { font-size: 40px; margin-bottom: 4px; }
  .lp-empty h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1.25rem;
    color: #c8cad6;
    margin: 0;
    font-weight: 600;
  }
  .lp-empty p { color: #3a3d4d; font-size: 0.88rem; margin: 0; }
  .lp-explore-btn {
    margin-top: 12px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #c9a84c;
    color: #0d0e11;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.03em;
    padding: 12px 22px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
  }
  .lp-explore-btn:hover { background: #d9bb66; transform: translateY(-1px); }

  /* ── Right Panel ── */
  .lp-panel {
    background: #13151a;
    border: 1px solid #1e2028;
    border-radius: 20px;
    padding: 28px;
    position: sticky;
    top: 28px;
    display: flex;
    flex-direction: column;
    gap: 28px;
  }

  .lp-panel-header { padding-bottom: 20px; border-bottom: 1px solid #1e2028; }
  .lp-panel-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.15rem;
    font-weight: 600;
    color: #f0f1f5;
    margin: 0 0 6px;
    display: flex;
    align-items: center;
    gap: 9px;
  }
  .lp-panel-title svg { color: #c9a84c; }
  .lp-panel-sub { font-size: 0.78rem; color: #3a3d4d; margin: 0; line-height: 1.5; }

  /* Stats */
  .lp-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
  .lp-stat {
    background: #0d0e11;
    border: 1px solid #1e2028;
    border-radius: 12px;
    padding: 14px 12px;
    text-align: center;
  }
  .lp-stat-val {
    font-family: 'Playfair Display', serif;
    font-size: 1.6rem;
    font-weight: 700;
    color: #f0f1f5;
    line-height: 1;
    margin-bottom: 5px;
  }
  .lp-stat-label {
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #3a3d4d;
  }
  .lp-stat.gold .lp-stat-val  { color: #c9a84c; }
  .lp-stat.green .lp-stat-val { color: #4ade80; }
  .lp-stat.amber .lp-stat-val { color: #fbbf24; }

  /* Weekly bars */
  .lp-weekly-label {
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #3a3d4d;
    margin-bottom: 14px;
  }

  .lp-bars {
    display: flex;
    align-items: flex-end;
    gap: 8px;
    height: 120px;
  }

  .lp-bar-col {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    position: relative;
    cursor: default;
  }

  .lp-bar-track {
    width: 100%;
    flex: 1;
    background: #0d0e11;
    border: 1px solid #1e2028;
    border-radius: 6px;
    display: flex;
    align-items: flex-end;
    overflow: hidden;
  }

  .lp-bar-fill {
    width: 100%;
    border-radius: 4px 4px 0 0;
    transition: height 0.5s cubic-bezier(.4,0,.2,1);
    background: linear-gradient(180deg, #c9a84c, #a67c2e);
  }
  .lp-bar-fill.zero { background: transparent; }

  .lp-bar-day {
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    color: #3a3d4d;
    text-transform: uppercase;
  }
  .lp-bar-col:hover .lp-bar-day { color: #c9a84c; }
  .lp-bar-col:hover .lp-bar-fill:not(.zero) { background: linear-gradient(180deg, #d9bb66, #c9a84c); }

  .lp-bar-tip {
    position: absolute;
    bottom: calc(100% + 6px);
    left: 50%;
    transform: translateX(-50%);
    background: #c9a84c;
    color: #0d0e11;
    font-size: 0.68rem;
    font-weight: 700;
    padding: 3px 7px;
    border-radius: 5px;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.15s;
  }
  .lp-bar-col:hover .lp-bar-tip { opacity: 1; }

  /* No-progress note */
  .lp-no-data {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 20px;
    background: #0d0e11;
    border: 1px dashed #1e2028;
    border-radius: 12px;
    text-align: center;
  }
  .lp-no-data p { color: #3a3d4d; font-size: 0.8rem; margin: 0; line-height: 1.5; }

  /* Responsive */
  @media (max-width: 1024px) {
    .lp-wrapper { grid-template-columns: 1fr; }
    .lp-panel { position: static; }
  }
  @media (max-width: 640px) {
    .lp-wrapper { padding: 0 20px; }
    .lp-title { font-size: 1.9rem; }
    .lp-card { grid-template-columns: 52px 1fr auto; gap: 14px; padding: 16px; }
    .lp-thumb { width: 52px; height: 52px; }
    .lp-stats { grid-template-columns: repeat(3, 1fr); }
  }
`;

if (typeof document !== "undefined") {
  const existing = document.getElementById("lp-styles");
  if (!existing) {
    const tag = document.createElement("style");
    tag.id = "lp-styles";
    tag.textContent = css;
    document.head.appendChild(tag);
  }
}

/* ═══════════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════════ */
interface LearningPathsProps {
  onPathPress?: (courseId: string) => void;
}

interface EnrichedCourse {
  id: number;
  title: string;
  progress: number;
  enrolledAt: Date;
  instructor: string;
  totalLessons?: number;
  completedLessons?: number;
  estimatedTime?: string;
  imageUrl?: string;
}

/* ─── helpers ─── */
const ACCENT_GRADIENTS = [
  { bg: "linear-gradient(135deg,#c9a84c,#a67c2e)", glow: "#c9a84c" },
  { bg: "linear-gradient(135deg,#4f8ef7,#2563eb)", glow: "#4f8ef7" },
  { bg: "linear-gradient(135deg,#34d399,#059669)", glow: "#34d399" },
  { bg: "linear-gradient(135deg,#a78bfa,#7c3aed)", glow: "#a78bfa" },
];

function getStatusProps(progress: number) {
  if (progress === 100) return { icon: <HiCheckCircle size={11} />, text: "Completed",  bg: "#0d2818", color: "#4ade80", border: "#1a5c35" };
  if (progress  >   0) return { icon: <HiLightningBolt size={11} />, text: "In Progress", bg: "#1a1506", color: "#fbbf24", border: "#5c4a0e" };
  return                      { icon: <HiClock size={11} />,          text: "Not Started", bg: "#13151a", color: "#555868", border: "#1e2028" };
}

/* ═══════════════════════════════════════════════════════
   LEARNING CARD
═══════════════════════════════════════════════════════ */
const LearningCard: React.FC<{
  course: EnrichedCourse;
  index: number;
  onPress?: () => void;
}> = ({ course, index, onPress }) => {
  const accent = ACCENT_GRADIENTS[index % ACCENT_GRADIENTS.length];
  const status = getStatusProps(course.progress);
  const days   = Math.floor((Date.now() - new Date(course.enrolledAt).getTime()) / 86_400_000);

  return (
    <div
      className="lp-card"
      style={{ animationDelay: `${index * 0.06}s` }}
      onClick={onPress}
    >
      {/* Thumbnail */}
      <div className="lp-thumb" style={{ background: accent.bg }}>
        {course.imageUrl ? (
          <img src={course.imageUrl} alt={course.title} onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
        ) : (
          <HiAcademicCap size={24} color="rgba(255,255,255,0.9)" />
        )}
        {course.progress === 100 && (
          <div className="lp-thumb-badge">
            <HiCheckCircle size={14} color="#4ade80" />
          </div>
        )}
      </div>

      {/* Body */}
      <div className="lp-card-body">
        <div className="lp-card-top">
          <p className="lp-card-title">{course.title}</p>
          <span
            className="lp-status"
            style={{ background: status.bg, color: status.color, border: `1px solid ${status.border}` }}
          >
            {status.icon} {status.text}
          </span>
        </div>

        <div className="lp-card-meta">
          <span className="lp-meta-item">
            <HiAcademicCap size={12} /> {course.instructor}
          </span>
          {course.completedLessons !== undefined && course.totalLessons !== undefined && (
            <>
              <span className="lp-meta-dot" />
              <span className="lp-meta-item">{course.completedLessons}/{course.totalLessons} lessons</span>
            </>
          )}
          {course.estimatedTime && (
            <>
              <span className="lp-meta-dot" />
              <span className="lp-meta-item"><HiClock size={11} /> {course.estimatedTime}</span>
            </>
          )}
          <span className="lp-meta-dot" />
          <span className="lp-meta-item">{days === 0 ? "Enrolled today" : `${days}d ago`}</span>
        </div>

        <div className="lp-progress-row">
          <div className="lp-track">
            <div
              className="lp-fill"
              style={{ width: `${course.progress}%`, background: accent.bg }}
            />
          </div>
          <span className="lp-pct">{course.progress}%</span>
        </div>
      </div>

      {/* Arrow */}
      <div className="lp-card-arrow">
        <HiArrowRight size={14} />
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════
   ANALYTICS PANEL (right)
═══════════════════════════════════════════════════════ */
const AnalyticsPanel: React.FC<{ courses: EnrichedCourse[] }> = ({ courses }) => {
  const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const { bars, bestDay, avgPct } = useMemo(() => {
    const vals = courses.length > 0
      ? [...courses.slice(0, 7).map(c => Math.min(c.progress, 100))]
      : Array(7).fill(0);
    while (vals.length < 7) vals.push(0);

    const active  = vals.filter(v => v > 0);
    const avg     = active.length ? Math.round(vals.reduce((a, b) => a + b, 0) / active.length) : 0;
    const maxVal  = Math.max(...vals);
    const maxIdx  = vals.indexOf(maxVal);
    return { bars: vals, bestDay: maxVal > 0 ? DAYS[maxIdx] : null, avgPct: avg };
  }, [courses]);

  const total     = courses.length;
  const completed = courses.filter(c => c.progress === 100).length;
  const active    = courses.filter(c => c.progress > 0 && c.progress < 100).length;

  return (
    <aside className="lp-panel">
      {/* Header */}
      <div className="lp-panel-header">
        <h3 className="lp-panel-title">
          <HiChartBar size={18} /> Learning Analytics
        </h3>
        <p className="lp-panel-sub">
          {avgPct > 0
            ? `Avg. progress ${avgPct}%${bestDay ? ` · Peak activity: ${bestDay}` : ""}`
            : "Enrol in courses to see analytics"}
        </p>
      </div>

      {/* Stats */}
      <div className="lp-stats">
        <div className="lp-stat gold">
          <div className="lp-stat-val">{total}</div>
          <div className="lp-stat-label">Enrolled</div>
        </div>
        <div className="lp-stat green">
          <div className="lp-stat-val">{completed}</div>
          <div className="lp-stat-label">Done</div>
        </div>
        <div className="lp-stat amber">
          <div className="lp-stat-val">{active}</div>
          <div className="lp-stat-label">Active</div>
        </div>
      </div>

      {/* Weekly Bars */}
      <div>
        <p className="lp-weekly-label">Weekly Activity</p>
        <div className="lp-bars">
          {bars.map((val, i) => (
            <div key={i} className="lp-bar-col">
              {val > 0 && <span className="lp-bar-tip">{val}%</span>}
              <div className="lp-bar-track">
                <div
                  className={`lp-bar-fill${val === 0 ? " zero" : ""}`}
                  style={{ height: `${val}%` }}
                />
              </div>
              <span className="lp-bar-day">{DAYS[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Empty notice */}
      {total === 0 && (
        <div className="lp-no-data">
          <p>Enrol in courses to begin tracking your weekly learning activity.</p>
        </div>
      )}
    </aside>
  );
};

/* ═══════════════════════════════════════════════════════
   MAIN
═══════════════════════════════════════════════════════ */
export const LearningPaths: React.FC<LearningPathsProps> = ({ onPathPress }) => {
  const navigate  = useNavigate();
  const [courses,    setCourses]    = useState<EnrichedCourse[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const user = requireAuth(navigate);
      const [enrollData, progressData] = await Promise.all([
        getEnrollments(String(user.userId)),
        getLearningProgress(String(user.userId)),
      ]);

      const progressMap = new Map<number, number>();
      progressData.forEach((p: CourseProgress) => progressMap.set(p.courseId, p.progress));

      const enriched: EnrichedCourse[] = enrollData.map((e: Enrollment) => ({
        id:               e.course.id,
        title:            e.course.title,
        progress:         progressMap.get(e.course.id) || 0,
        enrolledAt:       new Date(e.enrolledAt),
        instructor:       e.course.instructor?.name || "Unknown Instructor",
        imageUrl:         e.course.imageUrl,
        estimatedTime:    "2–4 hours",
        totalLessons:     12,
        completedLessons: Math.floor((progressMap.get(e.course.id) || 0) / 100 * 12),
      }));

      enriched.sort((a, b) => b.enrolledAt.getTime() - a.enrolledAt.getTime());
      setCourses(enriched);
    } catch (err: any) {
      if (err.message === "Authentication required") return;
      setError(err.message || "Failed to load progress");
      setCourses([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [navigate]);

  useEffect(() => {
    load();
    const id = setInterval(() => { setRefreshing(true); load(); }, 30_000);
    return () => clearInterval(id);
  }, [load]);

  const handleClick = (courseId: number) =>
    onPathPress ? onPathPress(String(courseId)) : navigate(`/course/${courseId}`);

  return (
    <section className="lp-root">
      <div className="lp-mesh" />

      <div className="lp-wrapper">
        {/* ── Left ── */}
        <div>
          {/* Header */}
          <header className="lp-header">
            <div className="lp-eyebrow">
              <span className="lp-eyebrow-line" />
              Your Learning Journey
              {refreshing && <span className="lp-refreshing-dot" />}
            </div>
            <h2 className="lp-title">Continue Your Progress</h2>
            <p className="lp-subtitle">
              {courses.length > 0
                ? `You're enrolled in ${courses.length} ${courses.length === 1 ? "course" : "courses"}. Keep building momentum.`
                : "Discover courses and start your learning journey today."}
            </p>
            {courses.length > 0 && (
              <button className="lp-refresh-btn" onClick={() => { setRefreshing(true); load(); }}>
                <HiRefresh size={13} /> Refresh Progress
              </button>
            )}
          </header>

          {/* Content */}
          <div className="lp-list">
            {loading && (
              <div className="lp-loading">
                <div className="lp-spinner" />
                <p>Loading your courses…</p>
              </div>
            )}

            {!loading && error && (
              <div className="lp-error">
                <div>
                  <p>{error}</p>
                  <button className="lp-retry" onClick={load}>Try Again</button>
                </div>
              </div>
            )}

            {!loading && !error && courses.length === 0 && (
              <div className="lp-empty">
                <span className="lp-empty-icon">🎓</span>
                <h3>Ready to start learning?</h3>
                <p>Explore our catalogue and begin your journey today.</p>
                <button className="lp-explore-btn" onClick={() => navigate("/")}>
                  <HiAcademicCap size={16} /> Explore Courses
                </button>
              </div>
            )}

            {!loading && !error && courses.map((course, i) => (
              <LearningCard
                key={course.id}
                course={course}
                index={i}
                onPress={() => handleClick(course.id)}
              />
            ))}
          </div>
        </div>

        {/* ── Right ── */}
        <AnalyticsPanel courses={courses} />
      </div>
    </section>
  );
};

export default LearningPaths;
