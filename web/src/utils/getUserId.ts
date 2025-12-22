export const getUserId = (): string => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return user?.userId?.toString() || "demoUser";
};
