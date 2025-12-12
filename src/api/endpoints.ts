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
  GET: `${BASE_URL}/Cart`,   // GET /Cart/{userId}
  ADD: `${BASE_URL}/Cart/add`,
  REMOVE: `${BASE_URL}/Cart/remove`, // DELETE /Cart/remove/{id}
};
