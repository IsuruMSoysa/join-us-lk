export function getAppBaseUrl() {
  return import.meta.env.VITE_BASE_URL || window.location.origin;
}
