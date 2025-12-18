// src/api/paymentService.ts
import axios from "axios";
import { PAYMENT_API } from "./endpoints";

export const createOrder = (amount: number) => {
  return axios.post(PAYMENT_API.CREATE_ORDER, { amount });
};

export interface VerifyPaymentRequest {
  userId: string;
  courseId: number;
  amount: number;
  razorpayPaymentId: string;
  razorpayOrderId: string;
  razorpaySignature: string;
}

export const verifyPayment = (payload: VerifyPaymentRequest) => {
  return axios.post(PAYMENT_API.VERIFY, payload);
};
