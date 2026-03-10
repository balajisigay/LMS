const isGithubPages =
  typeof window !== "undefined" && window.location.hostname.endsWith("github.io");

const DEFAULT_API_ORIGIN = isGithubPages
  ? "https://lms-2-t5gc.onrender.com"
  : "http://localhost:5000";

const trimTrailingSlash = (value: string): string => value.replace(/\/+$/, "");
const ensureLeadingSlash = (value: string): string => (value.startsWith("/") ? value : `/${value}`);

const envApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();
const envApiOrigin = import.meta.env.VITE_API_ORIGIN?.trim();

export const API_BASE_URL = trimTrailingSlash(
  envApiBaseUrl || `${trimTrailingSlash(envApiOrigin || DEFAULT_API_ORIGIN)}/api`
);

export const API_ORIGIN = trimTrailingSlash(
  envApiOrigin || API_BASE_URL.replace(/\/api$/i, "") || DEFAULT_API_ORIGIN
);

export const API_ADMIN_BASE_URL = `${API_BASE_URL}/Admin`;

export const apiUrl = (path: string): string => `${API_BASE_URL}${ensureLeadingSlash(path)}`;

export const apiAdminUrl = (path: string): string => `${API_ADMIN_BASE_URL}${ensureLeadingSlash(path)}`;

export const apiOriginUrl = (path: string): string => `${API_ORIGIN}${ensureLeadingSlash(path)}`;
