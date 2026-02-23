// src/api/endpoints.ts
import { API_BASE_URL, API_ORIGIN } from "../../web/src/config/api";

export const BASE_URL = API_BASE_URL;
export { API_ORIGIN };

export const AUTH_API = {
  LOGIN: `${BASE_URL}/Auth/login`,
  REGISTER: `${BASE_URL}/Auth/register`,
};

export const COURSE_API = {
  GET_ALL: `${BASE_URL}/Course/getAll`,
  GET_BY_ID: `${BASE_URL}/Course`,
};

export const CART_API = {
  GET: `${BASE_URL}/Cart`,
  ADD: `${BASE_URL}/Cart/add`,
  REMOVE: `${BASE_URL}/Cart/remove`,
};

export const PAYMENT_API = {
  CREATE_ORDER: `${BASE_URL}/payment/create-order`,
  VERIFY: `${BASE_URL}/payment/verify-payment`,
};

export const USER_API = {
  GET_PROFILE: (userId: number) => `${BASE_URL}/Users/${userId}`,
  UPDATE_PROFILE: (userId: number) => `${BASE_URL}/Users/${userId}`,
  UPLOAD_PHOTO: (userId: number) => `${BASE_URL}/Users/${userId}/upload-photo`,
  DELETE_PHOTO: (userId: number) => `${BASE_URL}/Users/${userId}/delete-photo`,
};

export const ENROLLMENT_API = {
  GET: (userId: string) => `${BASE_URL}/Enrollment/${userId}`,
  CHECK: (userId: string, courseId: number) => `${BASE_URL}/Enrollment/check/${userId}/${courseId}`,
  CREATE: `${BASE_URL}/Enrollment`,
};

export const ABOUT_API = {
  GET: `${BASE_URL}/About`,
};

export const CONTACT_API = {
  CREATE: `${BASE_URL}/Contact`,
};

export const COURSE_PROGRESS_API = `${BASE_URL}/CourseProgress`;
