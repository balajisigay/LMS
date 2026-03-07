import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUserProfile,
  updateUserProfile,
  uploadProfilePhoto,
  deleteProfilePhoto,
  UserProfile,
} from "../../../src/api/userService";
import {
  HiMail,
  HiPhone,
  HiLocationMarker,
  HiGlobe,
  HiCamera,
  HiPencil,
  HiCheck,
  HiX,
  HiTrash,
} from "react-icons/hi";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { requireAuth, getUserId } from "../utils/auth";
import { API_ORIGIN } from "../config/api";

const getApiErrorMessage = (err: any, fallback: string): string => {
  const message = err?.message || "";
  if (message.toLowerCase().includes("failed to fetch"))
    return `Unable to connect to server. Please make sure API is running on ${API_ORIGIN}.`;
  return message || fallback;
};

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────── */

/** Thin labelled row used in the sidebar info list */
const InfoRow: React.FC<{
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}> = ({ icon, label, children }) => (
  <div className="pp-info-row">
    <span className="pp-info-row-icon">{icon}</span>
    <div className="pp-info-row-body">
      <span className="pp-info-row-label">{label}</span>
      <span className="pp-info-row-value">{children}</span>
    </div>
  </div>
);

/** A single editable field card in the main content area */
const FieldCard: React.FC<{
  label: string;
  editing: boolean;
  value: string;
  placeholder?: string;
  type?: string;
  onChange: (v: string) => void;
  href?: string;
}> = ({ label, editing, value, placeholder, type = "text", onChange, href }) => (
  <div className="pp-field-card">
    <p className="pp-field-label">{label}</p>
    {editing ? (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pp-field-input"
      />
    ) : href && value ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className="pp-field-link">
        {value}
      </a>
    ) : (
      <p className="pp-field-value">{value || <span className="pp-field-empty">Not provided</span>}</p>
    )}
  </div>
);

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    bio: "",
    phone: "",
    location: "",
    website: "",
    linkedIn: "",
    twitter: "",
  });

  const patch = (key: keyof typeof formData) => (v: string) =>
    setFormData((p) => ({ ...p, [key]: v }));

  useEffect(() => { loadProfile(); }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError("");
      requireAuth(navigate);
      const userId = getUserId();
      const data = await getUserProfile(userId);
      setProfile(data);
      setFormData({
        fullName: data.fullName || "",
        bio: data.bio || "",
        phone: data.phone || "",
        location: data.location || "",
        website: data.website || "",
        linkedIn: data.linkedIn || "",
        twitter: data.twitter || "",
      });
    } catch (err: any) {
      if (err.message === "Authentication required") return;
      setError(err.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.fullName.trim()) { setError("Full name is required"); return; }
    try {
      setSaving(true); setError(""); setSuccess("");
      await updateUserProfile(getUserId(), formData);
      setSuccess("Profile updated successfully.");
      setEditing(false);
      await loadProfile();
      setTimeout(() => setSuccess(""), 4000);
    } catch (err: any) {
      setError(getApiErrorMessage(err, "Failed to update profile"));
    } finally {
      setSaving(false);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setError("File size must be less than 5 MB"); return; }
    if (!file.type.startsWith("image/")) { setError("Please upload an image file"); return; }
    try {
      setUploading(true); setError("");
      await uploadProfilePhoto(getUserId(), file);
      setSuccess("Profile photo updated.");
      await loadProfile();
      setTimeout(() => setSuccess(""), 4000);
    } catch (err: any) {
      setError(getApiErrorMessage(err, "Failed to upload photo"));
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDeletePhoto = async () => {
    if (!window.confirm("Delete your profile photo?")) return;
    try {
      setError("");
      await deleteProfilePhoto(getUserId());
      setSuccess("Profile photo removed.");
      await loadProfile();
      setTimeout(() => setSuccess(""), 4000);
    } catch (err: any) {
      setError(getApiErrorMessage(err, "Failed to delete photo"));
    }
  };

  /* ── Loading state ── */
  if (loading) return (
    <div className="pp-loading">
      <span className="pp-loader" />
      <p className="pp-loading-label">Loading profile…</p>
    </div>
  );

  /* ── Error state ── */
  if (!profile) return (
    <div className="pp-loading">
      <p className="pp-empty-err">Failed to load profile.</p>
      <button className="pp-retry-btn" onClick={loadProfile}>Retry</button>
    </div>
  );

  const initials = profile.fullName
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const memberSince = new Date(profile.createdAt).toLocaleDateString("en-US", {
    year: "numeric", month: "long",
  });

  return (
    <div className="pp-root">

      {/* ── TOAST NOTIFICATIONS ── */}
      {success && (
        <div className="pp-toast pp-toast--success">
          <HiCheck size={15} />
          {success}
        </div>
      )}
      {error && (
        <div className="pp-toast pp-toast--error">
          <HiX size={15} />
          {error}
        </div>
      )}

      <div className="pp-layout">

        {/* ══════════════════════════════════════
            LEFT SIDEBAR
        ══════════════════════════════════════ */}
        <aside className="pp-sidebar">

          {/* Avatar block */}
          <div className="pp-avatar-block">
            <div className="pp-avatar-wrap">
              <div className="pp-avatar">
                {profile.profileImageUrl ? (
                  <img
                    src={`${API_ORIGIN}${profile.profileImageUrl}`}
                    alt={profile.fullName}
                    className="pp-avatar-img"
                  />
                ) : (
                  <span className="pp-avatar-initials">{initials}</span>
                )}
              </div>

              <button
                className="pp-camera-btn"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading || saving}
                title="Change photo"
              >
                {uploading ? <span className="pp-mini-spinner" /> : <HiCamera size={14} />}
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="pp-hidden-input"
              />
            </div>

            {editing ? (
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => patch("fullName")(e.target.value)}
                className="pp-name-edit"
                placeholder="Full Name"
              />
            ) : (
              <h1 className="pp-name">{profile.fullName}</h1>
            )}

            <span className="pp-role-chip">{profile.role}</span>
            <p className="pp-member-since">Member since {memberSince}</p>
          </div>

          {/* Divider */}
          <div className="pp-sidebar-divider" />

          {/* Quick info list */}
          <div className="pp-sidebar-info">
            <InfoRow icon={<HiMail size={14} />} label="Email">
              <span className="pp-email-val">{profile.email}</span>
            </InfoRow>

            <InfoRow icon={<HiPhone size={14} />} label="Phone">
              {profile.phone || <span className="pp-field-empty">—</span>}
            </InfoRow>

            <InfoRow icon={<HiLocationMarker size={14} />} label="Location">
              {profile.location || <span className="pp-field-empty">—</span>}
            </InfoRow>

            <InfoRow icon={<HiGlobe size={14} />} label="Website">
              {profile.website ? (
                <a href={profile.website} target="_blank" rel="noopener noreferrer" className="pp-sidebar-link">
                  {profile.website.replace(/^https?:\/\//, "")}
                </a>
              ) : (
                <span className="pp-field-empty">—</span>
              )}
            </InfoRow>
          </div>

          {/* Social chips */}
          <div className="pp-sidebar-divider" />
          <div className="pp-social-chips">
            {profile.linkedIn ? (
              <a href={profile.linkedIn} target="_blank" rel="noopener noreferrer" className="pp-social-chip pp-social-chip--li">
                <FaLinkedin size={13} /> LinkedIn
              </a>
            ) : (
              <span className="pp-social-chip pp-social-chip--empty"><FaLinkedin size={13} /> LinkedIn</span>
            )}
            {profile.twitter ? (
              <a href={profile.twitter} target="_blank" rel="noopener noreferrer" className="pp-social-chip pp-social-chip--tw">
                <FaTwitter size={13} /> Twitter
              </a>
            ) : (
              <span className="pp-social-chip pp-social-chip--empty"><FaTwitter size={13} /> Twitter</span>
            )}
          </div>

          {/* Photo delete */}
          {profile.profileImageUrl && !editing && (
            <button className="pp-delete-photo-btn" onClick={handleDeletePhoto} disabled={uploading || saving}>
              <HiTrash size={13} /> Remove photo
            </button>
          )}
        </aside>

        {/* ══════════════════════════════════════
            MAIN CONTENT
        ══════════════════════════════════════ */}
        <main className="pp-content">

          {/* Content header bar */}
          <div className="pp-content-header">
            <div>
              <h2 className="pp-content-title">
                {editing ? "Edit Profile" : "Profile Overview"}
              </h2>
              <p className="pp-content-subtitle">
                {editing
                  ? "Make your changes below and save when done."
                  : "Manage your personal information and social presence."}
              </p>
            </div>

            <div className="pp-header-actions">
              {!editing ? (
                <button
                  className="pp-btn pp-btn--primary"
                  onClick={() => setEditing(true)}
                  disabled={uploading}
                >
                  <HiPencil size={14} />
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    className="pp-btn pp-btn--ghost"
                    onClick={() => { setEditing(false); loadProfile(); }}
                    disabled={saving}
                  >
                    <HiX size={14} />
                    Cancel
                  </button>
                  <button
                    className={`pp-btn pp-btn--save${saving ? " pp-btn--loading" : ""}`}
                    onClick={handleSave}
                    disabled={saving}
                  >
                    {saving ? <span className="pp-mini-spinner" /> : <HiCheck size={14} />}
                    {saving ? "Saving…" : "Save Changes"}
                  </button>
                </>
              )}
            </div>
          </div>

          {/* ── ABOUT ── */}
          <section className="pp-section">
            <div className="pp-section-header">
              <h3 className="pp-section-title">About</h3>
              <span className="pp-section-rule" />
            </div>
            {editing ? (
              <textarea
                value={formData.bio}
                onChange={(e) => patch("bio")(e.target.value)}
                rows={4}
                placeholder="Write a short bio about yourself…"
                className="pp-bio-textarea"
              />
            ) : (
              <p className="pp-bio-text">
                {profile.bio || (
                  <span className="pp-field-empty">
                    No bio added yet. Click <strong>Edit Profile</strong> to add one.
                  </span>
                )}
              </p>
            )}
          </section>

          {/* ── CONTACT ── */}
          <section className="pp-section">
            <div className="pp-section-header">
              <h3 className="pp-section-title">Contact Information</h3>
              <span className="pp-section-rule" />
            </div>
            <div className="pp-fields-grid">
              <FieldCard
                label="Email Address"
                editing={false}
                value={profile.email}
                onChange={() => {}}
              />
              <FieldCard
                label="Phone Number"
                editing={editing}
                value={editing ? formData.phone : profile.phone || ""}
                placeholder="+1 234 567 8900"
                type="tel"
                onChange={patch("phone")}
              />
              <FieldCard
                label="Location"
                editing={editing}
                value={editing ? formData.location : profile.location || ""}
                placeholder="City, Country"
                onChange={patch("location")}
              />
              <FieldCard
                label="Website"
                editing={editing}
                value={editing ? formData.website : profile.website || ""}
                placeholder="https://example.com"
                type="url"
                href={profile.website}
                onChange={patch("website")}
              />
            </div>
          </section>

          {/* ── SOCIAL ── */}
          <section className="pp-section">
            <div className="pp-section-header">
              <h3 className="pp-section-title">Social Media</h3>
              <span className="pp-section-rule" />
            </div>
            <div className="pp-fields-grid">
              <div className="pp-field-card pp-field-card--social">
                <span className="pp-social-badge pp-social-badge--li">
                  <FaLinkedin size={16} />
                </span>
                <div className="pp-field-card-body">
                  <p className="pp-field-label">LinkedIn</p>
                  {editing ? (
                    <input
                      type="url"
                      value={formData.linkedIn}
                      onChange={(e) => patch("linkedIn")(e.target.value)}
                      placeholder="https://linkedin.com/in/username"
                      className="pp-field-input"
                    />
                  ) : profile.linkedIn ? (
                    <a href={profile.linkedIn} target="_blank" rel="noopener noreferrer" className="pp-field-link">
                      {profile.linkedIn.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "")}
                    </a>
                  ) : (
                    <p className="pp-field-value"><span className="pp-field-empty">Not connected</span></p>
                  )}
                </div>
              </div>

              <div className="pp-field-card pp-field-card--social">
                <span className="pp-social-badge pp-social-badge--tw">
                  <FaTwitter size={16} />
                </span>
                <div className="pp-field-card-body">
                  <p className="pp-field-label">Twitter / X</p>
                  {editing ? (
                    <input
                      type="url"
                      value={formData.twitter}
                      onChange={(e) => patch("twitter")(e.target.value)}
                      placeholder="https://twitter.com/username"
                      className="pp-field-input"
                    />
                  ) : profile.twitter ? (
                    <a href={profile.twitter} target="_blank" rel="noopener noreferrer" className="pp-field-link">
                      {profile.twitter.replace(/^https?:\/\/(www\.)?twitter\.com\//, "@")}
                    </a>
                  ) : (
                    <p className="pp-field-value"><span className="pp-field-empty">Not connected</span></p>
                  )}
                </div>
              </div>
            </div>
          </section>

        </main>
      </div>

      {/* ── STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');

        /* ── TOKENS ── */
        :root {
          --pp-ink:          #111318;
          --pp-ink-soft:     #434759;
          --pp-ink-muted:    #8c92a8;
          --pp-surface:      #ffffff;
          --pp-surface-2:    #f5f5f9;
          --pp-surface-3:    #eeeef5;
          --pp-border:       #e3e3ed;
          --pp-accent:       #1a56db;
          --pp-accent-soft:  #eef2fd;
          --pp-amber:        #b45309;
          --pp-amber-soft:   #fef3c7;
          --pp-li:           #0077b5;
          --pp-li-soft:      #e8f4fc;
          --pp-tw:           #1da1f2;
          --pp-tw-soft:      #e8f5fe;
          --pp-success:      #166534;
          --pp-success-bg:   #f0fdf4;
          --pp-success-bdr:  rgba(22,101,52,.15);
          --pp-error:        #991b1b;
          --pp-error-bg:     #fef2f2;
          --pp-error-bdr:    rgba(153,27,27,.15);
          --pp-radius-sm:    6px;
          --pp-radius-md:    10px;
          --pp-radius-lg:    16px;
          --pp-shadow-card:  0 1px 3px rgba(17,19,24,.06), 0 4px 16px rgba(17,19,24,.06);
          --pp-shadow-pop:   0 8px 32px rgba(17,19,24,.14), 0 2px 8px rgba(17,19,24,.06);
          --pp-font-display: 'Sora', sans-serif;
          --pp-font-serif:   'Lora', Georgia, serif;
          --pp-t: .2s cubic-bezier(.4,0,.2,1);
        }

        /* ── ROOT ── */
        .pp-root {
          min-height: 100vh;
          background: var(--pp-surface-2);
          font-family: var(--pp-font-display);
          -webkit-font-smoothing: antialiased;
          padding: 36px 24px 64px;
          position: relative;
        }

        /* ── TOAST ── */
        .pp-toast {
          position: fixed;
          top: 20px;
          right: 24px;
          z-index: 9999;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 18px;
          border-radius: var(--pp-radius-md);
          font-size: 13px;
          font-weight: 500;
          box-shadow: var(--pp-shadow-pop);
          animation: pp-slide-in .3s ease both;
          border: 1px solid transparent;
          max-width: 360px;
        }

        .pp-toast--success {
          background: var(--pp-success-bg);
          color: var(--pp-success);
          border-color: var(--pp-success-bdr);
        }

        .pp-toast--error {
          background: var(--pp-error-bg);
          color: var(--pp-error);
          border-color: var(--pp-error-bdr);
        }

        @keyframes pp-slide-in {
          from { opacity: 0; transform: translateX(16px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* ── LOADING ── */
        .pp-loading {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          background: var(--pp-surface-2);
          font-family: var(--pp-font-display);
        }

        .pp-loader {
          display: block;
          width: 36px;
          height: 36px;
          border: 3px solid var(--pp-border);
          border-top-color: var(--pp-accent);
          border-radius: 50%;
          animation: pp-spin .7s linear infinite;
        }

        .pp-loading-label {
          font-size: 14px;
          color: var(--pp-ink-muted);
          font-weight: 400;
        }

        .pp-empty-err {
          font-size: 15px;
          color: var(--pp-error);
          font-weight: 500;
        }

        .pp-retry-btn {
          padding: 10px 22px;
          background: var(--pp-ink);
          color: #fff;
          border: none;
          border-radius: var(--pp-radius-md);
          font-family: var(--pp-font-display);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: background var(--pp-t);
        }
        .pp-retry-btn:hover { background: var(--pp-ink-soft); }

        @keyframes pp-spin { to { transform: rotate(360deg); } }

        /* ── TWO-COLUMN LAYOUT ── */
        .pp-layout {
          max-width: 1120px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 24px;
          align-items: start;
        }

        /* ══════════════════════════════════
           SIDEBAR
        ══════════════════════════════════ */
        .pp-sidebar {
          background: var(--pp-surface);
          border: 1px solid var(--pp-border);
          border-radius: var(--pp-radius-lg);
          box-shadow: var(--pp-shadow-card);
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          gap: 0;
          position: sticky;
          top: 24px;
        }

        /* Avatar block */
        .pp-avatar-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding-bottom: 24px;
        }

        .pp-avatar-wrap {
          position: relative;
          margin-bottom: 18px;
        }

        .pp-avatar {
          width: 96px;
          height: 96px;
          border-radius: 50%;
          background: var(--pp-surface-3);
          border: 3px solid var(--pp-surface);
          box-shadow: 0 0 0 2px var(--pp-border), var(--pp-shadow-card);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pp-avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .pp-avatar-initials {
          font-family: var(--pp-font-serif);
          font-size: 32px;
          font-weight: 600;
          color: var(--pp-ink-soft);
          letter-spacing: -0.02em;
        }

        .pp-camera-btn {
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: var(--pp-ink);
          border: 2px solid var(--pp-surface);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background var(--pp-t), transform var(--pp-t);
        }
        .pp-camera-btn:hover:not(:disabled) {
          background: var(--pp-ink-soft);
          transform: scale(1.1);
        }
        .pp-camera-btn:disabled { opacity: .5; cursor: not-allowed; }

        .pp-hidden-input { display: none; }

        .pp-name {
          font-family: var(--pp-font-serif);
          font-size: 20px;
          font-weight: 600;
          color: var(--pp-ink);
          margin: 0 0 10px;
          line-height: 1.25;
        }

        .pp-name-edit {
          font-family: var(--pp-font-serif);
          font-size: 18px;
          font-weight: 600;
          color: var(--pp-ink);
          text-align: center;
          background: var(--pp-surface-2);
          border: 1.5px solid var(--pp-border);
          border-radius: var(--pp-radius-sm);
          outline: none;
          padding: 6px 10px;
          width: 100%;
          margin-bottom: 10px;
          transition: border-color var(--pp-t);
        }
        .pp-name-edit:focus { border-color: var(--pp-accent); }

        .pp-role-chip {
          display: inline-block;
          padding: 3px 10px;
          background: var(--pp-surface-2);
          border: 1px solid var(--pp-border);
          border-radius: 99px;
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: var(--pp-ink-soft);
          text-transform: uppercase;
          margin-bottom: 10px;
        }

        .pp-member-since {
          font-size: 11.5px;
          color: var(--pp-ink-muted);
          font-weight: 400;
          margin: 0;
        }

        /* Sidebar divider */
        .pp-sidebar-divider {
          height: 1px;
          background: var(--pp-border);
          margin: 20px 0;
        }

        /* Info rows */
        .pp-sidebar-info {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .pp-info-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }

        .pp-info-row-icon {
          width: 28px;
          height: 28px;
          border-radius: var(--pp-radius-sm);
          background: var(--pp-surface-2);
          border: 1px solid var(--pp-border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--pp-ink-muted);
          flex-shrink: 0;
        }

        .pp-info-row-body {
          display: flex;
          flex-direction: column;
          gap: 1px;
          min-width: 0;
        }

        .pp-info-row-label {
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--pp-ink-muted);
        }

        .pp-info-row-value {
          font-size: 13px;
          font-weight: 500;
          color: var(--pp-ink);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 180px;
        }

        .pp-email-val {
          font-size: 12.5px;
        }

        .pp-sidebar-link {
          font-size: 13px;
          color: var(--pp-accent);
          text-decoration: none;
          font-weight: 500;
        }
        .pp-sidebar-link:hover { text-decoration: underline; }

        /* Social chips */
        .pp-social-chips {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .pp-social-chip {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: var(--pp-radius-sm);
          font-size: 12.5px;
          font-weight: 600;
          text-decoration: none;
          transition: background var(--pp-t), opacity var(--pp-t);
        }

        .pp-social-chip--li {
          background: var(--pp-li-soft);
          color: var(--pp-li);
          border: 1px solid rgba(0,119,181,.12);
        }
        .pp-social-chip--li:hover { opacity: .8; }

        .pp-social-chip--tw {
          background: var(--pp-tw-soft);
          color: var(--pp-tw);
          border: 1px solid rgba(29,161,242,.12);
        }
        .pp-social-chip--tw:hover { opacity: .8; }

        .pp-social-chip--empty {
          background: var(--pp-surface-2);
          color: var(--pp-ink-muted);
          border: 1px solid var(--pp-border);
        }

        /* Delete photo */
        .pp-delete-photo-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 16px;
          width: 100%;
          padding: 8px;
          background: none;
          border: 1px solid var(--pp-border);
          border-radius: var(--pp-radius-sm);
          font-family: var(--pp-font-display);
          font-size: 12px;
          font-weight: 500;
          color: var(--pp-ink-muted);
          cursor: pointer;
          transition: color var(--pp-t), border-color var(--pp-t), background var(--pp-t);
        }
        .pp-delete-photo-btn:hover {
          color: var(--pp-error);
          border-color: rgba(153,27,27,.3);
          background: var(--pp-error-bg);
        }
        .pp-delete-photo-btn:disabled { opacity: .4; cursor: not-allowed; }

        /* ══════════════════════════════════
           MAIN CONTENT
        ══════════════════════════════════ */
        .pp-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* Content header */
        .pp-content-header {
          background: var(--pp-surface);
          border: 1px solid var(--pp-border);
          border-radius: var(--pp-radius-lg);
          box-shadow: var(--pp-shadow-card);
          padding: 24px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .pp-content-title {
          font-family: var(--pp-font-serif);
          font-size: 20px;
          font-weight: 600;
          color: var(--pp-ink);
          margin: 0 0 4px;
        }

        .pp-content-subtitle {
          font-size: 13px;
          color: var(--pp-ink-muted);
          margin: 0;
          font-weight: 400;
        }

        .pp-header-actions {
          display: flex;
          gap: 10px;
          flex-shrink: 0;
        }

        /* Buttons */
        .pp-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 9px 18px;
          border-radius: var(--pp-radius-md);
          font-family: var(--pp-font-display);
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          transition: background var(--pp-t), transform var(--pp-t), box-shadow var(--pp-t);
          white-space: nowrap;
        }
        .pp-btn:disabled { opacity: .5; cursor: not-allowed; }

        .pp-btn--primary {
          background: var(--pp-ink);
          color: #fff;
          box-shadow: 0 1px 3px rgba(17,19,24,.2);
        }
        .pp-btn--primary:hover:not(:disabled) {
          background: var(--pp-ink-soft);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(17,19,24,.2);
        }

        .pp-btn--ghost {
          background: var(--pp-surface-2);
          color: var(--pp-ink-soft);
          border: 1px solid var(--pp-border);
        }
        .pp-btn--ghost:hover:not(:disabled) { background: var(--pp-surface-3); }

        .pp-btn--save {
          background: var(--pp-success);
          color: #fff;
          box-shadow: 0 1px 3px rgba(22,101,52,.25);
        }
        .pp-btn--save:hover:not(:disabled) {
          filter: brightness(1.1);
          transform: translateY(-1px);
        }
        .pp-btn--loading { opacity: .7; }

        /* Sections */
        .pp-section {
          background: var(--pp-surface);
          border: 1px solid var(--pp-border);
          border-radius: var(--pp-radius-lg);
          box-shadow: var(--pp-shadow-card);
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          animation: pp-fade-in .4s ease both;
        }

        @keyframes pp-fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .pp-section-header {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .pp-section-title {
          font-family: var(--pp-font-display);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: var(--pp-ink-soft);
          margin: 0;
          white-space: nowrap;
        }

        .pp-section-rule {
          flex: 1;
          height: 1px;
          background: var(--pp-border);
        }

        /* Bio */
        .pp-bio-text {
          font-size: 14.5px;
          line-height: 1.75;
          color: var(--pp-ink-soft);
          margin: 0;
          font-weight: 400;
        }

        .pp-bio-textarea {
          width: 100%;
          padding: 14px 16px;
          font-family: var(--pp-font-display);
          font-size: 14px;
          line-height: 1.7;
          color: var(--pp-ink);
          background: var(--pp-surface-2);
          border: 1.5px solid var(--pp-border);
          border-radius: var(--pp-radius-md);
          resize: vertical;
          outline: none;
          transition: border-color var(--pp-t), box-shadow var(--pp-t);
        }
        .pp-bio-textarea:focus {
          border-color: var(--pp-accent);
          box-shadow: 0 0 0 3px rgba(26,86,219,.08);
          background: var(--pp-surface);
        }

        /* Field grid */
        .pp-fields-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }

        /* Field card */
        .pp-field-card {
          background: var(--pp-surface-2);
          border: 1px solid var(--pp-border);
          border-radius: var(--pp-radius-md);
          padding: 16px 18px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          transition: border-color var(--pp-t);
        }
        .pp-field-card:hover { border-color: var(--pp-surface-3); }

        .pp-field-card--social {
          flex-direction: row;
          align-items: flex-start;
          gap: 14px;
        }

        .pp-field-card-body {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .pp-field-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: var(--pp-ink-muted);
          margin: 0;
        }

        .pp-field-value {
          font-size: 14px;
          font-weight: 500;
          color: var(--pp-ink);
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .pp-field-empty {
          color: var(--pp-ink-muted);
          font-weight: 400;
          font-style: italic;
        }

        .pp-field-input {
          width: 100%;
          font-family: var(--pp-font-display);
          font-size: 14px;
          font-weight: 500;
          color: var(--pp-ink);
          background: var(--pp-surface);
          border: 1.5px solid var(--pp-border);
          border-radius: var(--pp-radius-sm);
          padding: 7px 10px;
          outline: none;
          transition: border-color var(--pp-t), box-shadow var(--pp-t);
        }
        .pp-field-input:focus {
          border-color: var(--pp-accent);
          box-shadow: 0 0 0 3px rgba(26,86,219,.08);
        }

        .pp-field-link {
          font-size: 13.5px;
          font-weight: 500;
          color: var(--pp-accent);
          text-decoration: none;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: block;
        }
        .pp-field-link:hover { text-decoration: underline; }

        /* Social badges */
        .pp-social-badge {
          width: 36px;
          height: 36px;
          border-radius: var(--pp-radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .pp-social-badge--li { background: var(--pp-li-soft); color: var(--pp-li); }
        .pp-social-badge--tw { background: var(--pp-tw-soft); color: var(--pp-tw); }

        /* Mini spinner */
        .pp-mini-spinner {
          display: inline-block;
          width: 12px;
          height: 12px;
          border: 2px solid rgba(255,255,255,.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: pp-spin .7s linear infinite;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .pp-layout {
            grid-template-columns: 1fr;
          }
          .pp-sidebar {
            position: static;
          }
        }

        @media (max-width: 640px) {
          .pp-root { padding: 20px 16px 48px; }
          .pp-content-header { flex-direction: column; align-items: flex-start; }
          .pp-fields-grid { grid-template-columns: 1fr; }
          .pp-header-actions { width: 100%; }
          .pp-btn { flex: 1; justify-content: center; }
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;
