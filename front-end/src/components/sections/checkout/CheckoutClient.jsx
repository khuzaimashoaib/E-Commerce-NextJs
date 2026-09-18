"use client";

import Link from "next/link";
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
    handleStripeError,
  } = useCheckout();

  if (!cartLoaded) {
    return <p className="text-center py-5">Loading...</p>;
  }

  // Empty cart
  if (cartItems.length === 0) {
    return (
      <div className="text-center py-5">
        <h3 className="mb-3">No items to checkout</h3>
        <Link href="/shop" className="theme-btn">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="shop-cart-section section-padding fix section-bg">
      <div className="container">
        <div className="checkout-main-item">
          {/* Left — Form always visible */}
          <div>
            <CheckoutForm
              form={form}
              errors={errors}
              onChange={handleChange}
              onSubmit={handlePlaceOrder}
              loading={loading}
              onPaymentMethodChange={onPaymentMethodChange}
              stripeClientSecret={stripeClientSecret}
              onStripeError={handleStripeError}
            />
          </div>

          {/* Right — Order Summary always visible */}
          <CheckoutOrderSummary />
        </div>
      </div>
    </div>
  );
}
