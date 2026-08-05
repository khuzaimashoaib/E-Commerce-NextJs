const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const defaultOptions = {
  credentials: "include",
  headers: { "Content-Type": "application/json" },
};
export async function getAdminProducts() {
  const res = await fetch(`${API_URL}/admin/products`, {
    ...defaultOptions,
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function createProduct(formData) {
  const res = await fetch(`${API_URL}/admin/products`, {
    method: "POST",
    credentials: "include", // no Content-Type for FormData
    body: formData,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to create product");
  return json;
}

export async function updateProduct(id, formData) {
  const res = await fetch(`${API_URL}/admin/products/${id}`, {
    method: "PUT",
    credentials: "include",
    body: formData,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to update product");
  return json;
}

export async function deleteProduct(id) {
  const res = await fetch(`${API_URL}/admin/products/${id}`, {
    method: "DELETE",
    ...defaultOptions,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to delete product");
  return json;
}
