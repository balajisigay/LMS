// src/utils/auth.ts
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const getUserId = (): number | null => {
  return getCurrentUser()?.userId ?? null;
};
