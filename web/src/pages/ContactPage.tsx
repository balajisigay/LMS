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
  HiClock,
  HiArrowRight,
} from "react-icons/hi";

export const ContactPage: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all required fields.");
      setTimeout(() => setError(""), 4000);
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await submitContact(form);
      setSuccess("Message sent — we'll get back to you within 24 hours.");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSuccess(""), 6000);
    } catch (err: any) {
      setError(err.message || "Failed to send message. Please try again.");
      setTimeout(() => setError(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  const infoItems = [
    {
      icon: <HiMail size={18} />,
      label: "Email",
      primary: "support@luminalearning.com",
      secondary: "Response within 24 hours",
      color: "var(--ct-accent)",
      bg: "var(--ct-accent-s)",
    },
    {
      icon: <HiPhone size={18} />,
      label: "Phone",
      primary: "+1 (555) 123-4567",
      secondary: "Mon – Fri, 9 AM – 6 PM EST",
      color: "var(--ct-rose)",
      bg: "var(--ct-rose-s)",
    },
    {
      icon: <HiLocationMarker size={18} />,
      label: "Address",
      primary: "123 Business Street",
      secondary: "San Francisco, CA 94105",
      color: "var(--ct-amber)",
      bg: "var(--ct-amber-s)",
    },
    {
      icon: <HiClock size={18} />,
      label: "Hours",
      primary: "Monday – Friday",
      secondary: "9:00 AM – 6:00 PM EST",
      color: "var(--ct-green)",
      bg: "var(--ct-green-s)",
    },
  ];

  return (
    <div className="ct-root">

      {/* ── TOAST ── */}
      {success && (
        <div className="ct-toast ct-toast--success">
          <HiCheckCircle size={15} /> {success}
        </div>
      )}
      {error && (
        <div className="ct-toast ct-toast--error">
          <HiXCircle size={15} /> {error}
        </div>
      )}

      {/* ══════════════════════════════════════
          PAGE HEADER
      ══════════════════════════════════════ */}
      <header className="ct-header">
        <div className="ct-header-grid" />
        <div className="ct-header-inner">
          <p className="ct-eyebrow">Contact Us</p>
          <h1 className="ct-page-title">Get In Touch</h1>
          <p className="ct-page-sub">
            Have a question, feedback, or just want to say hello? We'd love to hear from you.
          </p>
        </div>
        <div className="ct-header-ring ct-ring-1" />
        <div className="ct-header-ring ct-ring-2" />
      </header>

      {/* ══════════════════════════════════════
          MAIN GRID
      ══════════════════════════════════════ */}
      <div className="ct-layout">

        {/* ── LEFT: FORM ── */}
        <div className="ct-form-card">
          <div className="ct-form-card-header">
            <h2 className="ct-form-title">Send a Message</h2>
            <p className="ct-form-sub">Fill in the details below and we'll respond as soon as possible.</p>
          </div>

          <div className="ct-form">
            {/* Name + Email row */}
            <div className="ct-field-row">
              <div className="ct-field">
                <label className="ct-label">
                  <HiUser size={13} /> Full Name <span className="ct-required">*</span>
                </label>
                <div className={`ct-input-wrap${focused === "name" ? " ct-input-wrap--focus" : ""}`}>
                  <input
                    name="name"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    className="ct-input"
                    autoComplete="name"
                  />
                </div>
              </div>

              <div className="ct-field">
                <label className="ct-label">
                  <HiMail size={13} /> Email Address <span className="ct-required">*</span>
                </label>
                <div className={`ct-input-wrap${focused === "email" ? " ct-input-wrap--focus" : ""}`}>
                  <input
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    className="ct-input"
                    autoComplete="email"
                  />
                </div>
              </div>
            </div>

            {/* Subject */}
            <div className="ct-field">
              <label className="ct-label">
                <HiPencilAlt size={13} /> Subject <span className="ct-optional">(optional)</span>
              </label>
              <div className={`ct-input-wrap${focused === "subject" ? " ct-input-wrap--focus" : ""}`}>
                <input
                  name="subject"
                  placeholder="How can we help?"
                  value={form.subject}
                  onChange={handleChange}
                  onFocus={() => setFocused("subject")}
                  onBlur={() => setFocused(null)}
                  className="ct-input"
                />
              </div>
            </div>

            {/* Message */}
            <div className="ct-field">
              <label className="ct-label">
                <HiChatAlt2 size={13} /> Message <span className="ct-required">*</span>
              </label>
              <div className={`ct-input-wrap ct-input-wrap--textarea${focused === "message" ? " ct-input-wrap--focus" : ""}`}>
                <textarea
                  name="message"
                  placeholder="Tell us what's on your mind…"
                  value={form.message}
                  onChange={handleChange}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  rows={6}
                  className="ct-textarea"
                />
              </div>
              <p className="ct-char-hint">{form.message.length} characters</p>
            </div>

            {/* Submit */}
            <button
              className={`ct-submit${loading ? " ct-submit--loading" : ""}`}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <><span className="ct-spinner" /> Sending…</>
              ) : (
                <>Send Message <HiArrowRight size={15} /></>
              )}
            </button>
          </div>
        </div>

        {/* ── RIGHT: INFO ── */}
        <aside className="ct-info-col">

          {/* Intro card */}
          <div className="ct-intro-card">
            <div className="ct-intro-ring" />
            <p className="ct-intro-eyebrow">Srinu tech Guru Support</p>
            <h3 className="ct-intro-title">We're here to help</h3>
            <p className="ct-intro-body">
              Our support team is dedicated to ensuring you have the best learning experience.
              Reach out through any of the channels below.
            </p>
          </div>

          {/* Info rows */}
          <div className="ct-info-list">
            {infoItems.map((item, i) => (
              <div className="ct-info-row" key={i}>
                <span
                  className="ct-info-icon"
                  style={{ background: item.bg, color: item.color }}
                >
                  {item.icon}
                </span>
                <div className="ct-info-body">
                  <p className="ct-info-label">{item.label}</p>
                  <p className="ct-info-primary">{item.primary}</p>
                  <p className="ct-info-secondary">{item.secondary}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Response time note */}
          <div className="ct-response-note">
            <HiCheckCircle size={14} />
            <span>Average response time: <strong>under 4 hours</strong> on business days</span>
          </div>
        </aside>
      </div>

      {/* ── STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        /* ── TOKENS ── */
        :root {
          --ct-ink:        #0e0f13;
          --ct-ink-soft:   #3d4154;
          --ct-ink-muted:  #8b90a8;
          --ct-surface:    #ffffff;
          --ct-surface-2:  #f6f6fb;
          --ct-surface-3:  #eeeef4;
          --ct-border:     #e3e3ed;
          --ct-accent:     #1a56db;
          --ct-accent-s:   #eef2fd;
          --ct-green:      #16a34a;
          --ct-green-s:    #f0fdf4;
          --ct-amber:      #b45309;
          --ct-amber-s:    #fffbeb;
          --ct-rose:       #be185d;
          --ct-rose-s:     #fdf2f8;
          --ct-gold:       #c9a84c;
          --ct-success:    #166534;
          --ct-success-bg: #f0fdf4;
          --ct-success-bd: rgba(22,101,52,.15);
          --ct-error:      #991b1b;
          --ct-error-bg:   #fef2f2;
          --ct-error-bd:   rgba(153,27,27,.15);
          --ct-shadow:     0 1px 4px rgba(14,15,19,.06), 0 6px 20px rgba(14,15,19,.07);
          --ct-shadow-lg:  0 12px 40px rgba(14,15,19,.12), 0 3px 10px rgba(14,15,19,.06);
          --ct-r-md:       10px;
          --ct-r-lg:       16px;
          --ct-r-xl:       24px;
          --ct-t:          .2s cubic-bezier(.4,0,.2,1);
          --ct-font-d:     'Playfair Display', Georgia, serif;
          --ct-font-b:     'DM Sans', 'Helvetica Neue', sans-serif;
        }

        /* ── ROOT ── */
        .ct-root {
          min-height: 100vh;
          background: var(--ct-surface-2);
          font-family: var(--ct-font-b);
          -webkit-font-smoothing: antialiased;
          padding-bottom: 72px;
        }

        /* ── TOAST ── */
        .ct-toast {
          position: fixed;
          top: 20px; right: 24px;
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 12px 18px;
          border-radius: var(--ct-r-md);
          font-size: 13.5px;
          font-weight: 500;
          border: 1px solid transparent;
          box-shadow: var(--ct-shadow-lg);
          animation: ct-slide-in .3s ease both;
          max-width: 380px;
        }
        .ct-toast--success {
          background: var(--ct-success-bg);
          color: var(--ct-success);
          border-color: var(--ct-success-bd);
        }
        .ct-toast--error {
          background: var(--ct-error-bg);
          color: var(--ct-error);
          border-color: var(--ct-error-bd);
        }
        @keyframes ct-slide-in {
          from { opacity: 0; transform: translateX(16px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* ── PAGE HEADER ── */
        .ct-header {
          position: relative;
          background: var(--ct-ink);
          padding: 80px 24px 100px;
          overflow: hidden;
          text-align: center;
        }

        .ct-header-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
          background-size: 52px 52px;
          pointer-events: none;
        }

        .ct-header-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(201,168,76,.1);
          pointer-events: none;
        }
        .ct-ring-1 { width: 440px; height: 440px; bottom: -200px; right: -120px; animation: ct-spin 80s linear infinite; }
        .ct-ring-2 { width: 260px; height: 260px; top: -80px; left: -60px; animation: ct-spin 60s linear infinite reverse; }

        @keyframes ct-spin { to { transform: rotate(360deg); } }

        .ct-header-inner {
          position: relative;
          z-index: 2;
          max-width: 600px;
          margin: 0 auto;
          animation: ct-fade-up .55s ease both;
        }

        @keyframes ct-fade-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .ct-eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: var(--ct-gold);
          margin: 0 0 16px;
        }

        .ct-page-title {
          font-family: var(--ct-font-d);
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 800;
          color: #fff;
          margin: 0 0 14px;
          letter-spacing: -0.02em;
        }

        .ct-page-sub {
          font-size: 15.5px;
          color: rgba(255,255,255,.55);
          font-weight: 300;
          line-height: 1.7;
          max-width: 480px;
          margin: 0 auto;
        }

        /* ── MAIN GRID ── */
        .ct-layout {
          max-width: 1100px;
          margin: -48px auto 0;
          padding: 0 24px;
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 24px;
          align-items: start;
          position: relative;
          z-index: 10;
        }

        /* ══════════════════════════════════
           FORM CARD
        ══════════════════════════════════ */
        .ct-form-card {
          background: var(--ct-surface);
          border: 1px solid var(--ct-border);
          border-radius: var(--ct-r-xl);
          box-shadow: var(--ct-shadow-lg);
          padding: 44px 44px 48px;
          animation: ct-fade-up .5s ease both;
        }

        .ct-form-card-header {
          margin-bottom: 36px;
          padding-bottom: 28px;
          border-bottom: 1px solid var(--ct-border);
        }

        .ct-form-title {
          font-family: var(--ct-font-d);
          font-size: 26px;
          font-weight: 700;
          color: var(--ct-ink);
          margin: 0 0 8px;
        }

        .ct-form-sub {
          font-size: 14px;
          color: var(--ct-ink-muted);
          margin: 0;
          line-height: 1.6;
        }

        /* ── FORM FIELDS ── */
        .ct-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .ct-field-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .ct-field {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .ct-label {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: .04em;
          text-transform: uppercase;
          color: var(--ct-ink-soft);
        }

        .ct-required { color: var(--ct-rose); margin-left: 2px; font-style: normal; }
        .ct-optional  { color: var(--ct-ink-muted); font-weight: 400; letter-spacing: 0; text-transform: none; font-size: 12px; margin-left: 4px; }

        /* Input wrapper handles the focus ring */
        .ct-input-wrap {
          border: 1.5px solid var(--ct-border);
          border-radius: var(--ct-r-md);
          background: var(--ct-surface-2);
          transition: border-color var(--ct-t), box-shadow var(--ct-t), background var(--ct-t);
        }

        .ct-input-wrap--focus {
          border-color: var(--ct-accent);
          box-shadow: 0 0 0 3.5px rgba(26,86,219,.09);
          background: var(--ct-surface);
        }

        .ct-input-wrap--textarea { align-items: stretch; }

        .ct-input {
          width: 100%;
          padding: 12px 14px;
          font-family: var(--ct-font-b);
          font-size: 14px;
          font-weight: 400;
          color: var(--ct-ink);
          background: transparent;
          border: none;
          outline: none;
          border-radius: inherit;
          box-sizing: border-box;
        }

        .ct-input::placeholder { color: var(--ct-ink-muted); }

        .ct-textarea {
          width: 100%;
          padding: 12px 14px;
          font-family: var(--ct-font-b);
          font-size: 14px;
          font-weight: 400;
          color: var(--ct-ink);
          background: transparent;
          border: none;
          outline: none;
          resize: vertical;
          line-height: 1.7;
          border-radius: inherit;
          box-sizing: border-box;
        }

        .ct-textarea::placeholder { color: var(--ct-ink-muted); }

        .ct-char-hint {
          font-size: 11.5px;
          color: var(--ct-ink-muted);
          text-align: right;
          margin: 0;
          font-weight: 400;
        }

        /* ── SUBMIT BUTTON ── */
        .ct-submit {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 14px 24px;
          background: var(--ct-ink);
          color: #fff;
          border: none;
          border-radius: var(--ct-r-md);
          font-family: var(--ct-font-b);
          font-size: 14.5px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 4px;
          transition: background var(--ct-t), transform var(--ct-t), box-shadow var(--ct-t);
          box-shadow: 0 2px 8px rgba(14,15,19,.2), 0 1px 3px rgba(14,15,19,.1);
          letter-spacing: .01em;
        }

        .ct-submit:hover:not(:disabled) {
          background: #1a1c24;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(14,15,19,.22);
        }

        .ct-submit:active:not(:disabled) { transform: translateY(0); }

        .ct-submit--loading { opacity: .6; cursor: not-allowed; }

        .ct-spinner {
          display: inline-block;
          width: 14px; height: 14px;
          border: 2px solid rgba(255,255,255,.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: ct-spin .75s linear infinite;
        }

        /* ══════════════════════════════════
           INFO COLUMN
        ══════════════════════════════════ */
        .ct-info-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
          animation: ct-fade-up .6s ease both .1s;
        }

        /* Intro card (dark) */
        .ct-intro-card {
          position: relative;
          background: var(--ct-ink);
          border-radius: var(--ct-r-xl);
          padding: 32px 28px;
          overflow: hidden;
        }

        .ct-intro-ring {
          position: absolute;
          width: 200px; height: 200px;
          border-radius: 50%;
          border: 1px solid rgba(201,168,76,.12);
          bottom: -80px; right: -60px;
          pointer-events: none;
        }

        .ct-intro-eyebrow {
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: var(--ct-gold);
          margin: 0 0 12px;
        }

        .ct-intro-title {
          font-family: var(--ct-font-d);
          font-size: 22px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 10px;
          position: relative;
          z-index: 1;
        }

        .ct-intro-body {
          font-size: 13.5px;
          color: rgba(255,255,255,.52);
          line-height: 1.7;
          margin: 0;
          font-weight: 300;
          position: relative;
          z-index: 1;
        }

        /* Info list */
        .ct-info-list {
          background: var(--ct-surface);
          border: 1px solid var(--ct-border);
          border-radius: var(--ct-r-xl);
          box-shadow: var(--ct-shadow);
          overflow: hidden;
        }

        .ct-info-row {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 20px 24px;
          border-bottom: 1px solid var(--ct-border);
          transition: background var(--ct-t);
        }
        .ct-info-row:last-child { border-bottom: none; }
        .ct-info-row:hover { background: var(--ct-surface-2); }

        .ct-info-icon {
          width: 36px; height: 36px;
          border-radius: var(--ct-r-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .ct-info-body { flex: 1; }

        .ct-info-label {
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: var(--ct-ink-muted);
          margin: 0 0 3px;
        }

        .ct-info-primary {
          font-size: 13.5px;
          font-weight: 600;
          color: var(--ct-ink);
          margin: 0 0 2px;
        }

        .ct-info-secondary {
          font-size: 12.5px;
          color: var(--ct-ink-muted);
          margin: 0;
          font-weight: 400;
        }

        /* Response note */
        .ct-response-note {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          padding: 14px 18px;
          background: var(--ct-surface);
          border: 1px solid var(--ct-border);
          border-radius: var(--ct-r-md);
          font-size: 12.5px;
          color: var(--ct-ink-muted);
          line-height: 1.55;
        }

        .ct-response-note svg { color: var(--ct-green); flex-shrink: 0; margin-top: 1px; }
        .ct-response-note strong { color: var(--ct-ink); font-weight: 700; }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .ct-layout {
            grid-template-columns: 1fr;
            margin-top: -40px;
          }
          .ct-info-col { order: -1; }
        }

        @media (max-width: 600px) {
          .ct-form-card { padding: 28px 22px 32px; }
          .ct-field-row { grid-template-columns: 1fr; }
          .ct-layout { padding: 0 16px; }
        }
      `}</style>
    </div>
  );
};

export default ContactPage;
