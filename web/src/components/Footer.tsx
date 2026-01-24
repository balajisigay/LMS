import React from 'react';

// --- Types ---
interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

// --- Footer Data ---
const footerSections: FooterSection[] = [
  {
    title: 'Learn',
    links: [
      { label: 'Full Stack Dev', href: '#' },
      { label: 'Cloud Computing', href: '#' },
      { label: 'Data Science', href: '#' },
      { label: 'System Design', href: '#' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Discord Server', href: '#' },
      { label: 'Student Showcase', href: '#' },
      { label: 'Tech Forums', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Srinutech', href: '#' },
      { label: 'Career Paths', href: '#' },
      { label: 'Contact Us', href: '#' },
    ],
  },
];

// --- CSS Styles ---
const cssStyles = `
  :root {
    --footer-bg: #0f172a;
    --footer-text: #94a3b8;
    --footer-heading: #f8fafc;
    --brand-gradient: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
    --hover-bg: rgba(255, 255, 255, 0.05);
  }

  .footer-container {
    background: var(--footer-bg);
    color: var(--footer-text);
    padding: 80px 20px 40px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    position: relative;
    overflow: hidden;
  }

  /* Decorative Background Glow */
  .footer-glow {
    position: absolute;
    top: -100px;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  .footer-wrapper {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  /* Top Section Grid */
  .footer-top {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 40px;
    margin-bottom: 60px;
  }

  /* Brand Column */
  .brand-col {
    padding-right: 40px;
  }

  .brand-logo {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
  }

  .logo-icon {
    width: 48px;
    height: 48px;
    background: var(--brand-gradient);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 24px;
    font-weight: 800;
    box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
  }

  .logo-text {
    font-size: 24px;
    font-weight: 700;
    background: linear-gradient(to right, #fff, #e2e8f0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -0.5px;
  }

  .brand-desc {
    font-size: 15px;
    line-height: 1.6;
    margin-bottom: 24px;
    color: var(--footer-text);
    max-width: 300px;
  }

  /* Social Icons */
  .social-links {
    display: flex;
    gap: 12px;
  }

  .social-btn {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .social-btn:hover {
    background: var(--brand-gradient);
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(99, 102, 241, 0.4);
    border-color: transparent;
  }

  /* Link Columns */
  .nav-col h4 {
    color: var(--footer-heading);
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 20px 0;
  }

  .nav-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .nav-link {
    color: var(--footer-text);
    text-decoration: none;
    font-size: 14px;
    transition: color 0.2s;
    display: inline-block;
  }

  .nav-link:hover {
    color: #fff;
    transform: translateX(4px);
  }

  /* Bottom Bar */
  .footer-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    margin-bottom: 30px;
  }

  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
  }

  .legal-links {
    display: flex;
    gap: 24px;
  }

  .legal-link {
    color: var(--footer-text);
    text-decoration: none;
    transition: color 0.2s;
  }
  .legal-link:hover { color: #fff; }

  /* Responsive Queries */
  @media (max-width: 1024px) {
    .footer-top {
      grid-template-columns: 1fr 1fr;
      gap: 40px 20px;
    }
    .brand-col {
      grid-column: 1 / -1;
      text-align: center;
      padding-right: 0;
    }
    .brand-logo { justify-content: center; }
    .brand-desc { margin: 0 auto 24px; }
    .social-links { justify-content: center; }
  }

  @media (max-width: 600px) {
    .footer-top {
      grid-template-columns: 1fr;
      text-align: center;
    }
    .footer-bottom {
      flex-direction: column;
      gap: 20px;
      text-align: center;
    }
    .nav-link:hover { transform: none; }
  }
`;

// --- Components ---

export const Footer: React.FC = () => {
  return (
    <footer className="footer-container">
      <style>{cssStyles}</style>
      
      {/* Ambient Background Effect */}
      <div className="footer-glow"></div>

      <div className="footer-wrapper">
        <div className="footer-top">
          
          {/* Brand Column */}
          <div className="brand-col">
            <div className="brand-logo">
              <div className="logo-icon">S</div>
              <span className="logo-text">SrinutechGuru</span>
            </div>
            <p className="brand-desc">
              Empowering the next generation of developers with cutting-edge tech education and community support.
            </p>
            
            <div className="social-links">
              {/* Twitter/X */}
              <a href="#" className="social-btn" aria-label="Twitter">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              {/* Facebook */}
              <a href="#" className="social-btn" aria-label="Facebook">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.048 0-2.733.984-2.733 2.583v1.388h3.853l-1.127 3.667h-2.726v8.011c5.35-1.792 8.791-6.916 8.579-12.78C22.618 5.609 17.561.423 11.528.423S.44 5.609.587 11.391c-.212 5.864 3.227 10.988 8.514 12.3z"/></svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="social-btn" aria-label="LinkedIn">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              {/* YouTube */}
              <a href="#" className="social-btn" aria-label="YouTube">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          {/* Navigation Columns */}
          {footerSections.map((section) => (
            <div key={section.title} className="nav-col">
              <h4>{section.title}</h4>
              <ul className="nav-list">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="nav-link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p>© 2026 SrinutechGuru. All rights reserved.</p>
          <div className="legal-links">
            <a href="#" className="legal-link">Privacy Policy</a>
            <a href="#" className="legal-link">Terms of Service</a>
            <a href="#" className="legal-link">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;