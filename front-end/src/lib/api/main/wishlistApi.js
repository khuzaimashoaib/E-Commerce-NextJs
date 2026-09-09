const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const defaultOptions = {
  credentials: "include",
  headers: { "Content-Type": "application/json" },
};

/** Get user's wishlist */
export async function getWishlist() {
  const res = await fetch(`${API_URL}/wishlist`, {
    ...defaultOptions,
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch wishlist");
  return res.json();
}

/** Toggle product in wishlist — add if not in, remove if in */
export async function toggleWishlistItem(productId) {
  const res = await fetch(`${API_URL}/wishlist/${productId}`, {
    method: "PUT",
    ...defaultOptions,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to update wishlist");
  return json;
}
