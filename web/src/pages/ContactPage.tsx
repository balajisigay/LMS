import React, { useState } from "react";
import { submitContact } from "../../../src/api/contactService";
import { 
  HiMail, 
  HiUser, 
  HiPencilAlt, 
  HiChatAlt2,
  HiCheckCircle,
  HiXCircle,
  HiPhone,
  HiLocationMarker,
  HiClock
} from "react-icons/hi";

export const ContactPage: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all required fields");
      setTimeout(() => setError(""), 3000);
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await submitContact(form);
      setSuccess("Thank you! We'll get back to you soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSuccess(""), 5000);
    } catch (err: any) {
      setError(err.message || "Failed to send message. Please try again.");
      setTimeout(() => setError(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentWrapper}>
        {/* Success/Error Notifications */}
        {success && (
          <div style={styles.successAlert}>
            <HiCheckCircle style={styles.alertIcon} />
            {success}
          </div>
        )}
        {error && (
          <div style={styles.errorAlert}>
            <HiXCircle style={styles.alertIcon} />
            {error}
          </div>
        )}

        <div style={styles.gridContainer}>
          {/* Left Side - Contact Form */}
          <div style={styles.formCard}>
            <div style={styles.formHeader}>
              <div style={styles.iconBadge}>
                <HiChatAlt2 size={32} />
              </div>
              <h1 style={styles.title}>Get In Touch</h1>
              <p style={styles.subtitle}>
                Have a question or feedback? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>

            <div style={styles.form}>
              {/* Name Input */}
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <HiUser size={16} />
                  <span>Full Name</span>
                </label>
                <input
                  name="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              {/* Email Input */}
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <HiMail size={16} />
                  <span>Email Address</span>
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={form.email}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              {/* Subject Input */}
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <HiPencilAlt size={16} />
                  <span>Subject (Optional)</span>
                </label>
                <input
                  name="subject"
                  placeholder="How can we help?"
                  value={form.subject}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>

              {/* Message Textarea */}
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  <HiChatAlt2 size={16} />
                  <span>Message</span>
                </label>
                <textarea
                  name="message"
                  placeholder="Tell us what's on your mind..."
                  value={form.message}
                  onChange={handleChange}
                  rows={6}
                  style={styles.textarea}
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  ...styles.submitButton,
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? (
                  <>
                    <div style={styles.spinner}></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <HiMail size={20} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Side - Contact Info Cards */}
          <div style={styles.infoSection}>
            <div style={styles.infoCard}>
              <div style={styles.infoIconWrapper}>
                <div style={{...styles.infoIcon, background: 'linear-gradient(135deg, #667eea, #764ba2)'}}>
                  <HiMail size={24} />
                </div>
              </div>
              <h3 style={styles.infoTitle}>Email Us</h3>
              <p style={styles.infoText}>support@example.com</p>
              <p style={styles.infoSubtext}>We'll respond within 24 hours</p>
            </div>

            <div style={styles.infoCard}>
              <div style={styles.infoIconWrapper}>
                <div style={{...styles.infoIcon, background: 'linear-gradient(135deg, #f093fb, #f5576c)'}}>
                  <HiPhone size={24} />
                </div>
              </div>
              <h3 style={styles.infoTitle}>Call Us</h3>
              <p style={styles.infoText}>+1 (555) 123-4567</p>
              <p style={styles.infoSubtext}>Mon-Fri, 9AM - 6PM EST</p>
            </div>

            <div style={styles.infoCard}>
              <div style={styles.infoIconWrapper}>
                <div style={{...styles.infoIcon, background: 'linear-gradient(135deg, #4facfe, #00f2fe)'}}>
                  <HiLocationMarker size={24} />
                </div>
              </div>
              <h3 style={styles.infoTitle}>Visit Us</h3>
              <p style={styles.infoText}>123 Business Street</p>
              <p style={styles.infoSubtext}>San Francisco, CA 94105</p>
            </div>

            <div style={styles.infoCard}>
              <div style={styles.infoIconWrapper}>
                <div style={{...styles.infoIcon, background: 'linear-gradient(135deg, #43e97b, #38f9d7)'}}>
                  <HiClock size={24} />
                </div>
              </div>
              <h3 style={styles.infoTitle}>Business Hours</h3>
              <p style={styles.infoText}>Monday - Friday</p>
              <p style={styles.infoSubtext}>9:00 AM - 6:00 PM EST</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  pageContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '60px 20px',
  },
  contentWrapper: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  successAlert: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: 'linear-gradient(135deg, #10b981, #059669)',
    color: 'white',
    padding: '16px 24px',
    borderRadius: '16px',
    marginBottom: '24px',
    fontSize: '15px',
    fontWeight: 500,
    boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)',
    animation: 'slideDown 0.3s ease-out',
  },
  errorAlert: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
    color: 'white',
    padding: '16px 24px',
    borderRadius: '16px',
    marginBottom: '24px',
    fontSize: '15px',
    fontWeight: 500,
    boxShadow: '0 10px 30px rgba(239, 68, 68, 0.3)',
    animation: 'slideDown 0.3s ease-out',
  },
  alertIcon: {
    width: '24px',
    height: '24px',
    flexShrink: 0,
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '32px',
    alignItems: 'start',
  },
  formCard: {
    background: 'white',
    borderRadius: '24px',
    padding: '40px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },
  formHeader: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  iconBadge: {
    width: '80px',
    height: '80px',
    margin: '0 auto 20px',
    borderRadius: '20px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: '0 0 12px 0',
  },
  subtitle: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#6b7280',
    margin: 0,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: 600,
    color: '#374151',
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    fontSize: '15px',
    color: '#1f2937',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    outline: 'none',
    transition: 'all 0.2s',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '14px 16px',
    fontSize: '15px',
    lineHeight: '1.6',
    color: '#1f2937',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    outline: 'none',
    resize: 'vertical',
    transition: 'all 0.2s',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  },
  submitButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '16px 32px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
    marginTop: '8px',
  },
  spinner: {
    width: '20px',
    height: '20px',
    border: '3px solid rgba(255,255,255,0.3)',
    borderTop: '3px solid white',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  infoSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  infoCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '28px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  infoIconWrapper: {
    marginBottom: '16px',
  },
  infoIcon: {
    width: '56px',
    height: '56px',
    borderRadius: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
  },
  infoTitle: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#1f2937',
    margin: '0 0 8px 0',
  },
  infoText: {
    fontSize: '15px',
    fontWeight: 600,
    color: '#374151',
    margin: '0 0 4px 0',
  },
  infoSubtext: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0,
  },
};

// Add animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  input:focus, textarea:focus {
    border-color: #667eea !important;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) !important;
  }
  
  button:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 6px 15px rgba(102, 126, 234, 0.4);
  }
  
  button:not(:disabled):active {
    transform: translateY(0);
  }
`;
document.head.appendChild(styleSheet);

export default ContactPage;