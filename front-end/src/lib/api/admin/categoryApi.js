const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const defaultOptions = {
  credentials: "include",
  headers: { "Content-Type": "application/json" },
};

export async function getCategories() {
  const res = await fetch(`${API_URL}/categories`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch attributes");
  return res.json();
}

export async function getAdminCategories() {
  const res = await fetch(`${API_URL}/admin/categories`, {
    ...defaultOptions,
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch attributes");
  return res.json();
}

export async function createCategory(formData) {
  const res = await fetch(`${API_URL}/admin/categories`, {
    method: "POST",
    credentials: "include", // ← no Content-Type header for FormData
    body: formData, // ← FormData (has image)
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to create category");
  return json;
}

export async function updateCategory(id, formData) {
  const res = await fetch(`${API_URL}/admin/categories/${id}`, {
    method: "PUT",
    credentials: "include",
    body: formData,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to update category");
  return json;
}

export async function deleteCategory(id) {
  const res = await fetch(`${API_URL}/admin/categories/${id}`, {
    method: "DELETE",
    ...defaultOptions,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to delete category");
  return json;
}
