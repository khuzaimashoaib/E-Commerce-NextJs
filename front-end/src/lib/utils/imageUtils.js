const IMAGE_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ||
  "http://localhost:5000";

export function getImageUrl(
  path,
  fallback = "/assets/front-end-images/placeholder.jpg",
) {
  if (!path) return fallback;
  if (path.startsWith("http")) return path; // already full URL
  if (path.startsWith("/uploads")) return `${IMAGE_BASE}${path}`; // backend upload
  return path; // local public folder path
}
