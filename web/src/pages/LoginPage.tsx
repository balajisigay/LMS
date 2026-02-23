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

  // Check if user is already logged in
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.userId) {
          navigate("/");
        }
      } catch (e) {
        localStorage.removeItem("user");
      }
    }
  }, [navigate]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    // Validation
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(apiUrl('/Auth/login'), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Login failed");
      }

      const data = await response.json();
      
      if (!data.userId || !data.email) {
        throw new Error("Invalid response from server");
      }

      console.log("✅ Login successful:", {
        userId: data.userId,
        email: data.email,
        fullName: data.fullName,
        role: data.role
      });

      setCurrentUser(data);
      navigate("/");
    } catch (err: any) {
      console.error("❌ Login error:", err);
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    // Validation
    if (!fullName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!acceptTerms) {
      setError("Please accept the Terms of Service and Privacy Policy");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(apiUrl('/Auth/register'), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, fullName }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Registration failed");
      }

      console.log("✅ Registration successful");
      
      // Reset form and switch to login
      setActiveTab("login");
      setPassword("");
      setConfirmPassword("");
      setFullName("");
      setAcceptTerms(false);
      setError("");
      
      setTimeout(() => {
        alert("Registration successful! Please login with your credentials.");
      }, 100);
    } catch (err: any) {
      console.error("❌ Registration error:", err);
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      activeTab === "login" ? handleLogin() : handleSignup();
    }
  };

  const switchTab = (tab: "login" | "signup") => {
    setActiveTab(tab);
    setError("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="login-page">
      <Header />

      <div className="login-container">
        <div className="login-card">
          {/* Left Side - Image & Overlay */}
          <div className="login-visual">
            <img
              src={LoginImage}
              alt="Learning workspace"
              className="login-image"
            />
            <div className="login-overlay">
              <div className="overlay-content">
                <h1 className="overlay-title">
                  Welcome to Lumina Learning
                </h1>
                <p className="overlay-description">
                  Join thousands of learners advancing their skills with expert-led courses
                </p>
                <div className="stats-grid">
                  <div className="stat-item">
                    <div className="stat-number">50K+</div>
                    <div className="stat-label">Active Students</div>
                  </div>
                  <div className="stat-divider"></div>
                  <div className="stat-item">
                    <div className="stat-number">1000+</div>
                    <div className="stat-label">Online Courses</div>
                  </div>
                  <div className="stat-divider"></div>
                  <div className="stat-item">
                    <div className="stat-number">4.8★</div>
                    <div className="stat-label">Average Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="login-form-section">
            <div className="form-wrapper">
              {/* Form Header */}
              <div className="form-header">
                <div className="brand-icon">⚡</div>
                <h2 className="form-title">
                  {activeTab === "login" ? "Welcome Back!" : "Create Account"}
                </h2>
                <p className="form-subtitle">
                  {activeTab === "login"
                    ? "Sign in to continue your learning journey"
                    : "Join our community of learners today"}
                </p>
              </div>

              {/* Tab Switcher */}
              <div className="tab-switcher">
                <button
                  onClick={() => switchTab("login")}
                  className={`tab-button ${activeTab === "login" ? "active" : ""}`}
                >
                  Login
                </button>
                <button
                  onClick={() => switchTab("signup")}
                  className={`tab-button ${activeTab === "signup" ? "active" : ""}`}
                >
                  Sign Up
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="error-message">
                  <span className="error-icon">⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              {/* Login Form */}
              {activeTab === "login" ? (
                <form className="auth-form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                  {/* Email Input */}
                  <div className="input-group">
                    <label className="input-label">Email Address</label>
                    <div className="input-wrapper">
                      <HiMail className="input-icon" size={20} />
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="form-input"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="input-group">
                    <label className="input-label">Password</label>
                    <div className="input-wrapper">
                      <HiLockClosed className="input-icon" size={20} />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="form-input"
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="toggle-password"
                        tabIndex={-1}
                      >
                        {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                      </button>
                    </div>
                  </div>

                  {/* Forgot Password */}
                  <div className="forgot-password">
                    <a href="#" className="forgot-link">
                      Forgot your password?
                    </a>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className={`submit-button ${loading ? "loading" : ""}`}
                  >
                    {loading ? (
                      <>
                        <span className="spinner"></span>
                        Logging in...
                      </>
                    ) : (
                      "Login"
                    )}
                  </button>
                </form>
              ) : (
                // Signup Form
                <form className="auth-form" onSubmit={(e) => { e.preventDefault(); handleSignup(); }}>
                  {/* Full Name Input */}
                  <div className="input-group">
                    <label className="input-label">Full Name</label>
                    <div className="input-wrapper">
                      <HiUser className="input-icon" size={20} />
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="form-input"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="input-group">
                    <label className="input-label">Email Address</label>
                    <div className="input-wrapper">
                      <HiMail className="input-icon" size={20} />
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="form-input"
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="input-group">
                    <label className="input-label">Password</label>
                    <div className="input-wrapper">
                      <HiLockClosed className="input-icon" size={20} />
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="form-input"
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="toggle-password"
                        tabIndex={-1}
                      >
                        {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password Input */}
                  <div className="input-group">
                    <label className="input-label">Confirm Password</label>
                    <div className="input-wrapper">
                      <HiLockClosed className="input-icon" size={20} />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="form-input"
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="toggle-password"
                        tabIndex={-1}
                      >
                        {showConfirmPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                      </button>
                    </div>
                  </div>

                  {/* Terms & Conditions */}
                  <div className="terms-container">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                        className="checkbox-input"
                        disabled={loading}
                      />
                      <span className="checkbox-text">
                        I agree to the{" "}
                        <a href="#" className="terms-link">Terms of Service</a>
                        {" "}and{" "}
                        <a href="#" className="terms-link">Privacy Policy</a>
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className={`submit-button ${loading ? "loading" : ""}`}
                  >
                    {loading ? (
                      <>
                        <span className="spinner"></span>
                        Creating account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Reset and Base Styles */
        * {
          box-sizing: border-box;
        }

        .login-page {
          width: 100%;
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          position: relative;
        }

        .login-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 60px 20px;
        }

        /* Main Card */
        .login-card {
          background-color: #ffffff;
          border-radius: 32px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
          overflow: hidden;
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 700px;
        }

        /* Left Visual Section */
        .login-visual {
          position: relative;
          overflow: hidden;
        }

        .login-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .login-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.95), rgba(118, 75, 162, 0.95));
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 60px 40px;
        }

        .overlay-content {
          text-align: center;
          color: white;
          max-width: 500px;
        }

        .overlay-title {
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 800;
          margin-bottom: 16px;
          line-height: 1.2;
        }

        .overlay-description {
          font-size: clamp(16px, 1.5vw, 18px);
          margin-bottom: 48px;
          opacity: 0.95;
          line-height: 1.6;
        }

        .stats-grid {
          display: flex;
          justify-content: center;
          gap: 40px;
          align-items: center;
          flex-wrap: wrap;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-size: clamp(24px, 3vw, 32px);
          font-weight: 700;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 14px;
          opacity: 0.9;
        }

        .stat-divider {
          width: 1px;
          height: 60px;
          background: rgba(255, 255, 255, 0.3);
        }

        /* Right Form Section */
        .login-form-section {
          padding: 60px 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fafafa;
        }

        .form-wrapper {
          width: 100%;
          max-width: 460px;
        }

        /* Form Header */
        .form-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .brand-icon {
          width: 64px;
          height: 64px;
          margin: 0 auto 20px;
          border-radius: 16px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
        }

        .form-title {
          font-size: clamp(26px, 3vw, 32px);
          font-weight: 800;
          margin-bottom: 8px;
          color: #1f2937;
        }

        .form-subtitle {
          font-size: 15px;
          color: #6b7280;
          line-height: 1.5;
        }

        /* Tab Switcher */
        .tab-switcher {
          display: flex;
          gap: 12px;
          margin-bottom: 32px;
          background: #e5e7eb;
          padding: 6px;
          border-radius: 14px;
        }

        .tab-button {
          flex: 1;
          padding: 12px 24px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          border: none;
          background: transparent;
          color: #6b7280;
          transition: all 0.3s ease;
        }

        .tab-button.active {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        .tab-button:hover:not(.active) {
          background: rgba(102, 126, 234, 0.1);
        }

        /* Error Message */
        .error-message {
          display: flex;
          align-items: center;
          gap: 12px;
          background-color: #fef2f2;
          padding: 14px 16px;
          border-radius: 12px;
          color: #dc2626;
          margin-bottom: 20px;
          font-size: 14px;
          border: 1px solid #fee2e2;
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .error-icon {
          font-size: 18px;
        }

        /* Form Styles */
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .input-label {
          font-size: 14px;
          font-weight: 600;
          color: #374151;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 16px;
          color: #9ca3af;
          pointer-events: none;
          z-index: 1;
        }

        .form-input {
          width: 100%;
          padding: 14px 16px 14px 48px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 15px;
          outline: none;
          transition: all 0.2s ease;
          font-family: inherit;
          background: #ffffff;
        }

        .form-input:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .form-input:disabled {
          background: #f3f4f6;
          cursor: not-allowed;
        }

        .toggle-password {
          position: absolute;
          right: 16px;
          background: none;
          border: none;
          color: #9ca3af;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s;
        }

        .toggle-password:hover {
          color: #667eea;
        }

        /* Forgot Password */
        .forgot-password {
          text-align: right;
          margin-top: -8px;
        }

        .forgot-link {
          font-size: 14px;
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s;
        }

        .forgot-link:hover {
          color: #764ba2;
        }

        /* Terms Container */
        .terms-container {
          margin-top: -8px;
        }

        .checkbox-label {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          cursor: pointer;
        }

        .checkbox-input {
          margin-top: 3px;
          cursor: pointer;
          width: 16px;
          height: 16px;
          accent-color: #667eea;
        }

        .checkbox-text {
          font-size: 14px;
          color: #6b7280;
          line-height: 1.5;
          user-select: none;
        }

        .terms-link {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s;
        }

        .terms-link:hover {
          color: #764ba2;
        }

        /* Submit Button */
        .submit-button {
          width: 100%;
          padding: 16px 24px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: #ffffff;
          border-radius: 12px;
          border: none;
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 8px;
        }

        .submit-button:hover:not(.loading) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        .submit-button:active:not(.loading) {
          transform: translateY(0);
        }

        .submit-button.loading {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* Spinner Animation */
        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          display: inline-block;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .login-container {
            padding: 40px 20px;
          }
        }

        @media (max-width: 968px) {
          .login-card {
            grid-template-columns: 1fr;
            min-height: auto;
          }

          .login-visual {
            min-height: 400px;
          }

          .login-overlay {
            padding: 40px 30px;
          }

          .stats-grid {
            gap: 24px;
          }

          .stat-divider {
            display: none;
          }

          .login-form-section {
            padding: 40px 30px;
          }
        }

        @media (max-width: 640px) {
          .login-container {
            padding: 20px 16px;
          }

          .login-card {
            border-radius: 24px;
          }

          .login-visual {
            min-height: 300px;
          }

          .login-overlay {
            padding: 30px 20px;
          }

          .overlay-title {
            margin-bottom: 12px;
          }

          .overlay-description {
            margin-bottom: 32px;
          }

          .stats-grid {
            gap: 20px;
          }

          .login-form-section {
            padding: 32px 20px;
          }

          .brand-icon {
            width: 56px;
            height: 56px;
            font-size: 28px;
            margin-bottom: 16px;
          }

          .form-header {
            margin-bottom: 32px;
          }

          .tab-switcher {
            margin-bottom: 24px;
          }

          .form-input {
            padding: 12px 16px 12px 44px;
            font-size: 14px;
          }

          .submit-button {
            padding: 14px 20px;
            font-size: 15px;
          }
        }

        @media (max-width: 480px) {
          .login-visual {
            min-height: 250px;
          }

          .stats-grid {
            flex-direction: column;
            gap: 16px;
          }

          .stat-item {
            padding: 8px 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;


