// src/api/enrollmentService.ts
import { BASE_URL } from "./endpoints";

export interface Enrollment {
  id: number;
  userId: string;
  courseId: number;
  enrolledAt: string;
  course: {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    price: number;
    instructor: {
      name: string;
    };
  };
}

// Get user's enrollments
export async function getEnrollments(userId: string): Promise<Enrollment[]> {
  const response = await fetch(`${BASE_URL}/Enrollment/${userId}`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch enrollments");
  }
  
  return response.json();
}

// Check if user is enrolled in a course
export async function checkEnrollment(userId: string, courseId: number): Promise<boolean> {
  try {
    const enrollments = await getEnrollments(userId);
    return enrollments.some(e => e.courseId === courseId);
  } catch {
    return false;
  }
}