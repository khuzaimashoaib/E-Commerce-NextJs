"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getShipping } from "@/lib/utils/cartUtils";

export default function OrderConfirmation() {
  const [order, setOrder] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Read order from sessionStorage
    const stored = sessionStorage.getItem("last_order");
    if (stored) {
      setOrder(JSON.parse(stored));
      // Clear after reading — so refreshing doesn't show stale order
      sessionStorage.removeItem("last_order");
    }
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p className="text-center py-5">Loading...</p>;
  }

  // No order found — user landed here directly
  if (!order) {
    return (
      <div className="text-center py-5 container">
        <h3 className="mb-3">No order found</h3>
        <Link href="/shop" className="theme-btn w-25">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="lost-password-section section-padding fix">
      <div className="container">
        <div className="order-confirm-items">
          {/* Header */}
          <div className="order-header">
            <div className="success-icon">
              <i className="fa-solid fa-check"></i>
            </div>
            <h2>Your order is completed!</h2>
            <p>Thank you. Your order has been received.</p>
          </div>

          {/* Order Info Bar */}
          <div className="order-info-bar">
            <div className="info-item">
              <label>Order Number</label>
              <span>{order.orderNumber}</span>
            </div>
            <div className="info-item">
              <label>Date</label>
              <span>{order.date}</span>
            </div>
            <div className="info-item">
              <label>Total</label>
              <span>${order.total.toFixed(2)}</span>
            </div>
            <div className="info-item">
              <label>Payment Method</label>
              <span>{order.paymentMethod}</span>
            </div>
          </div>

          {/* Order Details Table */}
          <div className="payment-option-container">
            <h3>Order Summary</h3>

            <div className="table-header">
              <span className="col-left">Product</span>
              <span className="col-right">Subtotal</span>
            </div>

            {/* Product List */}
            <div className="product-list">
              {order.items.map((item) => (
                <div key={item.sku} className="table-row">
                  <span className="col-left">
                    {item.name}{" "}
                    <small className="text-muted">
                      × {item.quantity} ({item.size}
                      {item.color ? `, ${item.color}` : ""})
                    </small>
                  </span>
                  <span className="col-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="summary-list">
              <div className="table-row">
                <span className="col-left">Subtotal</span>
                <span className="col-right">
                  <strong>${order.subtotal.toFixed(2)}</strong>
                </span>
              </div>
              <div className="table-row">
                <span className="col-left">Shipping</span>
                <span className="col-right">
                  {order.shipping === 0
                    ? "Free"
                    : `$${order.shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="table-row total-row">
                <span className="col-left">Total</span>
                <span className="col-right">
                  <strong>${order.total.toFixed(2)}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="gap-3 mt-4 text-center">
            <Link href="/shop" className="theme-btn">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
