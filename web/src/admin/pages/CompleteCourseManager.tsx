import React, { useState, useEffect } from 'react';
import { 
  HiPlus, HiTrash, HiPencil, HiSave, HiX, HiCheckCircle, HiExclamationCircle,
  HiChevronDown, HiChevronUp, HiVideoCamera, HiAcademicCap, HiUpload
} from 'react-icons/hi';
import { API_BASE_URL } from '../../config/api';

const API_URL = API_BASE_URL;

interface Instructor {
  id: number;
  name: string;
  title: string;
}

interface Course {
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
  instructor?: { name: string; title: string };
  imageUrl: string;
  whatYouLearn: string[];
  includes: string[];
  companies: string[];
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

const CompleteCourseManager: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null);
  const [activeTab, setActiveTab] = useState<'create' | 'manage'>('create');
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set());
  
  // Modals
  const [showCreateCourse, setShowCreateCourse] = useState(false);
  const [showEditCourse, setShowEditCourse] = useState(false);
  const [showAddSection, setShowAddSection] = useState(false);
  const [showAddLecture, setShowAddLecture] = useState<number | null>(null);
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [editingLecture, setEditingLecture] = useState<Lecture | null>(null);
  
  // Forms
  const [courseForm, setCourseForm] = useState({
    title: '',
    description: '',
    category: '',
    subcategory: '',
    price: 0,
    originalPrice: 0,
    badge: 'NEW',
    instructorId: 0,
    imageUrl: '',
    whatYouLearn: '',
    includes: '',
    companies: ''
  });
  
  const [sectionForm, setSectionForm] = useState({ day: '', title: '', duration: '' });
  const [lectureForm, setLectureForm] = useState({ title: '', duration: '', videoUrl: '' });

  useEffect(() => {
    loadCourses();
    loadInstructors();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      loadCourseSections(selectedCourse.id);
    }
  }, [selectedCourse]);

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

  const loadInstructors = async () => {
    try {
      const response = await fetch(`${API_URL}/Admin/instructors`);
      const data = await response.json();
      setInstructors(data);
    } catch (error) {
      showNotification('error', 'Failed to load instructors');
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

  const handleCreateCourse = async () => {
    if (!courseForm.title || !courseForm.instructorId) {
      showNotification('error', 'Please fill required fields');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/Admin/courses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: courseForm.title,
          description: courseForm.description,
          category: courseForm.category,
          subcategory: courseForm.subcategory,
          price: courseForm.price,
          originalPrice: courseForm.originalPrice,
          badge: courseForm.badge,
          instructorId: courseForm.instructorId,
          imageUrl: courseForm.imageUrl,
          whatYouLearn: courseForm.whatYouLearn.split('\n').filter(Boolean),
          includes: courseForm.includes.split('\n').filter(Boolean),
          companies: courseForm.companies.split('\n').filter(Boolean)
        })
      });

      if (response.ok) {
        showNotification('success', 'Course created successfully!');
        setShowCreateCourse(false);
        resetCourseForm();
        loadCourses();
      } else {
        showNotification('error', 'Failed to create course');
      }
    } catch (error) {
      showNotification('error', 'Error creating course');
    }
  };

  const handleUpdateCourse = async () => {
    if (!selectedCourse) return;

    try {
      const response = await fetch(`${API_URL}/Courses/${selectedCourse.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: courseForm.title,
          description: courseForm.description,
          category: courseForm.category,
          subcategory: courseForm.subcategory,
          price: courseForm.price,
          originalPrice: courseForm.originalPrice,
          badge: courseForm.badge,
          imageUrl: courseForm.imageUrl,
          whatYouLearn: courseForm.whatYouLearn.split('\n').filter(Boolean),
          includes: courseForm.includes.split('\n').filter(Boolean),
          companies: courseForm.companies.split('\n').filter(Boolean)
        })
      });

      if (response.ok) {
        showNotification('success', 'Course updated successfully!');
        setShowEditCourse(false);
        loadCourses();
      }
    } catch (error) {
      showNotification('error', 'Failed to update course');
    }
  };

  const handleDeleteCourse = async (courseId: number, title: string) => {
    if (!confirm(`Delete "${title}"?`)) return;

    try {
      const response = await fetch(`${API_URL}/Admin/courses/${courseId}`, { method: 'DELETE' });
      if (response.ok) {
        showNotification('success', 'Course deleted!');
        loadCourses();
        if (selectedCourse?.id === courseId) setSelectedCourse(null);
      }
    } catch (error) {
      showNotification('error', 'Failed to delete course');
    }
  };

  const handleCreateSection = async () => {
    if (!selectedCourse || !sectionForm.day || !sectionForm.title) {
      showNotification('error', 'Please fill all fields');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/Admin/courses/sections`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: selectedCourse.id,
          day: sectionForm.day,
          title: sectionForm.title,
          duration: sectionForm.duration
        })
      });

      if (response.ok) {
        showNotification('success', 'Section created!');
        setShowAddSection(false);
        setSectionForm({ day: '', title: '', duration: '' });
        loadCourseSections(selectedCourse.id);
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
        showNotification('success', 'Section updated!');
        setEditingSection(null);
        setSectionForm({ day: '', title: '', duration: '' });
        if (selectedCourse) loadCourseSections(selectedCourse.id);
      }
    } catch (error) {
      showNotification('error', 'Error updating section');
    }
  };

  const handleDeleteSection = async (sectionId: number) => {
    if (!confirm('Delete this section and all lectures?')) return;

    try {
      const response = await fetch(`${API_URL}/Admin/courses/sections/${sectionId}`, { method: 'DELETE' });
      if (response.ok) {
        showNotification('success', 'Section deleted!');
        if (selectedCourse) loadCourseSections(selectedCourse.id);
      }
    } catch (error) {
      showNotification('error', 'Error deleting section');
    }
  };

  const handleCreateLecture = async (sectionId: number) => {
    if (!lectureForm.title || !lectureForm.duration) {
      showNotification('error', 'Please fill all fields');
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
        showNotification('success', 'Lecture created!');
        setShowAddLecture(null);
        setLectureForm({ title: '', duration: '', videoUrl: '' });
        if (selectedCourse) loadCourseSections(selectedCourse.id);
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
        showNotification('success', 'Lecture updated!');
        setEditingLecture(null);
        setLectureForm({ title: '', duration: '', videoUrl: '' });
        if (selectedCourse) loadCourseSections(selectedCourse.id);
      }
    } catch (error) {
      showNotification('error', 'Error updating lecture');
    }
  };

  const handleDeleteLecture = async (lectureId: number) => {
    if (!confirm('Delete this lecture?')) return;

    try {
      const response = await fetch(`${API_URL}/Admin/courses/lectures/${lectureId}`, { method: 'DELETE' });
      if (response.ok) {
        showNotification('success', 'Lecture deleted!');
        if (selectedCourse) loadCourseSections(selectedCourse.id);
      }
    } catch (error) {
      showNotification('error', 'Error deleting lecture');
    }
  };

  const resetCourseForm = () => {
    setCourseForm({
      title: '', description: '', category: '', subcategory: '',
      price: 0, originalPrice: 0, badge: 'NEW', instructorId: 0,
      imageUrl: '', whatYouLearn: '', includes: '', companies: ''
    });
  };

  const toggleSection = (index: number) => {
    const newExpanded = new Set(expandedSections);
    newExpanded.has(index) ? newExpanded.delete(index) : newExpanded.add(index);
    setExpandedSections(newExpanded);
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

      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>🎓 Complete Course Manager</h1>
          <p style={styles.subtitle}>Create courses, add content, and manage everything</p>
        </div>
        <button onClick={() => setShowCreateCourse(true)} style={styles.createButton}>
          <HiPlus size={20} /> Create New Course
        </button>
      </div>

      <div style={styles.tabs}>
        <button
          onClick={() => setActiveTab('create')}
          style={{...styles.tab, ...(activeTab === 'create' ? styles.tabActive : {})}}
        >
          <HiAcademicCap size={20} /> My Courses ({courses.length})
        </button>
        <button
          onClick={() => setActiveTab('manage')}
          style={{...styles.tab, ...(activeTab === 'manage' ? styles.tabActive : {})}}
        >
          <HiVideoCamera size={20} /> Content Manager
        </button>
      </div>

      {activeTab === 'create' && (
        <div style={styles.coursesGrid}>
          {courses.map((course) => (
            <div key={course.id} style={styles.courseCard}>
              <img src={course.imageUrl} alt={course.title} style={styles.courseImage} />
              <div style={styles.courseContent}>
                <div style={styles.courseBadge}>{course.badge}</div>
                <h3 style={styles.courseTitle}>{course.title}</h3>
                <p style={styles.courseCategory}>{course.category} • {course.subcategory}</p>
                <div style={styles.courseStats}>
                  <span>⭐ {course.rating}</span>
                  <span>👥 {course.studentCount}</span>
                  <span>₹{course.price}</span>
                </div>
                <div style={styles.courseActions}>
                  <button onClick={() => {
                    setSelectedCourse(course);
                    setActiveTab('manage');
                  }} style={styles.actionButton}>
                    <HiVideoCamera size={16} /> Manage Content
                  </button>
                  <button onClick={() => {
                    setSelectedCourse(course);
                    setCourseForm({
                      title: course.title,
                      description: course.description,
                      category: course.category,
                      subcategory: course.subcategory,
                      price: course.price,
                      originalPrice: course.originalPrice,
                      badge: course.badge,
                      instructorId: course.instructorId,
                      imageUrl: course.imageUrl,
                      whatYouLearn: course.whatYouLearn.join('\n'),
                      includes: course.includes.join('\n'),
                      companies: course.companies.join('\n')
                    });
                    setShowEditCourse(true);
                  }} style={styles.editButton}>
                    <HiPencil size={16} />
                  </button>
                  <button onClick={() => handleDeleteCourse(course.id, course.title)} style={styles.deleteButton}>
                    <HiTrash size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'manage' && (
        <div style={styles.contentManager}>
          {!selectedCourse ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>📚</div>
              <p style={styles.emptyText}>Select a course to manage content</p>
              <p style={styles.emptySubtext}>Go to "My Courses" tab and click "Manage Content"</p>
            </div>
          ) : (
            <>
              <div style={styles.card}>
                <div style={styles.cardHeader}>
                  <div>
                    <h2 style={styles.cardTitle}>📖 {selectedCourse.title}</h2>
                    <p style={styles.cardSubtitle}>{sections.length} sections • {sections.reduce((acc, s) => acc + s.lectures.length, 0)} lectures</p>
                  </div>
                  <button onClick={() => setShowAddSection(true)} style={styles.addButton}>
                    <HiPlus size={18} /> Add Section
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
                        <div style={styles.sectionHeader} onClick={() => toggleSection(index)}>
                          <div style={styles.sectionHeaderLeft}>
                            {expandedSections.has(index) ? <HiChevronUp size={20} /> : <HiChevronDown size={20} />}
                            <div>
                              <h3 style={styles.sectionTitle}>{section.title}</h3>
                              <p style={styles.sectionMeta}>{section.day} • {section.duration} • {section.lectures.length} lectures</p>
                            </div>
                          </div>
                          <div style={styles.sectionActions}>
                            <button onClick={(e) => {
                              e.stopPropagation();
                              setEditingSection(section);
                              setSectionForm({ day: section.day, title: section.title, duration: section.duration });
                            }} style={styles.iconButton}>
                              <HiPencil size={16} />
                            </button>
                            <button onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteSection(section.id);
                            }} style={styles.deleteIconButton}>
                              <HiTrash size={16} />
                            </button>
                          </div>
                        </div>

                        {expandedSections.has(index) && (
                          <div style={styles.sectionContent}>
                            <button onClick={() => setShowAddLecture(section.id)} style={styles.addLectureButton}>
                              <HiPlus size={16} /> Add Lecture
                            </button>

                            {section.lectures.length === 0 ? (
                              <p style={styles.noLectures}>No lectures yet</p>
                            ) : (
                              <div style={styles.lecturesList}>
                                {section.lectures.map((lecture) => (
                                  <div key={lecture.id} style={styles.lecture}>
                                    <HiVideoCamera size={20} color="#667eea" />
                                    <div style={styles.lectureInfo}>
                                      <h4 style={styles.lectureTitle}>{lecture.title}</h4>
                                      <p style={styles.lectureMeta}>{lecture.duration}{lecture.videoUrl && ' • Has Video'}</p>
                                    </div>
                                    <div style={styles.lectureActions}>
                                      <button onClick={() => {
                                        setEditingLecture(lecture);
                                        setLectureForm({ title: lecture.title, duration: lecture.duration, videoUrl: lecture.videoUrl || '' });
                                      }} style={styles.iconButton}>
                                        <HiPencil size={14} />
                                      </button>
                                      <button onClick={() => handleDeleteLecture(lecture.id)} style={styles.deleteIconButton}>
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
            </>
          )}
        </div>
      )}

      {/* Create/Edit Course Modal */}
      {(showCreateCourse || showEditCourse) && (
        <div style={styles.modalOverlay} onClick={() => {
          setShowCreateCourse(false);
          setShowEditCourse(false);
          resetCourseForm();
        }}>
          <div style={styles.modalLarge} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>{showEditCourse ? 'Edit Course' : 'Create New Course'}</h2>
              <button onClick={() => {
                setShowCreateCourse(false);
                setShowEditCourse(false);
                resetCourseForm();
              }} style={styles.modalClose}>
                <HiX size={24} />
              </button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Course Title *</label>
                  <input
                    type="text"
                    value={courseForm.title}
                    onChange={(e) => setCourseForm({...courseForm, title: e.target.value})}
                    style={styles.input}
                    placeholder="Complete Python Programming"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Instructor *</label>
                  <select
                    value={courseForm.instructorId}
                    onChange={(e) => setCourseForm({...courseForm, instructorId: parseInt(e.target.value)})}
                    style={styles.input}
                  >
                    <option value={0}>Select Instructor</option>
                    {instructors.map(inst => (
                      <option key={inst.id} value={inst.id}>{inst.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Description</label>
                <textarea
                  value={courseForm.description}
                  onChange={(e) => setCourseForm({...courseForm, description: e.target.value})}
                  style={styles.textarea}
                  rows={3}
                  placeholder="Learn Python from basics to advanced..."
                />
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Category</label>
                  <input
                    type="text"
                    value={courseForm.category}
                    onChange={(e) => setCourseForm({...courseForm, category: e.target.value})}
                    style={styles.input}
                    placeholder="Development"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Subcategory</label>
                  <input
                    type="text"
                    value={courseForm.subcategory}
                    onChange={(e) => setCourseForm({...courseForm, subcategory: e.target.value})}
                    style={styles.input}
                    placeholder="Python"
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Badge</label>
                  <select
                    value={courseForm.badge}
                    onChange={(e) => setCourseForm({...courseForm, badge: e.target.value})}
                    style={styles.input}
                  >
                    <option value="NEW">NEW</option>
                    <option value="BESTSELLER">BESTSELLER</option>
                    <option value="HOT">HOT</option>
                  </select>
                </div>
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
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>What You'll Learn (one per line)</label>
                <textarea
                  value={courseForm.whatYouLearn}
                  onChange={(e) => setCourseForm({...courseForm, whatYouLearn: e.target.value})}
                  style={styles.textarea}
                  rows={3}
                  placeholder="Python Basics&#10;OOP Concepts&#10;Web Scraping"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Includes (one per line)</label>
                <textarea
                  value={courseForm.includes}
                  onChange={(e) => setCourseForm({...courseForm, includes: e.target.value})}
                  style={styles.textarea}
                  rows={3}
                  placeholder="50 hours video&#10;Certificate&#10;Lifetime access"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Companies (one per line)</label>
                <textarea
                  value={courseForm.companies}
                  onChange={(e) => setCourseForm({...courseForm, companies: e.target.value})}
                  style={styles.textarea}
                  rows={2}
                  placeholder="Google&#10;Amazon&#10;Microsoft"
                />
              </div>

              <button
                onClick={showEditCourse ? handleUpdateCourse : handleCreateCourse}
                style={styles.submitButton}
              >
                <HiSave size={20} />
                {showEditCourse ? 'Update Course' : 'Create Course'}
              </button>
            </div>
          </div>
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
              <h2 style={styles.modalTitle}>{editingSection ? 'Edit Section' : 'Add Section'}</h2>
              <button onClick={() => {
                setShowAddSection(false);
                setEditingSection(null);
                setSectionForm({ day: '', title: '', duration: '' });
              }} style={styles.modalClose}>
                <HiX size={24} />
              </button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Day</label>
                <input
                  type="text"
                  value={sectionForm.day}
                  onChange={(e) => setSectionForm({...sectionForm, day: e.target.value})}
                  style={styles.input}
                  placeholder="Day 1"
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Section Title</label>
                <input
                  type="text"
                  value={sectionForm.title}
                  onChange={(e) => setSectionForm({...sectionForm, title: e.target.value})}
                  style={styles.input}
                  placeholder="Introduction to Python"
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Duration</label>
                <input
                  type="text"
                  value={sectionForm.duration}
                  onChange={(e) => setSectionForm({...sectionForm, duration: e.target.value})}
                  style={styles.input}
                  placeholder="4 hours"
                />
              </div>
              <button onClick={editingSection ? handleUpdateSection : handleCreateSection} style={styles.submitButton}>
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
              <h2 style={styles.modalTitle}>{editingLecture ? 'Edit Lecture' : 'Add Lecture'}</h2>
              <button onClick={() => {
                setShowAddLecture(null);
                setEditingLecture(null);
                setLectureForm({ title: '', duration: '', videoUrl: '' });
              }} style={styles.modalClose}>
                <HiX size={24} />
              </button>
            </div>
            <div style={styles.modalBody}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Lecture Title</label>
                <input
                  type="text"
                  value={lectureForm.title}
                  onChange={(e) => setLectureForm({...lectureForm, title: e.target.value})}
                  style={styles.input}
                  placeholder="Variables and Data Types"
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Duration</label>
                <input
                  type="text"
                  value={lectureForm.duration}
                  onChange={(e) => setLectureForm({...lectureForm, duration: e.target.value})}
                  style={styles.input}
                  placeholder="15 min"
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Video URL (Optional)</label>
                <input
                  type="url"
                  value={lectureForm.videoUrl}
                  onChange={(e) => setLectureForm({...lectureForm, videoUrl: e.target.value})}
                  style={styles.input}
                  placeholder="https://www.youtube.com/embed/..."
                />
              </div>
              <button onClick={editingLecture ? handleUpdateLecture : () => handleCreateLecture(showAddLecture!)} style={styles.submitButton}>
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
  container: { maxWidth: '1600px', margin: '0 auto', padding: '32px', fontFamily: 'system-ui, -apple-system, sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' },
  title: { fontSize: '32px', fontWeight: 900, background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: '0 0 8px 0' },
  subtitle: { fontSize: '16px', color: '#6b7280', margin: 0 },
  createButton: { padding: '12px 24px', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' },
  
  tabs: { display: 'flex', gap: '12px', marginBottom: '24px', borderBottom: '2px solid #e5e7eb' },
  tab: { padding: '12px 24px', background: 'transparent', border: 'none', borderBottom: '3px solid transparent', color: '#6b7280', fontSize: '15px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' },
  tabActive: { color: '#667eea', borderBottomColor: '#667eea' },
  
  coursesGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' },
  courseCard: { background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', transition: 'transform 0.3s' },
  courseImage: { width: '100%', height: '180px', objectFit: 'cover' },
  courseContent: { padding: '20px' },
  courseBadge: { display: 'inline-block', padding: '4px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 700, background: '#fef3c7', color: '#d97706', marginBottom: '12px' },
  courseTitle: { fontSize: '18px', fontWeight: 700, color: '#1f2937', margin: '0 0 8px 0' },
  courseCategory: { fontSize: '14px', color: '#6b7280', margin: '0 0 12px 0' },
  courseStats: { display: 'flex', gap: '16px', fontSize: '14px', color: '#1f2937', marginBottom: '16px', paddingTop: '12px', borderTop: '1px solid #f3f4f6' },
  courseActions: { display: 'flex', gap: '8px' },
  actionButton: { flex: 1, padding: '8px 12px', background: '#eff6ff', color: '#3b82f6', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' },
  editButton: { width: '36px', height: '36px', borderRadius: '8px', border: 'none', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
  deleteButton: { width: '36px', height: '36px', borderRadius: '8px', border: 'none', background: '#fef2f2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
  
  contentManager: { minHeight: '400px' },
  card: { background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' },
  cardTitle: { fontSize: '22px', fontWeight: 800, color: '#1f2937', margin: '0 0 4px 0' },
  cardSubtitle: { fontSize: '14px', color: '#6b7280', margin: 0 },
  addButton: { padding: '10px 20px', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' },
  
  loadingContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 20px' },
  spinner: { width: '50px', height: '50px', border: '4px solid #e5e7eb', borderTop: '4px solid #667eea', borderRadius: '50%', animation: 'spin 1s linear infinite' },
  
  emptyState: { textAlign: 'center', padding: '60px 20px' },
  emptyIcon: { fontSize: '64px', marginBottom: '16px' },
  emptyText: { fontSize: '18px', fontWeight: 700, color: '#1f2937', margin: '0 0 8px 0' },
  emptySubtext: { fontSize: '15px', color: '#9ca3af', margin: 0 },
  
  sectionsList: { display: 'flex', flexDirection: 'column', gap: '16px' },
  section: { border: '2px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden', background: 'white' },
  sectionHeader: { padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f9fafb', cursor: 'pointer' },
  sectionHeaderLeft: { display: 'flex', alignItems: 'center', gap: '16px', flex: 1 },
  sectionTitle: { fontSize: '18px', fontWeight: 700, color: '#1f2937', margin: '0 0 4px 0' },
  sectionMeta: { fontSize: '14px', color: '#6b7280', margin: 0 },
  sectionActions: { display: 'flex', gap: '8px' },
  sectionContent: { padding: '20px', background: 'white', borderTop: '1px solid #e5e7eb' },
  addLectureButton: { padding: '10px 20px', background: '#eff6ff', color: '#3b82f6', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' },
  
  lecturesList: { display: 'flex', flexDirection: 'column', gap: '12px' },
  lecture: { padding: '16px', background: '#f9fafb', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid #e5e7eb' },
  lectureInfo: { flex: 1 },
  lectureTitle: { fontSize: '15px', fontWeight: 600, color: '#1f2937', margin: '0 0 4px 0' },
  lectureMeta: { fontSize: '13px', color: '#6b7280', margin: 0 },
  lectureActions: { display: 'flex', gap: '8px' },
  iconButton: { width: '36px', height: '36px', borderRadius: '8px', border: 'none', background: '#eff6ff', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
  deleteIconButton: { width: '36px', height: '36px', borderRadius: '8px', border: 'none', background: '#fef2f2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
  noLectures: { textAlign: 'center', color: '#9ca3af', fontSize: '14px', padding: '20px' },
  
  modalOverlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modal: { background: 'white', borderRadius: '20px', maxWidth: '600px', width: '90%', maxHeight: '90vh', overflow: 'auto' },
  modalLarge: { background: 'white', borderRadius: '20px', maxWidth: '800px', width: '90%', maxHeight: '90vh', overflow: 'auto' },
  modalHeader: { padding: '24px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  modalTitle: { fontSize: '24px', fontWeight: 700, color: '#1f2937', margin: 0 },
  modalClose: { width: '40px', height: '40px', borderRadius: '10px', border: 'none', background: '#f3f4f6', color: '#1f2937', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' },
  modalBody: { padding: '24px' },
  
  formGroup: { marginBottom: '20px' },
  formRow: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' },
  label: { display: 'block', fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '8px' },
  input: { width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #d1d5db', fontSize: '14px', outline: 'none' },
  textarea: { width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1px solid #d1d5db', fontSize: '14px', outline: 'none', fontFamily: 'inherit', resize: 'vertical' },
  submitButton: { width: '100%', padding: '14px 24px', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' },
  
  notification: { position: 'fixed', top: '20px', right: '20px', padding: '16px 24px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', color: 'white', zIndex: 1100 },
  notificationSuccess: { background: '#10b981' },
  notificationError: { background: '#ef4444' },
};

const styleSheet = document.createElement("style");
styleSheet.textContent = `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
document.head.appendChild(styleSheet);

export default CompleteCourseManager;
