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
  HiArrowRight
} from "react-icons/hi";

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();
  const [about, setAbout] = useState<AboutInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'mission' | 'vision' | 'values'>('mission');

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
        <div style={styles.loadingContainer}>
          <div style={styles.spinnerContainer}>
            <div style={styles.spinner}></div>
            <div style={styles.spinnerGlow}></div>
          </div>
          <p style={styles.loadingText}>Loading SrinutechGuru...</p>
          <p style={styles.loadingSubtext}>Preparing your learning experience</p>
        </div>
      </>
    );
  }

  if (!about) return null;

  return (
    <>
      <Header />

      {/* Hero Section with Premium Branding */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          {/* Animated Background Elements */}
          <div className="bg-shape-1" style={styles.bgShape1}></div>
          <div className="bg-shape-2" style={styles.bgShape2}></div>
          <div className="bg-shape-3" style={styles.bgShape3}></div>
          <div style={styles.gridPattern}></div>

          {/* Premium Logo */}
          <div style={styles.logoContainer}>
            <div className="logo-wrapper" style={styles.logoIconContainer}>
              <svg style={styles.logoSvg} viewBox="0 0 100 100" fill="none">
                {/* Outer Hexagon */}
                <path
                  d="M50 5L90 27.5V72.5L50 95L10 72.5V27.5L50 5Z"
                  fill="url(#gradient1)"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Inner Design */}
                <circle cx="50" cy="50" r="18" fill="white" opacity="0.95" />
                <path
                  d="M50 35L60 45L50 55L40 45L50 35Z"
                  fill="url(#gradient2)"
                />
                <circle cx="50" cy="50" r="8" fill="white" />
                <circle cx="50" cy="50" r="4" fill="url(#gradient1)" />
                
                <defs>
                  <linearGradient id="gradient1" x1="10" y1="5" x2="90" y2="95">
                    <stop offset="0%" stopColor="#667eea" />
                    <stop offset="50%" stopColor="#764ba2" />
                    <stop offset="100%" stopColor="#f093fb" />
                  </linearGradient>
                  <linearGradient id="gradient2" x1="40" y1="35" x2="60" y2="55">
                    <stop offset="0%" stopColor="#667eea" />
                    <stop offset="100%" stopColor="#764ba2" />
                  </linearGradient>
                </defs>
              </svg>
              <div style={styles.logoGlow}></div>
            </div>
          </div>

          {/* Brand Name with Advanced Typography */}
          <h1 style={styles.brandName}>
            <span style={styles.logoSrinu}>Srinu</span>
            <span style={styles.logoTech}>tech</span>
            <span style={styles.logoGuru}>Guru</span>
          </h1>

          {/* Subtitle */}
          <p style={styles.subtitle}>Where Learning Meets Excellence</p>

          {/* Tagline */}
          <p style={styles.tagline}>{about.tagline}</p>
          
          {/* Feature Badges with Icons */}
          <div style={styles.badges}>
            <div className="badge-animated" style={styles.badge}>
              <HiSparkles size={18} />
              <span>Transform Skills</span>
            </div>
            <div className="badge-animated" style={{...styles.badge, animationDelay: '0.1s'}}>
              <HiTrendingUp size={18} />
              <span>Accelerate Growth</span>
            </div>
            <div className="badge-animated" style={{...styles.badge, animationDelay: '0.2s'}}>
              <HiLightningBolt size={18} />
              <span>Excel Career</span>
            </div>
          </div>

          {/* Trust Indicators */}
          <div style={styles.trustBadges}>
            <div style={styles.trustItem}>
              <HiShieldCheck size={20} />
              <span>Certified Programs</span>
            </div>
            <div style={styles.trustDivider}>•</div>
            <div style={styles.trustItem}>
              <HiGlobeAlt size={20} />
              <span>Global Community</span>
            </div>
            <div style={styles.trustDivider}>•</div>
            <div style={styles.trustItem}>
              <HiStar size={20} />
              <span>Top Rated Platform</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Cards with Enhanced Design */}
      <section style={styles.statsSection}>
        <div style={styles.statsContainer}>
          <div className="stat-card-hover" style={styles.statCard}>
            <div style={styles.statCardInner}>
              <div style={{...styles.statIcon, background: 'linear-gradient(135deg, #667eea, #764ba2)'}}>
                <HiUserGroup size={36} />
              </div>
              <div style={styles.statContent}>
                <h2 style={styles.statNumber}>{about.stats.activeLearners.toLocaleString()}+</h2>
                <p style={styles.statLabel}>Active Learners</p>
                <p style={styles.statDesc}>Students worldwide trust our platform</p>
              </div>
              <div style={styles.statBadge}>
                <HiTrendingUp size={14} />
                <span>+15% this month</span>
              </div>
            </div>
          </div>

          <div className="stat-card-hover" style={{...styles.statCard, animationDelay: '0.1s'}}>
            <div style={styles.statCardInner}>
              <div style={{...styles.statIcon, background: 'linear-gradient(135deg, #f093fb, #f5576c)'}}>
                <HiAcademicCap size={36} />
              </div>
              <div style={styles.statContent}>
                <h2 style={styles.statNumber}>{about.stats.courses}+</h2>
                <p style={styles.statLabel}>Premium Courses</p>
                <p style={styles.statDesc}>Expert-crafted learning paths</p>
              </div>
              <div style={styles.statBadge}>
                <HiCode size={14} />
                <span>100+ new</span>
              </div>
            </div>
          </div>

          <div className="stat-card-hover" style={{...styles.statCard, animationDelay: '0.2s'}}>
            <div style={styles.statCardInner}>
              <div style={{...styles.statIcon, background: 'linear-gradient(135deg, #43e97b, #38f9d7)'}}>
                <HiChartBar size={36} />
              </div>
              <div style={styles.statContent}>
                <h2 style={styles.statNumber}>{about.stats.satisfaction}%</h2>
                <p style={styles.statLabel}>Satisfaction Rate</p>
                <p style={styles.statDesc}>Highly rated by our community</p>
              </div>
              <div style={styles.statBadge}>
                <HiStar size={14} />
                <span>4.9/5 rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values Tabs */}
      <section style={styles.tabSection}>
        <div style={styles.contentWrapper}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Who We Are</h2>
            <p style={styles.sectionSubtitle}>
              Discover the principles and purpose that drive SrinutechGuru
            </p>
          </div>

          <div style={styles.tabContainer}>
            <div style={styles.tabButtons}>
              <button
                style={{
                  ...styles.tabButton,
                  ...(activeTab === 'mission' ? styles.tabButtonActive : {}),
                }}
                onClick={() => setActiveTab('mission')}
              >
                <HiHeart size={20} />
                Our Mission
              </button>
              <button
                style={{
                  ...styles.tabButton,
                  ...(activeTab === 'vision' ? styles.tabButtonActive : {}),
                }}
                onClick={() => setActiveTab('vision')}
              >
                <HiSparkles size={20} />
                Our Vision
              </button>
              <button
                style={{
                  ...styles.tabButton,
                  ...(activeTab === 'values' ? styles.tabButtonActive : {}),
                }}
                onClick={() => setActiveTab('values')}
              >
                <HiCheckCircle size={20} />
                Our Values
              </button>
            </div>

            <div style={styles.tabContent}>
              {activeTab === 'mission' && (
                <div className="fade-in" style={styles.tabPane}>
                  <div style={styles.tabPaneIcon}>
                    <HiHeart size={48} />
                  </div>
                  <h3 style={styles.tabPaneTitle}>Empowering Through Education</h3>
                  <p style={styles.tabPaneText}>
                    At SrinutechGuru, our mission is to democratize education by providing world-class learning experiences 
                    that empower individuals to achieve their full potential. We believe that quality education should be 
                    accessible to everyone, regardless of their background or location.
                  </p>
                  <p style={styles.tabPaneText}>
                    We're committed to bridging the gap between academic knowledge and industry requirements, ensuring our 
                    learners are equipped with practical, job-ready skills that make them stand out in today's competitive market.
                  </p>
                </div>
              )}

              {activeTab === 'vision' && (
                <div className="fade-in" style={styles.tabPane}>
                  <div style={styles.tabPaneIcon}>
                    <HiSparkles size={48} />
                  </div>
                  <h3 style={styles.tabPaneTitle}>Building Tomorrow's Leaders</h3>
                  <p style={styles.tabPaneText}>
                    We envision a world where continuous learning is the norm, and every individual has the tools and 
                    resources to transform their career and life. SrinutechGuru aims to be the global leader in online 
                    education, recognized for our innovative teaching methods and exceptional learning outcomes.
                  </p>
                  <p style={styles.tabPaneText}>
                    Our vision extends beyond just courses – we're creating a thriving ecosystem of learners, educators, 
                    and industry professionals who collaborate, innovate, and grow together.
                  </p>
                </div>
              )}

              {activeTab === 'values' && (
                <div className="fade-in" style={styles.tabPane}>
                  <div style={styles.tabPaneIcon}>
                    <HiCheckCircle size={48} />
                  </div>
                  <h3 style={styles.tabPaneTitle}>Principles That Guide Us</h3>
                  <div style={styles.valuesGrid}>
                    <div style={styles.valueBox}>
                      <HiShieldCheck size={24} color="#667eea" />
                      <h4 style={styles.valueBoxTitle}>Integrity</h4>
                      <p style={styles.valueBoxText}>Honest, transparent, and ethical in all we do</p>
                    </div>
                    <div style={styles.valueBox}>
                      <HiBeaker size={24} color="#667eea" />
                      <h4 style={styles.valueBoxTitle}>Innovation</h4>
                      <p style={styles.valueBoxText}>Constantly evolving and improving our platform</p>
                    </div>
                    <div style={styles.valueBox}>
                      <HiHeart size={24} color="#667eea" />
                      <h4 style={styles.valueBoxTitle}>Excellence</h4>
                      <p style={styles.valueBoxText}>Delivering only the highest quality content</p>
                    </div>
                    <div style={styles.valueBox}>
                      <HiGlobeAlt size={24} color="#667eea" />
                      <h4 style={styles.valueBoxTitle}>Inclusivity</h4>
                      <p style={styles.valueBoxText}>Making education accessible to everyone</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Premium Design */}
      <section style={styles.featuresSection}>
        <div style={styles.contentWrapper}>
          <div style={styles.sectionHeader}>
            <div style={styles.sectionBadge}>
              <HiLightningBolt size={20} />
              <span>Why Choose Us</span>
            </div>
            <h2 style={styles.sectionTitle}>The SrinutechGuru Advantage</h2>
            <p style={styles.sectionSubtitle}>
              Experience learning that's designed for real-world success
            </p>
          </div>

          <div style={styles.featuresGrid}>
            <div className="feature-card-hover" style={styles.featureCard}>
              <div style={styles.featureNumber}>01</div>
              <div style={styles.featureIcon}>
                <HiCode size={32} />
              </div>
              <h3 style={styles.featureTitle}>Industry-Relevant Curriculum</h3>
              <p style={styles.featureText}>
                Learn cutting-edge technologies and frameworks used by Fortune 500 companies. Our curriculum is 
                continuously updated to reflect the latest industry trends and best practices.
              </p>
              <div style={styles.featureFooter}>
                <HiCheckCircle size={16} color="#10B981" />
                <span>Updated monthly</span>
              </div>
            </div>

            <div className="feature-card-hover" style={styles.featureCard}>
              <div style={styles.featureNumber}>02</div>
              <div style={styles.featureIcon}>
                <HiAcademicCap size={32} />
              </div>
              <h3 style={styles.featureTitle}>World-Class Instructors</h3>
              <p style={styles.featureText}>
                Learn directly from industry veterans with decades of combined experience. Our instructors are 
                not just teachers – they're practitioners who bring real-world insights to every lesson.
              </p>
              <div style={styles.featureFooter}>
                <HiStar size={16} color="#F59E0B" />
                <span>Expert mentors</span>
              </div>
            </div>

            <div className="feature-card-hover" style={styles.featureCard}>
              <div style={styles.featureNumber}>03</div>
              <div style={styles.featureIcon}>
                <HiBeaker size={32} />
              </div>
              <h3 style={styles.featureTitle}>Hands-On Projects</h3>
              <p style={styles.featureText}>
                Build a portfolio of real-world projects that showcase your abilities. Every course includes 
                practical assignments designed to simulate actual workplace scenarios and challenges.
              </p>
              <div style={styles.featureFooter}>
                <HiLightningBolt size={16} color="#EC4899" />
                <span>100+ projects</span>
              </div>
            </div>

            <div className="feature-card-hover" style={styles.featureCard}>
              <div style={styles.featureNumber}>04</div>
              <div style={styles.featureIcon}>
                <HiUserGroup size={32} />
              </div>
              <h3 style={styles.featureTitle}>Thriving Community</h3>
              <p style={styles.featureText}>
                Join a global network of ambitious learners and professionals. Collaborate on projects, share 
                knowledge, get help when stuck, and build meaningful connections that last beyond the courses.
              </p>
              <div style={styles.featureFooter}>
                <HiUserGroup size={16} color="#3B82F6" />
                <span>Active community</span>
              </div>
            </div>

            <div className="feature-card-hover" style={styles.featureCard}>
              <div style={styles.featureNumber}>05</div>
              <div style={styles.featureIcon}>
                <HiClock size={32} />
              </div>
              <h3 style={styles.featureTitle}>Flexible Learning</h3>
              <p style={styles.featureText}>
                Learn at your own pace with lifetime access to course materials. Whether you're a full-time 
                professional or a student, our flexible format fits seamlessly into your schedule.
              </p>
              <div style={styles.featureFooter}>
                <HiClock size={16} color="#8B5CF6" />
                <span>Learn anytime</span>
              </div>
            </div>

            <div className="feature-card-hover" style={styles.featureCard}>
              <div style={styles.featureNumber}>06</div>
              <div style={styles.featureIcon}>
                <HiShieldCheck size={32} />
              </div>
              <h3 style={styles.featureTitle}>Certificates & Recognition</h3>
              <p style={styles.featureText}>
                Earn industry-recognized certificates upon course completion. Showcase your achievements on 
                LinkedIn and your resume to stand out to potential employers and clients.
              </p>
              <div style={styles.featureFooter}>
                <HiShieldCheck size={16} color="#10B981" />
                <span>Verified certificates</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={styles.testimonialsSection}>
        <div style={styles.contentWrapper}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Trusted by Thousands</h2>
            <p style={styles.sectionSubtitle}>
              See what our learners have to say about their experience
            </p>
          </div>

          <div style={styles.testimonialsGrid}>
            <div className="testimonial-card" style={styles.testimonialCard}>
              <div style={styles.quoteIcon}>"</div>
              <p style={styles.testimonialText}>
                SrinutechGuru transformed my career. The courses are incredibly well-structured and the 
                instructors genuinely care about student success. Within 6 months, I landed my dream job!
              </p>
              <div style={styles.testimonialAuthor}>
                <div style={styles.authorAvatar}>RK</div>
                <div>
                  <div style={styles.authorName}>Rajesh Kumar</div>
                  <div style={styles.authorTitle}>Full Stack Developer</div>
                </div>
              </div>
              <div style={styles.ratingStars}>
                {[...Array(5)].map((_, i) => (
                  <HiStar key={i} size={16} color="#F59E0B" />
                ))}
              </div>
            </div>

            <div className="testimonial-card" style={{...styles.testimonialCard, animationDelay: '0.1s'}}>
              <div style={styles.quoteIcon}>"</div>
              <p style={styles.testimonialText}>
                The hands-on projects and real-world scenarios make all the difference. I feel confident 
                applying what I've learned immediately in my work. Best investment in my career!
              </p>
              <div style={styles.testimonialAuthor}>
                <div style={styles.authorAvatar}>PS</div>
                <div>
                  <div style={styles.authorName}>Priya Sharma</div>
                  <div style={styles.authorTitle}>Data Analyst</div>
                </div>
              </div>
              <div style={styles.ratingStars}>
                {[...Array(5)].map((_, i) => (
                  <HiStar key={i} size={16} color="#F59E0B" />
                ))}
              </div>
            </div>

            <div className="testimonial-card" style={{...styles.testimonialCard, animationDelay: '0.2s'}}>
              <div style={styles.quoteIcon}>"</div>
              <p style={styles.testimonialText}>
                Outstanding platform with exceptional content quality. The community support is incredible, 
                and the flexible learning format allowed me to upskill while working full-time.
              </p>
              <div style={styles.testimonialAuthor}>
                <div style={styles.authorAvatar}>AP</div>
                <div>
                  <div style={styles.authorName}>Arun Patel</div>
                  <div style={styles.authorTitle}>Product Manager</div>
                </div>
              </div>
              <div style={styles.ratingStars}>
                {[...Array(5)].map((_, i) => (
                  <HiStar key={i} size={16} color="#F59E0B" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Premium Design */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaCard}>
          <div style={styles.ctaContent}>
            <div style={styles.ctaBadge}>
              <HiSparkles size={16} />
              <span>Start Your Journey Today</span>
            </div>
            <h2 style={styles.ctaTitle}>Ready to Transform Your Career?</h2>
            <p style={styles.ctaText}>
              Join over {about.stats.activeLearners.toLocaleString()}+ learners who are already upgrading their 
              skills and achieving their professional goals with SrinutechGuru
            </p>
            <div style={styles.ctaButtons}>
              <button 
                className="cta-primary-hover"
                style={styles.ctaPrimary}
                onClick={() => navigate("/")}
              >
                <span>Explore Courses</span>
                <HiArrowRight size={20} />
              </button>
              <button 
                className="cta-secondary-hover"
                style={styles.ctaSecondary}
                onClick={() => navigate("/signup")}
              >
                Get Started Free
              </button>
            </div>
            <div style={styles.ctaFeatures}>
              <div style={styles.ctaFeature}>
                <HiCheckCircle size={18} color="#10B981" />
                <span>Free trial courses</span>
              </div>
              <div style={styles.ctaFeature}>
                <HiCheckCircle size={18} color="#10B981" />
                <span>No credit card required</span>
              </div>
              <div style={styles.ctaFeature}>
                <HiCheckCircle size={18} color="#10B981" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

/* ================= STYLES ================= */

const styles: Record<string, React.CSSProperties> = {
  loadingContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
    position: 'relative',
    overflow: 'hidden',
  },
  spinnerContainer: {
    position: 'relative',
    width: '80px',
    height: '80px',
  },
  spinner: {
    width: '80px',
    height: '80px',
    border: '4px solid rgba(102, 126, 234, 0.2)',
    borderTop: '4px solid #667eea',
    borderRadius: '50%',
    animation: 'spin 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite',
  },
  spinnerGlow: {
    position: 'absolute',
    inset: '-10px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(102, 126, 234, 0.4), transparent)',
    filter: 'blur(20px)',
    animation: 'pulse 2s ease-in-out infinite',
  },
  loadingText: {
    marginTop: '32px',
    fontSize: '24px',
    color: 'white',
    fontWeight: 700,
    letterSpacing: '-0.01em',
  },
  loadingSubtext: {
    marginTop: '8px',
    fontSize: '16px',
    color: '#94A3B8',
    fontWeight: 500,
  },

  // Hero Section
  hero: {
    position: 'relative',
    minHeight: '700px',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 30%, #312e81 60%, #4c1d95 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: '100px 20px 120px 20px',
  },
  heroContent: {
    position: 'relative',
    zIndex: 2,
    textAlign: 'center',
    maxWidth: '1000px',
  },
  bgShape1: {
    position: 'absolute',
    top: '-20%',
    right: '-10%',
    width: '600px',
    height: '600px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(102, 126, 234, 0.3), transparent 70%)',
    filter: 'blur(80px)',
    animation: 'float-slow 20s ease-in-out infinite',
  },
  bgShape2: {
    position: 'absolute',
    bottom: '-25%',
    left: '-15%',
    width: '700px',
    height: '700px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(236, 72, 153, 0.25), transparent 70%)',
    filter: 'blur(90px)',
    animation: 'float-slow 25s ease-in-out infinite reverse',
  },
  bgShape3: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '800px',
    height: '800px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2), transparent 70%)',
    filter: 'blur(100px)',
    animation: 'float-slow 30s ease-in-out infinite',
  },
  gridPattern: {
    position: 'absolute',
    inset: 0,
    backgroundImage: `
      linear-gradient(rgba(102, 126, 234, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(102, 126, 234, 0.03) 1px, transparent 1px)
    `,
    backgroundSize: '60px 60px',
    opacity: 0.5,
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '40px',
  },
  logoIconContainer: {
    width: '140px',
    height: '140px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '32px',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(30px)',
    boxShadow: '0 25px 80px rgba(0, 0, 0, 0.4), inset 0 0 30px rgba(255, 255, 255, 0.05)',
    position: 'relative',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  logoGlow: {
    position: 'absolute',
    inset: '-20px',
    background: 'radial-gradient(circle, rgba(102, 126, 234, 0.4), transparent 70%)',
    filter: 'blur(30px)',
    zIndex: -1,
    animation: 'pulse-glow 3s ease-in-out infinite',
  },
  logoSvg: {
    width: '90px',
    height: '90px',
    filter: 'drop-shadow(0 4px 20px rgba(102, 126, 234, 0.5))',
  },
  brandName: {
    fontSize: 'clamp(48px, 8vw, 80px)',
    fontWeight: 900,
    lineHeight: 1.1,
    margin: '0 0 16px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2px',
    letterSpacing: '-0.03em',
  },
  logoSrinu: {
    color: 'white',
    textShadow: '0 0 40px rgba(102, 126, 234, 0.8), 0 4px 20px rgba(0, 0, 0, 0.5)',
    background: 'linear-gradient(135deg, #ffffff, #e0e7ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  logoTech: {
    color: 'white',
    textShadow: '0 0 40px rgba(139, 92, 246, 0.8), 0 4px 20px rgba(0, 0, 0, 0.5)',
    background: 'linear-gradient(135deg, #c4b5fd, #a78bfa)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  logoGuru: {
    color: 'white',
    textShadow: '0 0 40px rgba(236, 72, 153, 0.8), 0 4px 20px rgba(0, 0, 0, 0.5)',
    background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    fontSize: '20px',
    color: '#CBD5E1',
    fontWeight: 600,
    marginBottom: '16px',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  },
  tagline: {
    fontSize: 'clamp(18px, 3vw, 26px)',
    lineHeight: '1.7',
    color: 'rgba(255, 255, 255, 0.9)',
    margin: '0 0 48px 0',
    fontWeight: 500,
    maxWidth: '700px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  badges: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: '48px',
  },
  badge: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '14px 28px',
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(20px)',
    borderRadius: '40px',
    color: 'white',
    fontSize: '15px',
    fontWeight: 700,
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  trustBadges: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
    paddingTop: '32px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  },
  trustItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#E0E7FF',
    fontSize: '14px',
    fontWeight: 600,
  },
  trustDivider: {
    color: 'rgba(255, 255, 255, 0.3)',
    fontSize: '20px',
  },

  // Stats Section
  statsSection: {
    padding: '0 20px',
    marginTop: '-100px',
    marginBottom: '100px',
    position: 'relative',
    zIndex: 10,
  },
  statsContainer: {
    maxWidth: '1300px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '32px',
  },
  statCard: {
    background: 'white',
    borderRadius: '28px',
    padding: '0',
    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.12)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    overflow: 'hidden',
    position: 'relative',
  },
  statCardInner: {
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  statIcon: {
    width: '88px',
    height: '88px',
    borderRadius: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    marginBottom: '28px',
    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
    position: 'relative',
  },
  statContent: {
    width: '100%',
    marginBottom: '20px',
  },
  statNumber: {
    fontSize: '56px',
    fontWeight: 900,
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    margin: '0 0 12px 0',
    letterSpacing: '-0.02em',
  },
  statLabel: {
    fontSize: '20px',
    fontWeight: 800,
    color: '#1f2937',
    margin: '0 0 8px 0',
    letterSpacing: '-0.01em',
  },
  statDesc: {
    fontSize: '15px',
    color: '#6b7280',
    margin: 0,
    lineHeight: 1.6,
  },
  statBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: 700,
  },

  // Tab Section
  tabSection: {
    padding: '100px 20px',
    background: 'linear-gradient(180deg, #f9fafb 0%, #ffffff 100%)',
  },
  contentWrapper: {
    maxWidth: '1300px',
    margin: '0 auto',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '64px',
  },
  sectionBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    borderRadius: '30px',
    fontSize: '15px',
    fontWeight: 700,
    marginBottom: '24px',
    boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)',
  },
  sectionTitle: {
    fontSize: 'clamp(36px, 5vw, 56px)',
    fontWeight: 900,
    color: '#0f172a',
    margin: '0 0 20px 0',
    letterSpacing: '-0.02em',
  },
  sectionSubtitle: {
    fontSize: '20px',
    color: '#64748b',
    maxWidth: '800px',
    margin: '0 auto',
    lineHeight: '1.7',
    fontWeight: 500,
  },
  tabContainer: {
    maxWidth: '1000px',
    margin: '0 auto',
  },
  tabButtons: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    marginBottom: '48px',
    flexWrap: 'wrap',
  },
  tabButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '16px 32px',
    background: 'white',
    color: '#64748b',
    border: '2px solid #e2e8f0',
    borderRadius: '16px',
    fontSize: '16px',
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  tabButtonActive: {
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    borderColor: 'transparent',
    boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)',
  },
  tabContent: {
    background: 'white',
    borderRadius: '28px',
    padding: '48px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
    minHeight: '400px',
  },
  tabPane: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  tabPaneIcon: {
    width: '96px',
    height: '96px',
    borderRadius: '24px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '32px',
    boxShadow: '0 12px 32px rgba(102, 126, 234, 0.3)',
  },
  tabPaneTitle: {
    fontSize: '32px',
    fontWeight: 800,
    color: '#0f172a',
    margin: '0 0 24px 0',
    letterSpacing: '-0.01em',
  },
  tabPaneText: {
    fontSize: '18px',
    lineHeight: '1.8',
    color: '#475569',
    margin: '0 0 20px 0',
    maxWidth: '800px',
  },
  valuesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '24px',
    marginTop: '32px',
  },
  valueBox: {
    padding: '28px',
    background: '#f8fafc',
    borderRadius: '20px',
    border: '2px solid #e2e8f0',
    textAlign: 'center',
    transition: 'all 0.3s ease',
  },
  valueBoxTitle: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#1e293b',
    margin: '12px 0 8px 0',
  },
  valueBoxText: {
    fontSize: '14px',
    color: '#64748b',
    margin: 0,
    lineHeight: 1.6,
  },

  // Features Section
  featuresSection: {
    padding: '100px 20px',
    background: 'white',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '32px',
  },
  featureCard: {
    background: '#f9fafb',
    borderRadius: '24px',
    padding: '40px',
    border: '2px solid #e5e7eb',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
  },
  featureNumber: {
    position: 'absolute',
    top: '24px',
    right: '24px',
    fontSize: '72px',
    fontWeight: 900,
    color: '#f1f5f9',
    lineHeight: 1,
  },
  featureIcon: {
    width: '72px',
    height: '72px',
    borderRadius: '18px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '24px',
    boxShadow: '0 10px 28px rgba(102, 126, 234, 0.25)',
    position: 'relative',
    zIndex: 1,
  },
  featureTitle: {
    fontSize: '24px',
    fontWeight: 800,
    color: '#0f172a',
    margin: '0 0 16px 0',
    letterSpacing: '-0.01em',
  },
  featureText: {
    fontSize: '16px',
    lineHeight: '1.7',
    color: '#475569',
    margin: '0 0 24px 0',
  },
  featureFooter: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: 600,
    color: '#64748b',
  },

  // Testimonials Section
  testimonialsSection: {
    padding: '100px 20px',
    background: 'linear-gradient(180deg, #f9fafb 0%, #ffffff 100%)',
  },
  testimonialsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '32px',
  },
  testimonialCard: {
    background: 'white',
    borderRadius: '24px',
    padding: '40px',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
  },
  quoteIcon: {
    fontSize: '64px',
    fontWeight: 900,
    color: '#667eea',
    lineHeight: 1,
    marginBottom: '16px',
    opacity: 0.2,
  },
  testimonialText: {
    fontSize: '16px',
    lineHeight: '1.8',
    color: '#475569',
    margin: '0 0 24px 0',
    fontStyle: 'italic',
  },
  testimonialAuthor: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '16px',
  },
  authorAvatar: {
    width: '56px',
    height: '56px',
    borderRadius: '16px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    fontWeight: 700,
  },
  authorName: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#0f172a',
  },
  authorTitle: {
    fontSize: '14px',
    color: '#64748b',
    marginTop: '4px',
  },
  ratingStars: {
    display: 'flex',
    gap: '4px',
  },

  // CTA Section
  ctaSection: {
    padding: '100px 20px',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 30%, #312e81 60%, #4c1d95 100%)',
    position: 'relative',
    overflow: 'hidden',
  },
  ctaCard: {
    maxWidth: '900px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 2,
  },
  ctaContent: {
    textAlign: 'center',
  },
  ctaBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(20px)',
    color: 'white',
    borderRadius: '30px',
    fontSize: '14px',
    fontWeight: 700,
    marginBottom: '24px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  ctaTitle: {
    fontSize: 'clamp(32px, 5vw, 52px)',
    fontWeight: 900,
    color: 'white',
    margin: '0 0 20px 0',
    letterSpacing: '-0.02em',
  },
  ctaText: {
    fontSize: '20px',
    color: 'rgba(255, 255, 255, 0.9)',
    margin: '0 0 48px 0',
    lineHeight: '1.7',
    maxWidth: '700px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  ctaButtons: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: '32px',
  },
  ctaPrimary: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '18px 40px',
    background: 'white',
    color: '#667eea',
    border: 'none',
    borderRadius: '16px',
    fontSize: '18px',
    fontWeight: 800,
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 12px 32px rgba(255, 255, 255, 0.2)',
  },
  ctaSecondary: {
    padding: '18px 40px',
    background: 'rgba(255, 255, 255, 0.15)',
    color: 'white',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '16px',
    fontSize: '18px',
    fontWeight: 800,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(20px)',
  },
  ctaFeatures: {
    display: 'flex',
    gap: '24px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    paddingTop: '24px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  },
  ctaFeature: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: 'white',
    fontSize: '15px',
    fontWeight: 600,
  },
};

