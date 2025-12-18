// src/api/endpoints.ts
export const BASE_URL = "http://localhost:5000/api";

export const AUTH_API = {
  LOGIN: `${BASE_URL}/Auth/login`,
  REGISTER: `${BASE_URL}/Auth/register`,
};

export const COURSE_API = {
  GET_ALL: `${BASE_URL}/Course/getAll`,
  GET_BY_ID: `${BASE_URL}/Course`, // /Course/{id}
};

export const CART_API = {
  GET: `${BASE_URL}/Cart`, // GET /Cart/{userId}
  ADD: `${BASE_URL}/Cart/add`,
  REMOVE: `${BASE_URL}/Cart/remove`, // DELETE /Cart/remove/{id}
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
  GET: `${BASE_URL}/About`,               // 👈 new About endpoint
};
// CONTACT API
export const CONTACT_API = {
  CREATE: `${BASE_URL}/Contact`,   // POST
};

