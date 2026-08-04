const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function getDashboardStats() {
  const url = `${API_URL}/admin/stats`;

  try {
    const res = await fetch(url, { cache: "no-store", credentials: "include" });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Network error fetching product:", error.message);
    return null;
  }
}
