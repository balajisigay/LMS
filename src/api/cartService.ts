// src/api/cartService.ts
import axios from "axios";
import { CART_API } from "./endpoints";

export const getCart = (userId: string) => axios.get(`${CART_API.GET}/${userId}`);

export const addToCart = (userId: string, courseId: number) =>
  axios.post(CART_API.ADD, { userId, courseId });

export const removeCartItem = (cartId: number) =>
  axios.delete(`${CART_API.REMOVE}/${cartId}`);
