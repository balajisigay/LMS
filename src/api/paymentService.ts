// src/api/paymentService.ts
import axios from "axios";
import { PAYMENT_API } from "./endpoints";

// ✅ Create order payload must match backend DTO
export interface CreateOrderRequest {
  userId: string;
  courseId: number;
  amount: number;
}

export const createOrder = (payload: CreateOrderRequest) => {
  return axios.post(PAYMENT_API.CREATE_ORDER, payload);
};

// ---------------- VERIFY PAYMENT ----------------

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
