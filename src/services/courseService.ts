import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  QueryConstraint,
  Timestamp,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebaseConfig';
import { Course, CreateCourseInput } from '../types/course';

/**
 * Course Service - Handles all database operations for courses
 * Works with Firebase Firestore and Storage
 */

const COURSES_COLLECTION = 'courses';

/**
 * Fetch all courses
 */
export const getAllCourses = async (): Promise<Course[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, COURSES_COLLECTION));
    const courses: Course[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      courses.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as Course);
    });

    return courses;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

/**
 * Fetch a single course by ID
 */
export const getCourseById = async (courseId: string): Promise<Course | null> => {
  try {
    const docRef = doc(db, COURSES_COLLECTION, courseId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as Course;
    }

    return null;
  } catch (error) {
    console.error('Error fetching course:', error);
    throw error;
  }
};

/**
 * Fetch courses by category
 */
export const getCoursesByCategory = async (category: string): Promise<Course[]> => {
  try {
    const q = query(
      collection(db, COURSES_COLLECTION),
      where('category', '==', category)
    );
    const querySnapshot = await getDocs(q);
    const courses: Course[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      courses.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as Course);
    });

    return courses;
  } catch (error) {
    console.error('Error fetching courses by category:', error);
    throw error;
  }
};

/**
 * Upload course image to storage
 */
export const uploadCourseImage = async (
  courseId: string,
  imageFile: File
): Promise<string> => {
  try {
    const fileName = `courses/${courseId}/image_${Date.now()}`;
    const storageRef = ref(storage, fileName);
    await uploadBytes(storageRef, imageFile);
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

/**
 * Create a new course
 */
export const createCourse = async (
  courseData: CreateCourseInput
): Promise<Course> => {
  try {
    let imageUrl = 'https://via.placeholder.com/400x300?text=Course';

    // Upload image if provided
    if (courseData.imageFile) {
      const tempId = Date.now().toString();
      imageUrl = await uploadCourseImage(tempId, courseData.imageFile);
    }

    const courseDoc = {
      ...courseData,
      imageUrl,
      reviewCount: 0,
      studentCount: 0,
      rating: 4.5,
      reviews: [],
      whatYouLearn: courseData.whatYouLearn || [],
      includes: courseData.includes || [],
      companies: courseData.companies || [],
      courseContent: {
        totalSections: 0,
        totalLectures: 0,
        totalDuration: '0h',
        sections: [],
      },
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    const docRef = await addDoc(collection(db, COURSES_COLLECTION), courseDoc);

    return {
      id: docRef.id,
      ...courseDoc,
    } as Course;
  } catch (error) {
    console.error('Error creating course:', error);
    throw error;
  }
};

/**
 * Update an existing course
 */
export const updateCourse = async (
  courseId: string,
  updates: Partial<Course>
): Promise<void> => {
  try {
    const courseRef = doc(db, COURSES_COLLECTION, courseId);
    const updateData = {
      ...updates,
      updatedAt: Timestamp.now(),
    };

    await updateDoc(courseRef, updateData);
  } catch (error) {
    console.error('Error updating course:', error);
    throw error;
  }
};

/**
 * Delete a course
 */
export const deleteCourse = async (courseId: string): Promise<void> => {
  try {
    const courseRef = doc(db, COURSES_COLLECTION, courseId);
    await deleteDoc(courseRef);
  } catch (error) {
    console.error('Error deleting course:', error);
    throw error;
  }
};
