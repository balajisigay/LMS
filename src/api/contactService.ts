import { BASE_URL } from "./endpoints";

export interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export async function submitContact(payload: ContactPayload) {
  const res = await fetch(`${BASE_URL}/Contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to submit contact form");
  }

  return res.json();
}
