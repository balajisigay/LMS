// src/api/authService.ts
import { AUTH_API } from "./endpoints";

async function parseResponse(response: Response) {
  const contentType = response.headers.get("content-type") || "";
  const raw = await response.text();

  // If JSON → parse it
  if (contentType.includes("application/json")) {
    try {
      return JSON.parse(raw);
    } catch {
      return { message: raw }; // fallback if malformed JSON
    }
  }

  // If plain text → return text in object form
  return { message: raw };
}

export async function loginService(email: string, password: string) {
  const response = await fetch(AUTH_API.LOGIN, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await parseResponse(response);

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
}

export async function registerService(
  fullName: string,
  email: string,
  password: string
) {
  const response = await fetch(AUTH_API.REGISTER, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, fullName }),
  });

  const data = await parseResponse(response);

  if (!response.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
}
