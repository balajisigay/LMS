import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { getAboutInfo, AboutInfo } from "../../../src/api/aboutService";
import {
  HiUserGroup,
  HiAcademicCap,
  HiChartBar,
  HiLightningBolt,
  HiSparkles,
  HiHeart,
  HiCheckCircle,
  HiTrendingUp,
  HiStar,
  HiGlobeAlt,
  HiShieldCheck,
  HiClock,
  HiBeaker,
  HiCode,
  HiArrowRight,
} from "react-icons/hi";

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();
  const [about, setAbout] = useState<AboutInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"mission" | "vision" | "values">("mission");

  useEffect(() => {
    getAboutInfo()
      .then(setAbout)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <div className="ab-loading">
          <span className="ab-loader" />
          <p className="ab-loading-title">Srinu tech Guru</p>
          <p className="ab-loading-sub">Preparing your experience…</p>
        </div>
        <AboutStyles />
      </>
    );
  }

  if (!about) return null;

  const tabs = [
    { id: "mission", label: "Mission", icon: <HiHeart size={16} /> },
    { id: "vision",  label: "Vision",  icon: <HiSparkles size={16} /> },
    { id: "values",  label: "Values",  icon: <HiCheckCircle size={16} /> },
  ] as const;

  const features = [
    {
      n: "01", icon: <HiCode size={24} />, title: "Industry-Relevant Curriculum",
      text: "Learn cutting-edge technologies used by leading companies. Our curriculum is continuously updated to reflect current industry standards and best practices.",
      tag: "Updated monthly", tagIcon: <HiCheckCircle size={13} />, tagColor: "var(--ab-green)",
    },
    {
      n: "02", icon: <HiAcademicCap size={24} />, title: "World-Class Instructors",
      text: "Learn from industry veterans with decades of combined experience. Our instructors are practitioners who bring real-world insight to every lesson.",
      tag: "Expert mentors", tagIcon: <HiStar size={13} />, tagColor: "var(--ab-amber)",
    },
    {
      n: "03", icon: <HiBeaker size={24} />, title: "Hands-On Projects",
      text: "Build a portfolio of real-world projects. Every course includes practical assignments designed to simulate actual workplace scenarios.",
      tag: "100+ projects", tagIcon: <HiLightningBolt size={13} />, tagColor: "var(--ab-rose)",
    },
    {
      n: "04", icon: <HiUserGroup size={24} />, title: "Thriving Community",
      text: "Join a global network of ambitious learners and professionals. Collaborate, share knowledge, and build connections that last beyond the courses.",
      tag: "Active community", tagIcon: <HiUserGroup size={13} />, tagColor: "var(--ab-blue)",
    },
    {
      n: "05", icon: <HiClock size={24} />, title: "Flexible Learning",
      text: "Learn at your own pace with lifetime access to all course materials. Our flexible format fits seamlessly into any schedule.",
      tag: "Learn anytime", tagIcon: <HiClock size={13} />, tagColor: "var(--ab-violet)",
    },
    {
      n: "06", icon: <HiShieldCheck size={24} />, title: "Verified Certificates",
      text: "Earn industry-recognised certificates upon completion. Showcase achievements on LinkedIn and your résumé to stand out to employers.",
      tag: "Verified certificates", tagIcon: <HiShieldCheck size={13} />, tagColor: "var(--ab-green)",
    },
  ];

  const testimonials = [
    {
      initials: "RK", name: "Rajesh Kumar", title: "Full Stack Developer",
      text: "Srinu tech Guru transformed my career. The courses are incredibly well-structured and the instructors genuinely care about student success. Within 6 months I landed my dream job.",
    },
    {
      initials: "PS", name: "Priya Sharma", title: "Data Analyst",
      text: "The hands-on projects and real-world scenarios make all the difference. I feel confident applying what I've learned immediately at work. Best career investment I've made.",
    },
    {
      initials: "AP", name: "Arun Patel", title: "Product Manager",
      text: "Outstanding platform with exceptional content quality. The community support is incredible and the flexible format allowed me to upskill while working full-time.",
    },
  ];

  const values = [
    { icon: <HiShieldCheck size={20} />, title: "Integrity", text: "Honest, transparent, and ethical in all we do" },
    { icon: <HiBeaker size={20} />,      title: "Innovation", text: "Constantly evolving and improving our platform" },
    { icon: <HiHeart size={20} />,       title: "Excellence", text: "Delivering only the highest-quality content" },
    { icon: <HiGlobeAlt size={20} />,    title: "Inclusivity", text: "Making education accessible to everyone" },
  ];

  return (
    <>
      <Header />

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="ab-hero">
        {/* Subtle grid texture */}
        <div className="ab-hero-grid" />

        <div className="ab-hero-inner">
          {/* Eyebrow */}
          <p className="ab-eyebrow">Online Learning Platform</p>

          {/* Wordmark */}
          <h1 className="ab-wordmark">
            <span className="ab-w-white">Srinu tech Guru</span>
            <span className="ab-w-gold"> Learning</span>
          </h1>

          <p className="ab-hero-sub">Where Learning Meets Excellence</p>
          <p className="ab-tagline">{about.tagline}</p>

          {/* Pill badges */}
          <div className="ab-pill-row">
            <span className="ab-pill"><HiSparkles size={14} /> Transform Skills</span>
            <span className="ab-pill"><HiTrendingUp size={14} /> Accelerate Growth</span>
            <span className="ab-pill"><HiLightningBolt size={14} /> Excel Career</span>
          </div>

          {/* Trust strip */}
          <div className="ab-trust-strip">
            <span className="ab-trust-item"><HiShieldCheck size={15} /> Certified Programs</span>
            <span className="ab-trust-dot" />
            <span className="ab-trust-item"><HiGlobeAlt size={15} /> Global Community</span>
            <span className="ab-trust-dot" />
            <span className="ab-trust-item"><HiStar size={15} /> Top Rated Platform</span>
          </div>
        </div>

        {/* Decorative rings */}
        <div className="ab-ring ab-ring-1" />
        <div className="ab-ring ab-ring-2" />
      </section>

      {/* ══════════════════════════════════════
          STATS  (overlap hero)
      ══════════════════════════════════════ */}
      <div className="ab-stats-wrap">
        <div className="ab-stats-grid">
          {[
            { icon: <HiUserGroup size={28} />, num: `${about.stats.activeLearners.toLocaleString()}+`, label: "Active Learners",  desc: "Students worldwide", badge: "+15% this month", color: "var(--ab-accent)" },
            { icon: <HiAcademicCap size={28} />, num: `${about.stats.courses}+`,   label: "Premium Courses",  desc: "Expert-crafted paths", badge: "100+ new this year", color: "var(--ab-rose)" },
            { icon: <HiChartBar size={28} />,    num: `${about.stats.satisfaction}%`, label: "Satisfaction Rate", desc: "Highly rated by community", badge: "4.9 / 5 avg rating", color: "var(--ab-green)" },
          ].map((s, i) => (
            <div className="ab-stat-card" key={i}>
              <div className="ab-stat-icon" style={{ background: s.color }}>
                {s.icon}
              </div>
              <div className="ab-stat-body">
                <p className="ab-stat-num">{s.num}</p>
                <p className="ab-stat-label">{s.label}</p>
                <p className="ab-stat-desc">{s.desc}</p>
              </div>
              <span className="ab-stat-badge">{s.badge}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          MISSION / VISION / VALUES TABS
      ══════════════════════════════════════ */}
      <section className="ab-section ab-section--light">
        <div className="ab-container">
          <div className="ab-section-header">
            <p className="ab-section-eyebrow">Who We Are</p>
            <h2 className="ab-section-title">Purpose & Principles</h2>
            <p className="ab-section-sub">Discover what drives Srinu tech Guru forward</p>
          </div>

          {/* Tab bar */}
          <div className="ab-tab-bar">
            {tabs.map((t) => (
              <button
                key={t.id}
                className={`ab-tab${activeTab === t.id ? " ab-tab--active" : ""}`}
                onClick={() => setActiveTab(t.id)}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab panel */}
          <div className="ab-tab-panel">
            {activeTab === "mission" && (
              <div className="ab-tab-content ab-fade">
                <div className="ab-tab-icon ab-tab-icon--rose"><HiHeart size={26} /></div>
                <h3 className="ab-tab-title">Empowering Through Education</h3>
                <p className="ab-tab-text">
                  Our mission is to democratise education by providing world-class learning experiences that empower
                  individuals to achieve their full potential. We believe quality education should be accessible to
                  everyone, regardless of background or location.
                </p>
                <p className="ab-tab-text">
                  We're committed to bridging the gap between academic knowledge and industry requirements, ensuring
                  learners are equipped with practical, job-ready skills that make them stand out in today's market.
                </p>
              </div>
            )}
            {activeTab === "vision" && (
              <div className="ab-tab-content ab-fade">
                <div className="ab-tab-icon ab-tab-icon--amber"><HiSparkles size={26} /></div>
                <h3 className="ab-tab-title">Building Tomorrow's Leaders</h3>
                <p className="ab-tab-text">
                  We envision a world where continuous learning is the norm, and every individual has the tools to
                  transform their career and life. Srinu tech Guru aims to be the global leader in online education, recognised
                  for innovative teaching methods and exceptional learning outcomes.
                </p>
                <p className="ab-tab-text">
                  Our vision extends beyond courses — we're creating a thriving ecosystem of learners, educators, and
                  industry professionals who collaborate, innovate, and grow together.
                </p>
              </div>
            )}
            {activeTab === "values" && (
              <div className="ab-tab-content ab-fade">
                <div className="ab-tab-icon ab-tab-icon--blue"><HiCheckCircle size={26} /></div>
                <h3 className="ab-tab-title">Principles That Guide Us</h3>
                <div className="ab-values-grid">
                  {values.map((v, i) => (
                    <div className="ab-value-box" key={i}>
                      <span className="ab-value-icon">{v.icon}</span>
                      <h4 className="ab-value-title">{v.title}</h4>
                      <p className="ab-value-text">{v.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FEATURES
      ══════════════════════════════════════ */}
      <section className="ab-section ab-section--white">
        <div className="ab-container">
          <div className="ab-section-header">
            <p className="ab-section-eyebrow">Why Choose Us</p>
            <h2 className="ab-section-title">The Srinu tech Guru Advantage</h2>
            <p className="ab-section-sub">Learning designed for real-world success</p>
          </div>

          <div className="ab-features-grid">
            {features.map((f, i) => (
              <div className="ab-feature-card" key={i}>
                <span className="ab-feature-num">{f.n}</span>
                <div className="ab-feature-icon">{f.icon}</div>
                <h3 className="ab-feature-title">{f.title}</h3>
                <p className="ab-feature-text">{f.text}</p>
                <div className="ab-feature-tag" style={{ color: f.tagColor }}>
                  {f.tagIcon}
                  <span>{f.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════ */}
      <section className="ab-section ab-section--light">
        <div className="ab-container">
          <div className="ab-section-header">
            <p className="ab-section-eyebrow">Student Stories</p>
            <h2 className="ab-section-title">Trusted by Thousands</h2>
            <p className="ab-section-sub">Hear directly from our community</p>
          </div>

          <div className="ab-testimonials-grid">
            {testimonials.map((t, i) => (
              <div className="ab-testi-card" key={i}>
                <div className="ab-testi-quote">&ldquo;</div>
                <p className="ab-testi-text">{t.text}</p>
                <div className="ab-testi-footer">
                  <div className="ab-testi-author">
                    <span className="ab-testi-avatar">{t.initials}</span>
                    <div>
                      <p className="ab-testi-name">{t.name}</p>
                      <p className="ab-testi-role">{t.title}</p>
                    </div>
                  </div>
                  <div className="ab-stars">
                    {[...Array(5)].map((_, j) => <HiStar key={j} size={14} />)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA
      ══════════════════════════════════════ */}
      <section className="ab-cta-section">
        <div className="ab-cta-grid" />
        <div className="ab-cta-inner">
          <p className="ab-cta-eyebrow"><HiSparkles size={13} /> Start Your Journey Today</p>
          <h2 className="ab-cta-title">Ready to Transform Your Career?</h2>
          <p className="ab-cta-sub">
            Join over {about.stats.activeLearners.toLocaleString()}+ learners already upgrading their
            skills and achieving professional goals with Srinu tech Guru.
          </p>
          <div className="ab-cta-actions">
            <button className="ab-cta-primary" onClick={() => navigate("/")}>
              Explore Courses <HiArrowRight size={16} />
            </button>
            <button className="ab-cta-secondary" onClick={() => navigate("/signup")}>
              Get Started Free
            </button>
          </div>
          <div className="ab-cta-checks">
            {["Free trial courses", "No credit card required", "Cancel anytime"].map((c) => (
              <span key={c} className="ab-cta-check">
                <HiCheckCircle size={14} /> {c}
              </span>
            ))}
          </div>
        </div>

        {/* Decorative */}
        <div className="ab-cta-ring ab-cta-ring-1" />
        <div className="ab-cta-ring ab-cta-ring-2" />
      </section>

      <Footer />
      <AboutStyles />
    </>
  );
};

/* ─────────────────────────────────────────────
   STYLES  (injected once as a component)
───────────────────────────────────────────── */
const AboutStyles: React.FC = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

    /* ── TOKENS ── */
    :root {
      --ab-ink:        #0e0f13;
      --ab-ink-soft:   #3d4154;
      --ab-ink-muted:  #8b90a8;
      --ab-surface:    #ffffff;
      --ab-surface-2:  #f6f6fb;
      --ab-surface-3:  #eeeef4;
      --ab-border:     #e3e3ed;
      --ab-accent:     #1a56db;
      --ab-accent-s:   #eef2fd;
      --ab-green:      #16a34a;
      --ab-green-s:    #f0fdf4;
      --ab-amber:      #b45309;
      --ab-amber-s:    #fffbeb;
      --ab-rose:       #be185d;
      --ab-rose-s:     #fdf2f8;
      --ab-blue:       #1d4ed8;
      --ab-blue-s:     #eff6ff;
      --ab-violet:     #7c3aed;
      --ab-gold:       #c9a84c;
      --ab-font-d:     'Playfair Display', Georgia, serif;
      --ab-font-b:     'DM Sans', 'Helvetica Neue', sans-serif;
      --ab-r-md:       10px;
      --ab-r-lg:       16px;
      --ab-r-xl:       24px;
      --ab-shadow:     0 1px 4px rgba(14,15,19,.06), 0 6px 20px rgba(14,15,19,.07);
      --ab-shadow-lg:  0 12px 40px rgba(14,15,19,.12), 0 3px 10px rgba(14,15,19,.06);
      --ab-t:          .22s cubic-bezier(.4,0,.2,1);
    }

    /* ── BASE ── */
    .ab-loading {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: var(--ab-ink);
      gap: 14px;
      font-family: var(--ab-font-b);
    }
    .ab-loader {
      display: block;
      width: 40px; height: 40px;
      border: 3px solid rgba(255,255,255,.15);
      border-top-color: var(--ab-gold);
      border-radius: 50%;
      animation: ab-spin .7s linear infinite;
    }
    .ab-loading-title { font-family: var(--ab-font-d); font-size: 22px; color: #fff; font-weight: 700; margin: 0; }
    .ab-loading-sub   { font-size: 13px; color: rgba(255,255,255,.45); margin: 0; }
    @keyframes ab-spin { to { transform: rotate(360deg); } }

    /* ══════════════════════════════════
       HERO
    ══════════════════════════════════ */
    .ab-hero {
      position: relative;
      background: var(--ab-ink);
      padding: 110px 24px 160px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--ab-font-b);
    }

    .ab-hero-grid {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
      background-size: 56px 56px;
      pointer-events: none;
    }

    /* decorative rings */
    .ab-ring {
      position: absolute;
      border-radius: 50%;
      border: 1px solid rgba(201,168,76,.12);
      pointer-events: none;
    }
    .ab-ring-1 { width: 600px; height: 600px; bottom: -260px; right: -160px; animation: ab-spin 80s linear infinite; }
    .ab-ring-2 { width: 340px; height: 340px; top: 40px; left: -100px; animation: ab-spin 60s linear infinite reverse; }

    .ab-hero-inner {
      position: relative;
      z-index: 2;
      text-align: center;
      max-width: 860px;
      animation: ab-fade-up .6s ease both;
    }

    @keyframes ab-fade-up {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .ab-eyebrow {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: .14em;
      text-transform: uppercase;
      color: var(--ab-gold);
      margin: 0 0 24px;
    }

    .ab-wordmark {
      font-family: var(--ab-font-d);
      font-size: clamp(52px, 8vw, 88px);
      font-weight: 800;
      line-height: 1.06;
      margin: 0 0 18px;
      letter-spacing: -0.02em;
    }

    .ab-w-white { color: #fff; }
    .ab-w-gold  { color: var(--ab-gold); font-style: italic; }

    .ab-hero-sub {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: .14em;
      text-transform: uppercase;
      color: rgba(255,255,255,.4);
      margin: 0 0 20px;
    }

    .ab-tagline {
      font-size: clamp(16px, 2.5vw, 20px);
      line-height: 1.75;
      color: rgba(255,255,255,.72);
      font-weight: 300;
      max-width: 640px;
      margin: 0 auto 44px;
    }

    /* Pills */
    .ab-pill-row {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      justify-content: center;
      margin-bottom: 40px;
    }

    .ab-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 20px;
      background: rgba(255,255,255,.07);
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 99px;
      color: rgba(255,255,255,.88);
      font-size: 13px;
      font-weight: 600;
      backdrop-filter: blur(8px);
      transition: background var(--ab-t), border-color var(--ab-t);
    }
    .ab-pill:hover { background: rgba(255,255,255,.12); border-color: rgba(255,255,255,.2); }

    /* Trust strip */
    .ab-trust-strip {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 16px;
      padding-top: 32px;
      border-top: 1px solid rgba(255,255,255,.08);
    }

    .ab-trust-item {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      color: rgba(255,255,255,.5);
      font-size: 12.5px;
      font-weight: 500;
    }

    .ab-trust-dot {
      width: 3px; height: 3px;
      border-radius: 50%;
      background: rgba(255,255,255,.2);
    }

    /* ══════════════════════════════════
       STATS
    ══════════════════════════════════ */
    .ab-stats-wrap {
      padding: 0 24px;
      margin-top: -80px;
      margin-bottom: 0;
      position: relative;
      z-index: 10;
    }

    .ab-stats-grid {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }

    .ab-stat-card {
      background: var(--ab-surface);
      border: 1px solid var(--ab-border);
      border-radius: var(--ab-r-xl);
      box-shadow: var(--ab-shadow-lg);
      padding: 32px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
      font-family: var(--ab-font-b);
      transition: transform var(--ab-t), box-shadow var(--ab-t);
    }
    .ab-stat-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 20px 56px rgba(14,15,19,.14);
    }

    .ab-stat-icon {
      width: 52px; height: 52px;
      border-radius: var(--ab-r-md);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      flex-shrink: 0;
    }

    .ab-stat-body { flex: 1; }

    .ab-stat-num {
      font-family: var(--ab-font-d);
      font-size: 44px;
      font-weight: 800;
      color: var(--ab-ink);
      margin: 0 0 4px;
      line-height: 1;
      letter-spacing: -0.02em;
    }

    .ab-stat-label {
      font-size: 14px;
      font-weight: 700;
      color: var(--ab-ink);
      margin: 0 0 4px;
      letter-spacing: -0.01em;
    }

    .ab-stat-desc {
      font-size: 13px;
      color: var(--ab-ink-muted);
      margin: 0;
      font-weight: 400;
    }

    .ab-stat-badge {
      font-size: 11.5px;
      font-weight: 600;
      color: var(--ab-ink-muted);
      background: var(--ab-surface-2);
      border: 1px solid var(--ab-border);
      padding: 4px 10px;
      border-radius: 99px;
      align-self: flex-start;
    }

    /* ══════════════════════════════════
       SHARED SECTION LAYOUT
    ══════════════════════════════════ */
    .ab-section {
      padding: 100px 24px;
      font-family: var(--ab-font-b);
    }
    .ab-section--light { background: var(--ab-surface-2); }
    .ab-section--white { background: var(--ab-surface); }

    .ab-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .ab-section-header {
      text-align: center;
      margin-bottom: 60px;
    }

    .ab-section-eyebrow {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: .14em;
      text-transform: uppercase;
      color: var(--ab-accent);
      margin: 0 0 14px;
    }

    .ab-section-title {
      font-family: var(--ab-font-d);
      font-size: clamp(30px, 4vw, 48px);
      font-weight: 800;
      color: var(--ab-ink);
      margin: 0 0 14px;
      letter-spacing: -0.02em;
    }

    .ab-section-sub {
      font-size: 16px;
      color: var(--ab-ink-muted);
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.7;
      font-weight: 400;
    }

    /* ══════════════════════════════════
       TABS
    ══════════════════════════════════ */
    .ab-tab-bar {
      display: flex;
      gap: 8px;
      justify-content: center;
      margin-bottom: 32px;
      background: var(--ab-surface);
      border: 1px solid var(--ab-border);
      border-radius: var(--ab-r-lg);
      padding: 6px;
      max-width: 400px;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 40px;
    }

    .ab-tab {
      flex: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      padding: 10px 16px;
      border: none;
      background: transparent;
      font-family: var(--ab-font-b);
      font-size: 13px;
      font-weight: 600;
      color: var(--ab-ink-muted);
      border-radius: var(--ab-r-md);
      cursor: pointer;
      transition: all var(--ab-t);
      white-space: nowrap;
    }
    .ab-tab--active {
      background: var(--ab-ink);
      color: #fff;
      box-shadow: 0 2px 8px rgba(14,15,19,.2);
    }
    .ab-tab:hover:not(.ab-tab--active) { color: var(--ab-ink); background: var(--ab-surface-3); }

    .ab-tab-panel {
      background: var(--ab-surface);
      border: 1px solid var(--ab-border);
      border-radius: var(--ab-r-xl);
      box-shadow: var(--ab-shadow);
      padding: 52px;
      min-height: 340px;
    }

    .ab-tab-content {
      max-width: 780px;
      margin: 0 auto;
      text-align: center;
    }

    .ab-fade {
      animation: ab-fade-up .35s ease both;
    }

    .ab-tab-icon {
      width: 56px; height: 56px;
      border-radius: var(--ab-r-md);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      margin-bottom: 24px;
    }
    .ab-tab-icon--rose   { background: var(--ab-rose); }
    .ab-tab-icon--amber  { background: var(--ab-amber); }
    .ab-tab-icon--blue   { background: var(--ab-blue); }

    .ab-tab-title {
      font-family: var(--ab-font-d);
      font-size: 26px;
      font-weight: 700;
      color: var(--ab-ink);
      margin: 0 0 20px;
    }

    .ab-tab-text {
      font-size: 15.5px;
      line-height: 1.8;
      color: var(--ab-ink-soft);
      margin: 0 0 16px;
      font-weight: 400;
    }

    /* Values grid */
    .ab-values-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 14px;
      margin-top: 28px;
      text-align: left;
    }

    .ab-value-box {
      background: var(--ab-surface-2);
      border: 1px solid var(--ab-border);
      border-radius: var(--ab-r-md);
      padding: 20px 22px;
      transition: border-color var(--ab-t);
    }
    .ab-value-box:hover { border-color: var(--ab-accent); }

    .ab-value-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 36px; height: 36px;
      background: var(--ab-accent-s);
      color: var(--ab-accent);
      border-radius: var(--ab-r-md);
      margin-bottom: 10px;
    }

    .ab-value-title {
      font-size: 14px;
      font-weight: 700;
      color: var(--ab-ink);
      margin: 0 0 5px;
    }

    .ab-value-text {
      font-size: 13px;
      color: var(--ab-ink-muted);
      margin: 0;
      line-height: 1.55;
    }

    /* ══════════════════════════════════
       FEATURES
    ══════════════════════════════════ */
    .ab-features-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 18px;
    }

    .ab-feature-card {
      background: var(--ab-surface-2);
      border: 1px solid var(--ab-border);
      border-radius: var(--ab-r-xl);
      padding: 32px;
      position: relative;
      overflow: hidden;
      transition: transform var(--ab-t), box-shadow var(--ab-t), border-color var(--ab-t);
    }
    .ab-feature-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--ab-shadow-lg);
      border-color: rgba(26,86,219,.15);
    }

    .ab-feature-num {
      position: absolute;
      top: 20px;
      right: 24px;
      font-family: var(--ab-font-d);
      font-size: 56px;
      font-weight: 800;
      color: var(--ab-surface-3);
      line-height: 1;
      pointer-events: none;
    }

    .ab-feature-icon {
      width: 48px; height: 48px;
      border-radius: var(--ab-r-md);
      background: var(--ab-ink);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      position: relative;
      z-index: 1;
    }

    .ab-feature-title {
      font-family: var(--ab-font-d);
      font-size: 18px;
      font-weight: 700;
      color: var(--ab-ink);
      margin: 0 0 12px;
      line-height: 1.3;
    }

    .ab-feature-text {
      font-size: 13.5px;
      line-height: 1.75;
      color: var(--ab-ink-soft);
      margin: 0 0 20px;
      font-weight: 400;
    }

    .ab-feature-tag {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      font-weight: 600;
    }

    /* ══════════════════════════════════
       TESTIMONIALS
    ══════════════════════════════════ */
    .ab-testimonials-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }

    .ab-testi-card {
      background: var(--ab-surface);
      border: 1px solid var(--ab-border);
      border-radius: var(--ab-r-xl);
      padding: 36px;
      box-shadow: var(--ab-shadow);
      display: flex;
      flex-direction: column;
      transition: transform var(--ab-t), box-shadow var(--ab-t);
    }
    .ab-testi-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--ab-shadow-lg);
    }

    .ab-testi-quote {
      font-family: var(--ab-font-d);
      font-size: 72px;
      line-height: .8;
      color: var(--ab-border);
      margin-bottom: 16px;
      font-weight: 700;
    }

    .ab-testi-text {
      font-size: 14px;
      line-height: 1.8;
      color: var(--ab-ink-soft);
      font-style: italic;
      flex: 1;
      margin: 0 0 24px;
    }

    .ab-testi-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .ab-testi-author {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .ab-testi-avatar {
      width: 40px; height: 40px;
      border-radius: var(--ab-r-md);
      background: var(--ab-ink);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 700;
    }

    .ab-testi-name {
      font-size: 13px;
      font-weight: 700;
      color: var(--ab-ink);
      margin: 0 0 2px;
    }

    .ab-testi-role {
      font-size: 12px;
      color: var(--ab-ink-muted);
      margin: 0;
    }

    .ab-stars {
      display: flex;
      gap: 2px;
      color: #f59e0b;
    }

    /* ══════════════════════════════════
       CTA
    ══════════════════════════════════ */
    .ab-cta-section {
      position: relative;
      background: var(--ab-ink);
      padding: 100px 24px;
      overflow: hidden;
      font-family: var(--ab-font-b);
    }

    .ab-cta-grid {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(255,255,255,.02) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,.02) 1px, transparent 1px);
      background-size: 56px 56px;
      pointer-events: none;
    }

    .ab-cta-ring {
      position: absolute;
      border-radius: 50%;
      border: 1px solid rgba(201,168,76,.1);
      pointer-events: none;
    }
    .ab-cta-ring-1 { width: 500px; height: 500px; bottom: -200px; right: -120px; }
    .ab-cta-ring-2 { width: 280px; height: 280px; top: -80px;  left:  -60px; }

    .ab-cta-inner {
      position: relative;
      z-index: 2;
      max-width: 700px;
      margin: 0 auto;
      text-align: center;
    }

    .ab-cta-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: .12em;
      text-transform: uppercase;
      color: var(--ab-gold);
      margin: 0 0 20px;
    }

    .ab-cta-title {
      font-family: var(--ab-font-d);
      font-size: clamp(30px, 5vw, 52px);
      font-weight: 800;
      color: #fff;
      margin: 0 0 18px;
      letter-spacing: -0.02em;
    }

    .ab-cta-sub {
      font-size: 16px;
      line-height: 1.75;
      color: rgba(255,255,255,.6);
      margin: 0 0 44px;
      font-weight: 300;
    }

    .ab-cta-actions {
      display: flex;
      gap: 12px;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 28px;
    }

    .ab-cta-primary {
      display: inline-flex;
      align-items: center;
      gap: 9px;
      padding: 14px 32px;
      background: #fff;
      color: var(--ab-ink);
      border: none;
      border-radius: var(--ab-r-lg);
      font-family: var(--ab-font-b);
      font-size: 14.5px;
      font-weight: 700;
      cursor: pointer;
      transition: transform var(--ab-t), box-shadow var(--ab-t);
      box-shadow: 0 4px 16px rgba(255,255,255,.15);
    }
    .ab-cta-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(255,255,255,.2); }

    .ab-cta-secondary {
      padding: 14px 32px;
      background: transparent;
      color: rgba(255,255,255,.8);
      border: 1px solid rgba(255,255,255,.2);
      border-radius: var(--ab-r-lg);
      font-family: var(--ab-font-b);
      font-size: 14.5px;
      font-weight: 600;
      cursor: pointer;
      transition: background var(--ab-t), border-color var(--ab-t), color var(--ab-t);
    }
    .ab-cta-secondary:hover { background: rgba(255,255,255,.08); border-color: rgba(255,255,255,.4); color: #fff; }

    .ab-cta-checks {
      display: flex;
      gap: 20px;
      justify-content: center;
      flex-wrap: wrap;
      padding-top: 24px;
      border-top: 1px solid rgba(255,255,255,.08);
    }

    .ab-cta-check {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      font-size: 13px;
      font-weight: 500;
      color: rgba(255,255,255,.5);
    }
    .ab-cta-check svg { color: #16a34a; }

    /* ── RESPONSIVE ── */
    @media (max-width: 1024px) {
      .ab-features-grid,
      .ab-testimonials-grid { grid-template-columns: repeat(2, 1fr); }
    }

    @media (max-width: 768px) {
      .ab-stats-grid { grid-template-columns: 1fr; }
      .ab-features-grid,
      .ab-testimonials-grid { grid-template-columns: 1fr; }
      .ab-tab-panel { padding: 28px 20px; }
      .ab-values-grid { grid-template-columns: 1fr; }
      .ab-hero { padding: 80px 20px 130px; }
    }

    @media (max-width: 540px) {
      .ab-tab-bar { max-width: 100%; }
      .ab-cta-actions { flex-direction: column; }
      .ab-cta-primary, .ab-cta-secondary { width: 100%; justify-content: center; }
    }
  `}</style>
);

export default AboutPage;
