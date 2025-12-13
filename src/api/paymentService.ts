// src/api/paymentService.ts
import axios from "axios";

const API = "http://localhost:5000/api/payment";

export const createOrder = (amount: number) => {
  return axios.post(`${API}/create-order`, { amount });
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
  return axios.post(`${API}/verify-payment`, payload);
};