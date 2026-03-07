import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import LoginImage from "../assets/loginimage.png";
import { HiMail, HiLockClosed, HiUser, HiEye, HiEyeOff } from "react-icons/hi";
import { setCurrentUser } from "../utils/auth";
import { apiUrl } from "../config/api";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.userId) navigate("/");
      } catch (e) {
        localStorage.removeItem("user");
      }
    }
  }, [navigate]);

  const validateEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async () => {
    if (!email || !password) { setError("Please enter both email and password"); return; }
    if (!validateEmail(email)) { setError("Please enter a valid email address"); return; }
    setLoading(true); setError("");
    try {
      const response = await fetch(apiUrl('/Auth/login'), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) throw new Error((await response.text()) || "Login failed");
      const data = await response.json();
      if (!data.userId || !data.email) throw new Error("Invalid response from server");
      setCurrentUser(data);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!fullName || !email || !password || !confirmPassword) { setError("Please fill in all fields"); return; }
    if (!validateEmail(email)) { setError("Please enter a valid email address"); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters long"); return; }
    if (password !== confirmPassword) { setError("Passwords do not match"); return; }
    if (!acceptTerms) { setError("Please accept the Terms of Service and Privacy Policy"); return; }
    setLoading(true); setError("");
    try {
      const response = await fetch(apiUrl('/Auth/register'), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, fullName }),
      });
      if (!response.ok) throw new Error((await response.text()) || "Registration failed");
      setActiveTab("login");
      setPassword(""); setConfirmPassword(""); setFullName(""); setAcceptTerms(false); setError("");
      setTimeout(() => alert("Registration successful! Please login with your credentials."), 100);
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") activeTab === "login" ? handleLogin() : handleSignup();
  };

  const switchTab = (tab: "login" | "signup") => {
    setActiveTab(tab);
    setError("");
    setEmail("");
    setFullName("");
    setPassword("");
    setConfirmPassword("");
    setAcceptTerms(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <div className="lp-root">
      <Header />

      <main className="lp-main">
        {/* ── LEFT PANEL ── */}
        <aside className="lp-panel-left">
          <div className="lp-panel-bg">
            <img src={LoginImage} alt="" className="lp-bg-img" />
            <div className="lp-bg-overlay" />
          </div>

          <div className="lp-panel-content">
            <div className="lp-wordmark">
              <span className="lp-wordmark-icon">⚡</span>
              <span className="lp-wordmark-text">Srinu tech Guru</span>
            </div>

            <div className="lp-hero-text">
              <p className="lp-eyebrow">Online Learning Platform</p>
              <h1 className="lp-headline">
                Advance your<br />career with<br />
                <em>expert-led</em><br />courses.
              </h1>
              <p className="lp-body">
                Join thousands of professionals who trust Srinu tech Guru to sharpen their skills and reach the next level.
              </p>
            </div>

            <div className="lp-stats">
              <div className="lp-stat">
                <span className="lp-stat-num">50K+</span>
                <span className="lp-stat-lbl">Active Students</span>
              </div>
              <div className="lp-stat-rule" />
              <div className="lp-stat">
                <span className="lp-stat-num">1,000+</span>
                <span className="lp-stat-lbl">Online Courses</span>
              </div>
              <div className="lp-stat-rule" />
              <div className="lp-stat">
                <span className="lp-stat-num">4.8★</span>
                <span className="lp-stat-lbl">Avg. Rating</span>
              </div>
            </div>

            {/* Decorative geometric accent */}
            <div className="lp-geo lp-geo--circle" />
            <div className="lp-geo lp-geo--ring" />
          </div>
        </aside>

        {/* ── RIGHT PANEL ── */}
        <section className="lp-panel-right">
          <div className="lp-form-container">

            {/* Header */}
            <div className="lp-form-header">
              <h2 className="lp-form-title">
                {activeTab === "login" ? "Welcome" : "Get started"}
              </h2>
              <p className="lp-form-subtitle">
                {activeTab === "login"
                  ? "Sign in to continue your learning journey."
                  : "Create your account and start learning today."}
              </p>
            </div>

            {/* Tab Toggle */}
            <div className="lp-tabs" role="tablist">
              <button
                role="tab"
                aria-selected={activeTab === "login"}
                className={`lp-tab ${activeTab === "login" ? "lp-tab--active" : ""}`}
                onClick={() => switchTab("login")}
              >
                Sign In
              </button>
              <button
                role="tab"
                aria-selected={activeTab === "signup"}
                className={`lp-tab ${activeTab === "signup" ? "lp-tab--active" : ""}`}
                onClick={() => switchTab("signup")}
              >
                Register
              </button>
              <div className={`lp-tab-indicator ${activeTab === "signup" ? "lp-tab-indicator--right" : ""}`} />
            </div>

            {/* Error */}
            {error && (
              <div className="lp-error" role="alert">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7.5" stroke="currentColor" />
                  <path d="M8 4.5v4M8 10.5v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                {error}
              </div>
            )}

            {/* ── LOGIN FORM ── */}
            {activeTab === "login" ? (
              <form className="lp-form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                <div className="lp-field">
                  <label className="lp-label">Email address</label>
                  <div className="lp-input-wrap">
                    <HiMail className="lp-input-icon" size={18} />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="lp-input"
                      disabled={loading}
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="lp-field">
                  <div className="lp-label-row">
                    <label className="lp-label">Password</label>
                    <a href="#" className="lp-forgot">Forgot password?</a>
                  </div>
                  <div className="lp-input-wrap">
                    <HiLockClosed className="lp-input-icon" size={18} />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="lp-input"
                      disabled={loading}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="lp-eye"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <HiEyeOff size={18} /> : <HiEye size={18} />}
                    </button>
                  </div>
                </div>

                <button type="submit" disabled={loading} className="lp-btn-primary">
                  {loading ? <><span className="lp-spinner" /> Signing in…</> : "Sign In"}
                </button>

                <p className="lp-switch-hint">
                  Don't have an account?{" "}
                  <button type="button" className="lp-switch-link" onClick={() => switchTab("signup")}>
                    Create one
                  </button>
                </p>
              </form>
            ) : (
              /* ── SIGNUP FORM ── */
              <form className="lp-form" onSubmit={(e) => { e.preventDefault(); handleSignup(); }}>
                <div className="lp-field">
                  <label className="lp-label">Full name</label>
                  <div className="lp-input-wrap">
                    <HiUser className="lp-input-icon" size={18} />
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="lp-input"
                      disabled={loading}
                      autoComplete="name"
                    />
                  </div>
                </div>

                <div className="lp-field">
                  <label className="lp-label">Email address</label>
                  <div className="lp-input-wrap">
                    <HiMail className="lp-input-icon" size={18} />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="lp-input"
                      disabled={loading}
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="lp-field-row">
                  <div className="lp-field">
                    <label className="lp-label">Password</label>
                    <div className="lp-input-wrap">
                      <HiLockClosed className="lp-input-icon" size={18} />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Create password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="lp-input"
                        disabled={loading}
                        autoComplete="new-password"
                      />
                      <button type="button" className="lp-eye" onClick={() => setShowPassword(!showPassword)} tabIndex={-1}>
                        {showPassword ? <HiEyeOff size={18} /> : <HiEye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className="lp-field">
                    <label className="lp-label">Confirm password</label>
                    <div className="lp-input-wrap">
                      <HiLockClosed className="lp-input-icon" size={18} />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Repeat password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="lp-input"
                        disabled={loading}
                        autoComplete="new-password"
                      />
                      <button type="button" className="lp-eye" onClick={() => setShowConfirmPassword(!showConfirmPassword)} tabIndex={-1}>
                        {showConfirmPassword ? <HiEyeOff size={18} /> : <HiEye size={18} />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Password strength hint */}
                {password.length > 0 && (
                  <div className="lp-strength">
                    <div className={`lp-strength-bar ${password.length >= 10 ? "lp-strength--strong" : password.length >= 6 ? "lp-strength--medium" : "lp-strength--weak"}`} />
                    <span className="lp-strength-label">
                      {password.length >= 10 ? "Strong" : password.length >= 6 ? "Fair" : "Too short"}
                    </span>
                  </div>
                )}

                <div className="lp-terms">
                  <label className="lp-checkbox-label">
                    <input
                      type="checkbox"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="lp-checkbox"
                      disabled={loading}
                    />
                    <span className="lp-checkbox-custom" aria-hidden="true">
                      {acceptTerms && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    <span className="lp-terms-text">
                      I agree to the <a href="#" className="lp-terms-link">Terms of Service</a> and{" "}
                      <a href="#" className="lp-terms-link">Privacy Policy</a>
                    </span>
                  </label>
                </div>

                <button type="submit" disabled={loading} className="lp-btn-primary">
                  {loading ? <><span className="lp-spinner" /> Creating account…</> : "Create Account"}
                </button>

                <p className="lp-switch-hint">
                  Already have an account?{" "}
                  <button type="button" className="lp-switch-link" onClick={() => switchTab("login")}>
                    Sign in
                  </button>
                </p>
              </form>
            )}

            {/* Footer note */}
            <p className="lp-footer-note">
              Protected by enterprise-grade encryption. Your data is safe with us.
            </p>
          </div>
        </section>
      </main>

      <style>{`
        /* ════════════════════════════════════════════
           DESIGN TOKENS
        ════════════════════════════════════════════ */
        :root {
          --ink:        #0e0f13;
          --ink-soft:   #4a4d5a;
          --ink-muted:  #8b8fa8;
          --surface:    #ffffff;
          --surface-2:  #f7f7fb;
          --surface-3:  #ededf5;
          --border:     #e2e2ee;
          --border-focus: #2e5be8;
          --accent:     #2e5be8;
          --accent-dark: #1d3fbd;
          --accent-light: #eef2fd;
          --gold:       #c9a84c;
          --gold-light: #fdf6e3;
          --error:      #c0392b;
          --error-bg:   #fef4f3;
          --success:    #1e7e5a;
          --radius-sm:  6px;
          --radius-md:  10px;
          --radius-lg:  16px;
          --radius-xl:  24px;
          --shadow-sm:  0 1px 3px rgba(14,15,19,.06), 0 1px 2px rgba(14,15,19,.04);
          --shadow-md:  0 4px 16px rgba(14,15,19,.10), 0 1px 4px rgba(14,15,19,.06);
          --shadow-lg:  0 20px 48px rgba(14,15,19,.18), 0 4px 16px rgba(14,15,19,.08);
          --font-display: 'Playfair Display', Georgia, serif;
          --font-body:    'DM Sans', 'Helvetica Neue', sans-serif;
          --transition:   0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        html, body, #root {
          margin: 0;
          padding: 0;
        }

        /* ════════════════════════════════════════════
           LAYOUT ROOT
        ════════════════════════════════════════════ */
        .lp-root {
          min-height: 100vh;
          background: var(--ink);
          font-family: var(--font-body);
          -webkit-font-smoothing: antialiased;
        }

        .lp-main {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: calc(100vh - 64px); /* adjust to header height */
        }

        /* ════════════════════════════════════════════
           LEFT PANEL
        ════════════════════════════════════════════ */
        .lp-panel-left {
          position: relative;
          overflow: hidden;
          background: var(--ink);
        }

        .lp-panel-bg {
          position: absolute;
          inset: 0;
        }

        .lp-bg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.18;
          filter: grayscale(40%) contrast(1.1);
        }

        .lp-bg-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(145deg, rgba(14,15,19,0.82) 0%, rgba(14,15,19,0.55) 60%, rgba(46,91,232,0.25) 100%);
        }

        /* Decorative geometric shapes */
        .lp-geo {
          position: absolute;
          pointer-events: none;
        }

        .lp-geo--circle {
          width: 380px;
          height: 380px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(46,91,232,0.14) 0%, transparent 70%);
          bottom: -80px;
          right: -80px;
        }

        .lp-geo--ring {
          width: 220px;
          height: 220px;
          border-radius: 50%;
          border: 1px solid rgba(201,168,76,0.2);
          top: 80px;
          right: 40px;
          animation: lp-spin 40s linear infinite;
        }

        @keyframes lp-spin {
          to { transform: rotate(360deg); }
        }

        .lp-panel-content {
          position: relative;
          z-index: 1;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 52px 56px;
        }

        /* Wordmark */
        .lp-wordmark {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .lp-wordmark-icon {
          font-size: 20px;
          filter: drop-shadow(0 0 8px rgba(201,168,76,0.6));
        }

        .lp-wordmark-text {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.01em;
        }

        /* Hero text */
        .lp-hero-text {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 60px 0 40px;
        }

        .lp-eyebrow {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 20px;
        }

        .lp-headline {
          font-family: var(--font-display);
          font-size: clamp(36px, 3.8vw, 54px);
          font-weight: 800;
          line-height: 1.12;
          color: #ffffff;
          margin: 0 0 28px;
        }

        .lp-headline em {
          font-style: italic;
          color: var(--gold);
        }

        .lp-body {
          font-size: 15px;
          line-height: 1.7;
          color: rgba(255,255,255,0.62);
          max-width: 360px;
          font-weight: 300;
        }

        /* Stats */
        .lp-stats {
          display: flex;
          align-items: center;
          gap: 32px;
          padding-top: 8px;
        }

        .lp-stat {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .lp-stat-num {
          font-size: 22px;
          font-weight: 700;
          color: #ffffff;
          font-family: var(--font-display);
          letter-spacing: -0.02em;
        }

        .lp-stat-lbl {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.44);
        }

        .lp-stat-rule {
          width: 1px;
          height: 36px;
          background: rgba(255,255,255,0.14);
        }

        /* ════════════════════════════════════════════
           RIGHT PANEL
        ════════════════════════════════════════════ */
        .lp-panel-right {
          background: var(--surface);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 56px 40px;
          overflow-y: auto;
        }

        .lp-form-container {
          width: 100%;
          max-width: 440px;
          animation: lp-fade-up 0.5s ease both;
        }

        @keyframes lp-fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Form header */
        .lp-form-header {
          margin-bottom: 36px;
        }

        .lp-form-title {
          font-family: var(--font-display);
          font-size: clamp(28px, 3vw, 36px);
          font-weight: 800;
          color: var(--ink);
          margin: 0 0 8px;
          line-height: 1.1;
        }

        .lp-form-subtitle {
          font-size: 14.5px;
          color: var(--ink-muted);
          font-weight: 400;
          margin: 0;
          line-height: 1.5;
        }

        /* ── TABS ── */
        .lp-tabs {
          position: relative;
          display: flex;
          background: var(--surface-2);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 4px;
          margin-bottom: 32px;
          overflow: hidden;
        }

        .lp-tab-indicator {
          position: absolute;
          top: 4px;
          left: 4px;
          width: calc(50% - 4px);
          bottom: 4px;
          background: var(--surface);
          border-radius: 7px;
          box-shadow: var(--shadow-sm);
          transition: transform var(--transition);
          border: 1px solid var(--border);
        }

        .lp-tab-indicator--right {
          transform: translateX(calc(100% + 0px));
        }

        .lp-tab {
          position: relative;
          z-index: 1;
          flex: 1;
          padding: 10px 0;
          border: none;
          background: transparent;
          font-family: var(--font-body);
          font-size: 13.5px;
          font-weight: 600;
          cursor: pointer;
          border-radius: 7px;
          transition: color var(--transition);
          color: var(--ink-muted);
          letter-spacing: 0.01em;
        }

        .lp-tab--active {
          color: var(--ink);
        }

        /* ── ERROR ── */
        .lp-error {
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--error-bg);
          border: 1px solid rgba(192,57,43,0.2);
          color: var(--error);
          padding: 12px 14px;
          border-radius: var(--radius-md);
          font-size: 13.5px;
          font-weight: 500;
          margin-bottom: 20px;
          animation: lp-shake 0.3s ease;
        }

        @keyframes lp-shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-4px); }
          60%       { transform: translateX(4px); }
        }

        /* ── FORM LAYOUT ── */
        .lp-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .lp-field-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .lp-field {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .lp-label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .lp-label {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink);
          letter-spacing: 0.01em;
        }

        .lp-forgot {
          font-size: 12.5px;
          color: var(--accent);
          text-decoration: none;
          font-weight: 500;
          transition: color var(--transition);
        }

        .lp-forgot:hover { color: var(--accent-dark); }

        /* ── INPUT ── */
        .lp-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .lp-input-icon {
          position: absolute;
          left: 14px;
          color: var(--ink-muted);
          pointer-events: none;
          flex-shrink: 0;
        }

        .lp-input {
          width: 100%;
          padding: 11px 14px 11px 42px;
          background: var(--surface);
          border: 1.5px solid var(--border);
          border-radius: var(--radius-md);
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 400;
          color: var(--ink);
          outline: none;
          transition:
            border-color var(--transition),
            box-shadow var(--transition),
            background var(--transition);
          -webkit-appearance: none;
        }

        .lp-input::placeholder {
          color: var(--ink-muted);
          font-weight: 400;
        }

        .lp-input:focus {
          border-color: var(--border-focus);
          box-shadow: 0 0 0 3.5px rgba(46,91,232,0.10);
          background: var(--surface);
        }

        .lp-input:disabled {
          background: var(--surface-2);
          cursor: not-allowed;
          color: var(--ink-muted);
        }

        .lp-eye {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--ink-muted);
          display: flex;
          align-items: center;
          padding: 4px;
          border-radius: 4px;
          transition: color var(--transition), background var(--transition);
        }

        .lp-eye:hover {
          color: var(--ink);
          background: var(--surface-3);
        }

        /* ── PASSWORD STRENGTH ── */
        .lp-strength {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: -6px;
        }

        .lp-strength-bar {
          height: 3px;
          flex: 1;
          border-radius: 99px;
          background: var(--surface-3);
          position: relative;
          overflow: hidden;
        }

        .lp-strength-bar::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 99px;
          transition: width 0.4s ease, background 0.4s ease;
        }

        .lp-strength--weak::after   { width: 28%; background: #e74c3c; }
        .lp-strength--medium::after { width: 62%; background: #f39c12; }
        .lp-strength--strong::after { width: 100%; background: var(--success); }

        .lp-strength-label {
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.04em;
          min-width: 44px;
          color: var(--ink-muted);
        }

        /* ── TERMS ── */
        .lp-terms { margin-top: -4px; }

        .lp-checkbox-label {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          cursor: pointer;
          user-select: none;
        }

        .lp-checkbox {
          position: absolute;
          opacity: 0;
          pointer-events: none;
          width: 0; height: 0;
        }

        .lp-checkbox-custom {
          flex-shrink: 0;
          width: 17px;
          height: 17px;
          border-radius: 5px;
          border: 1.5px solid var(--border);
          background: var(--surface);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 1px;
          transition: border-color var(--transition), background var(--transition);
        }

        .lp-checkbox:checked + .lp-checkbox-custom {
          background: var(--accent);
          border-color: var(--accent);
        }

        .lp-terms-text {
          font-size: 13px;
          color: var(--ink-muted);
          line-height: 1.55;
        }

        .lp-terms-link {
          color: var(--accent);
          text-decoration: none;
          font-weight: 500;
          transition: color var(--transition);
        }

        .lp-terms-link:hover { color: var(--accent-dark); text-decoration: underline; }

        /* ── PRIMARY BUTTON ── */
        .lp-btn-primary {
          width: 100%;
          padding: 13px 20px;
          background: var(--ink);
          color: #ffffff;
          border: none;
          border-radius: var(--radius-md);
          font-family: var(--font-body);
          font-size: 14.5px;
          font-weight: 600;
          letter-spacing: 0.02em;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 4px;
          position: relative;
          overflow: hidden;
          transition: background var(--transition), transform var(--transition), box-shadow var(--transition);
          box-shadow: 0 1px 3px rgba(14,15,19,0.20), 0 4px 12px rgba(14,15,19,0.12);
        }

        .lp-btn-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent, rgba(255,255,255,0.06));
          pointer-events: none;
        }

        .lp-btn-primary:hover:not(:disabled) {
          background: #1a1c24;
          transform: translateY(-1px);
          box-shadow: 0 3px 8px rgba(14,15,19,0.22), 0 8px 24px rgba(14,15,19,0.16);
        }

        .lp-btn-primary:active:not(:disabled) {
          transform: translateY(0);
        }

        .lp-btn-primary:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }

        /* ── SPINNER ── */
        .lp-spinner {
          display: inline-block;
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: lp-rotate 0.75s linear infinite;
        }

        @keyframes lp-rotate { to { transform: rotate(360deg); } }

        /* ── SWITCH HINT ── */
        .lp-switch-hint {
          text-align: center;
          font-size: 13px;
          color: var(--ink-muted);
          margin: 0;
        }

        .lp-switch-link {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          color: var(--accent);
          font-size: inherit;
          font-weight: 600;
          font-family: inherit;
          transition: color var(--transition);
        }

        .lp-switch-link:hover { color: var(--accent-dark); }

        /* ── FOOTER NOTE ── */
        .lp-footer-note {
          margin-top: 28px;
          text-align: center;
          font-size: 11.5px;
          color: var(--ink-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          opacity: 0.7;
        }

        .lp-footer-note::before {
          content: '🔒';
          font-size: 11px;
        }

        /* ════════════════════════════════════════════
           RESPONSIVE
        ════════════════════════════════════════════ */
        @media (max-width: 960px) {
          .lp-main {
            grid-template-columns: 1fr;
          }

          .lp-panel-left {
            min-height: 340px;
          }

          .lp-panel-content {
            padding: 36px 36px;
          }

          .lp-hero-text {
            padding: 32px 0 24px;
          }
        }

        @media (max-width: 600px) {
          .lp-panel-left {
            min-height: 260px;
          }

          .lp-panel-content {
            padding: 28px 24px;
          }

          .lp-panel-right {
            padding: 36px 20px;
          }

          .lp-form-container {
            max-width: 100%;
          }

          .lp-field-row {
            grid-template-columns: 1fr;
          }

          .lp-stats {
            gap: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
