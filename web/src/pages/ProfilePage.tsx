import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  getUserProfile, 
  updateUserProfile, 
  uploadProfilePhoto, 
  deleteProfilePhoto,
  UserProfile 
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
  HiTrash
} from "react-icons/hi";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { requireAuth, getUserId } from "../utils/auth";
import { API_ORIGIN } from "../config/api";

const getApiErrorMessage = (err: any, fallback: string): string => {
  const message = err?.message || "";
  if (message.toLowerCase().includes("failed to fetch")) {
    return `Unable to connect to server. Please make sure API is running on ${API_ORIGIN}.`;
  }
  return message || fallback;
};

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

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError("");
      
      // Require authentication - will redirect if not logged in
      const user = requireAuth(navigate);
      const userId = getUserId();
      
      console.log("✅ Loading profile for user:", {
        userId,
        email: user.email,
        fullName: user.fullName
      });
      
      const data = await getUserProfile(userId);
      console.log("✅ Profile loaded:", data);
      
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
      console.error("❌ Error loading profile:", err);
      
      // If authentication error, user will be redirected
      if (err.message === "Authentication required") {
        return;
      }
      
      setError(err.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.fullName.trim()) {
      setError("Full name is required");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");
      
      const userId = getUserId();
      console.log("💾 Saving profile for userId:", userId);
      console.log("📝 Form data:", formData);
      
      await updateUserProfile(userId, formData);
      
      setSuccess("Profile updated successfully!");
      setEditing(false);
      
      // Reload profile to get updated data
      await loadProfile();
      
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      console.error("❌ Error saving profile:", err);
      setError(getApiErrorMessage(err, "Failed to update profile"));
    } finally {
      setSaving(false);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file");
      return;
    }

    try {
      setUploading(true);
      setError("");
      
      const userId = getUserId();
      console.log("📷 Uploading photo for userId:", userId);
      
      await uploadProfilePhoto(userId, file);
      
      setSuccess("Profile photo updated!");
      await loadProfile();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      console.error("❌ Error uploading photo:", err);
      setError(getApiErrorMessage(err, "Failed to upload photo"));
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDeletePhoto = async () => {
    if (!window.confirm("Are you sure you want to delete your profile photo?")) return;

    try {
      setError("");
      
      const userId = getUserId();
      console.log("🗑️ Deleting photo for userId:", userId);
      
      await deleteProfilePhoto(userId);
      
      setSuccess("Profile photo deleted");
      await loadProfile();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      console.error("❌ Error deleting photo:", err);
      setError(getApiErrorMessage(err, "Failed to delete photo"));
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.errorText}>Failed to load profile</div>
        <button onClick={loadProfile} style={styles.retryButton}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div style={styles.pageContainer}>
      <div style={styles.contentWrapper}>
        {/* Success/Error Notifications */}
        {success && (
          <div style={styles.successAlert}>
            <HiCheck style={styles.alertIcon} />
            {success}
          </div>
        )}
        {error && (
          <div style={styles.errorAlert}>
            <HiX style={styles.alertIcon} />
            {error}
          </div>
        )}

        {/* Main Profile Card */}
        <div style={styles.profileCard}>
          {/* Cover Photo */}
          <div style={styles.coverPhoto}>
            <div style={styles.coverGradient}></div>
          </div>

          {/* Profile Content */}
          <div style={styles.profileContent}>
            {/* Avatar & Actions Row */}
            <div style={styles.avatarSection}>
              <div style={styles.avatarWrapper}>
                <div style={styles.avatar}>
                  {profile.profileImageUrl ? (
                    <img
                      src={`${API_ORIGIN}${profile.profileImageUrl}`}
                      alt={profile.fullName}
                      style={styles.avatarImage}
                    />
                  ) : (
                    <div style={styles.avatarPlaceholder}>
                      {profile.fullName.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                
                {/* Camera Overlay */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading || saving}
                  style={styles.cameraButton}
                >
                  <HiCamera size={20} />
                </button>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  style={styles.fileInput}
                />
              </div>

              {/* Action Buttons */}
              <div style={styles.actionButtons}>
                {!editing ? (
                  <>
                    <button onClick={() => setEditing(true)} style={styles.editButton} disabled={uploading || saving}>
                      <HiPencil size={16} />
                      <span>Edit Profile</span>
                    </button>
                    {profile.profileImageUrl && (
                      <button onClick={handleDeletePhoto} style={styles.deletePhotoButton} disabled={uploading || saving}>
                        <HiTrash size={16} />
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleSave}
                      style={saving ? { ...styles.saveButton, opacity: 0.7, cursor: "not-allowed" } : styles.saveButton}
                      disabled={saving}
                    >
                      <HiCheck size={16} />
                      <span>{saving ? "Saving..." : "Save Changes"}</span>
                    </button>
                    <button
                      onClick={() => {
                        setEditing(false);
                        loadProfile();
                      }}
                      style={styles.cancelButton}
                      disabled={saving}
                    >
                      <HiX size={16} />
                      <span>Cancel</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Profile Info */}
            <div style={styles.profileInfo}>
              {/* Name & Role */}
              <div style={styles.nameSection}>
                {editing ? (
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    style={styles.nameInput}
                    placeholder="Full Name"
                  />
                ) : (
                  <h1 style={styles.name}>{profile.fullName}</h1>
                )}
                <div style={styles.roleBadge}>{profile.role}</div>
              </div>

              {/* Bio Section */}
              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>About</h3>
                {editing ? (
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={4}
                    style={styles.bioTextarea}
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <p style={styles.bioText}>
                    {profile.bio || "No bio added yet. Click Edit Profile to add one."}
                  </p>
                )}
              </div>

              {/* Contact Information Grid */}
              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Contact Information</h3>
                <div style={styles.infoGrid}>
                  {/* Email */}
                  <div style={styles.infoCard}>
                    <div style={styles.infoIcon}>
                      <HiMail size={20} />
                    </div>
                    <div style={styles.infoContent}>
                      <p style={styles.infoLabel}>Email</p>
                      <p style={styles.infoValue}>{profile.email}</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div style={styles.infoCard}>
                    <div style={styles.infoIcon}>
                      <HiPhone size={20} />
                    </div>
                    <div style={styles.infoContent}>
                      <p style={styles.infoLabel}>Phone</p>
                      {editing ? (
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          style={styles.infoInput}
                          placeholder="+1 234 567 8900"
                        />
                      ) : (
                        <p style={styles.infoValue}>{profile.phone || "Not provided"}</p>
                      )}
                    </div>
                  </div>

                  {/* Location */}
                  <div style={styles.infoCard}>
                    <div style={styles.infoIcon}>
                      <HiLocationMarker size={20} />
                    </div>
                    <div style={styles.infoContent}>
                      <p style={styles.infoLabel}>Location</p>
                      {editing ? (
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          style={styles.infoInput}
                          placeholder="City, Country"
                        />
                      ) : (
                        <p style={styles.infoValue}>{profile.location || "Not provided"}</p>
                      )}
                    </div>
                  </div>

                  {/* Website */}
                  <div style={styles.infoCard}>
                    <div style={styles.infoIcon}>
                      <HiGlobe size={20} />
                    </div>
                    <div style={styles.infoContent}>
                      <p style={styles.infoLabel}>Website</p>
                      {editing ? (
                        <input
                          type="url"
                          value={formData.website}
                          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                          style={styles.infoInput}
                          placeholder="https://example.com"
                        />
                      ) : profile.website ? (
                        <a href={profile.website} target="_blank" rel="noopener noreferrer" style={styles.link}>
                          {profile.website}
                        </a>
                      ) : (
                        <p style={styles.infoValue}>Not provided</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Social Media</h3>
                <div style={styles.socialGrid}>
                  {/* LinkedIn */}
                  <div style={styles.socialCard}>
                    <div style={{ ...styles.socialIcon, background: 'linear-gradient(135deg, #0077B5, #00A0DC)' }}>
                      <FaLinkedin size={20} color="white" />
                    </div>
                    <div style={styles.socialContent}>
                      <p style={styles.socialLabel}>LinkedIn</p>
                      {editing ? (
                        <input
                          type="url"
                          value={formData.linkedIn}
                          onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })}
                          style={styles.socialInput}
                          placeholder="https://linkedin.com/in/username"
                        />
                      ) : profile.linkedIn ? (
                        <a href={profile.linkedIn} target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
                          View Profile
                        </a>
                      ) : (
                        <p style={styles.socialValue}>Not connected</p>
                      )}
                    </div>
                  </div>

                  {/* Twitter */}
                  <div style={styles.socialCard}>
                    <div style={{ ...styles.socialIcon, background: 'linear-gradient(135deg, #1DA1F2, #0C85D0)' }}>
                      <FaTwitter size={20} color="white" />
                    </div>
                    <div style={styles.socialContent}>
                      <p style={styles.socialLabel}>Twitter</p>
                      {editing ? (
                        <input
                          type="url"
                          value={formData.twitter}
                          onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                          style={styles.socialInput}
                          placeholder="https://twitter.com/username"
                        />
                      ) : profile.twitter ? (
                        <a href={profile.twitter} target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
                          View Profile
                        </a>
                      ) : (
                        <p style={styles.socialValue}>Not connected</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Member Since Footer */}
              <div style={styles.footer}>
                <p style={styles.footerText}>
                  Member since {new Date(profile.createdAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
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
    padding: '40px 20px',
  },
  contentWrapper: {
    maxWidth: '900px',
    margin: '0 auto',
  },
  loadingContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    gap: '20px',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '4px solid rgba(255,255,255,0.3)',
    borderTop: '4px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    fontSize: '18px',
    color: 'white',
    fontWeight: 500,
  },
  errorText: {
    fontSize: '18px',
    color: 'white',
    fontWeight: 600,
    background: 'rgba(239, 68, 68, 0.9)',
    padding: '16px 32px',
    borderRadius: '12px',
  },
  retryButton: {
    padding: '12px 24px',
    background: 'white',
    color: '#667eea',
    border: 'none',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
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
  },
  alertIcon: {
    width: '20px',
    height: '20px',
  },
  profileCard: {
    background: 'white',
    borderRadius: '24px',
    overflow: 'hidden',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  },
  coverPhoto: {
    height: '200px',
    position: 'relative',
    overflow: 'hidden',
  },
  coverGradient: {
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
  },
  profileContent: {
    padding: '0 32px 32px',
  },
  avatarSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: '-80px',
    marginBottom: '32px',
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: '160px',
    height: '160px',
    borderRadius: '50%',
    border: '6px solid white',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    background: 'white',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    fontSize: '64px',
    fontWeight: 'bold',
  },
  cameraButton: {
    position: 'absolute',
    bottom: '8px',
    right: '8px',
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    border: '3px solid white',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
  },
  fileInput: {
    display: 'none',
  },
  actionButtons: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },
  editButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
  },
  saveButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #10b981, #059669)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'transform 0.2s',
    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
  },
  cancelButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    background: '#6b7280',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  deletePhotoButton: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    background: '#fef2f2',
    color: '#ef4444',
    border: '2px solid #fee2e2',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  profileInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  nameSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap',
  },
  name: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#1f2937',
    margin: 0,
  },
  nameInput: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#1f2937',
    border: 'none',
    borderBottom: '3px solid #667eea',
    outline: 'none',
    background: 'transparent',
    flex: 1,
    minWidth: '300px',
  },
  roleBadge: {
    padding: '8px 16px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: 600,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: 700,
    color: '#1f2937',
    margin: 0,
  },
  bioText: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#4b5563',
    margin: 0,
  },
  bioTextarea: {
    width: '100%',
    padding: '16px',
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#1f2937',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    resize: 'vertical',
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '16px',
  },
  infoCard: {
    display: 'flex',
    gap: '16px',
    padding: '20px',
    background: '#f9fafb',
    borderRadius: '16px',
    border: '2px solid #f3f4f6',
    transition: 'all 0.2s',
  },
  infoIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  infoContent: {
    flex: 1,
    minWidth: 0,
  },
  infoLabel: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    margin: '0 0 4px 0',
  },
  infoValue: {
    fontSize: '15px',
    fontWeight: 500,
    color: '#1f2937',
    margin: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  infoInput: {
    width: '100%',
    fontSize: '15px',
    fontWeight: 500,
    color: '#1f2937',
    border: 'none',
    borderBottom: '2px solid #667eea',
    outline: 'none',
    background: 'transparent',
    padding: '4px 0',
  },
  link: {
    fontSize: '15px',
    fontWeight: 500,
    color: '#667eea',
    textDecoration: 'none',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: 'block',
  },
  socialGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '16px',
  },
  socialCard: {
    display: 'flex',
    gap: '16px',
    padding: '20px',
    background: '#f9fafb',
    borderRadius: '16px',
    border: '2px solid #f3f4f6',
    transition: 'all 0.2s',
  },
  socialIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  socialContent: {
    flex: 1,
    minWidth: 0,
  },
  socialLabel: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    margin: '0 0 4px 0',
  },
  socialValue: {
    fontSize: '14px',
    fontWeight: 500,
    color: '#9ca3af',
    margin: 0,
  },
  socialInput: {
    width: '100%',
    fontSize: '14px',
    fontWeight: 500,
    color: '#1f2937',
    border: 'none',
    borderBottom: '2px solid #667eea',
    outline: 'none',
    background: 'transparent',
    padding: '4px 0',
  },
  socialLink: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#667eea',
    textDecoration: 'none',
  },
  footer: {
    paddingTop: '24px',
    borderTop: '2px solid #f3f4f6',
  },
  footerText: {
    fontSize: '14px',
    color: '#6b7280',
    textAlign: 'center',
    margin: 0,
  },
};

// Add keyframe animation for spinner
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  button:hover {
    transform: translateY(-2px);
  }
  
  button:active {
    transform: translateY(0);
  }
`;
document.head.appendChild(styleSheet);

export default ProfilePage;




