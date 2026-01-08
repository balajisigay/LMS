import React, { useState, useEffect } from 'react';
import { 
  HiHome, HiUsers, HiAcademicCap, HiMail, HiCreditCard, HiUserGroup,
  HiSearch, HiTrash, HiPencil, HiEye, HiChevronLeft, HiChevronRight,
  HiPlus, HiX, HiCheckCircle, HiExclamationCircle, HiMenu, HiLogout,
  HiTrendingUp, HiClock, HiStar, HiRefresh, HiCurrencyRupee
} from 'react-icons/hi';

const API_URL = 'http://localhost:5000/api';

// ==================== TYPES ====================
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

interface User {
  id: number;
  fullName: string;
  email: string;
  role: string;
  profileImageUrl: string | null;
  createdAt: string;
}

interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  studentCount: number;
  rating: number;
  imageUrl: string;
  instructorId: number;
  instructorName: string;
  createdAt: string;
  whatYouLearn?: string[];
  includes?: string[];
  companies?: string[];
}

interface Instructor {
  id: number;
  name: string;
  title: string;
  rating: number;
  students: number;
  courses: number;
  imageUrl: string;
}

interface Enrollment {
  id: number;
  userId: string;
  userName: string;
  courseId: number;
  courseName: string;
  enrolledAt: string;
}

interface Payment {
  id: number;
  userId: string;
  userName: string;
  courseId: number;
  courseName: string;
  amount: number;
  status: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  createdAt: string;
  paidAt: string | null;
}

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

interface CourseFormData {
  title: string;
  description: string;
  category: string;
  price: number;
  imageUrl: string;
  instructorId: number;
  whatYouLearn: string;
  includes: string;
  companies: string;
}

