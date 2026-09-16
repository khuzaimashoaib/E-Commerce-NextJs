"use client";

import { useCartContext } from "@/lib/context/CartContext";
import CheckoutForm from "./CheckoutForm";
import CheckoutOrderSummary from "./CheckoutOrderSummary";
import StripePaymentForm from "./StripePaymentForm";
import useCheckout from "@/lib/hooks/useCheckout";

export default function CheckoutClient() {
  const { cartItems, cartLoaded } = useCartContext();

  const {
    form,
    errors,
    loading,
    handleChange,
    handlePlaceOrder,
    onPaymentMethodChange,
    stripeClientSecret,
  } = useCheckout();

  if (!cartLoaded) {
    return <p className="text-center py-5">Loading...</p>;
  }

  return (
    <div className="shop-cart-section section-padding fix section-bg">
      <div className="container">
        <div className="checkout-main-item">
          {stripeClientSecret ? (
            <StripePaymentForm
              clientSecret={stripeClientSecret}
              onSuccess={() => {
                console.log("Payment successful");
              }}
              onError={(message) => {
                console.error("Stripe payment error:", message);
              }}
            />
          ) : (
            <CheckoutForm
              form={form}
              errors={errors}
              onChange={handleChange}
              onSubmit={handlePlaceOrder}
              loading={loading}
              onPaymentMethodChange={onPaymentMethodChange}
              stripeClientSecret={stripeClientSecret}
            />
          )}

          <CheckoutOrderSummary />
        </div>
      </div>
    </div>
  );
}
