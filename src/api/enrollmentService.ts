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
    const url = ENROLLMENT_API.GET(userId);
    console.log("📡 Fetching enrollments from:", url);
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("📥 Response status:", response.status, response.statusText);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("❌ API Error Response:", errorData);
      throw new Error(errorData.message || `Failed to fetch enrollments (${response.status})`);
    }

    const data = await response.json();
    console.log("✅ Raw API Response:", data);
    console.log("✅ Response type:", Array.isArray(data) ? "Array" : typeof data);
    console.log("✅ Number of items:", Array.isArray(data) ? data.length : "N/A");
    
    if (Array.isArray(data) && data.length > 0) {
      console.log("✅ First enrollment structure:", {
        id: data[0].id,
        userId: data[0].userId,
        courseId: data[0].courseId,
        hasCourse: !!data[0].course,
        courseTitle: data[0].course?.title,
        hasInstructor: !!data[0].course?.instructor,
        instructorName: data[0].course?.instructor?.name
      });
    }
    
    return data;
  } catch (error: any) {
    console.error("❌ Error fetching enrollments:", error);
    console.error("❌ Error stack:", error.stack);
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
    const url = ENROLLMENT_API.CHECK(userId, courseId);
    console.log("🔍 Checking enrollment:", url);
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("❌ Check enrollment failed:", response.status);
      throw new Error("Failed to check enrollment status");
    }

    const data = await response.json();
    console.log("✅ Enrollment check result:", data);
    return data.isEnrolled || false;
  } catch (error) {
    console.error("❌ Error checking enrollment:", error);
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
    console.log("➕ Creating enrollment:", enrollmentData);
    
    const response = await fetch(ENROLLMENT_API.CREATE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(enrollmentData),
    });

    const data = await response.json();
    console.log("📥 Create enrollment response:", data);

    if (!response.ok) {
      throw new Error(data.message || "Failed to create enrollment");
    }

    return data;
  } catch (error: any) {
    console.error("❌ Error creating enrollment:", error);
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
    console.error("❌ Error getting enrollment count:", error);
    return 0;
  }
}