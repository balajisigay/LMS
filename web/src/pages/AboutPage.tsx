import React, { useEffect, useState } from "react";
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
  HiTrendingUp
} from "react-icons/hi";

export const AboutPage: React.FC = () => {
  const [about, setAbout] = useState<AboutInfo | null>(null);
  const [loading, setLoading] = useState(true);

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
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Loading...</p>
        </div>
      </>
    );
  }

  if (!about) return null;

  return (
    <>
      <Header />

      {/* Hero Section with Modern Logo */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          {/* Animated Background Shapes */}
          <div style={styles.bgShape1}></div>
          <div style={styles.bgShape2}></div>
          <div style={styles.bgShape3}></div>

          {/* Logo */}
          <div style={styles.logoContainer}>
            <div style={styles.logoIconContainer}>
              <svg style={styles.logoSvg} viewBox="0 0 80 80" fill="none">
                <path
                  d="M40 8L70 24V56L40 72L10 56V24L40 8Z"
                  fill="url(#gradient1)"
                  stroke="white"
                  strokeWidth="3"
                />
                <circle cx="40" cy="40" r="12" fill="white" opacity="0.9" />
                <defs>
                  <linearGradient id="gradient1" x1="10" y1="8" x2="70" y2="72">
                    <stop offset="0%" stopColor="#667eea" />
                    <stop offset="100%" stopColor="#764ba2" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Brand Name */}
          <h1 style={styles.brandName}>
            <span style={styles.logoSri}>Srinu</span>
            <span style={styles.logoTech}>tech</span>
            <span style={styles.logoGuru}>Guru</span>
          </h1>

          {/* Tagline */}
          <p style={styles.tagline}>{about.tagline}</p>
          
          {/* Feature Badges */}
          <div style={styles.badges}>
            <div style={styles.badge}>
              <HiSparkles size={16} />
              <span>Learn</span>
            </div>
            <div style={styles.badge}>
              <HiTrendingUp size={16} />
              <span>Grow</span>
            </div>
            <div style={styles.badge}>
              <HiLightningBolt size={16} />
              <span>Excel</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section style={styles.statsSection}>
        <div style={styles.statsContainer}>
          <div style={styles.statCard}>
            <div style={{...styles.statIcon, background: 'linear-gradient(135deg, #667eea, #764ba2)'}}>
              <HiUserGroup size={32} />
            </div>
            <div style={styles.statContent}>
              <h2 style={styles.statNumber}>{about.stats.activeLearners.toLocaleString()}+</h2>
              <p style={styles.statLabel}>Active Learners</p>
              <p style={styles.statDesc}>Students worldwide trust our platform</p>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={{...styles.statIcon, background: 'linear-gradient(135deg, #f093fb, #f5576c)'}}>
              <HiAcademicCap size={32} />
            </div>
            <div style={styles.statContent}>
              <h2 style={styles.statNumber}>{about.stats.courses}+</h2>
              <p style={styles.statLabel}>Quality Courses</p>
              <p style={styles.statDesc}>Expert-crafted learning paths</p>
            </div>
          </div>

          <div style={styles.statCard}>
            <div style={{...styles.statIcon, background: 'linear-gradient(135deg, #43e97b, #38f9d7)'}}>
              <HiChartBar size={32} />
            </div>
            <div style={styles.statContent}>
              <h2 style={styles.statNumber}>{about.stats.satisfaction}%</h2>
              <p style={styles.statLabel}>Satisfaction Rate</p>
              <p style={styles.statDesc}>Highly rated by our community</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section style={styles.missionSection}>
        <div style={styles.contentWrapper}>
          <div style={styles.sectionHeader}>
            <div style={styles.sectionBadge}>
              <HiHeart size={20} />
              <span>Our Mission</span>
            </div>
            <h2 style={styles.sectionTitle}>Why Choose {about.name}?</h2>
            <p style={styles.sectionSubtitle}>
              Empowering learners worldwide with cutting-edge education and real-world skills
            </p>
          </div>

          <div style={styles.featuresGrid}>
            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>
                <HiLightningBolt size={28} />
              </div>
              <h3 style={styles.featureTitle}>Industry-Ready Skills</h3>
              <p style={styles.featureText}>
                Learn the latest technologies and frameworks used by top companies. Our curriculum is constantly updated to match industry demands.
              </p>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>
                <HiAcademicCap size={28} />
              </div>
              <h3 style={styles.featureTitle}>Expert Instructors</h3>
              <p style={styles.featureText}>
                Learn from professionals with years of real-world experience. Get insights that go beyond textbooks and tutorials.
              </p>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>
                <HiSparkles size={28} />
              </div>
              <h3 style={styles.featureTitle}>Hands-On Projects</h3>
              <p style={styles.featureText}>
                Build real-world projects that showcase your skills. Create a portfolio that stands out to potential employers.
              </p>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>
                <HiUserGroup size={28} />
              </div>
              <h3 style={styles.featureTitle}>Vibrant Community</h3>
              <p style={styles.featureText}>
                Join thousands of learners worldwide. Get support, share knowledge, and grow together with our active community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section style={styles.valuesSection}>
        <div style={styles.contentWrapper}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Our Core Values</h2>
            <p style={styles.sectionSubtitle}>
              The principles that guide everything we do
            </p>
          </div>

          <div style={styles.valuesList}>
            <div style={styles.valueItem}>
              <div style={styles.valueIconWrapper}>
                <HiCheckCircle size={24} />
              </div>
              <div style={styles.valueContent}>
                <h4 style={styles.valueTitle}>Quality First</h4>
                <p style={styles.valueText}>
                  We never compromise on the quality of our content. Every course is meticulously crafted and reviewed.
                </p>
              </div>
            </div>

            <div style={styles.valueItem}>
              <div style={styles.valueIconWrapper}>
                <HiCheckCircle size={24} />
              </div>
              <div style={styles.valueContent}>
                <h4 style={styles.valueTitle}>Learner-Centric</h4>
                <p style={styles.valueText}>
                  Your success is our priority. We design every aspect of our platform with your learning journey in mind.
                </p>
              </div>
            </div>

            <div style={styles.valueItem}>
              <div style={styles.valueIconWrapper}>
                <HiCheckCircle size={24} />
              </div>
              <div style={styles.valueContent}>
                <h4 style={styles.valueTitle}>Innovation</h4>
                <p style={styles.valueText}>
                  We embrace new technologies and teaching methods to make learning more effective and engaging.
                </p>
              </div>
            </div>

            <div style={styles.valueItem}>
              <div style={styles.valueIconWrapper}>
                <HiCheckCircle size={24} />
              </div>
              <div style={styles.valueContent}>
                <h4 style={styles.valueTitle}>Accessibility</h4>
                <p style={styles.valueText}>
                  Education should be available to everyone. We strive to make learning affordable and accessible globally.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaCard}>
          <h2 style={styles.ctaTitle}>Ready to Start Your Journey?</h2>
          <p style={styles.ctaText}>
            Join thousands of learners who are already upgrading their skills and advancing their careers
          </p>
          <div style={styles.ctaButtons}>
            <button style={styles.ctaPrimary}>
              Explore Courses
            </button>
            <button style={styles.ctaSecondary}>
              Get Started Free
            </button>
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
    minHeight: '70vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '4px solid rgba(255,255,255,0.3)',
    borderTop: '4px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    marginTop: '20px',
    fontSize: '18px',
    color: 'white',
    fontWeight: 500,
  },

  // Hero Section
  hero: {
    position: 'relative',
    minHeight: '600px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: '80px 20px',
  },
  heroContent: {
    position: 'relative',
    zIndex: 2,
    textAlign: 'center',
    maxWidth: '800px',
  },
  bgShape1: {
    position: 'absolute',
    top: '-10%',
    right: '-5%',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.1)',
    filter: 'blur(60px)',
  },
  bgShape2: {
    position: 'absolute',
    bottom: '-15%',
    left: '-10%',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.08)',
    filter: 'blur(80px)',
  },
  bgShape3: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '600px',
    height: '600px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.05)',
    filter: 'blur(100px)',
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '32px',
  },
  logoIconContainer: {
    width: '120px',
    height: '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '30px',
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    animation: 'float 3s ease-in-out infinite',
  },
  logoSvg: {
    width: '80px',
    height: '80px',
  },
  brandName: {
    fontSize: '64px',
    fontWeight: 800,
    lineHeight: 1.2,
    margin: '0 0 24px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
  },
  logoSri: {
    color: 'white',
    textShadow: '0 2px 20px rgba(0, 0, 0, 0.3)',
  },
  logoTech: {
    color: 'rgba(255, 255, 255, 0.95)',
    textShadow: '0 2px 20px rgba(0, 0, 0, 0.3)',
  },
  logoGuru: {
    color: 'white',
    textShadow: '0 2px 20px rgba(0, 0, 0, 0.3)',
  },
  tagline: {
    fontSize: '24px',
    lineHeight: '1.6',
    color: 'rgba(255, 255, 255, 0.95)',
    margin: '0 0 40px 0',
    fontWeight: 500,
    textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
  },
  badges: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  badge: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    background: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    borderRadius: '30px',
    color: 'white',
    fontSize: '16px',
    fontWeight: 600,
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },

  // Stats Section
  statsSection: {
    padding: '0 20px',
    marginTop: '-80px',
    marginBottom: '120px',
    position: 'relative',
    zIndex: 10,
  },
  statsContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '32px',
  },
  statCard: {
    background: 'white',
    borderRadius: '24px',
    padding: '40px',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    transition: 'transform 0.3s, box-shadow 0.3s',
  },
  statIcon: {
    width: '80px',
    height: '80px',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    marginBottom: '24px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
  },
  statContent: {
    width: '100%',
  },
  statNumber: {
    fontSize: '48px',
    fontWeight: 800,
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    margin: '0 0 8px 0',
  },
  statLabel: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#1f2937',
    margin: '0 0 8px 0',
  },
  statDesc: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0,
  },

  // Mission Section
  missionSection: {
    padding: '80px 20px',
    background: '#f9fafb',
  },
  contentWrapper: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '64px',
  },
  sectionBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    borderRadius: '30px',
    fontSize: '14px',
    fontWeight: 600,
    marginBottom: '24px',
  },
  sectionTitle: {
    fontSize: '48px',
    fontWeight: 800,
    color: '#1f2937',
    margin: '0 0 16px 0',
  },
  sectionSubtitle: {
    fontSize: '20px',
    color: '#6b7280',
    maxWidth: '700px',
    margin: '0 auto',
    lineHeight: '1.6',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '32px',
  },
  featureCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
    transition: 'transform 0.3s, box-shadow 0.3s',
  },
  featureIcon: {
    width: '64px',
    height: '64px',
    borderRadius: '16px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '24px',
    boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)',
  },
  featureTitle: {
    fontSize: '22px',
    fontWeight: 700,
    color: '#1f2937',
    margin: '0 0 12px 0',
  },
  featureText: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#6b7280',
    margin: 0,
  },

  // Values Section
  valuesSection: {
    padding: '80px 20px',
    background: 'white',
  },
  valuesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    maxWidth: '900px',
    margin: '0 auto',
  },
  valueItem: {
    display: 'flex',
    gap: '24px',
    padding: '32px',
    background: '#f9fafb',
    borderRadius: '16px',
    border: '2px solid #e5e7eb',
    transition: 'all 0.3s',
  },
  valueIconWrapper: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #10b981, #059669)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  valueContent: {
    flex: 1,
  },
  valueTitle: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#1f2937',
    margin: '0 0 8px 0',
  },
  valueText: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#6b7280',
    margin: 0,
  },

  // CTA Section
  ctaSection: {
    padding: '80px 20px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  ctaCard: {
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
  },
  ctaTitle: {
    fontSize: '42px',
    fontWeight: 800,
    color: 'white',
    margin: '0 0 16px 0',
  },
  ctaText: {
    fontSize: '20px',
    color: 'rgba(255, 255, 255, 0.9)',
    margin: '0 0 40px 0',
    lineHeight: '1.6',
  },
  ctaButtons: {
    display: 'flex',
    gap: '16px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  ctaPrimary: {
    padding: '16px 40px',
    background: 'white',
    color: '#667eea',
    border: 'none',
    borderRadius: '12px',
    fontSize: '18px',
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'all 0.3s',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
  },
  ctaSecondary: {
    padding: '16px 40px',
    background: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    border: '2px solid white',
    borderRadius: '12px',
    fontSize: '18px',
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'all 0.3s',
    backdropFilter: 'blur(10px)',
  },
};

// Add animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  [style*="statCard"]:hover {
    transform: translateY(-8px);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2) !important;
  }
  
  [style*="featureCard"]:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
  }
  
  [style*="valueItem"]:hover {
    background: white !important;
    border-color: #667eea !important;
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.15);
  }
  
  button:hover {
    transform: translateY(-2px);
  }
  
  button:active {
    transform: translateY(0);
  }
  
  [style*="ctaPrimary"]:hover {
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3) !important;
    transform: translateY(-4px);
  }
  
  [style*="ctaSecondary"]:hover {
    background: rgba(255, 255, 255, 0.3) !important;
  }
`;
document.head.appendChild(styleSheet);

export default AboutPage;