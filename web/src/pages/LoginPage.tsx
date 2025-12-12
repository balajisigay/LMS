import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import LoginImage from "../assets/loginimage.png";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

      alert("Registration successful! Please login.");
      setActiveTab("login");
      setPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      {/* Your existing Header component */}
      <Header 
        onLoginPress={() => navigate("/login")}
        onJoinPress={() => navigate("/register")}
      />

      {/* Main Content */}
      <div style={styles.container}>
        <div style={styles.card}>
          {/* Left Side - Image */}
          <div style={styles.left}>
  <img
    src={LoginImage}
    alt="Learning workspace"
    style={styles.image}
  />
</div>


          {/* Right Side - Form */}
          <div style={styles.right}>
            <div style={styles.formContent}>
              <h2 style={styles.title}>
                {activeTab === "login"
                  ? "Log in to continue your learning"
                  : "Sign up to start your learning"}
              </h2>

              {/* Tab Buttons */}
              <div style={styles.tabContainer}>
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
              </div>

              {error && <div style={styles.errorBox}>{error}</div>}

              {/* Forms remain the same as in the artifact */}
              {activeTab === "login" ? (
                // Login form
                <div style={styles.formFields}>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                  />
                  <div style={styles.forgotPassword}>
                    <a href="#" style={styles.forgotLink}>Forgot Password?</a>
                  </div>
                  <button
                    onClick={handleLogin}
                    disabled={loading}
                    style={styles.submitButton}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </div>
              ) : (
                // Signup form
                <div style={styles.formFields}>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    style={styles.input}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                  />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={styles.input}
                  />
                  <button
                    onClick={handleSignup}
                    disabled={loading}
                    style={styles.submitButton}
                  >
                    {loading ? "Signing up..." : "Sign Up"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Copy the styles from the artifact
const styles = {
  page: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#f9fafb",
  },
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "60px 20px",
  },
card: {
  backgroundColor: "#fff",
  borderRadius: 24,
  boxShadow: "0 10px 40px rgba(0, 0, 0, 0.08)",
  overflow: "hidden",
  display: "flex",
  flexDirection: "row",
  height: 600,
},

left: {
  flex: 1,
  height: "100%",
  padding: 0,                 // ❗ Removed padding (no gap)
  margin: 0,
},

  image: {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",            // ❗ Removes unwanted tiny gaps
},

 right: {
  flex: 1,
  height: "100%",
  padding: "40px 48px",        // keep padding inside form only
  backgroundColor: "#fafafa",  // ⭐ NEW background color
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
},
  formContent: {
    width: "100%",
    maxWidth: 400,
  },

  title: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 32,
    textAlign: "center",
    color: "#1f2937",
  },

  tabContainer: {
    display: "flex",
    gap: 8,
    marginBottom: 24,
  },

  tabButton: {
    flex: 1,
    padding: "12px 24px",
    borderRadius: 12,
    fontWeight: 600,
    fontSize: 15,
    cursor: "pointer",
    border: "none",
    transition: "all 0.3s ease",
  },

  tabButtonActive: {
    backgroundColor: "#1f2937",
    color: "#fff",
  },

  tabButtonInactive: {
    backgroundColor: "#fff",
    color: "#6b7280",
    border: "1px solid #e5e7eb",
  },

  errorBox: {
    backgroundColor: "#fee2e2",
    padding: 12,
    borderRadius: 10,
    color: "#b91c1c",
    marginBottom: 16,
    fontSize: 14,
  },

  formFields: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },

  input: {
    width: "100%",
    padding: "14px 16px",
    border: "1px solid #e5e7eb",
    borderRadius: 10,
    fontSize: 15,
  },

  forgotPassword: {
    textAlign: "right",
  },

  forgotLink: {
    fontSize: 14,
    color: "#6b7280",
    textDecoration: "none",
  },

  submitButton: {
    width: "100%",
    padding: "14px 24px",
    backgroundColor: "#1f2937",
    color: "#fff",
    borderRadius: 50,
    border: "none",
    fontWeight: 600,
    fontSize: 15,
    cursor: "pointer",
  },
};

export default LoginPage;