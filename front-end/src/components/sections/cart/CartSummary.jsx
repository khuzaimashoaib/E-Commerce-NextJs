"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { getShipping, getCartTotal } from "@/lib/utils/cartUtils";

export default function CartSummary({ subtotal }) {
  const router = useRouter();
  const [orderNote, setOrderNote] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const shipping = getShipping(subtotal);
  const freeShippingThreshold = 100;
  const progressPercent = Math.min(
    (subtotal / freeShippingThreshold) * 100,
    100,
  );
  const amountLeft = Math.max(freeShippingThreshold - subtotal, 0);
  const total = getCartTotal(subtotal);

  const handleCheckout = () => {
    if (!termsAccepted) {
      alert("Please accept the terms & conditions first");
      return;
    }
    router.push("/checkout");
  };

  return (
    <div className="cart-right">
      <div className="summary-box">
        {/* Free Shipping Progress */}
        <p className="shipping-text">
          {amountLeft > 0
            ? `$${amountLeft.toFixed(2)} USD away from free shipping`
            : "You have free shipping!"}
        </p>
        <div className="progress-bar">
          <div className="fill" style={{ width: `${progressPercent}%` }}></div>
        </div>

        {/* Subtotal */}
        <div className="subtotal-row">
          <div>
            <h3>Subtotal</h3>
            <p className="tax-info">Excluding taxes and shipping</p>
          </div>
          <h3 className="total-amount">${subtotal.toFixed(2)}</h3>
        </div>

        {/* Shipping */}
        <div className="subtotal-row mt-2">
          <p>Shipping</p>
          <p>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</p>
        </div>

        {/* Total */}
        <div className="subtotal-row mt-2">
          <h3>Total</h3>
          <h3>${total.toFixed(2)}</h3>
        </div>

        {/* Order Note */}
        <div className="order-note">
          <label>Order Note</label>
          <textarea
            rows="5"
            value={orderNote}
            onChange={(e) => setOrderNote(e.target.value)}
            placeholder="Add a note to your order..."
          ></textarea>
        </div>

        {/* Terms */}
        <div className="terms">
          <input
            type="checkbox"
            id="terms-check"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
          />
          <label htmlFor="terms-check">
            I agree with the terms &amp; Conditions
          </label>
        </div>

        {/* Checkout */}
        <button className="checkout-btn" onClick={handleCheckout}>
          Check Out
        </button>

        {/* Continue Shopping */}
        <button className="continue-btn" onClick={() => router.push("/shop")}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
