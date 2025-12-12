// src/services/courseService.ts
import { COURSE_API } from "../api/endpoints";

// same safe response parser you used for auth
async function parseResponse(response: Response) {
  const contentType = response.headers.get("content-type") || "";
  const raw = await response.text();

  if (contentType.includes("application/json")) {
    try {
      return JSON.parse(raw);
    } catch {
      return { message: raw };
    }
  }

  return { message: raw };
}

export async function getAllCourses() {
  const response = await fetch(COURSE_API.GET_ALL);

  const data = await parseResponse(response);

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch courses");
  }

  return data; // array of courses
}

export async function getCourseById(id: number) {
  const response = await fetch(`${COURSE_API.GET_BY_ID}/${id}`);

  const data = await parseResponse(response);

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch course");
  }

  return data;
}
