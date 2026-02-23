// src/utils/auth.ts

export interface User {
  userId: number;
  email: string;
  fullName: string;
  role: string;
  token?: string;
}

/**
 * Get the current authenticated user from localStorage
 */
export const getCurrentUser = (): User | null => {
  try {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;
    
    const user = JSON.parse(userStr);
    
    // Validate that the user object has required fields
    if (!user.userId || !user.email) {
      console.error("Invalid user object in localStorage");
      return null;
    }
    
    return user;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return null;
  }
};

/**
 * Get the current user's ID
 * @throws Error if no user is logged in
 */
export const getUserId = (): number => {
  const user = getCurrentUser();
  
  if (!user || !user.userId) {
    throw new Error("No authenticated user found. Please log in.");
  }
  
  return user.userId;
};

/**
 * Check if a user is currently logged in
 */
export const isAuthenticated = (): boolean => {
  const user = getCurrentUser();
  return user !== null && !!user.userId;
};

/**
 * Save user data to localStorage
 */
export const setCurrentUser = (user: User): void => {
  localStorage.setItem("user", JSON.stringify(user));
};

/**
 * Clear user data from localStorage (logout)
 */
export const clearCurrentUser = (): void => {
  localStorage.removeItem("user");
};

/**
 * Get the authentication token
 */
export const getAuthToken = (): string | null => {
  const user = getCurrentUser();
  return user?.token || null;
};

/**
 * Require authentication - redirects to login if not authenticated
 */
export const requireAuth = (navigate: (path: string) => void): User => {
  const user = getCurrentUser();
  
  if (!user || !user.userId) {
    navigate("/auth");
    throw new Error("Authentication required");
  }
  
  return user;
};
