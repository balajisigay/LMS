import { BASE_URL } from "./endpoints";

export interface CourseProgress {
  courseId: number;
  title: string;
  progress: number;
}

export async function getLearningProgress(userId: string): Promise<CourseProgress[]> {
  const res = await fetch(`${BASE_URL}/Enrollment/progress/${userId}`);
  if (!res.ok) throw new Error("Failed to load progress");
  return res.json();
}
