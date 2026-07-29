const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const defaultOptions = {
  credentials: "include",
  headers: { "Content-Type": "application/json" },
};

export async function registerUser(data) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    ...defaultOptions,
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Registration failed");
  return json;
}

export async function loginUser(data) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    ...defaultOptions,
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Login failed");
  return json;
}

export async function logoutUser() {
  const res = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    ...defaultOptions,
  });
  if (!res.ok) throw new Error("Logout failed");
  return res.json();
}

export async function getProfile() {
  const res = await fetch(`${API_URL}/auth/profile`, {
    method: "GET",
    ...defaultOptions,
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}
