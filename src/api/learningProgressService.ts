import axios from "axios";
import { COURSE_PROGRESS_API } from "./endpoints";

export interface CourseProgress {
  courseId: number;
  title: string;
  watchedDurationSeconds?: number;
  totalDurationSeconds?: number;
  progress: number;
}

export const getLearningProgress = async (
  userId: string
): Promise<CourseProgress[]> => {
  const res = await axios.get(`${COURSE_PROGRESS_API}/${userId}`);
  return res.data;
};

export const updateProgress = async (
  userId: string,
  courseId: number,
  watchedSeconds?: number
) => {
  return axios.post(`${COURSE_PROGRESS_API}/update`, null, {
    params: { userId, courseId, watchedSeconds },
  });
};
