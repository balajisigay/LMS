import React from 'react';
import { colors, spacing, fontSize, borderRadius } from '../styles/colors';
import InstructorImage from "../assets/instructorimage.png";

interface InstructorSectionProps {
  onPress?: () => void;
}

export const InstructorSection: React.FC<InstructorSectionProps> = ({ onPress }) => {
  return (
    <section style={styles.modernContainer}>
      {/* Gradient Background Overlay */}
      <div style={styles.modernGradientOverlay}></div>
      
      <div style={styles.modernWrapper}>
        <div style={styles.modernContent}>
          {/* Modern Image Section */}
          <div style={styles.modernImageSection}>
            <div style={styles.modernImageCard}>
              <img
                src={InstructorImage}
                alt="Instructor Team"
                style={styles.modernImage}
              />
              <div style={styles.modernImageOverlay}>
                <div style={styles.modernStats}>
                  <div style={styles.modernStat}>
                    <span style={styles.modernStatNumber}>50K+</span>
                    <span style={styles.modernStatLabel}>Instructors</span>
                  </div>
                  <div style={styles.modernStat}>
                    <span style={styles.modernStatNumber}>2M+</span>
                    <span style={styles.modernStatLabel}>Learners</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modern Text Section */}
          <div style={styles.modernTextSection}>
            <div style={styles.modernBadge}>Featured</div>
            <h2 style={styles.modernTitle}>
              Become an Instructor
            </h2>
            <p style={styles.modernSubtitle}>
              Instructors from around the world teach millions of learners on Lumina. 
              We provide the tools and skills to teach what you love.
            </p>
            
            <div style={styles.modernFeatures}>
              <div style={styles.modernFeature}>
                <div style={styles.modernFeatureIcon}>📱</div>
                <span>Live streaming tools</span>
              </div>
              <div style={styles.modernFeature}>
                <div style={styles.modernFeatureIcon}>💰</div>
                <span>Revenue sharing</span>
              </div>
              <div style={styles.modernFeature}>
                <div style={styles.modernFeatureIcon}>🎯</div>
                <span>Student analytics</span>
              </div>
            </div>

            <button style={styles.modernButton} onClick={onPress}>
              <span>Start Teaching Today</span>
              <span style={styles.modernButtonArrow}>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const styles: Record<string, React.CSSProperties> = {
  // Container
  modernContainer: {
    position: 'relative',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    padding: '120px 0',
    overflow: 'hidden',
  },
  modernGradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
  },

  // Wrapper
  modernWrapper: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 40px',
    position: 'relative',
    zIndex: 2,
  },

  // Main Content
  modernContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '80px',
    alignItems: 'center',
  },

  // Image Section
  modernImageSection: {
    display: 'flex',
    justifyContent: 'center',
  },
  modernImageCard: {
    position: 'relative',
    width: '100%',
    maxWidth: '500px',
    height: '500px',
    borderRadius: '32px',
    overflow: 'hidden',
    boxShadow: '0 40px 80px rgba(0, 0, 0, 0.3)',
  },
  modernImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  modernImageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '120px',
    background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
    padding: '32px 40px',
    display: 'flex',
    alignItems: 'flex-end',
  },
  modernStats: {
    display: 'flex',
    gap: '40px',
  },
  modernStat: {
    display: 'flex',
    flexDirection: 'column',
  },
  modernStatNumber: {
    fontSize: '28px',
    fontWeight: '800',
    color: 'white',
    lineHeight: '1',
  },
  modernStatLabel: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
  },

  // Text Section
  modernTextSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    maxWidth: '500px',
  },
  modernBadge: {
    display: 'inline-flex',
    padding: '8px 20px',
    background: 'rgba(255,255,255,0.2)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.3)',
    borderRadius: '50px',
    fontSize: '14px',
    fontWeight: '600',
    color: 'white',
    alignSelf: 'flex-start',
  },
  modernTitle: {
    fontSize: '48px',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    lineHeight: '1.2',
    margin: 0,
  },
  modernSubtitle: {
    fontSize: '18px',
    color: 'rgba(255,255,255,0.95)',
    lineHeight: '1.7',
    margin: 0,
  },
  modernFeatures: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    margin: '20px 0',
  },
  modernFeature: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  modernFeatureIcon: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    background: 'rgba(255,255,255,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    backdropFilter: 'blur(10px)',
  },
  modernButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '20px 32px',
    background: 'rgba(255,255,255,0.95)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.3)',
    borderRadius: '24px',
    color: '#1f2937',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 20px 40px rgba(255,255,255,0.2)',
    alignSelf: 'flex-start',
    position: 'relative',
    overflow: 'hidden',
  },
  modernButtonArrow: {
    fontSize: '18px',
    fontWeight: 'bold',
    transition: 'margin-left 0.3s ease',
  },
};

// Modern animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes modernFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  .modernImageCard:hover .modernImage {
    transform: scale(1.05);
  }
  
  .modernButton:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 30px 60px rgba(255,255,255,0.3);
  }
  
  .modernButton:hover .modernButtonArrow {
    margin-left: 8px;
  }
  
  .modernFeatureIcon {
    animation: modernFloat 3s ease-in-out infinite;
  }
  
  .modernFeatureIcon:nth-child(2) {
    animation-delay: 0.5s;
  }
  
  .modernFeatureIcon:nth-child(3) {
    animation-delay: 1s;
  }
`;
document.head.appendChild(styleSheet);
