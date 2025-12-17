import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import LoginImage from "../assets/loginimage.png";
import { HiMail, HiLockClosed, HiUser, HiEye, HiEyeOff } from "react-icons/hi";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/Auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error(await response.text());

      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    if (!email || !password || !fullName) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/Auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, fullName }),
      });

      if (!response.ok) throw new Error(await response.text());

      setError("");
      setActiveTab("login");
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        alert("Registration successful! Please login.");
      }, 100);
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      activeTab === "login" ? handleLogin() : handleSignup();
    }
  };

  return (
    <div style={styles.page}>
      <Header />

      <div style={styles.container}>
        <div style={styles.card}>
          {/* Left Side - Image & Overlay */}
          <div style={styles.left}>
            <img
              src={LoginImage}
              alt="Learning workspace"
              style={styles.image}
            />
            <div style={styles.overlay}>
              <div style={styles.overlayContent}>
                <h1 style={styles.overlayTitle}>
                  Welcome to Lumina Learning
                </h1>
                <p style={styles.overlayText}>
                  Join thousands of learners advancing their skills with expert-led courses
                </p>
                <div style={styles.statsContainer}>
                  <div style={styles.statItem}>
                    <div style={styles.statNumber}>50K+</div>
                    <div style={styles.statLabel}>Active Students</div>
                  </div>
                  <div style={styles.statDivider}></div>
                  <div style={styles.statItem}>
                    <div style={styles.statNumber}>1000+</div>
                    <div style={styles.statLabel}>Online Courses</div>
                  </div>
                  <div style={styles.statDivider}></div>
                  <div style={styles.statItem}>
                    <div style={styles.statNumber}>4.8★</div>
                    <div style={styles.statLabel}>Average Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div style={styles.right}>
            <div style={styles.formContent}>
              {/* Logo/Icon */}
              <div style={styles.formHeader}>
                <div style={styles.logoIcon}>⚡</div>
                <h2 style={styles.title}>
                  {activeTab === "login"
                    ? "Welcome Back!"
                    : "Create Account"}
                </h2>
                <p style={styles.subtitle}>
                  {activeTab === "login"
                    ? "Sign in to continue your learning journey"
                    : "Join our community of learners today"}
                </p>
              </div>

              {/* Tab Buttons */}
              <div style={styles.tabContainer}>
                <button
                  onClick={() => {
                    setActiveTab("login");
                    setError("");
                  }}
                  style={{
                    ...styles.tabButton,
                    ...(activeTab === "login" ? styles.tabButtonActive : styles.tabButtonInactive),
                  }}
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setActiveTab("signup");
                    setError("");
                  }}
                  style={{
                    ...styles.tabButton,
                    ...(activeTab === "signup" ? styles.tabButtonActive : styles.tabButtonInactive),
                  }}
                >
                  Sign Up
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div style={styles.errorBox}>
                  <span style={styles.errorIcon}>⚠️</span>
                  {error}
                </div>
              )}

              {/* Login Form */}
              {activeTab === "login" ? (
                <div style={styles.formFields}>
                  {/* Email Input */}
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Email Address</label>
                    <div style={styles.inputWrapper}>
                      <HiMail style={styles.inputIcon} size={20} />
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyPress={handleKeyPress}
                        style={styles.input}
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Password</label>
                    <div style={styles.inputWrapper}>
                      <HiLockClosed style={styles.inputIcon} size={20} />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={handleKeyPress}
                        style={styles.input}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={styles.eyeButton}
                      >
                        {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                      </button>
                    </div>
                  </div>

                  {/* Forgot Password */}
                  <div style={styles.forgotPassword}>
                    <a href="#" style={styles.forgotLink}>
                      Forgot your password?
                    </a>
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleLogin}
                    disabled={loading}
                    style={{
                      ...styles.submitButton,
                      ...(loading ? styles.submitButtonDisabled : {}),
                    }}
                  >
                    {loading ? (
                      <>
                        <span style={styles.spinner}></span>
                        Logging in...
                      </>
                    ) : (
                      "Login"
                    )}
                  </button>

                  {/* Divider */}
                  <div style={styles.divider}>
                    <div style={styles.dividerLine}></div>
                    <span style={styles.dividerText}>or continue with</span>
                    <div style={styles.dividerLine}></div>
                  </div>

                  {/* Social Login */}
                  <div style={styles.socialButtons}>
                    <button style={styles.socialButton}>
                      <svg width="20" height="20" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span>Google</span>
                    </button>
                    <button style={styles.socialButton}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span>Facebook</span>
                    </button>
                  </div>
                </div>
              ) : (
                // Signup Form
                <div style={styles.formFields}>
                  {/* Full Name Input */}
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Full Name</label>
                    <div style={styles.inputWrapper}>
                      <HiUser style={styles.inputIcon} size={20} />
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        onKeyPress={handleKeyPress}
                        style={styles.input}
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Email Address</label>
                    <div style={styles.inputWrapper}>
                      <HiMail style={styles.inputIcon} size={20} />
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyPress={handleKeyPress}
                        style={styles.input}
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Password</label>
                    <div style={styles.inputWrapper}>
                      <HiLockClosed style={styles.inputIcon} size={20} />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={handleKeyPress}
                        style={styles.input}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={styles.eyeButton}
                      >
                        {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password Input */}
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Confirm Password</label>
                    <div style={styles.inputWrapper}>
                      <HiLockClosed style={styles.inputIcon} size={20} />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onKeyPress={handleKeyPress}
                        style={styles.input}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        style={styles.eyeButton}
                      >
                        {showConfirmPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                      </button>
                    </div>
                  </div>

                  {/* Terms & Conditions */}
                  <div style={styles.termsContainer}>
                    <label style={styles.checkboxLabel}>
                      <input type="checkbox" style={styles.checkbox} defaultChecked />
                      <span style={styles.termsText}>
                        I agree to the{" "}
                        <a href="#" style={styles.termsLink}>Terms of Service</a>
                        {" "}and{" "}
                        <a href="#" style={styles.termsLink}>Privacy Policy</a>
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSignup}
                    disabled={loading}
                    style={{
                      ...styles.submitButton,
                      ...(loading ? styles.submitButtonDisabled : {}),
                    }}
                  >
                    {loading ? (
                      <>
                        <span style={styles.spinner}></span>
                        Creating account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </button>

                  {/* Divider */}
                  <div style={styles.divider}>
                    <div style={styles.dividerLine}></div>
                    <span style={styles.dividerText}>or sign up with</span>
                    <div style={styles.dividerLine}></div>
                  </div>

                  {/* Social Signup */}
                  <div style={styles.socialButtons}>
                    <button style={styles.socialButton}>
                      <svg width="20" height="20" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span>Google</span>
                    </button>
                    <button style={styles.socialButton}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span>Facebook</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    width: "100%",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  container: {
    maxWidth: 1400,
    margin: "0 auto",
    padding: "60px 20px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 32,
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "row" as const,
    minHeight: 700,
  },
  left: {
    flex: 1,
    position: "relative" as const,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    display: "block",
  },
  overlay: {
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(135deg, rgba(102, 126, 234, 0.95), rgba(118, 75, 162, 0.95))",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px",
  },
  overlayContent: {
    textAlign: "center" as const,
    color: "white",
  },
  overlayTitle: {
    fontSize: "48px",
    fontWeight: "800",
    marginBottom: "16px",
    lineHeight: 1.2,
  },
  overlayText: {
    fontSize: "18px",
    marginBottom: "48px",
    opacity: 0.95,
    lineHeight: 1.6,
  },
  statsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "40px",
    alignItems: "center",
  },
  statItem: {
    textAlign: "center" as const,
  },
  statNumber: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  statLabel: {
    fontSize: "14px",
    opacity: 0.9,
  },
  statDivider: {
    width: "1px",
    height: "60px",
    background: "rgba(255, 255, 255, 0.3)",
  },
  right: {
    flex: 1,
    padding: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#fafafa",
  },
  formContent: {
    width: "100%",
    maxWidth: 460,
  },
  formHeader: {
    textAlign: "center" as const,
    marginBottom: "40px",
  },
  logoIcon: {
    width: "64px",
    height: "64px",
    margin: "0 auto 20px",
    borderRadius: "16px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "32px",
  },
  title: {
    fontSize: "32px",
    fontWeight: "800",
    marginBottom: "8px",
    color: "#1f2937",
  },
  subtitle: {
    fontSize: "15px",
    color: "#6b7280",
    lineHeight: 1.5,
  },
  tabContainer: {
    display: "flex",
    gap: "12px",
    marginBottom: "32px",
    background: "#f3f4f6",
    padding: "6px",
    borderRadius: "14px",
  },
  tabButton: {
    flex: 1,
    padding: "12px 24px",
    borderRadius: "10px",
    fontWeight: "600",
    fontSize: "15px",
    cursor: "pointer",
    border: "none",
    transition: "all 0.3s ease",
  },
  tabButtonActive: {
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "#fff",
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
  },
  tabButtonInactive: {
    backgroundColor: "transparent",
    color: "#6b7280",
  },
  errorBox: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    backgroundColor: "#fef2f2",
    padding: "14px 16px",
    borderRadius: "12px",
    color: "#dc2626",
    marginBottom: "20px",
    fontSize: "14px",
    border: "1px solid #fee2e2",
  },
  errorIcon: {
    fontSize: "18px",
  },
  formFields: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "8px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
  },
  inputWrapper: {
    position: "relative" as const,
    display: "flex",
    alignItems: "center",
  },
  inputIcon: {
    position: "absolute" as const,
    left: "16px",
    color: "#9ca3af",
    pointerEvents: "none" as const,
  },
  input: {
    width: "100%",
    padding: "14px 16px 14px 48px",
    border: "2px solid #e5e7eb",
    borderRadius: "12px",
    fontSize: "15px",
    outline: "none",
    transition: "all 0.2s",
    fontFamily: "inherit",
  },
  eyeButton: {
    position: "absolute" as const,
    right: "16px",
    background: "none",
    border: "none",
    color: "#9ca3af",
    cursor: "pointer",
    padding: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  forgotPassword: {
    textAlign: "right" as const,
    marginTop: "-8px",
  },
  forgotLink: {
    fontSize: "14px",
    color: "#667eea",
    textDecoration: "none",
    fontWeight: "600",
  },
  submitButton: {
    width: "100%",
    padding: "16px 24px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "#fff",
    borderRadius: "12px",
    border: "none",
    fontWeight: "700",
    fontSize: "16px",
    cursor: "pointer",
    transition: "all 0.3s",
    boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  submitButtonDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
  },
  spinner: {
    width: "16px",
    height: "16px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTop: "2px solid white",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
    display: "inline-block",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    margin: "24px 0",
  },
  dividerLine: {
    flex: 1,
    height: "1px",
    background: "#e5e7eb",
  },
  dividerText: {
    color: "#9ca3af",
    fontSize: "14px",
    whiteSpace: "nowrap" as const,
  },
  socialButtons: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },
  socialButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "12px",
    border: "2px solid #e5e7eb",
    borderRadius: "12px",
    background: "white",
    fontSize: "15px",
    fontWeight: "600",
    color: "#374151",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  termsContainer: {
    marginTop: "-8px",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    cursor: "pointer",
  },
  checkbox: {
    marginTop: "3px",
    cursor: "pointer",
    width: "16px",
    height: "16px",
  },
  termsText: {
    fontSize: "14px",
    color: "#6b7280",
    lineHeight: 1.5,
  },
  termsLink: {
    color: "#667eea",
    textDecoration: "none",
    fontWeight: "600",
  },
};

export default LoginPage;