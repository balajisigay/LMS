import React, { useState, useEffect } from 'react';
import { 
  HiSearch, 
  HiTrash, 
  HiPencil, 
  HiEye,
  HiChevronLeft, 
  HiChevronRight,
  HiPlus,
  HiX,
  HiUpload,
  HiCheckCircle,
  HiExclamationCircle
} from 'react-icons/hi';

const API_URL = 'http://localhost:5000/api';

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
}

interface CourseFormData {
  title: string;
  description: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice: number;
  badge: string;
  imageUrl: string;
  instructorId: number;
  whatYouLearn: string;
  includes: string;
  companies: string;
}

const AdminCourseCRUD: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'view'>('add');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);
  const [formData, setFormData] = useState<CourseFormData>({
    title: '',
    description: '',
    category: 'Development',
    subcategory: '',
    price: 0,
    originalPrice: 0,
    badge: 'Best Seller',
    imageUrl: '',
    instructorId: 0,
    whatYouLearn: '',
    includes: '',
    companies: ''
  });

  const categories = ['All', 'Development', 'Design', 'Marketing', 'IT & Software', 'Personal Growth', 'Business'];

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
      setTotalCourses(data.totalCourses);
    } catch (error) {
      console.error('Error loading courses:', error);
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

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddCourse = () => {
    setModalMode('add');
    setSelectedCourse(null);
    setFormData({
      title: '',
      description: '',
      category: 'Development',
      subcategory: '',
      price: 0,
      originalPrice: 0,
      badge: 'Best Seller',
      imageUrl: '',
      instructorId: instructors.length > 0 ? instructors[0].id : 0,
      whatYouLearn: '',
      includes: '',
      companies: ''
    });
    setShowModal(true);
  };

  const handleEditCourse = (course: Course) => {
    setModalMode('edit');
    setSelectedCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      category: course.category,
      subcategory: '',
      price: course.price,
      originalPrice: course.price * 1.2,
      badge: 'Best Seller',
      imageUrl: course.imageUrl,
      instructorId: course.instructorId,
      whatYouLearn: course.whatYouLearn?.join('\n') || '',
      includes: course.includes?.join('\n') || '',
      companies: course.companies?.join('\n') || ''
    });
    setShowModal(true);
  };

  const handleViewCourse = (course: Course) => {
    setModalMode('view');
    setSelectedCourse(course);
    setShowModal(true);
  };

  const handleDeleteCourse = async (courseId: number, courseTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${courseTitle}"?`)) return;

    try {
      const response = await fetch(`${API_URL}/Courses/${courseId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        showNotification('success', 'Course deleted successfully!');
        loadCourses();
      } else {
        showNotification('error', 'Failed to delete course');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      showNotification('error', 'Failed to delete course');
    }
  };

  const handleSubmitCourse = async (e: React.FormEvent) => {
    e.preventDefault();

    const courseData = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      subcategory: formData.subcategory || formData.category,
      price: Number(formData.price),
      originalPrice: Number(formData.originalPrice),
      badge: formData.badge,
      imageUrl: formData.imageUrl,
      instructorId: Number(formData.instructorId),
      whatYouLearn: formData.whatYouLearn.split('\n').filter(item => item.trim()),
      includes: formData.includes.split('\n').filter(item => item.trim()),
      companies: formData.companies.split('\n').filter(item => item.trim())
    };

    try {
      let response;
      if (modalMode === 'add') {
        response = await fetch(`${API_URL}/Courses`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(courseData)
        });
      } else {
        response = await fetch(`${API_URL}/Courses/${selectedCourse?.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(courseData)
        });
      }

      if (response.ok) {
        showNotification('success', `Course ${modalMode === 'add' ? 'created' : 'updated'} successfully!`);
        setShowModal(false);
        loadCourses();
      } else {
        const errorData = await response.json();
        showNotification('error', errorData.message || 'Operation failed');
      }
    } catch (error) {
      console.error('Error saving course:', error);
      showNotification('error', 'Failed to save course');
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading courses...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Notification */}
      {notification && (
        <div style={{
          ...styles.notification,
          ...(notification.type === 'success' ? styles.notificationSuccess : styles.notificationError)
        }}>
          {notification.type === 'success' ? 
            <HiCheckCircle size={24} /> : 
            <HiExclamationCircle size={24} />
          }
          <span>{notification.message}</span>
        </div>
      )}

      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>📚 Course Management</h1>
          <p style={styles.subtitle}>Create, edit, and manage all courses</p>
        </div>
        <div style={styles.headerActions}>
          <div style={styles.statsCard}>
            <span style={styles.statsLabel}>Total Courses</span>
            <span style={styles.statsValue}>{totalCourses}</span>
          </div>
          <button onClick={handleAddCourse} style={styles.addButton}>
            <HiPlus size={20} />
            <span>Add New Course</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div style={styles.filtersContainer}>
        <div style={styles.searchWrapper}>
          <HiSearch size={20} style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search courses by title or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        <div style={styles.categoryFilter}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                ...styles.categoryButton,
                ...(selectedCategory === cat ? styles.categoryButtonActive : {})
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div style={styles.coursesGrid}>
        {filteredCourses.map((course) => (
          <div key={course.id} style={styles.courseCard} className="course-card">
            <div style={styles.courseImageContainer}>
              <img 
                src={course.imageUrl} 
                alt={course.title}
                style={styles.courseImage}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200/667eea/ffffff?text=Course';
                }}
              />
              <div style={styles.courseOverlay} className="course-overlay">
                <button 
                  onClick={() => handleViewCourse(course)}
                  style={styles.overlayButton}
                  className="overlay-button"
                  title="View Details"
                >
                  <HiEye size={18} />
                </button>
                <button 
                  onClick={() => handleEditCourse(course)}
                  style={styles.overlayButton}
                  className="overlay-button"
                  title="Edit Course"
                >
                  <HiPencil size={18} />
                </button>
                <button 
                  onClick={() => handleDeleteCourse(course.id, course.title)}
                  style={{...styles.overlayButton, background: '#ef4444'}}
                  className="overlay-button"
                  title="Delete Course"
                >
                  <HiTrash size={18} />
                </button>
              </div>
            </div>

            <div style={styles.courseContent}>
              <div style={styles.categoryBadge}>{course.category}</div>
              <h3 style={styles.courseTitle}>{course.title}</h3>
              <p style={styles.instructorName}>By {course.instructorName}</p>

              <div style={styles.courseStats}>
                <div style={styles.stat}>
                  <span style={styles.statIcon}>⭐</span>
                  <span style={styles.statText}>{course.rating.toFixed(1)}</span>
                </div>
                <div style={styles.stat}>
                  <span style={styles.statIcon}>👥</span>
                  <span style={styles.statText}>{course.studentCount.toLocaleString()}</span>
                </div>
                <div style={styles.stat}>
                  <span style={styles.statIcon}>💰</span>
                  <span style={styles.statText}>₹{course.price.toFixed(0)}</span>
                </div>
              </div>

              <div style={styles.courseFooter}>
                <span style={styles.createdDate}>
                  Created {new Date(course.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div style={styles.pagination}>
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          style={{
            ...styles.pageButton,
            ...(page === 1 ? styles.pageButtonDisabled : {})
          }}
        >
          <HiChevronLeft size={20} />
          Previous
        </button>
        
        <span style={styles.pageInfo}>
          Page {page} of {totalPages}
        </span>
        
        <button
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          style={{
            ...styles.pageButton,
            ...(page === totalPages ? styles.pageButtonDisabled : {})
          }}
        >
          Next
          <HiChevronRight size={20} />
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                {modalMode === 'add' ? '➕ Add New Course' : 
                 modalMode === 'edit' ? '✏️ Edit Course' : 
                 '👁️ View Course Details'}
              </h2>
              <button onClick={() => setShowModal(false)} style={styles.modalClose}>
                <HiX size={24} />
              </button>
            </div>

            <div style={styles.modalBody}>
              {modalMode === 'view' && selectedCourse ? (
                <div style={styles.viewContent}>
                  <img 
                    src={selectedCourse.imageUrl} 
                    alt={selectedCourse.title}
                    style={styles.viewImage}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x300/667eea/ffffff?text=Course';
                    }}
                  />
                  <h3 style={styles.viewTitle}>{selectedCourse.title}</h3>
                  <p style={styles.viewDescription}>{selectedCourse.description}</p>
                  
                  <div style={styles.viewDetails}>
                    <div style={styles.viewDetail}>
                      <strong>Category:</strong> {selectedCourse.category}
                    </div>
                    <div style={styles.viewDetail}>
                      <strong>Price:</strong> ₹{selectedCourse.price}
                    </div>
                    <div style={styles.viewDetail}>
                      <strong>Instructor:</strong> {selectedCourse.instructorName}
                    </div>
                    <div style={styles.viewDetail}>
                      <strong>Students:</strong> {selectedCourse.studentCount}
                    </div>
                    <div style={styles.viewDetail}>
                      <strong>Rating:</strong> {selectedCourse.rating} ⭐
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitCourse} style={styles.form}>
                  <div style={styles.formRow}>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Course Title *</label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        style={styles.input}
                        placeholder="e.g., Complete Web Development Bootcamp"
                      />
                    </div>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Description *</label>
                    <textarea
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      style={styles.textarea}
                      rows={4}
                      placeholder="Describe what students will learn in this course..."
                    />
                  </div>

                  <div style={styles.formRow}>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Category *</label>
                      <select
                        required
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        style={styles.select}
                      >
                        {categories.filter(c => c !== 'All').map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>Subcategory</label>
                      <input
                        type="text"
                        value={formData.subcategory}
                        onChange={(e) => setFormData({...formData, subcategory: e.target.value})}
                        style={styles.input}
                        placeholder="e.g., React, Node.js, etc."
                      />
                    </div>
                  </div>

                  <div style={styles.formRow}>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Price (₹) *</label>
                      <input
                        type="number"
                        required
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                        style={styles.input}
                        placeholder="2999"
                      />
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>Original Price (₹)</label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.originalPrice}
                        onChange={(e) => setFormData({...formData, originalPrice: Number(e.target.value)})}
                        style={styles.input}
                        placeholder="4999"
                      />
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>Badge</label>
                      <select
                        value={formData.badge}
                        onChange={(e) => setFormData({...formData, badge: e.target.value})}
                        style={styles.select}
                      >
                        <option value="Best Seller">Best Seller</option>
                        <option value="New">New</option>
                        <option value="Popular">Popular</option>
                        <option value="Hot">Hot</option>
                        <option value="">None</option>
                      </select>
                    </div>
                  </div>

                  <div style={styles.formRow}>
                    <div style={styles.formGroup}>
                      <label style={styles.label}>Instructor *</label>
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
                      <label style={styles.label}>Image URL *</label>
                      <input
                        type="url"
                        required
                        value={formData.imageUrl}
                        onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                        style={styles.input}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>What You'll Learn</label>
                    <textarea
                      value={formData.whatYouLearn}
                      onChange={(e) => setFormData({...formData, whatYouLearn: e.target.value})}
                      style={styles.textarea}
                      rows={4}
                      placeholder="Build modern web applications&#10;Master React and Node.js&#10;Deploy to production"
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Course Includes (one per line)</label>
                    <textarea
                      value={formData.includes}
                      onChange={(e) => setFormData({...formData, includes: e.target.value})}
                      style={styles.textarea}
                      rows={3}
                      placeholder="24 hours video&#10;Certificate of completion&#10;Lifetime access"
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Companies (one per line)</label>
                    <textarea
                      value={formData.companies}
                      onChange={(e) => setFormData({...formData, companies: e.target.value})}
                      style={styles.textarea}
                      rows={3}
                      placeholder="Google&#10;Microsoft&#10;Amazon"
                    />
                  </div>

                  <div style={styles.formActions}>
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      style={styles.cancelButton}
                    >
                      Cancel
                    </button>
                    <button type="submit" style={styles.submitButton}>
                      {modalMode === 'add' ? '➕ Create Course' : '💾 Update Course'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: '32px',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  notification: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '16px 24px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontWeight: 600,
    fontSize: '15px',
    zIndex: 10000,
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
    animation: 'slideIn 0.3s ease-out',
  },
  notificationSuccess: {
    background: 'linear-gradient(135deg, #10b981, #059669)',
    color: 'white',
  },
  notificationError: {
    background: 'linear-gradient(135deg, #ef4444, #dc2626)',
    color: 'white',
  },
  loadingContainer: {
    minHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '4px solid #e5e7eb',
    borderTop: '4px solid #667eea',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    marginTop: '20px',
    fontSize: '16px',
    color: '#6b7280',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '32px',
    flexWrap: 'wrap',
    gap: '20px',
  },
  title: {
    fontSize: '36px',
    fontWeight: 900,
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: '0 0 8px 0',
  },
  subtitle: {
    fontSize: '16px',
    color: '#6b7280',
    margin: 0,
  },
  headerActions: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
  },
  statsCard: {
    background: 'linear-gradient(135deg, #f093fb, #f5576c)',
    padding: '20px 32px',
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    alignItems: 'center',
    boxShadow: '0 4px 20px rgba(240, 147, 251, 0.3)',
  },
  statsLabel: {
    fontSize: '14px',
    color: 'rgba(255,255,255,0.9)',
    fontWeight: 500,
  },
  statsValue: {
    fontSize: '32px',
    fontWeight: 800,
    color: 'white',
  },
  addButton: {
    padding: '14px 24px',
    borderRadius: '12px',
    border: 'none',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
    transition: 'all 0.3s ease',
  },
  filtersContainer: {
    marginBottom: '32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  searchWrapper: {
    position: 'relative',
    maxWidth: '500px',
  },
  searchIcon: {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#9ca3af',
    pointerEvents: 'none',
  },
  searchInput: {
    width: '100%',
    padding: '14px 16px 14px 48px',
    fontSize: '15px',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    outline: 'none',
    transition: 'all 0.2s',
  },
  categoryFilter: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },
  categoryButton: {
    padding: '10px 20px',
    borderRadius: '10px',
    border: '2px solid #e5e7eb',
    background: 'white',
    color: '#6b7280',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  categoryButtonActive: {
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    borderColor: 'transparent',
  },
  coursesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '24px',
    marginBottom: '32px',
  },
  courseCard: {
    background: 'white',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
  },
  courseImageContainer: {
    position: 'relative',
    height: '200px',
    overflow: 'hidden',
  },
  courseImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  courseOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(0,0,0,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    opacity: 0,
    transition: 'opacity 0.3s',
  },
  overlayButton: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    border: 'none',
    background: 'white',
    color: '#1f2937',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  courseContent: {
    padding: '20px',
  },
  categoryBadge: {
    display: 'inline-block',
    padding: '6px 12px',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: 600,
    background: '#eff6ff',
    color: '#3b82f6',
    marginBottom: '12px',
  },
  courseTitle: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#1f2937',
    margin: '0 0 8px 0',
    lineHeight: 1.3,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  instructorName: {
    fontSize: '14px',
    color: '#6b7280',
    margin: '0 0 16px 0',
  },
  courseStats: {
    display: 'flex',
    gap: '16px',
    marginBottom: '16px',
    paddingTop: '16px',
    borderTop: '1px solid #f3f4f6',
  },
  stat: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  statIcon: {
    fontSize: '16px',
  },
  statText: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#1f2937',
  },
  courseFooter: {
    paddingTop: '16px',
    borderTop: '1px solid #f3f4f6',
  },
  createdDate: {
    fontSize: '13px',
    color: '#9ca3af',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px',
    background: 'white',
    borderRadius: '16px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  pageButton: {
    padding: '10px 16px',
    borderRadius: '8px',
    border: '2px solid #e5e7eb',
    background: 'white',
    color: '#1f2937',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s',
  },
  pageButtonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  pageInfo: {
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: 500,
  },
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(4px)',
  },
  modal: {
    background: 'white',
    borderRadius: '20px',
    maxWidth: '800px',
    width: '90%',
    maxHeight: '90vh',
    overflow: 'auto',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  },
  modalHeader: {
    padding: '24px',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    background: 'white',
    zIndex: 1,
  },
  modalTitle: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#1f2937',
    margin: 0,
  },
  modalClose: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    border: 'none',
    background: '#f3f4f6',
    color: '#1f2937',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  modalBody: {
    padding: '24px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#374151',
  },
  input: {
    padding: '12px 16px',
    fontSize: '15px',
    border: '2px solid #e5e7eb',
    borderRadius: '10px',
    outline: 'none',
    transition: 'all 0.2s',
  },
  textarea: {
    padding: '12px 16px',
    fontSize: '15px',
    border: '2px solid #e5e7eb',
    borderRadius: '10px',
    outline: 'none',
    transition: 'all 0.2s',
    resize: 'vertical',
    fontFamily: 'inherit',
  },
  select: {
    padding: '12px 16px',
    fontSize: '15px',
    border: '2px solid #e5e7eb',
    borderRadius: '10px',
    outline: 'none',
    transition: 'all 0.2s',
    background: 'white',
    cursor: 'pointer',
  },
  formActions: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
    paddingTop: '20px',
    borderTop: '1px solid #e5e7eb',
  },
  cancelButton: {
    padding: '12px 24px',
    borderRadius: '10px',
    border: '2px solid #e5e7eb',
    background: 'white',
    color: '#1f2937',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  submitButton: {
    padding: '12px 24px',
    borderRadius: '10px',
    border: 'none',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
  },
  viewContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  viewImage: {
    width: '100%',
    height: '300px',
    objectFit: 'cover',
    borderRadius: '12px',
  },
  viewTitle: {
    fontSize: '28px',
    fontWeight: 800,
    color: '#1f2937',
    margin: 0,
  },
  viewDescription: {
    fontSize: '16px',
    color: '#6b7280',
    lineHeight: 1.6,
    margin: 0,
  },
  viewDetails: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '16px',
    padding: '20px',
    background: '#f9fafb',
    borderRadius: '12px',
  },
  viewDetail: {
    fontSize: '15px',
    color: '#1f2937',
  },
};

const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(100px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  [style*="searchInput"]:focus,
  [style*="input"]:focus,
  [style*="textarea"]:focus,
  [style*="select"]:focus {
    border-color: #667eea !important;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  .course-card {
    transition: all 0.3s ease !important;
  }
  
  .course-card:hover {
    transform: translateY(-8px) !important;
    box-shadow: 0 10px 30px rgba(0,0,0,0.15) !important;
  }
  
  .course-card:hover .course-overlay {
    opacity: 1 !important;
  }
  
  .overlay-button:hover {
    transform: scale(1.1) !important;
  }
  
  [style*="categoryButton"]:hover {
    border-color: #667eea !important;
    color: #667eea !important;
  }
  
  [style*="addButton"]:hover,
  [style*="submitButton"]:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4) !important;
  }
  
  [style*="pageButton"]:hover:not([disabled]) {
    border-color: #667eea !important;
    color: #667eea !important;
  }
  
  [style*="cancelButton"]:hover {
    background: #f3f4f6 !important;
  }
  
  [style*="modalClose"]:hover {
    background: #e5e7eb !important;
  }
`;
document.head.appendChild(styleSheet);

export default AdminCourseCRUD;