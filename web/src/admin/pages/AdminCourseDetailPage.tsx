import React, { useState, useEffect } from 'react';
import { 
  HiArrowLeft, HiPencil, HiTrash, HiPlus, HiCheckCircle,
  HiExclamationCircle, HiVideoCamera, HiSave
} from 'react-icons/hi';
import { API_ADMIN_BASE_URL, API_BASE_URL } from '../../config/api';

const API_URL = API_ADMIN_BASE_URL + '/courses';

interface CourseDetail {
  id: number;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice: number;
  discount: number;
  badge: string;
  rating: number;
  reviewCount: number;
  studentCount: number;
  instructorId: number;
  instructor: {
    id: number;
    name: string;
    title: string;
  };
  imageUrl: string;
  whatYouLearn: string[];
  includes: string[];
  companies: string[];
  courseSections: Section[];
  createdAt: string;
}

interface Section {
  id: number;
  courseId: number;
  day: string;
  title: string;
  duration: string;
  lectures: Lecture[];
}

interface Lecture {
  id: number;
  sectionId: number;
  title: string;
  duration: string;
  videoUrl: string | null;
}

const AdminCourseDetailPage: React.FC = () => {
  const [courseId, setCourseId] = useState('1');
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);
  
  const [editingCourse, setEditingCourse] = useState(false);
  const [showAddSection, setShowAddSection] = useState(false);
  const [showAddLecture, setShowAddLecture] = useState<number | null>(null);
  
  const [courseForm, setCourseForm] = useState({
    title: '', description: '', category: '', price: 0, originalPrice: 0,
    imageUrl: '', whatYouLearn: '', includes: '', companies: ''
  });
  
  const [sectionForm, setSectionForm] = useState({ day: '', title: '', duration: '' });
  const [lectureForm, setLectureForm] = useState({ title: '', duration: '', videoUrl: '' });

  useEffect(() => {
    loadCourseDetail();
  }, [courseId]);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const loadCourseDetail = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/${courseId}/detail`);
      if (!response.ok) throw new Error('Failed to load course');
      const data = await response.json();
      setCourse(data);
      setCourseForm({
        title: data.title,
        description: data.description,
        category: data.category,
        price: data.price,
        originalPrice: data.originalPrice,
        imageUrl: data.imageUrl,
        whatYouLearn: data.whatYouLearn.join('\n'),
        includes: data.includes.join('\n'),
        companies: data.companies.join('\n')
      });
    } catch (error) {
      showNotification('error', 'Failed to load course details');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCourse = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/Courses/${courseId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: courseForm.title,
          description: courseForm.description,
          category: courseForm.category,
          price: courseForm.price,
          originalPrice: courseForm.originalPrice,
          imageUrl: courseForm.imageUrl,
          whatYouLearn: courseForm.whatYouLearn.split('\n').filter(Boolean),
          includes: courseForm.includes.split('\n').filter(Boolean),
          companies: courseForm.companies.split('\n').filter(Boolean)
        })
      });
      
      if (response.ok) {
        showNotification('success', 'Course updated successfully!');
        setEditingCourse(false);
        loadCourseDetail();
      }
    } catch (error) {
      showNotification('error', 'Failed to update course');
    }
  };

  const handleCreateSection = async () => {
    try {
      const response = await fetch(`${API_URL}/sections`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: parseInt(courseId),
          day: sectionForm.day,
          title: sectionForm.title,
          duration: sectionForm.duration
        })
      });
      
      if (response.ok) {
        showNotification('success', 'Section created successfully!');
        setShowAddSection(false);
        setSectionForm({ day: '', title: '', duration: '' });
        loadCourseDetail();
      }
    } catch (error) {
      showNotification('error', 'Failed to create section');
    }
  };

  const handleDeleteSection = async (sectionId: number) => {
    if (!confirm('Delete this section and all its lectures?')) return;
    try {
      const response = await fetch(`${API_URL}/sections/${sectionId}`, { method: 'DELETE' });
      if (response.ok) {
        showNotification('success', 'Section deleted successfully!');
        loadCourseDetail();
      }
    } catch (error) {
      showNotification('error', 'Failed to delete section');
    }
  };

  const handleCreateLecture = async (sectionId: number) => {
    try {
      const response = await fetch(`${API_URL}/lectures`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sectionId,
          title: lectureForm.title,
          duration: lectureForm.duration,
          videoUrl: lectureForm.videoUrl || null
        })
      });
      
      if (response.ok) {
        showNotification('success', 'Lecture created successfully!');
        setShowAddLecture(null);
        setLectureForm({ title: '', duration: '', videoUrl: '' });
        loadCourseDetail();
      }
    } catch (error) {
      showNotification('error', 'Failed to create lecture');
    }
  };

  const handleDeleteLecture = async (lectureId: number) => {
    if (!confirm('Delete this lecture?')) return;
    try {
      const response = await fetch(`${API_URL}/lectures/${lectureId}`, { method: 'DELETE' });
      if (response.ok) {
        showNotification('success', 'Lecture deleted successfully!');
        loadCourseDetail();
      }
    } catch (error) {
      showNotification('error', 'Failed to delete lecture');
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading course details...</p>
      </div>
    );
  }

  if (!course) {
    return <div style={styles.errorContainer}>Course not found</div>;
  }

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

      <div style={styles.header}>
        <h1 style={styles.mainTitle}>📚 Course Management</h1>
        <div style={styles.courseSelector}>
          <label style={styles.selectorLabel}>Select Course ID:</label>
          <input 
            type="number"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            style={styles.selectorInput}
            min="1"
          />
          <button onClick={loadCourseDetail} style={styles.loadButton}>Load</button>
        </div>
      </div>

      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h2 style={styles.cardTitle}>📖 Course Information</h2>
          <button onClick={() => setEditingCourse(!editingCourse)} style={styles.editButton}>
            <HiPencil size={18} /> {editingCourse ? 'Cancel' : 'Edit'}
          </button>
        </div>
        
        {editingCourse ? (
          <div style={styles.form}>
            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Title</label>
                <input 
                  type="text" 
                  value={courseForm.title}
                  onChange={(e) => setCourseForm({...courseForm, title: e.target.value})}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Category</label>
                <input 
                  type="text" 
                  value={courseForm.category}
                  onChange={(e) => setCourseForm({...courseForm, category: e.target.value})}
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Description</label>
              <textarea 
                value={courseForm.description}
                onChange={(e) => setCourseForm({...courseForm, description: e.target.value})}
                style={styles.textarea}
                rows={4}
              />
            </div>

            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Price (₹)</label>
                <input 
                  type="number" 
                  value={courseForm.price}
                  onChange={(e) => setCourseForm({...courseForm, price: parseFloat(e.target.value)})}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Original Price (₹)</label>
                <input 
                  type="number" 
                  value={courseForm.originalPrice}
                  onChange={(e) => setCourseForm({...courseForm, originalPrice: parseFloat(e.target.value)})}
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Image URL</label>
              <input 
                type="url" 
                value={courseForm.imageUrl}
                onChange={(e) => setCourseForm({...courseForm, imageUrl: e.target.value})}
                style={styles.input}
              />
            </div>

            <button onClick={handleUpdateCourse} style={styles.saveButton}>
              <HiSave size={20} /> Save Changes
            </button>
          </div>
        ) : (
          <div style={styles.courseInfo}>
            <img src={course.imageUrl} alt={course.title} style={styles.courseImage} />
            <div style={styles.infoGrid}>
              <div><strong>Title:</strong> {course.title}</div>
              <div><strong>Category:</strong> {course.category}</div>
              <div><strong>Price:</strong> ₹{course.price}</div>
              <div><strong>Students:</strong> {course.studentCount}</div>
              <div><strong>Rating:</strong> ⭐ {course.rating.toFixed(1)}</div>
              <div><strong>Instructor:</strong> {course.instructor?.name || 'N/A'}</div>
            </div>
            <p style={styles.description}>{course.description}</p>
          </div>
        )}
      </div>

      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <h2 style={styles.cardTitle}>🎬 Course Content ({course.courseSections.length} sections)</h2>
          <button onClick={() => setShowAddSection(true)} style={styles.addButton}>
            <HiPlus size={18} /> Add Section
          </button>
        </div>

        {showAddSection && (
          <div style={styles.addForm}>
            <input 
              type="text"
              placeholder="Day (e.g., Day 1)"
              value={sectionForm.day}
              onChange={(e) => setSectionForm({...sectionForm, day: e.target.value})}
              style={styles.inputSmall}
            />
            <input 
              type="text"
              placeholder="Section Title"
              value={sectionForm.title}
              onChange={(e) => setSectionForm({...sectionForm, title: e.target.value})}
              style={styles.input}
            />
            <input 
              type="text"
              placeholder="Duration (e.g., 2h 30m)"
              value={sectionForm.duration}
              onChange={(e) => setSectionForm({...sectionForm, duration: e.target.value})}
              style={styles.inputSmall}
            />
            <button onClick={handleCreateSection} style={styles.submitButton}>Create</button>
            <button onClick={() => setShowAddSection(false)} style={styles.cancelButton}>Cancel</button>
          </div>
        )}

        {course.courseSections.map((section) => (
          <div key={section.id} style={styles.section}>
            <div style={styles.sectionHeader}>
              <div style={styles.sectionInfo}>
                <h3 style={styles.sectionTitle}>📂 {section.title}</h3>
                <span style={styles.sectionMeta}>{section.day} • {section.duration} • {section.lectures.length} lectures</span>
              </div>
              <div style={styles.actions}>
                <button onClick={() => setShowAddLecture(section.id)} style={styles.iconButton}>
                  <HiPlus size={16} />
                </button>
                <button onClick={() => handleDeleteSection(section.id)} style={styles.deleteIconButton}>
                  <HiTrash size={16} />
                </button>
              </div>
            </div>

            {showAddLecture === section.id && (
              <div style={styles.addForm}>
                <input 
                  type="text"
                  placeholder="Lecture Title"
                  value={lectureForm.title}
                  onChange={(e) => setLectureForm({...lectureForm, title: e.target.value})}
                  style={styles.input}
                />
                <input 
                  type="text"
                  placeholder="Duration (e.g., 15:30)"
                  value={lectureForm.duration}
                  onChange={(e) => setLectureForm({...lectureForm, duration: e.target.value})}
                  style={styles.inputSmall}
                />
                <input 
                  type="url"
                  placeholder="Video URL (optional)"
                  value={lectureForm.videoUrl}
                  onChange={(e) => setLectureForm({...lectureForm, videoUrl: e.target.value})}
                  style={styles.input}
                />
                <button onClick={() => handleCreateLecture(section.id)} style={styles.submitButton}>Add</button>
                <button onClick={() => setShowAddLecture(null)} style={styles.cancelButton}>Cancel</button>
              </div>
            )}

            <div style={styles.lectureList}>
              {section.lectures.length === 0 ? (
                <p style={styles.emptyText}>No lectures yet</p>
              ) : (
                section.lectures.map((lecture) => (
                  <div key={lecture.id} style={styles.lectureItem}>
                    <HiVideoCamera size={20} color="#667eea" />
                    <div style={styles.lectureInfo}>
                      <span style={styles.lectureTitle}>{lecture.title}</span>
                      <span style={styles.lectureMeta}>
                        {lecture.duration} {lecture.videoUrl && '• Has Video'}
                      </span>
                    </div>
                    <button onClick={() => handleDeleteLecture(lecture.id)} style={styles.deleteIconButton}>
                      <HiTrash size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}

        {course.courseSections.length === 0 && (
          <div style={styles.emptyState}>
            <p style={styles.emptyStateText}>No sections yet. Add your first section to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { maxWidth: '1200px', margin: '0 auto', padding: '32px', fontFamily: 'system-ui, -apple-system, sans-serif' },
  header: { marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' },
  mainTitle: { fontSize: '32px', fontWeight: 900, background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 },
  
  courseSelector: { display: 'flex', gap: '12px', alignItems: 'center', background: 'white', padding: '12px 20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  selectorLabel: { fontSize: '14px', fontWeight: 600, color: '#1f2937' },
  selectorInput: { width: '80px', padding: '8px 12px', fontSize: '15px', border: '2px solid #e5e7eb', borderRadius: '8px', outline: 'none' },
  loadButton: { padding: '8px 16px', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' },
  
  card: { background: 'white', borderRadius: '16px', padding: '32px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' },
  cardTitle: { fontSize: '22px', fontWeight: 800, color: '#1f2937', margin: 0 },
  
  courseInfo: { display: 'flex', flexDirection: 'column', gap: '20px' },
  courseImage: { width: '100%', maxWidth: '400px', height: '240px', objectFit: 'cover', borderRadius: '12px' },
  infoGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', fontSize: '15px', color: '#1f2937' },
  description: { fontSize: '15px', color: '#6b7280', lineHeight: '1.6' },
  
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  formRow: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' },
  formGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { fontSize: '14px', fontWeight: 600, color: '#374151' },
  input: { padding: '12px 16px', fontSize: '15px', border: '2px solid #e5e7eb', borderRadius: '10px', outline: 'none', flex: 1 },
  inputSmall: { padding: '8px 12px', fontSize: '14px', border: '2px solid #e5e7eb', borderRadius: '8px', outline: 'none', width: '150px' },
  textarea: { padding: '12px 16px', fontSize: '15px', border: '2px solid #e5e7eb', borderRadius: '10px', outline: 'none', resize: 'vertical', fontFamily: 'inherit' },
  
  editButton: { padding: '10px 20px', background: '#eff6ff', color: '#3b82f6', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' },
  saveButton: { padding: '14px 24px', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', alignSelf: 'flex-start' },
  addButton: { padding: '10px 20px', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' },
  
  section: { border: '2px solid #e5e7eb', borderRadius: '12px', padding: '20px', marginBottom: '16px', background: '#fafafa' },
  sectionHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' },
  sectionInfo: { flex: 1 },
  sectionTitle: { fontSize: '18px', fontWeight: 700, color: '#1f2937', margin: '0 0 8px 0' },
  sectionMeta: { fontSize: '14px', color: '#6b7280' },
  
  lectureList: { display: 'flex', flexDirection: 'column', gap: '12px' },
  lectureItem: { display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'white', borderRadius: '8px', border: '1px solid #e5e7eb' },
  lectureInfo: { flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' },
  lectureTitle: { fontSize: '15px', fontWeight: 600, color: '#1f2937' },
  lectureMeta: { fontSize: '13px', color: '#6b7280' },
  
  addForm: { display: 'flex', gap: '12px', alignItems: 'center', padding: '16px', background: 'white', borderRadius: '12px', marginBottom: '16px', flexWrap: 'wrap', border: '2px dashed #e5e7eb' },
  submitButton: { padding: '10px 20px', background: '#10b981', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' },
  cancelButton: { padding: '10px 20px', background: '#6b7280', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' },
  
  actions: { display: 'flex', gap: '8px' },
  iconButton: { width: '36px', height: '36px', borderRadius: '8px', border: 'none', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
  deleteIconButton: { width: '36px', height: '36px', borderRadius: '8px', border: 'none', background: '#fef2f2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
  
  emptyText: { textAlign: 'center', color: '#9ca3af', fontSize: '14px', padding: '20px' },
  emptyState: { textAlign: 'center', padding: '40px', color: '#6b7280' },
  emptyStateText: { fontSize: '16px' },
  
  notification: { position: 'fixed', top: '20px', right: '20px', padding: '16px 24px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 600, fontSize: '15px', zIndex: 10000, boxShadow: '0 10px 40px rgba(0,0,0,0.2)' },
  notificationSuccess: { background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white' },
  notificationError: { background: 'linear-gradient(135deg, #ef4444, #dc2626)', color: 'white' },
  
  loadingContainer: { minHeight: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
  spinner: { width: '50px', height: '50px', border: '4px solid #e5e7eb', borderTop: '4px solid #667eea', borderRadius: '50%', animation: 'spin 1s linear infinite' },
  loadingText: { marginTop: '20px', fontSize: '16px', color: '#6b7280' },
  errorContainer: { padding: '40px', textAlign: 'center', fontSize: '18px', color: '#ef4444' },
};

const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

export default AdminCourseDetailPage;

