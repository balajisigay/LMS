// src/api/userService.ts
import { USER_API } from "./endpoints";

export interface UserProfile {
  id: number;
  email: string;
  fullName: string;
  role: string;
  profileImageUrl?: string;
  bio?: string;
  phone?: string;
  location?: string;
  website?: string;
  linkedIn?: string;
  twitter?: string;
  createdAt: string;
}

export interface UpdateProfileData {
  fullName?: string;
  bio?: string;
  phone?: string;
  location?: string;
  website?: string;
  linkedIn?: string;
  twitter?: string;
}

async function parseResponse(response: Response) {
  const contentType = response.headers.get("content-type") || "";
  const raw = await response.text();

  if (contentType.includes("application/json")) {
    try {
      return JSON.parse(raw);
    } catch {
      return { message: raw };
    }
  }

  return { message: raw };
}

function toNetworkErrorMessage(error: unknown): string {
  if (error instanceof TypeError) {
    return "Cannot connect to API server at http://localhost:5000. Please start backend and try again.";
  }
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return "Network request failed";
}

// Get user profile
export async function getUserProfile(userId: number): Promise<UserProfile> {
  let response: Response;
  try {
    response = await fetch(USER_API.GET_PROFILE(userId));
  } catch (error) {
    throw new Error(toNetworkErrorMessage(error));
  }

  const data = await parseResponse(response);

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch profile");
  }

  return data;
}

// Update user profile
export async function updateUserProfile(
  userId: number,
  data: UpdateProfileData
): Promise<{ message: string }> {
  let response: Response;
  try {
    response = await fetch(USER_API.UPDATE_PROFILE(userId), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (error) {
    throw new Error(toNetworkErrorMessage(error));
  }

  const result = await parseResponse(response);

  if (!response.ok) {
    throw new Error(result.message || "Failed to update profile");
  }

  return result;
}

export async function uploadProfilePhoto(
  userId: number,
  file: File
): Promise<{ message: string; imageUrl: string }> {
  const formData = new FormData();
  formData.append("profileImage", file);

  let response: Response;
  try {
    response = await fetch(USER_API.UPLOAD_PHOTO(userId), {
      method: "POST",
      body: formData,
    });
  } catch (error) {
    throw new Error(toNetworkErrorMessage(error));
  }

  const data = await parseResponse(response);

  if (!response.ok) {
    throw new Error(data.message || "Failed to upload photo");
  }

  return data;
}

// Delete profile photo
export async function deleteProfilePhoto(
  userId: number
): Promise<{ message: string }> {
  let response: Response;
  try {
    response = await fetch(USER_API.DELETE_PHOTO(userId), {
      method: "DELETE",
    });
  } catch (error) {
    throw new Error(toNetworkErrorMessage(error));
  }

  const data = await parseResponse(response);

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete photo");
  }

  return data;
}
