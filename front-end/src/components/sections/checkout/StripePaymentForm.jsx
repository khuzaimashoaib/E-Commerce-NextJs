"use client";

import {
  CheckoutElementsProvider,
  PaymentElement,
  useCheckoutElements,
} from "@stripe/react-stripe-js/checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

function StripeForm({ onSuccess, onError }) {
  const result = useCheckoutElements();
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    if (result.type !== "success" || !result.checkout.canConfirm) {
      return;
    }

    setLoading(true);

    try {
      const confirmResult = await result.checkout.confirm();

      if (confirmResult.type === "error") {
        onError(confirmResult.error.message);
      }
    } catch (error) {
      onError(error.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PaymentElement />

      <button
        type="button"
        className="theme-btn text-center w-100 mt-3"
        onClick={handlePay}
        disabled={!result.checkout || loading}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </>
  );
}

export default function StripePaymentForm({
  clientSecret,
  onSuccess,
  onError,
}) {
  if (!clientSecret) {
    return <div className="text-center py-4">Initializing payment...</div>;
  }

  return (
    <CheckoutElementsProvider
      stripe={stripePromise}
      options={{
        clientSecret,
      }}
    >
      <StripeForm onSuccess={onSuccess} onError={onError} />
    </CheckoutElementsProvider>
  );
}
