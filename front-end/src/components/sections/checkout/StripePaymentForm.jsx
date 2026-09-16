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
  const checkoutState = useCheckoutElements();
  const [loading, setLoading] = useState(false);

  if (checkoutState.type === "loading") {
    return (
      <div className="text-center py-4">
        <i className="fa-solid fa-spinner fa-spin me-2"></i>
        Loading payment form...
      </div>
    );
  }

  if (checkoutState.type === "error") {
    return (
      <div className="alert alert-danger">{checkoutState.error.message}</div>
    );
  }

  const handlePay = async () => {
    setLoading(true);
    try {
      const result = await checkoutState.checkout.confirm();
      if (result.type === "error") {
        onError(result.error.message);
      } else {
        onSuccess();
      }
    } catch (err) {
      onError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PaymentElement options={{ layout: "accordion" }} />
      <button
        type="button"
        className="theme-btn text-center w-100 mt-3"
        onClick={handlePay}
        disabled={!checkoutState.checkout.canConfirm || loading}
      >
        {loading ? (
          <>
            <i className="fa-solid fa-spinner fa-spin me-2"></i>
            Processing...
          </>
        ) : (
          <>
            <i className="fa-solid fa-lock me-2"></i>
            Pay Now
          </>
        )}
      </button>
    </div>
  );
}

export default function StripePaymentForm({
  clientSecret,
  onSuccess,
  onError,
}) {
  console.log("StripePaymentForm clientSecret:", clientSecret);

  if (!clientSecret) {
    return (
      <div className="text-center py-4">
        <i className="fa-solid fa-spinner fa-spin me-2"></i>
        Initializing payment...
      </div>
    );
  }

  return (
    <CheckoutElementsProvider
      stripe={stripePromise}
      options={{
        clientSecret,
        // elementsOptions: {
        //   appearance: {
        //     theme: "stripe",
        //     variables: {
        //       colorPrimary: "#1a1a2e",
        //       colorBackground: "#ffffff",
        //       colorText: "#333333",
        //       borderRadius: "8px",
        //       fontFamily: "inherit",
        //     },
        //   },
        // },
      }}
    >
      <StripeForm onSuccess={onSuccess} onError={onError} />
    </CheckoutElementsProvider>
  );
}
