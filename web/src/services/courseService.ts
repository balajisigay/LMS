// src/services/courseService.ts
const API_BASE = "http://localhost:5000";

export async function getAllCourses(): Promise<any[]> {
  const res = await fetch(`${API_BASE}/api/courses`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch courses: ${res.status} ${text}`);
  }
  return res.json();
}

export async function getCourseById(id: number | string): Promise<any> {
  const res = await fetch(`${API_BASE}/api/courses/${id}`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch course ${id}: ${res.status} ${text}`);
  }
  return res.json();
}
