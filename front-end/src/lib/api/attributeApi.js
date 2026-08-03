const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const defaultOptions = {
  credentials: "include",
  headers: { "Content-Type": "application/json" },
};

export async function getAttributes() {
  const res = await fetch(`${API_URL}/attributes`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch attributes");
  return res.json();
}

export async function getAdminAttributes() {
  const res = await fetch(`${API_URL}/admin/attributes`, {
    ...defaultOptions,
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch attributes");
  return res.json();
}

export async function createAttribute(data) {
  const res = await fetch(`${API_URL}/admin/attributes`, {
    method: "POST",
    ...defaultOptions,
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to create attribute");
  return json;
}

export async function updateAttribute(id, data) {
  const res = await fetch(`${API_URL}/admin/attributes/${id}`, {
    method: "PUT",
    ...defaultOptions,
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to update attribute");
  return json;
}

export async function deleteAttribute(id) {
  const res = await fetch(`${API_URL}/admin/attributes/${id}`, {
    method: "DELETE",
    ...defaultOptions,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to delete attribute");
  return json;
}
