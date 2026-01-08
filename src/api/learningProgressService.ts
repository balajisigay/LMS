import axios from "axios";

const BASE_URL = "http://localhost:5000/api/CourseProgress";

export interface CourseProgress {
  courseId: number;
  title: string;
  progress: number;
}

export const getLearningProgress = async (
  userId: string
): Promise<CourseProgress[]> => {
  const res = await axios.get(`${BASE_URL}/${userId}`);
  return res.data;
};

export const updateProgress = async (
  userId: string,
  courseId: number
) => {
  return axios.post(`${BASE_URL}/update`, null, {
    params: { userId, courseId },
  });
};
