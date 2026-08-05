const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const defaultOptions = {
  credentials: "include",
  headers: { "Content-Type": "application/json" },
};

export async function getAdminUsers() {
  const res = await fetch(`${API_URL}/admin/users`, {
    ...defaultOptions,
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export async function deleteUser(id) {
  const res = await fetch(`${API_URL}/admin/users/${id}`, {
    method: "DELETE",
    ...defaultOptions,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to delete user");
  return json;
}

export async function updateUserRole(id, role) {
  const res = await fetch(`${API_URL}/admin/users/${id}/role`, {
    method: "PUT",
    ...defaultOptions,
    body: JSON.stringify({ role }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to update role");
  return json;
}
