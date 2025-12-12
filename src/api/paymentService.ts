import axios from "axios";
import { PAYMENT_API } from "./endpoints";

export const createOrder = (amount: number) => {
  return axios.post(PAYMENT_API.CREATE_ORDER, { amount });
};

export const verifyPayment = (payload: any) => {
  return axios.post(PAYMENT_API.VERIFY, payload);
};
