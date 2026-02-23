// src/services/courseService.ts
import { apiUrl } from "../config/api";

export async function getAllCourses(): Promise<any[]> {
  const res = await fetch(apiUrl('/courses'), {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch courses: ${res.status} ${text}`);
  }
  return res.json();
}

export async function getCourseById(id: number | string): Promise<any> {
  const res = await fetch(apiUrl(`/courses/${id}`), {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch course ${id}: ${res.status} ${text}`);
  }
  return res.json();
}

export async function createCourse(courseData: {
  title: string;
  description: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice: number;
  badge: string;
  instructorId: number;
  imageUrl: string;
  whatYouLearn: string[];
  includes: string[];
  companies: string[];
}): Promise<any> {
  const res = await fetch(apiUrl('/courses'), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(courseData),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to create course: ${res.status} ${text}`);
  }
  return res.json();
}

export async function updateCourse(id: number, courseData: any): Promise<any> {
  const res = await fetch(apiUrl(`/courses/${id}`), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(courseData),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to update course: ${res.status} ${text}`);
  }
  return res.json();
}

export async function deleteCourse(id: number): Promise<any> {
  const res = await fetch(apiUrl(`/courses/${id}`), {
    method: "DELETE",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to delete course: ${res.status} ${text}`);
  }
  return res.json();
}
