import React, { useState, useEffect } from 'react';
import { 
  HiUsers, 
  HiAcademicCap, 
  HiUserGroup, 
  HiCurrencyRupee,
  HiTrendingUp,
  HiClock,
  HiStar,
  HiRefresh
} from 'react-icons/hi';

const API_URL = 'http://localhost:5000/api/Admin';

interface DashboardStats {
  totalUsers: number;
  totalCourses: number;
  totalEnrollments: number;
  totalRevenue: number;
  recentEnrollments: Array<{
    id: number;
    userName: string;
    courseName: string;
    enrolledAt: string;
  }>;
  popularCourses: Array<{
    id: number;
    title: string;
    imageUrl: string;
    enrollmentCount: number;
  }>;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);
      
      console.log('📊 Fetching dashboard stats...');
      const response = await fetch(`${API_URL}/dashboard/stats`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ Dashboard data loaded:', data);
      setStats(data);
    } catch (err: any) {
      console.error('❌ Error fetching stats:', err);
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingContent}>
          <div style={styles.modernSpinner}>
            <div style={styles.spinnerRing}></div>
            <div style={styles.spinnerRing}></div>
            <div style={styles.spinnerRing}></div>
          </div>
          <h3 style={styles.loadingTitle}>Loading Dashboard</h3>
          <p style={styles.loadingText}>Fetching your analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorContainer}>
        <div style={styles.errorContent}>
          <div style={styles.errorIcon}>⚠️</div>
          <h2 style={styles.errorTitle}>Oops! Something went wrong</h2>
          <p style={styles.errorText}>{error}</p>
          <button onClick={() => fetchStats()} style={styles.retryButton}>
            <HiRefresh size={20} />
            Try Again
          </button>
          <div style={styles.errorTips}>
            <p style={styles.tipTitle}>💡 Quick Troubleshooting:</p>
            <ul style={styles.tipList}>
              <li>Check if the backend is running on port 5000</li>
              <li>Verify CORS is configured in Program.cs</li>
              <li>Ensure the database connection is active</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header with Refresh */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>📊 Dashboard Overview</h1>
          <p style={styles.subtitle}>Welcome back! Here's what's happening today.</p>
        </div>
        <button 
          onClick={() => fetchStats(true)} 
          style={{
            ...styles.refreshButton,
            ...(refreshing ? styles.refreshButtonActive : {})
          }}
          disabled={refreshing}
        >
          <HiRefresh size={20} style={{ transform: refreshing ? 'rotate(360deg)' : 'none', transition: 'transform 0.5s' }} />
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {/* Stats Grid */}
      <div style={styles.statsGrid}>
        <div style={{ ...styles.statCard, ...styles.statCard1 }}>
          <div style={styles.statIcon}>
            <HiUsers size={32} color="#667eea" />
          </div>
          <div style={styles.statContent}>
            <p style={styles.statLabel}>Total Users</p>
            <h2 style={styles.statValue}>{stats?.totalUsers?.toLocaleString() || 0}</h2>
            <div style={styles.statBadge}>
              <HiTrendingUp size={14} />
              <span>Active</span>
            </div>
          </div>
          <div style={styles.statGlow1}></div>
        </div>

        <div style={{ ...styles.statCard, ...styles.statCard2 }}>
          <div style={styles.statIcon}>
            <HiAcademicCap size={32} color="#f093fb" />
          </div>
          <div style={styles.statContent}>
            <p style={styles.statLabel}>Total Courses</p>
            <h2 style={styles.statValue}>{stats?.totalCourses?.toLocaleString() || 0}</h2>
            <div style={styles.statBadge}>
              <HiStar size={14} />
              <span>Published</span>
            </div>
          </div>
          <div style={styles.statGlow2}></div>
        </div>

        <div style={{ ...styles.statCard, ...styles.statCard3 }}>
          <div style={styles.statIcon}>
            <HiUserGroup size={32} color="#4ade80" />
          </div>
          <div style={styles.statContent}>
            <p style={styles.statLabel}>Enrollments</p>
            <h2 style={styles.statValue}>{stats?.totalEnrollments?.toLocaleString() || 0}</h2>
            <div style={styles.statBadge}>
              <HiTrendingUp size={14} />
              <span>Growing</span>
            </div>
          </div>
          <div style={styles.statGlow3}></div>
        </div>

        <div style={{ ...styles.statCard, ...styles.statCard4 }}>
          <div style={styles.statIcon}>
            <HiCurrencyRupee size={32} color="#fbbf24" />
          </div>
          <div style={styles.statContent}>
            <p style={styles.statLabel}>Total Revenue</p>
            <h2 style={styles.statValue}>₹{stats?.totalRevenue?.toLocaleString() || 0}</h2>
            <div style={styles.statBadge}>
              <HiTrendingUp size={14} />
              <span>+12.5%</span>
            </div>
          </div>
          <div style={styles.statGlow4}></div>
        </div>
      </div>

      {/* Content Grid */}
      <div style={styles.contentGrid}>
        {/* Recent Enrollments */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <div>
              <h2 style={styles.sectionTitle}>🎓 Recent Enrollments</h2>
              <p style={styles.sectionSubtitle}>Latest student registrations</p>
            </div>
            <HiClock size={24} color="#9ca3af" />
          </div>
          
          {stats?.recentEnrollments && stats.recentEnrollments.length > 0 ? (
            <div style={styles.enrollmentList}>
              {stats.recentEnrollments.map((enrollment, index) => (
                <div 
                  key={enrollment.id} 
                  style={{
                    ...styles.enrollmentItem,
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div style={styles.enrollmentAvatar}>
                    {enrollment.userName.charAt(0).toUpperCase()}
                  </div>
                  <div style={styles.enrollmentContent}>
                    <h4 style={styles.enrollmentName}>{enrollment.userName}</h4>
                    <p style={styles.enrollmentCourse}>{enrollment.courseName}</p>
                  </div>
                  <div style={styles.enrollmentDate}>
                    {new Date(enrollment.enrolledAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>📚</div>
              <p style={styles.emptyText}>No enrollments yet</p>
              <p style={styles.emptySubtext}>Start by adding some courses!</p>
            </div>
          )}
        </div>

        {/* Popular Courses */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <div>
              <h2 style={styles.sectionTitle}>🔥 Popular Courses</h2>
              <p style={styles.sectionSubtitle}>Top performing courses</p>
            </div>
            <HiStar size={24} color="#fbbf24" />
          </div>
          
          {stats?.popularCourses && stats.popularCourses.length > 0 ? (
            <div style={styles.courseGrid}>
              {stats.popularCourses.map((course, index) => (
                <div 
                  key={course.id} 
                  style={{
                    ...styles.courseCard,
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <div style={styles.courseImageContainer}>
                    <img 
                      src={course.imageUrl || 'https://via.placeholder.com/300x160/667eea/ffffff?text=Course'}
                      alt={course.title}
                      style={styles.courseImage}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x160/667eea/ffffff?text=Course';
                      }}
                    />
                    <div style={styles.courseOverlay}>
                      <div style={styles.enrollmentBadge}>
                        <HiUserGroup size={16} />
                        <span>{course.enrollmentCount}</span>
                      </div>
                    </div>
                  </div>
                  <div style={styles.courseInfo}>
                    <h4 style={styles.courseTitle}>{course.title}</h4>
                    <p style={styles.courseEnrollments}>
                      {course.enrollmentCount} {course.enrollmentCount === 1 ? 'student' : 'students'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>🎯</div>
              <p style={styles.emptyText}>No popular courses yet</p>
              <p style={styles.emptySubtext}>Courses will appear here as students enroll!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: '1600px',
    margin: '0 auto',
    padding: '0',
  },
  
  // Header
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
    flexWrap: 'wrap',
    gap: '16px',
  },
  title: {
    fontSize: '36px',
    fontWeight: 900,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: '0 0 8px 0',
    letterSpacing: '-0.5px',
  },
  subtitle: {
    fontSize: '16px',
    color: '#6b7280',
    margin: 0,
  },
  refreshButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    background: 'white',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    color: '#1f2937',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  refreshButtonActive: {
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    borderColor: 'transparent',
  },
  
  // Stats Grid
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
    marginBottom: '32px',
  },
  statCard: {
    position: 'relative',
    background: 'white',
    borderRadius: '24px',
    padding: '28px',
    display: 'flex',
    gap: '20px',
    alignItems: 'flex-start',
    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
    overflow: 'hidden',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    animation: 'slideUp 0.6s ease-out',
  },
  statCard1: { animationDelay: '0s' },
  statCard2: { animationDelay: '0.1s' },
  statCard3: { animationDelay: '0.2s' },
  statCard4: { animationDelay: '0.3s' },
  statIcon: {
    width: '64px',
    height: '64px',
    borderRadius: '16px',
    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  statContent: {
    flex: 1,
  },
  statLabel: {
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: 600,
    marginBottom: '8px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  statValue: {
    fontSize: '36px',
    fontWeight: 900,
    color: '#1f2937',
    margin: '0 0 8px 0',
    lineHeight: 1,
  },
  statBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 12px',
    background: '#dcfce7',
    color: '#16a34a',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 700,
  },
  statGlow1: {
    position: 'absolute',
    top: '-50%',
    right: '-50%',
    width: '200px',
    height: '200px',
    background: 'radial-gradient(circle, rgba(102, 126, 234, 0.15), transparent)',
    borderRadius: '50%',
  },
  statGlow2: {
    position: 'absolute',
    top: '-50%',
    right: '-50%',
    width: '200px',
    height: '200px',
    background: 'radial-gradient(circle, rgba(240, 147, 251, 0.15), transparent)',
    borderRadius: '50%',
  },
  statGlow3: {
    position: 'absolute',
    top: '-50%',
    right: '-50%',
    width: '200px',
    height: '200px',
    background: 'radial-gradient(circle, rgba(74, 222, 128, 0.15), transparent)',
    borderRadius: '50%',
  },
  statGlow4: {
    position: 'absolute',
    top: '-50%',
    right: '-50%',
    width: '200px',
    height: '200px',
    background: 'radial-gradient(circle, rgba(251, 191, 36, 0.15), transparent)',
    borderRadius: '50%',
  },
  
  // Content Grid
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
    gap: '24px',
  },
  section: {
    background: 'white',
    borderRadius: '24px',
    padding: '28px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
    animation: 'slideUp 0.6s ease-out 0.4s both',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '24px',
  },
  sectionTitle: {
    fontSize: '22px',
    fontWeight: 800,
    color: '#1f2937',
    margin: '0 0 4px 0',
  },
  sectionSubtitle: {
    fontSize: '14px',
    color: '#9ca3af',
    margin: 0,
  },
  
  // Enrollments
  enrollmentList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  enrollmentItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px',
    background: '#f9fafb',
    borderRadius: '16px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    animation: 'fadeIn 0.5s ease-out',
  },
  enrollmentAvatar: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    fontWeight: 700,
    flexShrink: 0,
  },
  enrollmentContent: {
    flex: 1,
    minWidth: 0,
  },
  enrollmentName: {
    fontSize: '16px',
    fontWeight: 700,
    color: '#1f2937',
    margin: '0 0 4px 0',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  enrollmentCourse: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  enrollmentDate: {
    fontSize: '13px',
    color: '#9ca3af',
    fontWeight: 600,
    flexShrink: 0,
  },
  
  // Courses
  courseGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '16px',
  },
  courseCard: {
    background: '#f9fafb',
    borderRadius: '16px',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    animation: 'fadeIn 0.5s ease-out',
  },
  courseImageContainer: {
    position: 'relative',
    width: '100%',
    paddingTop: '56.25%',
    overflow: 'hidden',
  },
  courseImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  courseOverlay: {
    position: 'absolute',
    top: '12px',
    right: '12px',
  },
  enrollmentBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: 700,
    color: '#1f2937',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  },
  courseInfo: {
    padding: '16px',
  },
  courseTitle: {
    fontSize: '15px',
    fontWeight: 700,
    color: '#1f2937',
    margin: '0 0 6px 0',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  courseEnrollments: {
    fontSize: '13px',
    color: '#6b7280',
    margin: 0,
  },
  
  // Empty State
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
  },
  emptyIcon: {
    fontSize: '64px',
    marginBottom: '16px',
  },
  emptyText: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#1f2937',
    margin: '0 0 8px 0',
  },
  emptySubtext: {
    fontSize: '15px',
    color: '#9ca3af',
    margin: 0,
  },
  
  // Loading
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '600px',
  },
  loadingContent: {
    textAlign: 'center',
  },
  modernSpinner: {
    position: 'relative',
    width: '80px',
    height: '80px',
    margin: '0 auto 24px',
  },
  spinnerRing: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    border: '4px solid transparent',
    borderTopColor: '#667eea',
    borderRadius: '50%',
    animation: 'spin 1.5s cubic-bezier(0.5, 0, 0.5, 1) infinite',
  },
  loadingTitle: {
    fontSize: '24px',
    fontWeight: 800,
    color: '#1f2937',
    margin: '0 0 8px 0',
  },
  loadingText: {
    fontSize: '16px',
    color: '#6b7280',
    margin: 0,
  },
  
  // Error
  errorContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '600px',
    padding: '20px',
  },
  errorContent: {
    maxWidth: '500px',
    textAlign: 'center',
    background: 'white',
    padding: '48px',
    borderRadius: '24px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
  },
  errorIcon: {
    fontSize: '64px',
    marginBottom: '24px',
  },
  errorTitle: {
    fontSize: '28px',
    fontWeight: 800,
    color: '#1f2937',
    margin: '0 0 12px 0',
  },
  errorText: {
    fontSize: '16px',
    color: '#6b7280',
    marginBottom: '32px',
    lineHeight: 1.6,
  },
  retryButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '14px 32px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 16px rgba(102, 126, 234, 0.3)',
  },
  errorTips: {
    marginTop: '32px',
    padding: '20px',
    background: '#f9fafb',
    borderRadius: '12px',
    textAlign: 'left',
  },
  tipTitle: {
    fontSize: '14px',
    fontWeight: 700,
    color: '#1f2937',
    marginBottom: '12px',
  },
  tipList: {
    margin: 0,
    paddingLeft: '20px',
    fontSize: '14px',
    color: '#6b7280',
    lineHeight: 1.8,
  },
};

// Enhanced animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  [style*="statCard"]:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.12) !important;
  }
  
  [style*="enrollmentItem"]:hover {
    background: white !important;
    transform: translateX(4px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }
  
  [style*="courseCard"]:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  }
  
  [style*="courseCard"]:hover img {
    transform: scale(1.05);
  }
  
  [style*="refreshButton"]:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.1) !important;
  }
  
  [style*="retryButton"]:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4) !important;
  }
  
  [style*="courseImage"] {
    transition: transform 0.3s ease;
  }
  
  [style*="modernSpinner"] div:nth-child(1) {
    animation-delay: -0.45s;
  }
  
  [style*="modernSpinner"] div:nth-child(2) {
    animation-delay: -0.3s;
  }
  
  [style*="modernSpinner"] div:nth-child(3) {
    animation-delay: -0.15s;
  }
`;
document.head.appendChild(styleSheet);

export default AdminDashboard;