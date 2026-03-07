import React, { useState, useEffect } from 'react';
import { 
  HiPlus, 
  HiTrash, 
  HiPencil, 
  HiSave,
  HiX,
  HiVideoCamera,
  HiCheckCircle,
  HiExclamationCircle,
  HiChevronDown,
  HiChevronUp
} from 'react-icons/hi';
import { API_BASE_URL } from '../../config/api';

const API_URL = API_BASE_URL;

interface Course {
  id: number;
  title: string;
  imageUrl: string;
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
  videoUrl: string;
}

const AdminCourseContentManager: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());
  
  // Modals
  const [showAddSection, setShowAddSection] = useState(false);
  const [showAddLecture, setShowAddLecture] = useState<number | null>(null);
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [editingLecture, setEditingLecture] = useState<Lecture | null>(null);
  
  // Forms
  const [sectionForm, setSectionForm] = useState({
    day: '',
    title: '',
    duration: ''
  });
  
  const [lectureForm, setLectureForm] = useState({
    title: '',
    duration: '',
    videoUrl: ''
  });

  useEffect(() => {
    loadCourses();
  }, []);

  useEffect(() => {
    if (selectedCourseId) {
      loadCourseSections(selectedCourseId);
    }
  }, [selectedCourseId]);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const loadCourses = async () => {
    try {
      const response = await fetch(`${API_URL}/Courses`);
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      showNotification('error', 'Failed to load courses');
    }
  };

  const loadCourseSections = async (courseId: number) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/Admin/courses/${courseId}/detail`);
      const data = await response.json();
      setSections(data.courseSections || []);
      setExpandedSections(new Set(data.courseSections?.map((_: any, i: number) => i) || []));
    } catch (error) {
      showNotification('error', 'Failed to load course sections');
      setSections([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSection = async () => {
    if (!selectedCourseId || !sectionForm.day || !sectionForm.title || !sectionForm.duration) {
      showNotification('error', 'Please fill all section fields');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/Admin/courses/sections`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: selectedCourseId,
          day: sectionForm.day,
          title: sectionForm.title,
          duration: sectionForm.duration
        })
      });

      if (response.ok) {
        showNotification('success', 'Section created successfully!');
        setShowAddSection(false);
        setSectionForm({ day: '', title: '', duration: '' });
        loadCourseSections(selectedCourseId);
      } else {
        showNotification('error', 'Failed to create section');
      }
    } catch (error) {
      showNotification('error', 'Error creating section');
    }
  };

  const handleUpdateSection = async () => {
    if (!editingSection) return;

    try {
      const response = await fetch(`${API_URL}/Admin/courses/sections/${editingSection.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          day: sectionForm.day,
          title: sectionForm.title,
          duration: sectionForm.duration
        })
      });

      if (response.ok) {
        showNotification('success', 'Section updated successfully!');
        setEditingSection(null);
        setSectionForm({ day: '', title: '', duration: '' });
        if (selectedCourseId) loadCourseSections(selectedCourseId);
      } else {
        showNotification('error', 'Failed to update section');
      }
    } catch (error) {
      showNotification('error', 'Error updating section');
    }
  };

  const handleDeleteSection = async (sectionId: number) => {
    if (!confirm('Delete this section and all its lectures?')) return;

    try {
      const response = await fetch(`${API_URL}/Admin/courses/sections/${sectionId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        showNotification('success', 'Section deleted successfully!');
        if (selectedCourseId) loadCourseSections(selectedCourseId);
      } else {
        showNotification('error', 'Failed to delete section');
      }
    } catch (error) {
      showNotification('error', 'Error deleting section');
    }
  };

  const handleCreateLecture = async (sectionId: number) => {
    if (!lectureForm.title || !lectureForm.duration) {
      showNotification('error', 'Please fill all lecture fields');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/Admin/courses/lectures`, {
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
        if (selectedCourseId) loadCourseSections(selectedCourseId);
      } else {
        showNotification('error', 'Failed to create lecture');
      }
    } catch (error) {
      showNotification('error', 'Error creating lecture');
    }
  };

  const handleUpdateLecture = async () => {
    if (!editingLecture) return;

    try {
      const response = await fetch(`${API_URL}/Admin/courses/lectures/${editingLecture.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: lectureForm.title,
          duration: lectureForm.duration,
          videoUrl: lectureForm.videoUrl || null
        })
      });

      if (response.ok) {
        showNotification('success', 'Lecture updated successfully!');
        setEditingLecture(null);
        setLectureForm({ title: '', duration: '', videoUrl: '' });
        if (selectedCourseId) loadCourseSections(selectedCourseId);
      } else {
        showNotification('error', 'Failed to update lecture');
      }
    } catch (error) {
      showNotification('error', 'Error updating lecture');
    }
  };

  const handleDeleteLecture = async (lectureId: number) => {
    if (!confirm('Delete this lecture?')) return;

    try {
      const response = await fetch(`${API_URL}/Admin/courses/lectures/${lectureId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        showNotification('success', 'Lecture deleted successfully!');
        if (selectedCourseId) loadCourseSections(selectedCourseId);
      } else {
        showNotification('error', 'Failed to delete lecture');
      }
    } catch (error) {
      showNotification('error', 'Error deleting lecture');
    }
  };

  const toggleSection = (index: number) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedSections(newExpanded);
  };

  const selectedCourse = courses.find(c => c.id === selectedCourseId);

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
        <div>
          <h1 style={styles.title}>🎬 Course Content Manager</h1>
          <p style={styles.subtitle}>Manage sections and lectures for your courses</p>
        </div>
      </div>

      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Select Course</h2>
        <div style={styles.courseGrid}>
          {courses.map((course) => (
            <div
              key={course.id}
              onClick={() => setSelectedCourseId(course.id)}
              style={{
                ...styles.courseCard,
                ...(selectedCourseId === course.id ? styles.courseCardActive : {})
              }}
            >
              <img src={course.imageUrl} alt={course.title} style={styles.courseCardImage} />
              <div style={styles.courseCardContent}>
                <h3 style={styles.courseCardTitle}>{course.title}</h3>
                <span style={styles.courseCardId}>ID: {course.id}</span>
              </div>
              {selectedCourseId === course.id && (
                <div style={styles.selectedBadge}>
                  <HiCheckCircle size={24} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {selectedCourseId && (
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div>
              <h2 style={styles.cardTitle}>📚 Course Content</h2>
              <p style={styles.cardSubtitle}>
                Managing: <strong>{selectedCourse?.title}</strong>
              </p>
            </div>
            <button onClick={() => setShowAddSection(true)} style={styles.addButton}>
              <HiPlus size={18} />
              Add Section
            </button>
          </div>

          {loading ? (
            <div style={styles.loadingContainer}>
              <div style={styles.spinner}></div>
              <p>Loading sections...</p>
            </div>
          ) : sections.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>📖</div>
              <p style={styles.emptyText}>No sections yet</p>
              <p style={styles.emptySubtext}>Click "Add Section" to create your first section</p>
            </div>
          ) : (
            <div style={styles.sectionsList}>
              {sections.map((section, index) => (
                <div key={section.id} style={styles.section}>
                  <div 
                    style={styles.sectionHeader}
                    onClick={() => toggleSection(index)}
                  >
                    <div style={styles.sectionHeaderLeft}>
                      {expandedSections.has(index) ? (
                        <HiChevronUp size={20} color="#667eea" />
                      ) : (
                        <HiChevronDown size={20} color="#667eea" />
                      )}
                      <div>
                        <h3 style={styles.sectionTitle}>{section.title}</h3>
                        <p style={styles.sectionMeta}>
                          {section.day} • {section.duration} • {section.lectures?.length || 0} lectures
                        </p>
                      </div>
                    </div>
                    <div style={styles.sectionActions}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingSection(section);
                          setSectionForm({
                            day: section.day,
                            title: section.title,
                            duration: section.duration
                          });
                        }}
                        style={styles.iconButton}
                      >
                        <HiPencil size={16} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteSection(section.id);
                        }}
                        style={styles.deleteIconButton}
                      >
                        <HiTrash size={16} />
                      </button>
                    </div>
                  </div>

                  {expandedSections.has(index) && (
                    <div style={styles.sectionContent}>
                      <button
                        onClick={() => setShowAddLecture(section.id)}
                        style={styles.addLectureButton}
                      >
                        <HiPlus size={16} />
                        Add Lecture
                      </button>

                      {section.lectures?.length === 0 ? (
                        <p style={styles.noLectures}>No lectures yet</p>
                      ) : (
                        <div style={styles.lecturesList}>
                          {section.lectures?.map((lecture) => (
                            <div key={lecture.id} style={styles.lecture}>
                              <HiVideoCamera size={20} color="#667eea" />
                              <div style={styles.lectureInfo}>
                                <h4 style={styles.lectureTitle}>{lecture.title}</h4>
                                <p style={styles.lectureMeta}>
                                  {lecture.duration}
                                  {lecture.videoUrl && ' • Has Video'}
                                </p>
                              </div>
                              <div style={styles.lectureActions}>
                                <button
                                  onClick={() => {
                                    setEditingLecture(lecture);
                                    setLectureForm({
                                      title: lecture.title,
                                      duration: lecture.duration,
                                      videoUrl: lecture.videoUrl || ''
                                    });
                                  }}
                                  style={styles.iconButton}
                                >
                                  <HiPencil size={14} />
                                </button>
                                <button
                                  onClick={() => handleDeleteLecture(lecture.id)}
                                  style={styles.deleteIconButton}
                                >
                                  <HiTrash size={14} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add/Edit Section Modal */}
      {(showAddSection || editingSection) && (
        <div style={styles.modalOverlay} onClick={() => {
          setShowAddSection(false);
          setEditingSection(null);
          setSectionForm({ day: '', title: '', duration: '' });
        }}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                {editingSection ? 'Edit Section' : 'Add New Section'}
              </h2>
              <button
                onClick={() => {
                  setShowAddSection(false);
                  setEditingSection(null);
                  setSectionForm({ day: '', title: '', duration: '' });
                }}
                style={styles.modalClose}
              >
                <HiX size={24} />
              </button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Day</label>
                <input
                  type="text"
                  placeholder="e.g., Day 1"
                  value={sectionForm.day}
                  onChange={(e) => setSectionForm({ ...sectionForm, day: e.target.value })}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Section Title</label>
                <input
                  type="text"
                  placeholder="e.g., Introduction to Python"
                  value={sectionForm.title}
                  onChange={(e) => setSectionForm({ ...sectionForm, title: e.target.value })}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Duration</label>
                <input
                  type="text"
                  placeholder="e.g., 2h 30m"
                  value={sectionForm.duration}
                  onChange={(e) => setSectionForm({ ...sectionForm, duration: e.target.value })}
                  style={styles.input}
                />
              </div>
              <button
                onClick={editingSection ? handleUpdateSection : handleCreateSection}
                style={styles.submitButton}
              >
                <HiSave size={20} />
                {editingSection ? 'Update Section' : 'Create Section'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Lecture Modal */}
      {(showAddLecture !== null || editingLecture) && (
        <div style={styles.modalOverlay} onClick={() => {
          setShowAddLecture(null);
          setEditingLecture(null);
          setLectureForm({ title: '', duration: '', videoUrl: '' });
        }}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                {editingLecture ? 'Edit Lecture' : 'Add New Lecture'}
              </h2>
              <button
                onClick={() => {
                  setShowAddLecture(null);
                  setEditingLecture(null);
                  setLectureForm({ title: '', duration: '', videoUrl: '' });
                }}
                style={styles.modalClose}
              >
                <HiX size={24} />
              </button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Lecture Title</label>
                <input
                  type="text"
                  placeholder="e.g., Variables and Data Types"
                  value={lectureForm.title}
                  onChange={(e) => setLectureForm({ ...lectureForm, title: e.target.value })}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Duration</label>
                <input
                  type="text"
                  placeholder="e.g., 15 min"
                  value={lectureForm.duration}
                  onChange={(e) => setLectureForm({ ...lectureForm, duration: e.target.value })}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Video URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://www.youtube.com/embed/..."
                  value={lectureForm.videoUrl}
                  onChange={(e) => setLectureForm({ ...lectureForm, videoUrl: e.target.value })}
                  style={styles.input}
                />
              </div>
              <button
                onClick={editingLecture ? handleUpdateLecture : () => handleCreateLecture(showAddLecture!)}
                style={styles.submitButton}
              >
                <HiSave size={20} />
                {editingLecture ? 'Update Lecture' : 'Add Lecture'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '32px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  header: {
    marginBottom: '32px',
  },
  title: {
    fontSize: '32px',
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
  card: {
    background: 'white',
    borderRadius: '16px',
    padding: '32px',
    marginBottom: '24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  cardTitle: {
    fontSize: '22px',
    fontWeight: 800,
    color: '#1f2937',
    margin: '0 0 8px 0',
  },
  cardSubtitle: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0,
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '24px',
    flexWrap: 'wrap',
    gap: '16px',
  },
  courseGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  },
  courseCard: {
    position: 'relative',
    background: '#f9fafb',
    borderRadius: '12px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.3s',
    border: '2px solid transparent',
  },
  courseCardActive: {
    borderColor: '#667eea',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
  },
  courseCardImage: {
    width: '100%',
    height: '140px',
    objectFit: 'cover',
  },
  courseCardContent: {
    padding: '16px',
  },
  courseCardTitle: {
    fontSize: '16px',
    fontWeight: 700,
    color: '#1f2937',
    margin: '0 0 8px 0',
  },
  courseCardId: {
    fontSize: '12px',
    color: '#9ca3af',
  },
  selectedBadge: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    background: '#667eea',
    color: 'white',
    borderRadius: '50%',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '4px solid #e5e7eb',
    borderTop: '4px solid #667eea',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
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
  sectionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  section: {
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    overflow: 'hidden',
    background: 'white',
  },
  sectionHeader: {
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#f9fafb',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  sectionHeaderLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    flex: 1,
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#1f2937',
    margin: '0 0 4px 0',
  },
  sectionMeta: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0,
  },
  sectionActions: {
    display: 'flex',
    gap: '8px',
  },
  sectionContent: {
    padding: '20px',
    background: 'white',
    borderTop: '1px solid #e5e7eb',
  },
  addLectureButton: {
    padding: '10px 20px',
    background: '#eff6ff',
    color: '#3b82f6',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '16px',
  },
  lecturesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  lecture: {
    padding: '16px',
    background: '#f9fafb',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    border: '1px solid #e5e7eb',
  },
  lectureInfo: {
    flex: 1,
  },
  lectureTitle: {
    fontSize: '15px',
    fontWeight: 600,
    color: '#1f2937',
    margin: '0 0 4px 0',
  },
  lectureMeta: {
    fontSize: '13px',
    color: '#6b7280',
    margin: 0,
  },
  lectureActions: {
    display: 'flex',
    gap: '8px',
  },
  iconButton: {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    border: 'none',
    background: '#eff6ff',
    color: '#3b82f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  deleteIconButton: {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    border: 'none',
    background: '#fef2f2',
    color: '#ef4444',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  noLectures: {
    textAlign: 'center',
    color: '#9ca3af',
    fontSize: '14px',
    padding: '20px',
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
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: 600,
    color: '#374151',
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '10px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
    },
    submitButton: {
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
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
    color: 'white',
    zIndex: 1100,
    },
    notificationSuccess: {
    background: '#10b981',
    },
    notificationError: {
    background: '#ef4444',
    },
};

export default AdminCourseContentManager;
