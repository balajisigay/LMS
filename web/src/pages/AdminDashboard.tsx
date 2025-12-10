import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCourse, getAllCourses, deleteCourse } from '../services/courseService';
import { Course, CreateCourseInput } from '../types/course';
import { colors, spacing, fontSize, borderRadius } from '../styles/colors';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Development',
    subcategory: 'Python',
    price: 14.99,
    originalPrice: 84.99,
    badge: 'BESTSELLER',
    imageUrl: '',
    whatYouLearn: [] as string[],
    includes: [] as string[],
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Load courses on mount
  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const data = await getAllCourses();
      setCourses(data);
    } catch (error) {
      console.error('Error loading courses:', error);
      alert('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes('price') || name === 'courses' || name === 'students' ? Number(value) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleAddLearnItem = () => {
    setFormData((prev) => ({
      ...prev,
      whatYouLearn: [...(prev.whatYouLearn || []), ''],
    }));
  };

  const handleLearnItemChange = (index: number, value: string) => {
    const updated = [...(formData.whatYouLearn || [])];
    updated[index] = value;
    setFormData((prev) => ({
      ...prev,
      whatYouLearn: updated,
    }));
  };

  const handleAddIncludeItem = () => {
    setFormData((prev) => ({
      ...prev,
      includes: [...(prev.includes || []), ''],
    }));
  };

  const handleIncludeItemChange = (index: number, value: string) => {
    const updated = [...(formData.includes || [])];
    updated[index] = value;
    setFormData((prev) => ({
      ...prev,
      includes: updated,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      const courseData: CreateCourseInput = {
        ...formData,
        instructorId: 1,
      };
      await createCourse(courseData);
      alert('Course created successfully!');
      setFormData({
        title: '',
        description: '',
        category: 'Development',
        subcategory: 'Python',
        price: 14.99,
        originalPrice: 84.99,
        badge: 'BESTSELLER',
        imageUrl: '',
        whatYouLearn: [],
        includes: [],
      });
      setImageFile(null);
      setShowForm(false);
      await loadCourses();
    } catch (error) {
      console.error('Error creating course:', error);
      alert('Failed to create course');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId: number) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        setLoading(true);
        await deleteCourse(courseId);
        alert('Course deleted successfully!');
        await loadCourses();
      } catch (error) {
        console.error('Error deleting course:', error);
        alert('Failed to delete course');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Admin Dashboard</h1>
          <p style={styles.subtitle}>Manage courses and content</p>
        </div>
        <button style={styles.backBtn} onClick={() => navigate('/')}>
          ← Back to Landing
        </button>
      </div>

      {/* Action Buttons */}
      <div style={styles.actionBar}>
        <button
          style={{
            ...styles.primaryBtn,
            backgroundColor: showForm ? colors.secondary : colors.primary,
          }}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : '+ Add New Course'}
        </button>
        <button style={styles.secondaryBtn} onClick={loadCourses}>
          Refresh
        </button>
      </div>

      {/* Form Section */}
      {showForm && (
        <div style={styles.formSection}>
          <h2 style={styles.formTitle}>Create New Course</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Basic Info */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Course Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title || ''}
                onChange={handleInputChange}
                placeholder="e.g., 2024 Complete Python Bootcamp"
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Description *</label>
              <textarea
                name="description"
                value={formData.description || ''}
                onChange={handleInputChange}
                placeholder="Course description"
                style={{...styles.input, minHeight: '100px', fontFamily: 'Arial'}}
              />
            </div>

            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Category</label>
                <select
                  name="category"
                  value={formData.category || ''}
                  onChange={handleInputChange}
                  style={styles.input}
                >
                  <option>Development</option>
                  <option>Design</option>
                  <option>Business</option>
                  <option>Data Science</option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Subcategory</label>
                <select
                  name="subcategory"
                  value={formData.subcategory || ''}
                  onChange={handleInputChange}
                  style={styles.input}
                >
                  <option>Python</option>
                  <option>JavaScript</option>
                  <option>React</option>
                  <option>Web Design</option>
                </select>
              </div>
            </div>

            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Price ($)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price || ''}
                  onChange={handleInputChange}
                  placeholder="14.99"
                  step="0.01"
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Original Price ($)</label>
                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice || ''}
                  onChange={handleInputChange}
                  placeholder="84.99"
                  step="0.01"
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Badge</label>
                <input
                  type="text"
                  name="badge"
                  value={formData.badge || ''}
                  onChange={handleInputChange}
                  placeholder="BESTSELLER"
                  style={styles.input}
                />
              </div>
            </div>

            {/* Image Upload */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Course Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={styles.input}
              />
              {imageFile && <p style={styles.imageInfo}>Selected: {imageFile.name}</p>}
            </div>

            {/* What You Learn */}
            <div style={styles.sectionTitle}>What You'll Learn</div>
            {(formData.whatYouLearn || []).map((item, index) => (
              <div key={index} style={styles.formGroup}>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleLearnItemChange(index, e.target.value)}
                  placeholder="Learning objective"
                  style={styles.input}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddLearnItem}
              style={styles.addBtn}
            >
              + Add Learning Item
            </button>

            {/* Includes */}
            <div style={styles.sectionTitle}>Course Includes</div>
            {(formData.includes || []).map((item, index) => (
              <div key={index} style={styles.formGroup}>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleIncludeItemChange(index, e.target.value)}
                  placeholder="e.g., 65 hours on-demand video"
                  style={styles.input}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddIncludeItem}
              style={styles.addBtn}
            >
              + Add Include Item
            </button>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.primaryBtn,
                opacity: loading ? 0.6 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
                marginTop: spacing.lg,
              }}
            >
              {loading ? 'Creating...' : 'Create Course'}
            </button>
          </form>
        </div>
      )}

      {/* Courses List */}
      <div style={styles.coursesSection}>
        <h2 style={styles.sectionHeading}>
          All Courses ({courses.length})
        </h2>

        {loading && !courses.length ? (
          <p style={styles.loadingText}>Loading courses...</p>
        ) : courses.length === 0 ? (
          <p style={styles.emptyText}>No courses yet. Create your first course!</p>
        ) : (
          <div style={styles.coursesList}>
            {courses.map((course) => (
              <div key={course.id} style={styles.courseCard}>
                <div style={styles.courseImage}>
                  <img
                    src={course.imageUrl || 'https://via.placeholder.com/150'}
                    alt={course.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={styles.courseInfo}>
                  <h3 style={styles.courseTitle}>{course.title}</h3>
                  <p style={styles.courseCategory}>
                    {course.category} › {course.subcategory}
                  </p>
                  <p style={styles.courseInstructor}>
                    By {course.instructor.name}
                  </p>
                  <div style={styles.courseMeta}>
                    <span>⭐ {course.rating}</span>
                    <span>${course.price}</span>
                  </div>
                </div>
                <div style={styles.courseActions}>
                  <button
                    style={styles.editBtn}
                    onClick={() => console.log('Edit:', course.id)}
                  >
                    Edit
                  </button>
                  <button
                    style={styles.deleteBtn}
                    onClick={() => handleDeleteCourse(course.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    backgroundColor: colors.background,
    padding: spacing.lg,
    maxWidth: '1400px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  title: {
    fontSize: fontSize.xxxl,
    fontWeight: '700',
    color: colors.text,
    margin: 0,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.textLight,
    margin: `${spacing.sm}px 0 0 0`,
  },
  backBtn: {
    backgroundColor: colors.surfaceLight,
    border: `1px solid ${colors.border}`,
    padding: `${spacing.md}px ${spacing.lg}px`,
    borderRadius: borderRadius.md,
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    cursor: 'pointer',
  },
  actionBar: {
    display: 'flex',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  primaryBtn: {
    backgroundColor: colors.primary,
    color: colors.background,
    border: 'none',
    padding: `${spacing.md}px ${spacing.lg}px`,
    borderRadius: borderRadius.md,
    fontSize: fontSize.md,
    fontWeight: '600',
    cursor: 'pointer',
  },
  secondaryBtn: {
    backgroundColor: colors.surfaceLight,
    color: colors.text,
    border: `1px solid ${colors.border}`,
    padding: `${spacing.md}px ${spacing.lg}px`,
    borderRadius: borderRadius.md,
    fontSize: fontSize.md,
    fontWeight: '600',
    cursor: 'pointer',
  },
  formSection: {
    backgroundColor: colors.surfaceLight,
    padding: spacing.xxl,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.xxl,
  },
  formTitle: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.lg,
    margin: 0,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.sm,
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: spacing.md,
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.text,
  },
  input: {
    padding: `${spacing.md}px ${spacing.md}px`,
    border: `1px solid ${colors.border}`,
    borderRadius: borderRadius.md,
    fontSize: fontSize.md,
    fontFamily: 'Arial',
    color: colors.text,
    backgroundColor: colors.background,
  },
  imageInfo: {
    fontSize: fontSize.sm,
    color: colors.textLight,
    margin: 0,
  },
  sectionTitle: {
    fontSize: fontSize.md,
    fontWeight: '700',
    color: colors.text,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  addBtn: {
    backgroundColor: colors.primary,
    color: colors.background,
    border: 'none',
    padding: `${spacing.md}px ${spacing.lg}px`,
    borderRadius: borderRadius.md,
    fontSize: fontSize.sm,
    fontWeight: '600',
    cursor: 'pointer',
    width: 'fit-content',
  },
  coursesSection: {
    marginTop: spacing.xxl,
  },
  sectionHeading: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.lg,
    margin: 0,
  },
  coursesList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: spacing.lg,
  },
  courseCard: {
    backgroundColor: colors.surfaceLight,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  courseImage: {
    width: '100%',
    height: '200px',
    backgroundColor: colors.primary,
    overflow: 'hidden',
  },
  courseInfo: {
    padding: spacing.lg,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.md,
  },
  courseTitle: {
    fontSize: fontSize.md,
    fontWeight: '700',
    color: colors.text,
    margin: 0,
    lineHeight: '1.4',
  },
  courseCategory: {
    fontSize: fontSize.sm,
    color: colors.textLight,
    margin: 0,
  },
  courseInstructor: {
    fontSize: fontSize.sm,
    color: colors.textLight,
    margin: 0,
  },
  courseMeta: {
    display: 'flex',
    gap: spacing.md,
    fontSize: fontSize.sm,
    color: colors.textLight,
  },
  courseActions: {
    display: 'flex',
    gap: spacing.md,
    padding: spacing.lg,
    borderTop: `1px solid ${colors.border}`,
  },
  editBtn: {
    flex: 1,
    backgroundColor: colors.primary,
    color: colors.background,
    border: 'none',
    padding: `${spacing.sm}px ${spacing.md}px`,
    borderRadius: borderRadius.md,
    fontSize: fontSize.sm,
    fontWeight: '600',
    cursor: 'pointer',
  },
  deleteBtn: {
    flex: 1,
    backgroundColor: colors.secondary,
    color: colors.background,
    border: 'none',
    padding: `${spacing.sm}px ${spacing.md}px`,
    borderRadius: borderRadius.md,
    fontSize: fontSize.sm,
    fontWeight: '600',
    cursor: 'pointer',
  },
  loadingText: {
    fontSize: fontSize.md,
    color: colors.textLight,
    textAlign: 'center',
    padding: spacing.xxl,
  },
  emptyText: {
    fontSize: fontSize.md,
    color: colors.textLight,
    textAlign: 'center',
    padding: spacing.xxl,
  },
};
