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

// Helper function to parse responses (like authService.ts)
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

// Get user profile
export async function getUserProfile(userId: number): Promise<UserProfile> {
  const response = await fetch(USER_API.GET_PROFILE(userId));
  
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
  const response = await fetch(USER_API.UPDATE_PROFILE(userId), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

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
  formData.append("profileImage", file); // ✅ FIXED

  const response = await fetch(USER_API.UPLOAD_PHOTO(userId), {
    method: "POST",
    body: formData,
    credentials: "include", // ✅ important if auth/session used
  });

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
  const response = await fetch(USER_API.DELETE_PHOTO(userId), {
    method: "DELETE",
  });

  const data = await parseResponse(response);

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete photo");
  }

  return data;
}