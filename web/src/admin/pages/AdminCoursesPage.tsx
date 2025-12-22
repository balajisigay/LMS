import React, { useEffect, useState } from 'react';
import { 
  HiSearch, 
  HiTrash, 
  HiPencil, 
  HiEye,
  HiChevronLeft, 
  HiChevronRight,
  HiPlus,
  HiX
} from 'react-icons/hi';

const API_URL = 'http://localhost:5000/api';

interface Course {
  id: number;
  title: string;
  category: string;
  price: number;
  studentCount: number;
  rating: number;
  imageUrl: string;
  instructorName: string;
  createdAt: string;
}

const AdminCoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  const categories = ['All', 'Development', 'Design', 'Marketing', 'IT & Software', 'Personal Growth'];

  useEffect(() => {
    loadCourses();
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
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId: number, courseTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${courseTitle}"?`)) return;

    try {
      const response = await fetch(`${API_URL}/Courses/${courseId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        alert('Course deleted successfully!');
        loadCourses();
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Failed to delete course');
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
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Course Management</h1>
          <p style={styles.subtitle}>Manage all courses and content</p>
        </div>
        <div style={styles.headerActions}>
          <div style={styles.statsCard}>
            <span style={styles.statsLabel}>Total Courses</span>
            <span style={styles.statsValue}>{totalCourses}</span>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            style={styles.addButton}
          >
            <HiPlus size={20} />
            <span>Add Course</span>
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
          <div key={course.id} style={styles.courseCard}>
            <div style={styles.courseImageContainer}>
              <img 
                src={course.imageUrl} 
                alt={course.title}
                style={styles.courseImage}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200/667eea/ffffff?text=Course';
                }}
              />
              <div style={styles.courseOverlay}>
                <button style={styles.overlayButton}>
                  <HiEye size={18} />
                </button>
                <button style={styles.overlayButton}>
                  <HiPencil size={18} />
                </button>
                <button 
                  onClick={() => handleDeleteCourse(course.id, course.title)}
                  style={{...styles.overlayButton, background: '#ef4444'}}
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

      {/* Add Course Modal */}
      {showAddModal && (
        <div style={styles.modalOverlay} onClick={() => setShowAddModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>Add New Course</h2>
              <button 
                onClick={() => setShowAddModal(false)}
                style={styles.modalClose}
              >
                <HiX size={24} />
              </button>
            </div>
            <div style={styles.modalBody}>
              <p style={styles.modalText}>
                Course creation form would go here. This would include fields for:
                title, description, price, category, instructor, etc.
              </p>
              <button style={styles.modalButton}>Create Course</button>
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
    fontSize: '32px',
    fontWeight: 800,
    color: '#1f2937',
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
  },
  modal: {
    background: 'white',
    borderRadius: '20px',
    maxWidth: '600px',
    width: '90%',
    maxHeight: '90vh',
    overflow: 'auto',
  },
  modalHeader: {
    padding: '24px',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  },
  modalBody: {
    padding: '24px',
  },
  modalText: {
    fontSize: '16px',
    color: '#6b7280',
    lineHeight: 1.6,
    marginBottom: '24px',
  },
  modalButton: {
    width: '100%',
    padding: '14px',
    borderRadius: '12px',
    border: 'none',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
  },
};

const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  [style*="searchInput"]:focus {
    border-color: #667eea !important;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  [style*="courseCard"]:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.15) !important;
  }
  
  [style*="courseCard"]:hover [style*="courseOverlay"] {
    opacity: 1 !important;
  }
  
  [style*="overlayButton"]:hover {
    transform: scale(1.1);
  }
  
  [style*="categoryButton"]:hover {
    border-color: #667eea !important;
    color: #667eea !important;
  }
  
  [style*="addButton"]:hover,
  [style*="modalButton"]:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4) !important;
  }
  
  [style*="pageButton"]:hover:not([style*="pageButtonDisabled"]) {
    border-color: #667eea !important;
    color: #667eea !important;
  }
`;
document.head.appendChild(styleSheet);

export default AdminCoursesPage;