// ==================== MAIN COMPONENT ====================
const CompleteLMSAdmin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('adminUser');
      window.location.href = '/login';
    }
  };

  return (
    <div style={styles.container}>
      {notification && (
        <div style={{
          ...styles.notification,
          ...(notification.type === 'success' ? styles.notificationSuccess : styles.notificationError)
        }}>
          {notification.type === 'success' ? <HiCheckCircle size={24} /> : <HiExclamationCircle size={24} />}
          <span>{notification.message}</span>
        </div>
      )}

      <aside style={{...styles.sidebar, width: sidebarOpen ? '280px' : '80px'}}>
        <div style={styles.sidebarHeader}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>A</div>
            {sidebarOpen && <span style={styles.logoText}>Admin Panel</span>}
          </div>
        </div>

        <nav style={styles.nav}>
          {[
            { id: 'dashboard', label: 'Dashboard', icon: <HiHome size={20} /> },
            { id: 'users', label: 'Users', icon: <HiUsers size={20} /> },
            { id: 'courses', label: 'Courses', icon: <HiAcademicCap size={20} /> },
            { id: 'enrollments', label: 'Enrollments', icon: <HiUserGroup size={20} /> },
            { id: 'payments', label: 'Payments', icon: <HiCreditCard size={20} /> },
            { id: 'messages', label: 'Messages', icon: <HiMail size={20} /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                ...styles.navItem,
                ...(activeTab === item.id ? styles.navItemActive : {})
              }}
            >
              <span style={styles.navIcon}>{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <button style={styles.logoutButton} onClick={handleLogout}>
          <HiLogout size={20} />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </aside>

      <main style={styles.main}>
        <header style={styles.header}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={styles.menuButton}>
            {sidebarOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
          <div style={styles.adminProfile}>
            <div style={styles.adminAvatar}>A</div>
            <span style={styles.adminName}>Admin</span>
          </div>
        </header>

        <div style={styles.content}>
          {activeTab === 'dashboard' && <DashboardTab showNotification={showNotification} />}
          {activeTab === 'users' && <UsersTab showNotification={showNotification} />}
          {activeTab === 'courses' && <CoursesTab showNotification={showNotification} />}
          {activeTab === 'enrollments' && <EnrollmentsTab showNotification={showNotification} />}
          {activeTab === 'payments' && <PaymentsTab showNotification={showNotification} />}
          {activeTab === 'messages' && <MessagesTab showNotification={showNotification} />}
        </div>
      </main>
    </div>
  );
};

// ==================== DASHBOARD TAB ====================
const DashboardTab: React.FC<{showNotification: (type: 'success' | 'error', message: string) => void}> = ({ showNotification }) => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/Admin/dashboard/stats`);
      if (!response.ok) throw new Error('Failed to fetch stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      showNotification('error', 'Failed to load dashboard stats');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div>
      <div style={styles.dashboardHeader}>
        <div>
          <h1 style={styles.pageTitle}>📊 Dashboard Overview</h1>
          <p style={styles.pageSubtitle}>Welcome back! Here's what's happening today.</p>
        </div>
        <button onClick={fetchStats} style={styles.refreshButton}>
          <HiRefresh size={20} />
          Refresh
        </button>
      </div>

      <div style={styles.statsGrid}>
        {[
          { label: 'Total Users', value: stats?.totalUsers || 0, icon: <HiUsers size={32} color="#667eea" />, gradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
          { label: 'Total Courses', value: stats?.totalCourses || 0, icon: <HiAcademicCap size={32} color="#f093fb" />, gradient: 'linear-gradient(135deg, #f093fb, #f5576c)' },
          { label: 'Enrollments', value: stats?.totalEnrollments || 0, icon: <HiUserGroup size={32} color="#4ade80" />, gradient: 'linear-gradient(135deg, #4ade80, #22c55e)' },
          { label: 'Total Revenue', value: `₹${stats?.totalRevenue.toLocaleString() || 0}`, icon: <HiCurrencyRupee size={32} color="#fbbf24" />, gradient: 'linear-gradient(135deg, #fbbf24, #f59e0b)' },
        ].map((stat, idx) => (
          <div key={idx} style={{...styles.statCard, animationDelay: `${idx * 0.1}s`}}>
            <div style={styles.statIcon}>{stat.icon}</div>
            <div style={styles.statContent}>
              <p style={styles.statLabel}>{stat.label}</p>
              <h2 style={styles.statValue}>{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.dashboardGrid}>
        <div style={styles.dashboardSection}>
          <h2 style={styles.sectionTitle}>🎓 Recent Enrollments</h2>
          {stats?.recentEnrollments && stats.recentEnrollments.length > 0 ? (
            <div style={styles.enrollmentList}>
              {stats.recentEnrollments.map((enrollment) => (
                <div key={enrollment.id} style={styles.enrollmentItem}>
                  <div style={styles.enrollmentAvatar}>
                    {enrollment.userName.charAt(0).toUpperCase()}
                  </div>
                  <div style={styles.enrollmentContent}>
                    <h4 style={styles.enrollmentName}>{enrollment.userName}</h4>
                    <p style={styles.enrollmentCourse}>{enrollment.courseName}</p>
                  </div>
                  <div style={styles.enrollmentDate}>
                    {new Date(enrollment.enrolledAt).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>📚</div>
              <p style={styles.emptyText}>No enrollments yet</p>
            </div>
          )}
        </div>

        <div style={styles.dashboardSection}>
          <h2 style={styles.sectionTitle}>🔥 Popular Courses</h2>
          {stats?.popularCourses && stats.popularCourses.length > 0 ? (
            <div style={styles.popularCoursesGrid}>
              {stats.popularCourses.map((course) => (
                <div key={course.id} style={styles.popularCourseCard}>
                  <img src={course.imageUrl} alt={course.title} style={styles.popularCourseImage} />
                  <div style={styles.popularCourseInfo}>
                    <h4 style={styles.popularCourseTitle}>{course.title}</h4>
                    <div style={styles.popularCourseStats}>
                      <HiUserGroup size={16} />
                      <span>{course.enrollmentCount} students</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>🎯</div>
              <p style={styles.emptyText}>No popular courses yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ==================== USERS TAB ====================
const UsersTab: React.FC<{showNotification: (type: 'success' | 'error', message: string) => void}> = ({ showNotification }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    loadUsers();
  }, [page]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/Admin/users?page=${page}&pageSize=10`);
      const data = await response.json();
      setUsers(data.users);
      setTotalPages(data.totalPages);
    } catch (error) {
      showNotification('error', 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRole = async (userId: number) => {
    try {
      const response = await fetch(`${API_URL}/Admin/users/${userId}/role`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole })
      });
      if (response.ok) {
        showNotification('success', 'Role updated successfully!');
        setEditingUser(null);
        loadUsers();
      }
    } catch (error) {
      showNotification('error', 'Failed to update role');
    }
  };

  const handleDeleteUser = async (userId: number, userName: string) => {
    if (!confirm(`Delete user "${userName}"?`)) return;
    try {
      const response = await fetch(`${API_URL}/Admin/users/${userId}`, { method: 'DELETE' });
      if (response.ok) {
        showNotification('success', 'User deleted successfully!');
        loadUsers();
      }
    } catch (error) {
      showNotification('error', 'Failed to delete user');
    }
  };

  const filteredUsers = users.filter(user =>
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div style={styles.loadingContainer}><div style={styles.spinner}></div></div>;

  return (
    <div>
      <h1 style={styles.pageTitle}>👥 User Management</h1>
      
      <div style={styles.searchWrapper}>
        <HiSearch size={20} style={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      <div style={styles.tableCard}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>User</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Role</th>
              <th style={styles.th}>Joined</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} style={styles.tr}>
                <td style={styles.td}>
                  <div style={styles.userCell}>
                    <div style={styles.tableAvatar}>
                      {user.fullName.charAt(0).toUpperCase()}
                    </div>
                    <span>{user.fullName}</span>
                  </div>
                </td>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>
                  {editingUser?.id === user.id ? (
                    <select value={newRole} onChange={(e) => setNewRole(e.target.value)} style={styles.roleSelect}>
                      <option value="Student">Student</option>
                      <option value="Instructor">Instructor</option>
                      <option value="Admin">Admin</option>
                    </select>
                  ) : (
                    <span style={styles.roleBadge}>{user.role}</span>
                  )}
                </td>
                <td style={styles.td}>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td style={styles.td}>
                  <div style={styles.actions}>
                    {editingUser?.id === user.id ? (
                      <>
                        <button onClick={() => handleUpdateRole(user.id)} style={styles.saveButton}>Save</button>
                        <button onClick={() => setEditingUser(null)} style={styles.cancelButton}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => { setEditingUser(user); setNewRole(user.role); }} style={styles.editButton}>
                          <HiPencil size={16} />
                        </button>
                        <button onClick={() => handleDeleteUser(user.id, user.fullName)} style={styles.deleteButton}>
                          <HiTrash size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={styles.pagination}>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{...styles.pageButton, ...(page === 1 ? styles.pageButtonDisabled : {})}}>
            <HiChevronLeft size={20} /> Previous
          </button>
          <span style={styles.pageInfo}>Page {page} of {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{...styles.pageButton, ...(page === totalPages ? styles.pageButtonDisabled : {})}}>
            Next <HiChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

// ==================== COURSES TAB ====================
const CoursesTab: React.FC<{showNotification: (type: 'success' | 'error', message: string) => void}> = ({ showNotification }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view'>('add');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState<CourseFormData>({
    title: '', description: '', category: 'Development', price: 0,
    imageUrl: '', instructorId: 0, whatYouLearn: '', includes: '', companies: ''
  });

  useEffect(() => {
    loadCourses();
    loadInstructors();
  }, [page]);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/Admin/courses?page=${page}&pageSize=10`);
      const data = await response.json();
      setCourses(data.courses);
      setTotalPages(data.totalPages);
    } catch (error) {
      showNotification('error', 'Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const loadInstructors = async () => {
    try {
      const response = await fetch(`${API_URL}/Admin/instructors`);
      const data = await response.json();
      setInstructors(data);
    } catch (error) {
      console.error('Error loading instructors:', error);
    }
  };

  const handleAddCourse = () => {
    setModalMode('add');
    setFormData({
      title: '', description: '', category: 'Development', price: 0,
      imageUrl: '', instructorId: instructors.length > 0 ? instructors[0].id : 0,
      whatYouLearn: '', includes: '', companies: ''
    });
    setShowModal(true);
  };

  const handleEditCourse = (course: Course) => {
    setModalMode('edit');
    setSelectedCourse(course);
    setFormData({
      title: course.title, description: course.description, category: course.category,
      price: course.price, imageUrl: course.imageUrl, instructorId: course.instructorId,
      whatYouLearn: course.whatYouLearn?.join('\n') || '',
      includes: course.includes?.join('\n') || '',
      companies: course.companies?.join('\n') || ''
    });
    setShowModal(true);
  };

const handleSubmitCourse = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const payload = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      subcategory: "",
      price: Number(formData.price),
      originalPrice: Number(formData.price) + 500,
      badge: "Bestseller",
      instructorId: Number(formData.instructorId),
      imageUrl: formData.imageUrl,
      whatYouLearn: formData.whatYouLearn
        .split("\n")
        .map(s => s.trim())
        .filter(Boolean),
      includes: [],
      companies: []
    };

    console.log("CREATE COURSE PAYLOAD:", payload);

    const response = await fetch(`${API_URL}/Admin/courses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("API ERROR:", data);
      throw new Error(data.message || "Failed to create course");
    }

    showNotification("success", "Course created successfully!");
    setShowModal(false);
    loadCourses();

  } catch (err: any) {
    console.error("CREATE COURSE ERROR:", err);
    showNotification("error", err.message || "Course creation failed");
  }
};



  const handleDeleteCourse = async (courseId: number, courseTitle: string) => {
    if (!confirm(`Delete "${courseTitle}"?`)) return;
    try {
      const response = await fetch(`${API_URL}/Courses/${courseId}`, { method: 'DELETE' });
      if (response.ok) {
        showNotification('success', 'Course deleted successfully!');
        loadCourses();
      }
    } catch (error) {
      showNotification('error', 'Failed to delete course');
    }
  };

  if (loading) return <div style={styles.loadingContainer}><div style={styles.spinner}></div></div>;

  return (
    <div>
      <div style={styles.sectionHeader}>
        <h1 style={styles.pageTitle}>📚 Course Management</h1>
        <button onClick={handleAddCourse} style={styles.addButton}>
          <HiPlus size={20} /> Add Course
        </button>
      </div>

      <div style={styles.coursesGrid}>
        {courses.map((course) => (
          <div key={course.id} style={styles.courseCard}>
            <div style={styles.courseImageContainer}>
              <img src={course.imageUrl} alt={course.title} style={styles.courseImage} />
              <div style={styles.courseOverlay}>
                <button onClick={() => handleEditCourse(course)} style={styles.overlayButton}>
                  <HiPencil size={18} />
                </button>
                <button onClick={() => handleDeleteCourse(course.id, course.title)} style={{...styles.overlayButton, background: '#ef4444'}}>
                  <HiTrash size={18} />
                </button>
              </div>
            </div>
            <div style={styles.courseContent}>
              <div style={styles.categoryBadge}>{course.category}</div>
              <h3 style={styles.courseTitle}>{course.title}</h3>
              <p style={styles.instructorName}>By {course.instructorName}</p>
              <div style={styles.courseStats}>
                <div style={styles.stat}><span>⭐</span> {course.rating.toFixed(1)}</div>
                <div style={styles.stat}><span>👥</span> {course.studentCount}</div>
                <div style={styles.stat}><span>💰</span> ₹{course.price}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.pagination}>
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{...styles.pageButton, ...(page === 1 ? styles.pageButtonDisabled : {})}}>
          <HiChevronLeft size={20} /> Previous
        </button>
        <span style={styles.pageInfo}>Page {page} of {totalPages}</span>
        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{...styles.pageButton, ...(page === totalPages ? styles.pageButtonDisabled : {})}}>
          Next <HiChevronRight size={20} />
        </button>
      </div>

      {showModal && (
        <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>{modalMode === 'add' ? '➕ Add Course' : '✏️ Edit Course'}</h2>
              <button onClick={() => setShowModal(false)} style={styles.modalClose}><HiX size={24} /></button>
            </div>
            <div style={styles.modalBody}>
              <form onSubmit={handleSubmitCourse} style={styles.form}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Course Title *</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.title} 
                    onChange={(e) => setFormData({...formData, title: e.target.value})} 
                    placeholder="e.g., Complete Python Programming" 
                    style={styles.input} 
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Description *</label>
                  <textarea 
                    required 
                    value={formData.description} 
                    onChange={(e) => setFormData({...formData, description: e.target.value})} 
                    placeholder="Detailed course description" 
                    style={styles.textarea} 
                    rows={4} 
                  />
                </div>

                <div style={styles.formRow}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Category *</label>
                    <select 
                      required 
                      value={formData.category} 
                      onChange={(e) => setFormData({...formData, category: e.target.value})} 
                      style={styles.select}
                    >
                      {['Development', 'Design', 'Marketing', 'IT & Software', 'Personal Growth', 'Business', 'Data Science'].map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Price (₹) *</label>
                    <input 
                      type="number" 
                      required 
                      min="0"
                      step="0.01"
                      value={formData.price} 
                      onChange={(e) => setFormData({...formData, price: Number(e.target.value)})} 
                      placeholder="19.99" 
                      style={styles.input} 
                    />
                  </div>
                </div>

                <div style={styles.formRow}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Instructor *</label>
                    <select 
                      required 
                      value={formData.instructorId} 
                      onChange={(e) => setFormData({...formData, instructorId: Number(e.target.value)})} 
                      style={styles.select}
                    >
                      <option value="">Select Instructor</option>
                      {instructors.map(inst => (
                        <option key={inst.id} value={inst.id}>{inst.name}</option>
                      ))}
                    </select>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Image URL *</label>
                    <input 
                      type="url" 
                      required 
                      value={formData.imageUrl} 
                      onChange={(e) => setFormData({...formData, imageUrl: e.target.value})} 
                      placeholder="https://example.com/image.jpg" 
                      style={styles.input} 
                    />
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>What You'll Learn (one per line)</label>
                  <textarea 
                    value={formData.whatYouLearn} 
                    onChange={(e) => setFormData({...formData, whatYouLearn: e.target.value})} 
                    placeholder="Python Basics&#10;OOP Concepts&#10;Web Development&#10;Data Analysis" 
                    style={styles.textarea} 
                    rows={4} 
                  />
                </div>

                <div style={styles.formActions}>
                  <button type="button" onClick={() => setShowModal(false)} style={styles.cancelButton}>Cancel</button>
                  <button type="submit" style={styles.submitButton}>
                    {modalMode === 'add' ? '✓ Create Course' : '✓ Update Course'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ==================== ENROLLMENTS TAB ====================
const EnrollmentsTab: React.FC<{showNotification: (type: 'success' | 'error', message: string) => void}> = ({ showNotification }) => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadEnrollments();
  }, [page]);

  const loadEnrollments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/Admin/enrollments?page=${page}&pageSize=10`);
      const data = await response.json();
      setEnrollments(data.enrollments);
      setTotalPages(data.totalPages);
    } catch (error) {
      showNotification('error', 'Failed to load enrollments');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={styles.loadingContainer}><div style={styles.spinner}></div></div>;

  return (
    <div>
      <h1 style={styles.pageTitle}>🎓 Enrollment Management</h1>
      
      <div style={styles.tableCard}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Student</th>
              <th style={styles.th}>Course</th>
              <th style={styles.th}>Enrolled Date</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map((enrollment) => (
              <tr key={enrollment.id} style={styles.tr}>
                <td style={styles.td}>{enrollment.userName}</td>
                <td style={styles.td}>{enrollment.courseName}</td>
                <td style={styles.td}>{new Date(enrollment.enrolledAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={styles.pagination}>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{...styles.pageButton, ...(page === 1 ? styles.pageButtonDisabled : {})}}>
            <HiChevronLeft size={20} /> Previous
          </button>
          <span style={styles.pageInfo}>Page {page} of {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{...styles.pageButton, ...(page === totalPages ? styles.pageButtonDisabled : {})}}>
            Next <HiChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

// ==================== STYLES ====================
const styles: Record<string, React.CSSProperties> = {
  container: { display: 'flex', minHeight: '100vh', background: '#f3f4f6' },
  sidebar: { background: '#1f2937', display: 'flex', flexDirection: 'column', transition: 'width 0.3s', position: 'sticky', top: 0, height: '100vh' },
  sidebarHeader: { padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)' },
  logo: { display: 'flex', alignItems: 'center', gap: '12px' },
  logoIcon: { width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold' },
  logoText: { fontSize: '18px', fontWeight: 700, color: 'white' },
  nav: { flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' },
  navItem: { display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', color: '#9ca3af', fontSize: '15px', fontWeight: 500, cursor: 'pointer', border: 'none', background: 'transparent', width: '100%', textAlign: 'left', transition: 'all 0.2s' },
  navItemActive: { background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white' },
  navIcon: { display: 'flex' },
  logoutButton: { margin: '16px', padding: '12px 16px', borderRadius: '10px', border: 'none', background: '#ef4444', color: 'white', fontSize: '15px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' },
  main: { flex: 1, display: 'flex', flexDirection: 'column' },
  header: { background: 'white', padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 10 },
  menuButton: { width: '44px', height: '44px', borderRadius: '10px', border: 'none', background: '#f3f4f6', color: '#1f2937', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
  adminProfile: { display: 'flex', alignItems: 'center', gap: '12px' },
  adminAvatar: { width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 'bold' },
  adminName: { fontSize: '15px', fontWeight: 600, color: '#1f2937' },
  content: { flex: 1, padding: '32px', overflow: 'auto' },
  notification: { position: 'fixed', top: '20px', right: '20px', padding: '16px 24px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 600, fontSize: '15px', zIndex: 10000, boxShadow: '0 10px 40px rgba(0,0,0,0.2)' },
  notificationSuccess: { background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white' },
  notificationError: { background: 'linear-gradient(135deg, #ef4444, #dc2626)', color: 'white' },
  loadingContainer: { minHeight: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
  spinner: { width: '50px', height: '50px', border: '4px solid #e5e7eb', borderTop: '4px solid #667eea', borderRadius: '50%', animation: 'spin 1s linear infinite' },
  loadingText: { marginTop: '20px', fontSize: '16px', color: '#6b7280' },
  dashboardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' },
  pageTitle: { fontSize: '36px', fontWeight: 900, background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: '0 0 8px 0' },
  pageSubtitle: { fontSize: '16px', color: '#6b7280', margin: 0 },
  refreshButton: { display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: 'white', border: '2px solid #e5e7eb', borderRadius: '12px', color: '#1f2937', fontSize: '15px', fontWeight: 600, cursor: 'pointer' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '32px' },
  statCard: { background: 'white', borderRadius: '24px', padding: '28px', display: 'flex', gap: '20px', alignItems: 'flex-start', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', animation: 'slideUp 0.6s ease-out' },
  statIcon: { width: '64px', height: '64px', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  statContent: { flex: 1 },
  statLabel: { fontSize: '14px', color: '#6b7280', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' },
  statValue: { fontSize: '36px', fontWeight: 900, color: '#1f2937', margin: '0' },
  dashboardGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '24px' },
  dashboardSection: { background: 'white', borderRadius: '24px', padding: '28px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' },
  sectionTitle: { fontSize: '22px', fontWeight: 800, color: '#1f2937', margin: '0 0 24px 0' },
  enrollmentList: { display: 'flex', flexDirection: 'column', gap: '12px' },
  enrollmentItem: { display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: '#f9fafb', borderRadius: '16px', cursor: 'pointer', transition: 'all 0.3s' },
  enrollmentAvatar: { width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 700 },
  enrollmentContent: { flex: 1 },
  enrollmentName: { fontSize: '16px', fontWeight: 700, color: '#1f2937', margin: '0 0 4px 0' },
  enrollmentCourse: { fontSize: '14px', color: '#6b7280', margin: 0 },
  enrollmentDate: { fontSize: '13px', color: '#9ca3af', fontWeight: 600 },
  popularCoursesGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' },
  popularCourseCard: { background: '#f9fafb', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.3s' },
  popularCourseImage: { width: '100%', height: '120px', objectFit: 'cover' },
  popularCourseInfo: { padding: '16px' },
  popularCourseTitle: { fontSize: '15px', fontWeight: 700, color: '#1f2937', margin: '0 0 8px 0' },
  popularCourseStats: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#6b7280' },
  emptyState: { textAlign: 'center', padding: '60px 20px' },
  emptyIcon: { fontSize: '64px', marginBottom: '16px' },
  emptyText: { fontSize: '18px', fontWeight: 700, color: '#1f2937' },
  searchWrapper: { position: 'relative', maxWidth: '500px', marginBottom: '24px' },
  searchIcon: { position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', pointerEvents: 'none' },
  searchInput: { width: '100%', padding: '14px 16px 14px 48px', fontSize: '15px', border: '2px solid #e5e7eb', borderRadius: '12px', outline: 'none' },
  tableCard: { background: 'white', borderRadius: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '16px 20px', fontSize: '13px', fontWeight: 600, color: '#6b7280', background: '#f9fafb', borderBottom: '2px solid #e5e7eb', textTransform: 'uppercase' },
  tr: { borderBottom: '1px solid #f3f4f6', transition: 'background 0.2s' },
  td: { padding: '16px 20px', fontSize: '14px', color: '#1f2937' },
  userCell: { display: 'flex', alignItems: 'center', gap: '12px' },
  tableAvatar: { width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 'bold' },
  roleBadge: { display: 'inline-block', padding: '6px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, background: '#f3f4f6', color: '#1f2937' },
roleSelect: {
  padding: '6px 12px',
  borderRadius: '8px',
  border: '2px solid #667eea',
  fontSize: '13px',
  fontWeight: 600
},
  actions: { display: 'flex', gap: '8px' },
  editButton: { width: '36px', height: '36px', borderRadius: '8px', border: 'none', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
  deleteButton: { width: '36px', height: '36px', borderRadius: '8px', border: 'none', background: '#fef2f2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
  saveButton: { padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#10b981', color: 'white', fontSize: '13px', fontWeight: 600, cursor: 'pointer' },
  cancelButton: { padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#6b7280', color: 'white', fontSize: '13px', fontWeight: 600, cursor: 'pointer' },
  pagination: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderTop: '1px solid #f3f4f6' },
  pageButton: { padding: '10px 16px', borderRadius: '8px', border: '2px solid #e5e7eb', background: 'white', color: '#1f2937', fontSize: '14px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' },
  pageButtonDisabled: { opacity: 0.5, cursor: 'not-allowed' },
  pageInfo: { fontSize: '14px', color: '#6b7280', fontWeight: 500 },
  sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
  addButton: { padding: '14px 24px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', fontSize: '15px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' },
  coursesGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px', marginBottom: '32px' },
  courseCard: { background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', transition: 'all 0.3s' },
  courseImageContainer: { position: 'relative', height: '200px', overflow: 'hidden' },
  courseImage: { width: '100%', height: '100%', objectFit: 'cover' },
  courseOverlay: { position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', opacity: 0, transition: 'opacity 0.3s' },
  overlayButton: { width: '44px', height: '44px', borderRadius: '50%', border: 'none', background: 'white', color: '#1f2937', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
  courseContent: { padding: '20px' },
  categoryBadge: { display: 'inline-block', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, background: '#eff6ff', color: '#3b82f6', marginBottom: '12px' },
  courseTitle: { fontSize: '18px', fontWeight: 700, color: '#1f2937', margin: '0 0 8px 0' },
  instructorName: { fontSize: '14px', color: '#6b7280', margin: '0 0 16px 0' },
  courseStats: { display: 'flex', gap: '16px' },
  stat: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 600, color: '#1f2937' },
  modalOverlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' },
  modal: { background: 'white', borderRadius: '20px', maxWidth: '800px', width: '100%', maxHeight: '90vh', overflow: 'auto' },
  modalHeader: { padding: '24px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  modalTitle: { fontSize: '24px', fontWeight: 700, color: '#1f2937', margin: 0 },
  modalClose: { width: '40px', height: '40px', borderRadius: '10px', border: 'none', background: '#f3f4f6', color: '#1f2937', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
  modalBody: { padding: '24px' },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  formRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
  input: { padding: '12px 16px', fontSize: '15px', border: '2px solid #e5e7eb', borderRadius: '10px', outline: 'none' },
  textarea: { padding: '12px 16px', fontSize: '15px', border: '2px solid #e5e7eb', borderRadius: '10px', outline: 'none', resize: 'vertical', fontFamily: 'inherit' },
  select: { padding: '12px 16px', fontSize: '15px', border: '2px solid #e5e7eb', borderRadius: '10px', outline: 'none', background: 'white', cursor: 'pointer' },
  formActions: { display: 'flex', gap: '12px', justifyContent: 'flex-end', paddingTop: '20px', borderTop: '1px solid #e5e7eb' },
  submitButton: { padding: '12px 24px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', fontSize: '15px', fontWeight: 600, cursor: 'pointer' },
statusBadge: {
  display: 'inline-block',
  padding: '6px 12px',
  borderRadius: '8px',
  fontSize: '13px',
  fontWeight: 600
},
  statusPaid: { background: '#dcfce7', color: '#16a34a' },
  statusPending: { background: '#fef3c7', color: '#ca8a04' },
  messagesGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '24px', marginBottom: '32px' },
  messageCard: { background: 'white', borderRadius: '16px', padding: '24px', cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', transition: 'all 0.3s' },
  messageHeader: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' },
  messageAvatar: { width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 'bold' },
  messageHeaderInfo: { flex: 1 },
  messageName: { fontSize: '16px', fontWeight: 700, color: '#1f2937', margin: '0 0 4px 0' },
  messageEmail: { fontSize: '14px', color: '#6b7280', margin: 0 },
  deleteIconButton: { width: '36px', height: '36px', borderRadius: '8px', border: 'none', background: '#fef2f2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
  messageSubject: { fontSize: '15px', fontWeight: 600, color: '#1f2937', margin: '0 0 8px 0' },
  messageText: { fontSize: '14px', color: '#6b7280', margin: '0 0 16px 0' },
  messageDate: { fontSize: '13px', color: '#9ca3af' },
  messageDetailSection: { marginBottom: '20px' },
  messageDetailText: { marginTop: '8px', fontSize: '15px', color: '#374151', lineHeight: 1.8, whiteSpace: 'pre-wrap' },
  modalFooter: { padding: '24px', borderTop: '1px solid #e5e7eb', display: 'flex', gap: '12px', justifyContent: 'flex-end' },
};

const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  [style*="courseCard"]:hover { transform: translateY(-8px); box-shadow: 0 10px 30px rgba(0,0,0,0.15) !important; }
  [style*="courseCard"]:hover [style*="courseOverlay"] { opacity: 1 !important; }
  [style*="messageCard"]:hover { transform: translateY(-4px); box-shadow: 0 10px 30px rgba(0,0,0,0.15) !important; }
  [style*="enrollmentItem"]:hover { background: white !important; }
  [style*="popularCourseCard"]:hover { transform: translateY(-4px); }
`;
document.head.appendChild(styleSheet);

export default CompleteLMSAdmin;

// ==================== PAYMENTS TAB ====================
const PaymentsTab: React.FC<{showNotification: (type: 'success' | 'error', message: string) => void}> = ({ showNotification }) => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadPayments();
  }, [page]);

  const loadPayments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/Admin/payments?page=${page}&pageSize=10`);
      const data = await response.json();
      setPayments(data.payments);
      setTotalPages(data.totalPages);
    } catch (error) {
      showNotification('error', 'Failed to load payments');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={styles.loadingContainer}><div style={styles.spinner}></div></div>;

  return (
    <div>
      <h1 style={styles.pageTitle}>💳 Payment Management</h1>
      
      <div style={styles.tableCard}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>User</th>
              <th style={styles.th}>Course</th>
              <th style={styles.th}>Amount</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} style={styles.tr}>
                <td style={styles.td}>{payment.userName}</td>
                <td style={styles.td}>{payment.courseName}</td>
                <td style={styles.td}>₹{payment.amount}</td>
                <td style={styles.td}>
                  <span style={{
                    ...styles.statusBadge,
                    ...(payment.status === 'PAID' ? styles.statusPaid : styles.statusPending)
                  }}>
                    {payment.status}
                  </span>
                </td>
                <td style={styles.td}>{new Date(payment.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={styles.pagination}>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{...styles.pageButton, ...(page === 1 ? styles.pageButtonDisabled : {})}}>
            <HiChevronLeft size={20} /> Previous
          </button>
          <span style={styles.pageInfo}>Page {page} of {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{...styles.pageButton, ...(page === totalPages ? styles.pageButtonDisabled : {})}}>
            Next <HiChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

// ==================== MESSAGES TAB ====================
const MessagesTab: React.FC<{showNotification: (type: 'success' | 'error', message: string) => void}> = ({ showNotification }) => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  useEffect(() => {
    loadMessages();
  }, [page]);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/Admin/contact-messages?page=${page}&pageSize=10`);
      const data = await response.json();
      setMessages(data.messages);
      setTotalPages(data.totalPages);
    } catch (error) {
      showNotification('error', 'Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMessage = async (messageId: number) => {
    if (!confirm('Delete this message?')) return;
    try {
      const response = await fetch(`${API_URL}/Admin/contact-messages/${messageId}`, { method: 'DELETE' });
      if (response.ok) {
        showNotification('success', 'Message deleted successfully!');
        setSelectedMessage(null);
        loadMessages();
      }
    } catch (error) {
      showNotification('error', 'Failed to delete message');
    }
  };

  if (loading) return <div style={styles.loadingContainer}><div style={styles.spinner}></div></div>;

  return (
    <div>
      <h1 style={styles.pageTitle}>📧 Contact Messages</h1>
      
      <div style={styles.messagesGrid}>
        {messages.map((message) => (
          <div key={message.id} style={styles.messageCard} onClick={() => setSelectedMessage(message)}>
            <div style={styles.messageHeader}>
              <div style={styles.messageAvatar}>{message.name.charAt(0).toUpperCase()}</div>
              <div style={styles.messageHeaderInfo}>
                <h3 style={styles.messageName}>{message.name}</h3>
                <p style={styles.messageEmail}>{message.email}</p>
              </div>
              <button onClick={(e) => { e.stopPropagation(); handleDeleteMessage(message.id); }} style={styles.deleteIconButton}>
                <HiTrash size={18} />
              </button>
            </div>
            <h4 style={styles.messageSubject}>{message.subject || 'No Subject'}</h4>
            <p style={styles.messageText}>{message.message.substring(0, 120)}...</p>
            <span style={styles.messageDate}>{new Date(message.createdAt).toLocaleDateString()}</span>
          </div>
        ))}
      </div>

      <div style={styles.pagination}>
        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{...styles.pageButton, ...(page === 1 ? styles.pageButtonDisabled : {})}}>
          <HiChevronLeft size={20} /> Previous
        </button>
        <span style={styles.pageInfo}>Page {page} of {totalPages}</span>
        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{...styles.pageButton, ...(page === totalPages ? styles.pageButtonDisabled : {})}}>
          Next <HiChevronRight size={20} />
        </button>
      </div>

      {selectedMessage && (
        <div style={styles.modalOverlay} onClick={() => setSelectedMessage(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Message Details</h2>
              <button onClick={() => setSelectedMessage(null)} style={styles.modalClose}><HiX size={24} /></button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.messageDetailSection}>
                <strong>From:</strong> {selectedMessage.name} ({selectedMessage.email})
              </div>
              <div style={styles.messageDetailSection}>
                <strong>Subject:</strong> {selectedMessage.subject || 'No Subject'}
              </div>
              <div style={styles.messageDetailSection}>
                <strong>Message:</strong>
                <p style={styles.messageDetailText}>{selectedMessage.message}</p>
              </div>
              <div style={styles.messageDetailSection}>
                <strong>Received:</strong> {new Date(selectedMessage.createdAt).toLocaleString()}
              </div>
            </div>
            <div style={styles.modalFooter}>
              <button onClick={() => handleDeleteMessage(selectedMessage.id)} style={styles.deleteButton}>
                <HiTrash size={20} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};