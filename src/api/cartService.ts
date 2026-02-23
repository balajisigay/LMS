// src/api/cartService.ts
import axios from "axios";
import { CART_API } from "./endpoints";

export const CART_UPDATED_EVENT = "cart-updated";

const notifyCartUpdated = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT));
  }
};

export const getCart = (userId: string) =>
  axios.get(`${CART_API.GET}/${userId}`);

export const addToCart = async (userId: string, courseId: number) => {
  const response = await axios.post(CART_API.ADD, { userId, courseId });
  notifyCartUpdated();
  return response;
};

export const removeCartItem = async (cartId: number) => {
  const response = await axios.delete(`${CART_API.REMOVE}/${cartId}`);
  notifyCartUpdated();
  return response;
};
