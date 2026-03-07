import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseById } from "../services/courseService";
import { addToCart } from "../../../src/api/cartService";
import { Course } from "../types/course";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { updateProgress } from "../../../src/api/learningProgressService";
import { getCurrentUser, requireAuth } from "../utils/auth";
import { checkEnrollment } from "../../../src/api/enrollmentService";
import {
  HiPlay,
  HiChevronDown,
  HiChevronUp,
  HiStar,
  HiUsers,
  HiCheckCircle,
  HiShieldCheck,
  HiAcademicCap,
  HiLockClosed,
  HiDownload,
  HiDeviceMobile,
  HiArrowRight,
} from "react-icons/hi";

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
const parseDurationToSeconds = (duration?: string): number => {
  if (!duration) return 0;
  const v = duration.trim().toLowerCase();
  if (v.includes(":")) {
    const parts = v.split(":").map(Number);
    if (parts.length === 2 && parts.every(isFinite)) return parts[0] * 60 + parts[1];
    if (parts.length === 3 && parts.every(isFinite)) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  const h = v.match(/(\d+)\s*h/), m = v.match(/(\d+)\s*m/), s = v.match(/(\d+)\s*s/);
  const total = (h ? +h[1] * 3600 : 0) + (m ? +m[1] * 60 : 0) + (s ? +s[1] : 0);
  if (total > 0) return total;
  const plain = Number(v);
  return isFinite(plain) && plain > 0 ? plain * 60 : 0;
};

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export const CourseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [course, setCourse]                   = useState<Course | null>(null);
  const [loading, setLoading]                 = useState(true);
  const [error, setError]                     = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set([0]));
  const [selectedVideo, setSelectedVideo]     = useState<string | null>(null);
  const [selectedLecture, setSelectedLecture] = useState<string>("");
  const [isEnrolled, setIsEnrolled]           = useState(false);
  const [addingToCart, setAddingToCart]       = useState(false);

  useEffect(() => { if (id) loadCourse(id); }, [id]);

  const loadCourse = async (courseId: string) => {
    try {
      setLoading(true);
      const data = await getCourseById(courseId);
      setCourse(data);
      const firstLec = data.courseSections?.[0]?.lectures?.[0];
      if (firstLec) { setSelectedVideo(firstLec.videoUrl); setSelectedLecture(firstLec.title); }
      const user = getCurrentUser();
      if (user?.userId) setIsEnrolled(await checkEnrollment(String(user.userId), data.id));
    } catch (e: any) {
      setError(e?.message ?? "Failed to load course");
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (i: number) => {
    const s = new Set(expandedSections);
    s.has(i) ? s.delete(i) : s.add(i);
    setExpandedSections(s);
  };

  const handleLectureClick = async (url: string, title: string, duration?: string) => {
    setSelectedVideo(url);
    setSelectedLecture(title);
    window.scrollTo({ top: 0, behavior: "smooth" });
    try {
      const user = getCurrentUser();
      if (!user || !course) return;
      const secs = parseDurationToSeconds(duration);
      await updateProgress(String(user.userId), course.id, secs > 0 ? secs : undefined);
      window.dispatchEvent(new CustomEvent("progress-updated"));
    } catch (e) { console.error("Progress update failed", e); }
  };

  const handleAddToCart = async () => {
    if (!course) return;
    try {
      setAddingToCart(true);
      const user = requireAuth(navigate);
      if (isEnrolled) { alert("You already own this course."); return; }
      await addToCart(String(user.userId), course.id);
      navigate("/cart");
    } catch (e) { console.error(e); }
    finally { setAddingToCart(false); }
  };

  const totalLectures = course?.courseSections?.reduce((s, sec) => s + (sec.lectures?.length ?? 0), 0) ?? 0;
  const discountedPrice = course ? (course.price * 0.7).toFixed(2) : "0";

  /* ── Loading ── */
  if (loading) return (
    <div className="cdp-loading">
      <span className="cdp-loader" />
      <p>Loading course…</p>
      <CdpStyles />
    </div>
  );

  /* ── Error ── */
  if (!course || error) return (
    <div className="cdp-error">
      <p>{error || "Course not found."}</p>
      <button className="cdp-error-btn" onClick={() => navigate(-1)}>Go Back</button>
      <CdpStyles />
    </div>
  );

  return (
    <div className="cdp-root">
      <CdpStyles />
      <Header />

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="cdp-hero">
        <div className="cdp-hero-grid" />
        <div className="cdp-hero-ring cdp-hero-ring-1" />
        <div className="cdp-hero-ring cdp-hero-ring-2" />

        <div className="cdp-container cdp-hero-inner">
          <div className="cdp-hero-body">
            {course.category && <span className="cdp-category-chip">{course.category}</span>}

            <h1 className="cdp-hero-title">{course.title}</h1>
            <p className="cdp-hero-desc">{course.description}</p>

            <div className="cdp-hero-meta">
              <span className="cdp-rating-pill">
                <HiStar size={14} />
                {course.rating?.toFixed(1) ?? "—"}
              </span>
              <span className="cdp-meta-sep" />
              <span className="cdp-meta-item">
                <HiUsers size={14} />
                {course.studentCount?.toLocaleString() ?? "0"} students
              </span>
              <span className="cdp-meta-sep" />
              <span className="cdp-meta-item">
                <HiAcademicCap size={14} />
                Expert Instructor
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          MAIN CONTENT
      ══════════════════════════════════════ */}
      <main className="cdp-container cdp-main">
        <div className="cdp-grid">

          {/* ── LEFT COLUMN ── */}
          <div className="cdp-left">

            {/* Video player */}
            {selectedVideo && (
              <div className="cdp-video-wrap">
                <iframe
                  src={selectedVideo}
                  title={selectedLecture || "Course Video"}
                  className="cdp-video"
                  allowFullScreen
                />
                {selectedLecture && (
                  <div className="cdp-video-caption">
                    <HiPlay size={13} />
                    <span>{selectedLecture}</span>
                  </div>
                )}
              </div>
            )}

            {/* Curriculum */}
            <div className="cdp-section-header">
              <h2 className="cdp-section-title">Course Content</h2>
              <span className="cdp-section-meta">
                {course.courseSections?.length} sections · {totalLectures} lectures
              </span>
            </div>

            <div className="cdp-curriculum">
              {course.courseSections?.map((sec, i) => (
                <div key={i} className="cdp-acc-item">
                  <button
                    className={`cdp-acc-header${expandedSections.has(i) ? " cdp-acc-header--open" : ""}`}
                    onClick={() => toggleSection(i)}
                  >
                    <span className="cdp-acc-index">{String(i + 1).padStart(2, "0")}</span>
                    <span className="cdp-acc-label">{sec.title}</span>
                    <span className="cdp-acc-count">{sec.lectures?.length ?? 0} lectures</span>
                    {expandedSections.has(i) ? <HiChevronUp size={15} /> : <HiChevronDown size={15} />}
                  </button>

                  {expandedSections.has(i) && (
                    <div className="cdp-acc-body">
                      {sec.lectures?.map((lec, j) => {
                        const active = lec.videoUrl === selectedVideo;
                        return (
                          <button
                            key={j}
                            className={`cdp-lec-row${active ? " cdp-lec-row--active" : ""}`}
                            onClick={() => {
                              if (!lec.videoUrl) return;
                              handleLectureClick(lec.videoUrl, lec.title, lec.duration);
                            }}
                          >
                            <span className={`cdp-lec-icon${active ? " cdp-lec-icon--active" : ""}`}>
                              <HiPlay size={11} />
                            </span>
                            <span className="cdp-lec-title">{lec.title}</span>
                            <span className="cdp-lec-dur">{lec.duration || "—"}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN: STICKY CARD ── */}
          <aside className="cdp-right">
            <div className="cdp-card">
              {/* Thumbnail */}
              {course.imageUrl && (
                <div className="cdp-card-thumb">
                  <img src={course.imageUrl} alt={course.title} className="cdp-card-img" />
                  <div className="cdp-card-thumb-overlay">
                    <span className="cdp-preview-btn"><HiPlay size={18} /> Preview</span>
                  </div>
                </div>
              )}

              <div className="cdp-card-body">
                {/* Price */}
                <div className="cdp-price-row">
                  <span className="cdp-price">₹{discountedPrice}</span>
                  <span className="cdp-price-original">₹{course.price?.toFixed(2)}</span>
                  <span className="cdp-discount-chip">30% off</span>
                </div>

                {/* CTAs */}
                {isEnrolled ? (
                  <button className="cdp-btn-primary" onClick={() => selectedVideo && window.scrollTo({ top: 0, behavior: "smooth" })}>
                    <HiPlay size={16} /> Continue Learning
                  </button>
                ) : (
                  <>
                    <button
                      className={`cdp-btn-primary${addingToCart ? " cdp-btn-primary--loading" : ""}`}
                      onClick={handleAddToCart}
                      disabled={addingToCart}
                    >
                      {addingToCart ? <><span className="cdp-spinner" /> Adding…</> : <>Add to Cart <HiArrowRight size={15} /></>}
                    </button>
                    <button className="cdp-btn-ghost" onClick={() => navigate("/auth")}>
                      Buy Now
                    </button>
                  </>
                )}

                <p className="cdp-guarantee">
                  <HiShieldCheck size={14} /> 30-day money-back guarantee
                </p>

                {/* Includes list */}
                <div className="cdp-includes">
                  <p className="cdp-includes-title">This course includes:</p>
                  {[
                    { icon: <HiPlay size={14} />,         text: `${totalLectures} on-demand lectures` },
                    { icon: <HiDownload size={14} />,     text: "Downloadable resources" },
                    { icon: <HiDeviceMobile size={14} />, text: "Access on mobile & desktop" },
                    { icon: <HiLockClosed size={14} />,   text: "Full lifetime access" },
                    { icon: <HiCheckCircle size={14} />,  text: "Certificate of completion" },
                  ].map((item, i) => (
                    <div key={i} className="cdp-includes-row">
                      <span className="cdp-includes-icon">{item.icon}</span>
                      <span className="cdp-includes-text">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

/* ─────────────────────────────────────────────
   STYLES
───────────────────────────────────────────── */
const CdpStyles: React.FC = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

    /* ── TOKENS ── */
    :root {
      --cdp-ink:        #0e0f13;
      --cdp-ink-soft:   #3d4154;
      --cdp-ink-muted:  #8b90a8;
      --cdp-surface:    #ffffff;
      --cdp-surface-2:  #f6f6fb;
      --cdp-surface-3:  #eeeef4;
      --cdp-border:     #e3e3ed;
      --cdp-accent:     #1a56db;
      --cdp-accent-s:   #eef2fd;
      --cdp-gold:       #c9a84c;
      --cdp-gold-s:     rgba(201,168,76,.12);
      --cdp-green:      #16a34a;
      --cdp-green-s:    #f0fdf4;
      --cdp-shadow:     0 1px 4px rgba(14,15,19,.06), 0 6px 20px rgba(14,15,19,.07);
      --cdp-shadow-lg:  0 12px 40px rgba(14,15,19,.12), 0 3px 10px rgba(14,15,19,.06);
      --cdp-r-md:       10px;
      --cdp-r-lg:       16px;
      --cdp-r-xl:       24px;
      --cdp-font-d:     'Playfair Display', Georgia, serif;
      --cdp-font-b:     'DM Sans', 'Helvetica Neue', sans-serif;
      --cdp-t:          .2s cubic-bezier(.4,0,.2,1);
    }

    /* ── BASE ── */
    .cdp-root {
      background: var(--cdp-surface-2);
      min-height: 100vh;
      font-family: var(--cdp-font-b);
      -webkit-font-smoothing: antialiased;
    }

    .cdp-loading, .cdp-error {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 14px;
      background: var(--cdp-surface-2);
      font-family: var(--cdp-font-b);
      color: var(--cdp-ink-muted);
      font-size: 14px;
    }

    .cdp-loader {
      display: block;
      width: 36px; height: 36px;
      border: 3px solid var(--cdp-border);
      border-top-color: var(--cdp-gold);
      border-radius: 50%;
      animation: cdp-spin .7s linear infinite;
    }

    .cdp-error-btn {
      padding: 10px 22px;
      background: var(--cdp-ink);
      color: #fff;
      border: none;
      border-radius: var(--cdp-r-md);
      font-family: var(--cdp-font-b);
      font-size: 13.5px;
      font-weight: 600;
      cursor: pointer;
      transition: background var(--cdp-t);
    }
    .cdp-error-btn:hover { background: var(--cdp-ink-soft); }

    @keyframes cdp-spin { to { transform: rotate(360deg); } }

    .cdp-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 28px;
    }

    /* ══════════════════════════════════
       HERO
    ══════════════════════════════════ */
    .cdp-hero {
      position: relative;
      background: var(--cdp-ink);
      padding: 72px 0 80px;
      overflow: hidden;
    }

    .cdp-hero-grid {
      position: absolute; inset: 0;
      background-image:
        linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
      background-size: 52px 52px;
      pointer-events: none;
    }

    .cdp-hero-ring {
      position: absolute;
      border-radius: 50%;
      border: 1px solid rgba(201,168,76,.08);
      pointer-events: none;
    }
    .cdp-hero-ring-1 { width: 480px; height: 480px; bottom: -220px; right: -100px; animation: cdp-spin 90s linear infinite; }
    .cdp-hero-ring-2 { width: 240px; height: 240px; top: -80px; left:  -60px; animation: cdp-spin 70s linear infinite reverse; }

    .cdp-hero-inner {
      position: relative;
      z-index: 1;
      animation: cdp-fade-up .5s ease both;
    }

    @keyframes cdp-fade-up {
      from { opacity: 0; transform: translateY(14px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .cdp-hero-body { max-width: 680px; }

    .cdp-category-chip {
      display: inline-block;
      padding: 4px 12px;
      background: var(--cdp-gold-s);
      border: 1px solid rgba(201,168,76,.25);
      color: var(--cdp-gold);
      border-radius: 99px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: .08em;
      text-transform: uppercase;
      margin-bottom: 18px;
    }

    .cdp-hero-title {
      font-family: var(--cdp-font-d);
      font-size: clamp(28px, 4vw, 46px);
      font-weight: 800;
      color: #fff;
      line-height: 1.12;
      letter-spacing: -0.02em;
      margin: 0 0 16px;
    }

    .cdp-hero-desc {
      font-size: 16px;
      line-height: 1.75;
      color: rgba(255,255,255,.6);
      font-weight: 300;
      margin: 0 0 28px;
    }

    .cdp-hero-meta {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
    }

    .cdp-rating-pill {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 5px 12px;
      background: rgba(201,168,76,.14);
      border: 1px solid rgba(201,168,76,.22);
      color: var(--cdp-gold);
      border-radius: 99px;
      font-size: 13px;
      font-weight: 700;
    }

    .cdp-meta-sep {
      width: 3px; height: 3px;
      border-radius: 50%;
      background: rgba(255,255,255,.2);
    }

    .cdp-meta-item {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      color: rgba(255,255,255,.5);
      font-weight: 400;
    }

    /* ══════════════════════════════════
       MAIN LAYOUT
    ══════════════════════════════════ */
    .cdp-main {
      padding-top: 40px;
      padding-bottom: 80px;
    }

    .cdp-grid {
      display: grid;
      grid-template-columns: 1fr 340px;
      gap: 28px;
      align-items: start;
    }

    /* ══════════════════════════════════
       LEFT COLUMN
    ══════════════════════════════════ */
    .cdp-left {
      display: flex;
      flex-direction: column;
      gap: 28px;
      animation: cdp-fade-up .55s ease both .1s;
    }

    /* Video */
    .cdp-video-wrap {
      border-radius: var(--cdp-r-xl);
      overflow: hidden;
      background: #000;
      box-shadow: var(--cdp-shadow-lg);
      border: 1px solid var(--cdp-border);
    }

    .cdp-video {
      display: block;
      width: 100%;
      aspect-ratio: 16/9;
      border: none;
    }

    .cdp-video-caption {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 18px;
      background: var(--cdp-surface);
      border-top: 1px solid var(--cdp-border);
      font-size: 13px;
      font-weight: 500;
      color: var(--cdp-ink-soft);
    }
    .cdp-video-caption svg { color: var(--cdp-accent); }

    /* Section header */
    .cdp-section-header {
      display: flex;
      align-items: baseline;
      gap: 14px;
    }

    .cdp-section-title {
      font-family: var(--cdp-font-d);
      font-size: 22px;
      font-weight: 700;
      color: var(--cdp-ink);
      margin: 0;
      letter-spacing: -0.01em;
    }

    .cdp-section-meta {
      font-size: 12.5px;
      color: var(--cdp-ink-muted);
      font-weight: 400;
    }

    /* Curriculum */
    .cdp-curriculum {
      background: var(--cdp-surface);
      border: 1px solid var(--cdp-border);
      border-radius: var(--cdp-r-xl);
      box-shadow: var(--cdp-shadow);
      overflow: hidden;
    }

    .cdp-acc-item {
      border-bottom: 1px solid var(--cdp-border);
    }
    .cdp-acc-item:last-child { border-bottom: none; }

    .cdp-acc-header {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 22px;
      background: var(--cdp-surface-2);
      border: none;
      cursor: pointer;
      text-align: left;
      font-family: var(--cdp-font-b);
      transition: background var(--cdp-t);
    }
    .cdp-acc-header:hover { background: var(--cdp-surface-3); }
    .cdp-acc-header--open { background: var(--cdp-surface); }

    .cdp-acc-index {
      font-size: 11px;
      font-weight: 700;
      color: var(--cdp-ink-muted);
      letter-spacing: .04em;
      width: 22px;
      flex-shrink: 0;
    }

    .cdp-acc-label {
      flex: 1;
      font-size: 14px;
      font-weight: 600;
      color: var(--cdp-ink);
    }

    .cdp-acc-count {
      font-size: 11.5px;
      color: var(--cdp-ink-muted);
      font-weight: 400;
      flex-shrink: 0;
    }

    .cdp-acc-header svg { color: var(--cdp-ink-muted); flex-shrink: 0; }

    .cdp-acc-body { background: var(--cdp-surface); }

    /* Lecture row */
    .cdp-lec-row {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      padding: 12px 22px 12px 40px;
      border: none;
      border-bottom: 1px solid var(--cdp-border);
      background: transparent;
      cursor: pointer;
      text-align: left;
      font-family: var(--cdp-font-b);
      transition: background var(--cdp-t);
    }
    .cdp-lec-row:last-child { border-bottom: none; }
    .cdp-lec-row:hover { background: var(--cdp-surface-2); }
    .cdp-lec-row--active { background: var(--cdp-accent-s) !important; }

    .cdp-lec-icon {
      width: 22px; height: 22px;
      border-radius: 50%;
      background: var(--cdp-surface-3);
      border: 1px solid var(--cdp-border);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--cdp-ink-muted);
      flex-shrink: 0;
      transition: background var(--cdp-t), color var(--cdp-t);
    }
    .cdp-lec-icon--active { background: var(--cdp-accent); color: #fff; border-color: var(--cdp-accent); }

    .cdp-lec-title {
      flex: 1;
      font-size: 13.5px;
      font-weight: 500;
      color: var(--cdp-ink-soft);
    }
    .cdp-lec-row--active .cdp-lec-title { color: var(--cdp-accent); font-weight: 600; }

    .cdp-lec-dur {
      font-size: 12px;
      color: var(--cdp-ink-muted);
      font-weight: 400;
      flex-shrink: 0;
    }

    /* ══════════════════════════════════
       RIGHT COLUMN — STICKY CARD
    ══════════════════════════════════ */
    .cdp-right {
      position: sticky;
      top: 84px;
      animation: cdp-fade-up .6s ease both .2s;
    }

    .cdp-card {
      background: var(--cdp-surface);
      border: 1px solid var(--cdp-border);
      border-radius: var(--cdp-r-xl);
      box-shadow: var(--cdp-shadow-lg);
      overflow: hidden;
    }

    .cdp-card-thumb {
      position: relative;
      overflow: hidden;
    }

    .cdp-card-img {
      width: 100%;
      aspect-ratio: 16/9;
      object-fit: cover;
      display: block;
    }

    .cdp-card-thumb-overlay {
      position: absolute;
      inset: 0;
      background: rgba(14,15,19,.45);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity var(--cdp-t);
    }
    .cdp-card-thumb:hover .cdp-card-thumb-overlay { opacity: 1; }

    .cdp-preview-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 20px;
      background: rgba(255,255,255,.95);
      color: var(--cdp-ink);
      border-radius: var(--cdp-r-md);
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
    }

    .cdp-card-body {
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    /* Price */
    .cdp-price-row {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }

    .cdp-price {
      font-family: var(--cdp-font-d);
      font-size: 32px;
      font-weight: 800;
      color: var(--cdp-ink);
      line-height: 1;
      letter-spacing: -0.02em;
    }

    .cdp-price-original {
      font-size: 15px;
      color: var(--cdp-ink-muted);
      text-decoration: line-through;
      font-weight: 400;
    }

    .cdp-discount-chip {
      padding: 3px 9px;
      background: var(--cdp-green-s);
      color: var(--cdp-green);
      border-radius: 99px;
      font-size: 11.5px;
      font-weight: 700;
      border: 1px solid rgba(22,163,74,.15);
    }

    /* Buttons */
    .cdp-btn-primary {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 14px;
      background: var(--cdp-ink);
      color: #fff;
      border: none;
      border-radius: var(--cdp-r-md);
      font-family: var(--cdp-font-b);
      font-size: 14.5px;
      font-weight: 700;
      cursor: pointer;
      transition: background var(--cdp-t), transform var(--cdp-t), box-shadow var(--cdp-t);
      box-shadow: 0 2px 8px rgba(14,15,19,.18);
      letter-spacing: .01em;
    }
    .cdp-btn-primary:hover:not(:disabled) {
      background: var(--cdp-ink-soft);
      transform: translateY(-1px);
      box-shadow: 0 6px 18px rgba(14,15,19,.2);
    }
    .cdp-btn-primary--loading { opacity: .6; cursor: not-allowed; }

    .cdp-btn-ghost {
      width: 100%;
      padding: 13px;
      background: transparent;
      color: var(--cdp-ink);
      border: 1.5px solid var(--cdp-border);
      border-radius: var(--cdp-r-md);
      font-family: var(--cdp-font-b);
      font-size: 14.5px;
      font-weight: 700;
      cursor: pointer;
      transition: border-color var(--cdp-t), background var(--cdp-t);
    }
    .cdp-btn-ghost:hover { border-color: var(--cdp-ink-soft); background: var(--cdp-surface-2); }

    /* Guarantee */
    .cdp-guarantee {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      font-size: 12px;
      color: var(--cdp-ink-muted);
      margin: 0;
    }
    .cdp-guarantee svg { color: var(--cdp-green); }

    /* Divider */
    .cdp-card-div {
      height: 1px;
      background: var(--cdp-border);
    }

    /* Includes */
    .cdp-includes { display: flex; flex-direction: column; gap: 8px; }

    .cdp-includes-title {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: .06em;
      text-transform: uppercase;
      color: var(--cdp-ink-muted);
      margin: 0 0 4px;
    }

    .cdp-includes-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .cdp-includes-icon {
      width: 26px; height: 26px;
      border-radius: 7px;
      background: var(--cdp-surface-2);
      border: 1px solid var(--cdp-border);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--cdp-ink-muted);
      flex-shrink: 0;
    }

    .cdp-includes-text {
      font-size: 13px;
      color: var(--cdp-ink-soft);
      font-weight: 400;
    }

    /* Spinner */
    .cdp-spinner {
      display: inline-block;
      width: 14px; height: 14px;
      border: 2px solid rgba(255,255,255,.3);
      border-top-color: #fff;
      border-radius: 50%;
      animation: cdp-spin .75s linear infinite;
    }

    /* ── RESPONSIVE ── */
    @media (max-width: 960px) {
      .cdp-grid {
        grid-template-columns: 1fr;
      }
      .cdp-right {
        position: static;
        order: -1;
      }
    }

    @media (max-width: 600px) {
      .cdp-container { padding: 0 16px; }
      .cdp-main { padding-top: 28px; padding-bottom: 56px; }
      .cdp-hero { padding: 56px 0 64px; }
      .cdp-card-body { padding: 18px; }
    }
  `}</style>
);

export default CourseDetailPage;