// Enhanced animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  @keyframes float-slow {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-30px) rotate(5deg); }
  }

  @keyframes pulse-glow {
    0%, 100% { opacity: 0.5; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.1); }
  }

  .logo-wrapper {
    animation: float 4s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-15px); }
  }

  .badge-animated {
    animation: badge-float 3s ease-in-out infinite;
  }

  @keyframes badge-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }

  .badge-animated:hover {
    transform: translateY(-2px) scale(1.05) !important;
    background: rgba(255, 255, 255, 0.25) !important;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3) !important;
  }

  .stat-card-hover {
    animation: fade-in-up 0.6s ease-out forwards;
    opacity: 0;
  }

  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .stat-card-hover:hover {
    transform: translateY(-12px) !important;
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.18) !important;
  }

  .feature-card-hover {
    animation: fade-in-up 0.6s ease-out forwards;
    opacity: 0;
  }

  .feature-card-hover:hover {
    transform: translateY(-8px) !important;
    border-color: #667eea !important;
   box-shadow: 0 20px 60px rgba(102, 126, 234, 0.15) !important;
  }

  .testimonial-card {
    animation: fade-in-up 0.6s ease-out forwards;
    opacity: 0;
  }

  .testimonial-card:hover {
    transform: translateY(-8px) !important;
    box-shadow: 0 25px 70px rgba(0, 0, 0, 0.12) !important;
  }

  .fade-in {
    animation: fade-in 0.5s ease-out;
  }

  @keyframes fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .cta-primary-hover:hover {
    transform: translateY(-3px) scale(1.05) !important;
    box-shadow: 0 16px 40px rgba(255, 255, 255, 0.3) !important;
  }

  .cta-secondary-hover:hover {
    background: rgba(255, 255, 255, 0.25) !important;
    border-color: white !important;
    transform: translateY(-3px) !important;
  }

  @media (max-width: 768px) {
    [style*="statNumber"] {
      font-size: 40px !important;
    }
    
    [style*="featureNumber"] {
      font-size: 48px !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default AboutPage;