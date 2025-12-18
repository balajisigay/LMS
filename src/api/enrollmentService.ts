// src/api/enrollmentService.ts
import { ENROLLMENT_API } from "./endpoints";

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

export interface CreateEnrollmentDto {
  userId: string;
  courseId: number;
}

export interface EnrollmentResponse {
  success: boolean;
  message: string;
  enrollmentId?: number;
}

/**
 * Get all enrollments for a specific user
 * @param userId - The user's ID
 * @returns Array of enrollments with course details
 */
export async function getEnrollments(userId: string): Promise<Enrollment[]> {
  try {
    const response = await fetch(ENROLLMENT_API.GET(userId), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to fetch enrollments");
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error fetching enrollments:", error);
    throw new Error(error.message || "Failed to fetch enrollments");
  }
}

/**
 * Check if a user is enrolled in a specific course
 * @param userId - The user's ID
 * @param courseId - The course ID
 * @returns Boolean indicating enrollment status
 */
export async function checkEnrollment(
  userId: string,
  courseId: number
): Promise<boolean> {
  try {
    const response = await fetch(ENROLLMENT_API.CHECK(userId, courseId), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to check enrollment status");
    }

    const data = await response.json();
    return data.isEnrolled || false;
  } catch (error) {
    console.error("Error checking enrollment:", error);
    return false;
  }
}

/**
 * Create a new enrollment for a user in a course
 * @param enrollmentData - Object containing userId and courseId
 * @returns Enrollment response with success status
 */
export async function createEnrollment(
  enrollmentData: CreateEnrollmentDto
): Promise<EnrollmentResponse> {
  try {
    const response = await fetch(ENROLLMENT_API.CREATE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(enrollmentData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create enrollment");
    }

    return data;
  } catch (error: any) {
    console.error("Error creating enrollment:", error);
    throw new Error(error.message || "Failed to enroll in course");
  }
}

/**
 * Get enrollment count for a user
 * @param userId - The user's ID
 * @returns Number of enrolled courses
 */
export async function getEnrollmentCount(userId: string): Promise<number> {
  try {
    const enrollments = await getEnrollments(userId);
    return enrollments.length;
  } catch (error) {
    console.error("Error getting enrollment count:", error);
    return 0;
  }
}