import React from 'react';
import InstructorImage from "../assets/instructorimage.png";

/**
 * InstructorSection Component
 * 
 * A visually striking promotional section that encourages users to become instructors.
 * Features a gradient background, featured image with statistics, and call-to-action button.
 * 
 * Features:
 * - Responsive two-column layout (image + content)
 * - Animated gradient background with overlay
 * - Statistics overlay on instructor image (50K+ instructors, 2M+ learners)
 * - Animated feature icons with floating animation
 * - Modern glassmorphism button design
 * - Professional typography with gradient text effects
 * - Smooth transitions and animations throughout
 * - Mobile-responsive design
 * 
 * Props:
 * @param {() => void} onPress - Callback function when the "Start Teaching Today" button is clicked
 */
interface InstructorSectionProps {
  onPress?: () => void;
}

export const InstructorSection: React.FC<InstructorSectionProps> = ({ onPress }) => {
  return (
    <section style={styles.modernContainer}>
      {/* Gradient Background Overlay - Creates depth and visual interest */}
      <div style={styles.modernGradientOverlay}></div>
      
      <div style={styles.modernWrapper}>
        <div style={styles.modernContent}>
          {/* Modern Image Section - Displays instructor image with statistics overlay */}
          <div style={styles.modernImageSection}>
            <div style={styles.modernImageCard}>
              <img
                src={InstructorImage}
                alt="Instructor Team"
                style={styles.modernImage}
              />
              {/* Statistics Overlay - Shows key metrics */}
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

          {/* Modern Text Section - Content and call-to-action */}
          <div style={styles.modernTextSection}>
            {/* Featured Badge */}
            <div style={styles.modernBadge}>Featured</div>
            
            {/* Main Heading */}
            <h2 style={styles.modernTitle}>
              Become an Instructor
            </h2>
            
            {/* Subtitle/Description */}
            <p style={styles.modernSubtitle}>
              Instructors from around the world teach millions of learners on Srinu tech Guru. 
              We provide the tools and skills to teach what you love.
            </p>
            
            {/* Feature List - Three key benefits with icons and animations */}
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

            {/* Call-to-Action Button with arrow icon */}
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
  // ===== CONTAINER & LAYOUT =====
  // Main container with gradient background and padding
  modernContainer: {
    position: 'relative',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    padding: '120px 0',
    overflow: 'hidden',
  },
  // Overlay to add subtle texture and depth to background
  modernGradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
  },

  // ===== WRAPPER & CONTENT =====
  // Max-width container with responsive padding
  modernWrapper: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 40px',
    position: 'relative',
    zIndex: 2,
  },
  // Two-column grid layout (responsive)
  modernContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '80px',
    alignItems: 'center',
  },

  // ===== IMAGE SECTION =====
  // Image container wrapper
  modernImageSection: {
    display: 'flex',
    justifyContent: 'center',
  },
  // Card-style image container with rounded corners and shadow
  modernImageCard: {
    position: 'relative',
    width: '100%',
    maxWidth: '500px',
    height: '500px',
    borderRadius: '32px',
    overflow: 'hidden',
    boxShadow: '0 40px 80px rgba(0, 0, 0, 0.3)',
  },
  // Image with smooth scaling transition
  modernImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  // Gradient overlay at bottom of image for statistics
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
  // Stats container layout
  modernStats: {
    display: 'flex',
    gap: '40px',
  },
  // Individual stat item
  modernStat: {
    display: 'flex',
    flexDirection: 'column',
  },
  // Large bold number for stat
  modernStatNumber: {
    fontSize: '28px',
    fontWeight: '800',
    color: 'white',
    lineHeight: '1',
  },
  // Label text for stat
  modernStatLabel: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
  },

  // ===== TEXT SECTION =====
  // Text content container
  modernTextSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    maxWidth: '500px',
  },
  // Featured badge with glassmorphism effect
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
  // Main heading with gradient text effect
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
  // Subtitle/description text
  modernSubtitle: {
    fontSize: '18px',
    color: 'rgba(255,255,255,0.95)',
    lineHeight: '1.7',
    margin: 0,
  },

  // ===== FEATURES LIST =====
  // Features container
  modernFeatures: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    margin: '20px 0',
  },
  // Individual feature item
  modernFeature: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  // Feature icon with glassmorphism styling (animates)
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

  // ===== BUTTON =====
  // CTA button with glassmorphism effect and professional styling
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
  // Arrow icon styling with smooth transition
  modernButtonArrow: {
    fontSize: '18px',
    fontWeight: 'bold',
    transition: 'margin-left 0.3s ease',
  },
};

// ===== ANIMATIONS & EFFECTS =====
// Modern animations stylesheet
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  /* Floating animation for feature icons */
  @keyframes modernFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  /* Image styling - normal state without hover effects */
  .modernImageCard .modernImage {
    transform: scale(1);
  }
  
  /* Button styling - normal state without hover effects */
  .modernButton {
    transform: translateY(0) scale(1);
    box-shadow: 0 20px 45px rgba(255,255,255,0.25);
  }
  
  /* Arrow icon styling */
  .modernButton .modernButtonArrow {
    margin-left: 6px;
  }
  
  /* Floating animation applied to all feature icons */
  .modernFeatureIcon {
    animation: modernFloat 3s ease-in-out infinite;
  }
  
  /* Staggered animation delays for sequential float effect */
  .modernFeatureIcon:nth-child(2) {
    animation-delay: 0.5s;
  }
  
  .modernFeatureIcon:nth-child(3) {
    animation-delay: 1s;
  }
`;
document.head.appendChild(styleSheet);
