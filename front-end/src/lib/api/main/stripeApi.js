const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const defaultOptions = {
  credentials: "include",
  headers: { "Content-Type": "application/json" },
};

/** Create Stripe checkout session — returns clientSecret */
export async function createStripeSession(data) {
  const res = await fetch(`${API_URL}/stripe/create-session`, {
    method: "POST",
    ...defaultOptions,
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok)
    throw new Error(json.message || "Failed to create payment session");
  return json;
}

/** Verify Stripe session after payment + create order in DB */
export async function verifyStripeSession(sessionId, orderData) {
  const res = await fetch(`${API_URL}/stripe/verify-session`, {
    method: "POST",
    ...defaultOptions,
    body: JSON.stringify({ sessionId, orderData }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Failed to verify payment");
  return json;
}
