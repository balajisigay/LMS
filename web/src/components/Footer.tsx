import React from 'react';
import { colors, spacing, fontSize, borderRadius } from '../styles/colors';

export const Footer: React.FC = () => {
  const footerSections = [
    {
      title: 'Learn',
      links: ['Development', 'Business', 'Design', 'Music'],
    },
    {
      title: 'Community',
      links: ['Instructors', 'Developers', 'Data Insights'],
    },
    {
      title: 'Company',
      links: ['About', 'Contact', 'Blog'],
    },
  ];

  return (
    <footer style={styles.modernContainer}>
      {/* Modern Gradient Background */}
      <div style={styles.modernGradientOverlay}></div>
      
      {/* Main Footer Content */}
      <div style={styles.modernWrapper}>
        <div style={styles.modernContent}>
          {/* Logo & Description */}
          <div style={styles.modernLogoSection}>
            <div style={styles.modernLogoContainer}>
              <div style={styles.modernLogoIcon}>
                <span style={styles.modernLogoText}>L</span>
              </div>
              <span style={styles.modernLogoName}>Lumina</span>
            </div>
            <p style={styles.modernTagline}>
              Building a better world through education
            </p>
          <div style={styles.modernSocialLinks}>
  <a
    href="https://twitter.com/"
    target="_blank"
    rel="noopener noreferrer"
    style={styles.modernSocialIconTwitter}
  >
    𝕏
  </a>

  <a
    href="https://facebook.com/"
    target="_blank"
    rel="noopener noreferrer"
    style={styles.modernSocialIconFacebook}
  >
    f
  </a>

  <a
    href="https://linkedin.com/company/"
    target="_blank"
    rel="noopener noreferrer"
    style={styles.modernSocialIconLinkedIn}
  >
    in
  </a>

  <a
    href="https://youtube.com/"
    target="_blank"
    rel="noopener noreferrer"
    style={styles.modernSocialIconYouTube}
  >
    ▶
  </a>
</div>

          </div>

          {/* Links Grid */}
          <div style={styles.modernLinksGrid}>
            {footerSections.map((section, index) => (
              <div key={index} style={styles.modernLinkSection}>
                <h4 style={styles.modernLinkSectionTitle}>{section.title}</h4>
                {section.links.map((link, linkIndex) => (
                  <a key={linkIndex} style={styles.modernLink}>
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modern Divider */}
      <div style={styles.modernDivider}></div>

      {/* Bottom Bar */}
      <div style={styles.modernWrapper}>
        <div style={styles.modernBottomFooter}>
          <p style={styles.modernCopyright}>
            © 2025 Lumina Inc. All rights reserved.
          </p>
          <div style={styles.modernBottomLinks}>
            <a style={styles.modernBottomLink}>Privacy</a>
            <a style={styles.modernBottomLink}>Terms</a>
            <a style={styles.modernBottomLink}>Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const styles: Record<string, React.CSSProperties> = {
  // Container
  modernContainer: {
    position: 'relative',
    background: 'linear-gradient(135deg, #1e1e2e 0%, #111827 100%)',
    overflow: 'hidden',
    paddingTop: '80px',
    paddingBottom: '40px',
  },
  modernGradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
    zIndex: 0,
  },

  // Wrapper
  modernWrapper: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 40px',
    position: 'relative',
    zIndex: 1,
  },

  // Main Content
  modernContent: {
    display: 'grid',
    gridTemplateColumns: '400px 1fr',
    gap: '60px',
    paddingBottom: '60px',
    alignItems: 'start',
  },

  // Logo Section
  modernLogoSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  modernLogoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  modernLogoIcon: {
    width: '56px',
    height: '56px',
    borderRadius: '16px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
  },
  modernLogoText: {
    color: 'white',
    fontSize: '28px',
    fontWeight: '800',
  },
  modernLogoName: {
    fontSize: '28px',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  modernTagline: {
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.7)',
    lineHeight: '1.6',
    margin: 0,
    maxWidth: '300px',
  },

  // Social Links (Logo Section)
  modernSocialLinks: {
    display: 'flex',
    gap: '16px',
  },
  modernSocialIconTwitter: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #1da1f2, #0d8bd9)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    fontWeight: '600',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(29, 161, 242, 0.4)',
  },
  modernSocialIconFacebook: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #1877f2, #0e5a8a)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    fontWeight: '600',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(24, 119, 242, 0.4)',
  },
  modernSocialIconLinkedIn: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #0077b5, #005885)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    fontWeight: '600',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(0, 119, 181, 0.4)',
  },
  modernSocialIconYouTube: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #ff0000, #cc0000)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    fontWeight: '600',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(255, 0, 0, 0.4)',
  },

  // Links Grid
  modernLinksGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '48px',
  },
  modernLinkSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  modernLinkSectionTitle: {
    fontSize: '18px',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    margin: 0,
  },
  modernLink: {
    fontSize: '15px',
    color: 'rgba(255, 255, 255, 0.8)',
    textDecoration: 'none',
    padding: '8px 0',
    display: 'block',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
  },

  // Divider
  modernDivider: {
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
    margin: '0 auto 40px',
    width: '80%',
    position: 'relative',
  },

  // Bottom Footer
  modernBottomFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 0',
    flexWrap: 'wrap',
    gap: '20px',
  },
  modernCopyright: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.6)',
    margin: 0,
    fontWeight: '500',
  },
  modernBottomLinks: {
    display: 'flex',
    gap: '24px',
  },
  modernBottomLink: {
    fontSize: '14px',
    color: 'rgba(255, 255, 255, 0.7)',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'all 0.3s ease',
  },
};

// Add modern animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes modernFooterFade {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .modernLink:hover {
    color: white;
    padding-left: 12px;
    background: rgba(255, 255, 255, 0.1);
  }
  
  .modernSocialIconTwitter:hover,
  .modernSocialIconFacebook:hover,
  .modernSocialIconLinkedIn:hover,
  .modernSocialIconYouTube:hover {
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
  }
  
  .modernBottomLink:hover {
    color: white;
    text-decoration: underline;
  }
  
  .modernContainer * {
    animation: modernFooterFade 0.8s ease forwards;
  }
`;
document.head.appendChild(styleSheet);
