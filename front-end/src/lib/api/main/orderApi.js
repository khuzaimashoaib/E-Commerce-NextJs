const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const defaultOptions = {
  credentials: "include",
  headers: { "Content-Type": "application/json" },
};

export async function createOrder(orderData) {
  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    ...defaultOptions,
    body: JSON.stringify(orderData),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to create order");
  return json;
}

export async function getMyOrders() {
  const res = await fetch(`${API_URL}/orders/my`, {
    ...defaultOptions,
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
}
export async function getAdminOrders() {
  const res = await fetch(`${API_URL}/admin/orders`, {
    ...defaultOptions,
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
}

export async function updateOrderStatus(id, status) {
  const res = await fetch(`${API_URL}/admin/orders/${id}`, {
    method: "PUT",
    ...defaultOptions,
    body: JSON.stringify({ status }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to update order");
  return json;
}
export const updatePaymentStatus = async (id, paymentStatus) => {
  const res = await fetch(`${API_URL}/admin/orders/${id}/payment-status`, {
    method: "PUT",
    ...defaultOptions,
    body: JSON.stringify({ paymentStatus }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to update payment status");
  }

  return res.json();
};
