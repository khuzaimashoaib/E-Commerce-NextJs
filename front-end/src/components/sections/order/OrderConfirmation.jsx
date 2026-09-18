"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCartContext } from "@/lib/context/CartContext";
import toast from "react-hot-toast";
import { verifyStripeSession } from "@/lib/api";

export default function OrderConfirmation() {
  const [order, setOrder] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  const verificationStarted = useRef(false);

  const searchParams = useSearchParams();
  const { clearCart } = useCartContext();

  useEffect(() => {
    if (verificationStarted.current) {
      return;
    }
    verificationStarted.current = true;
    const loadOrder = async () => {
      try {
        const sessionId = searchParams.get("session_id");

        if (sessionId) {
          const storedStripeOrder = sessionStorage.getItem(
            "pending_stripe_order",
          );
          if (!storedStripeOrder) {
            throw new Error("Pending order information not found.");
          }

          const pendingOrder = JSON.parse(storedStripeOrder);
          const savedOrder = await verifyStripeSession(sessionId, pendingOrder);
          const orderForConfirmation = {
            orderNumber: savedOrder.orderNumber,
            date: new Date(savedOrder.createdAt).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }),
            items: savedOrder.items,
            subtotal: savedOrder.subtotal,
            shipping: savedOrder.shipping,
            total: savedOrder.total,
            paymentMethod: savedOrder.paymentMethod,
            _id: savedOrder._id,
          };
          // Save order for confirmation UI
          sessionStorage.setItem(
            "last_order",
            JSON.stringify(orderForConfirmation),
          );
          //Remove pending Stripe order
          sessionStorage.removeItem("pending_stripe_order");

          // Clear cart after successful payment/order creation
          clearCart();

          setOrder(orderForConfirmation);
          toast.success("Payment successful! Order placed.");
          setLoaded(true);
          return;
        }
        const stored = sessionStorage.getItem("last_order");
        if (stored) {
          setOrder(JSON.parse(stored));
          // Clear after reading
          sessionStorage.removeItem("last_order");
        }
      } catch (error) {
        console.error("Order confirmation error:", error);
        setError(error.message || "Unable to verify your payment and order.");
        toast.error(error.message || "Unable to verify your payment.");
      } finally {
        setLoaded(true);
      }
    };
    loadOrder();
  }, [searchParams, clearCart]);

  if (!loaded) {
    return <p className="text-center py-5">Verifying your payment...</p>;
  }
  if (error) {
    return (
      <div className="text-center py-5 container">
        {" "}
        <h3 className="mb-3">Unable to confirm order</h3>{" "}
        <p className="text-muted mb-4"> {error} </p>{" "}
        <Link href="/shop" className="theme-btn">
          {" "}
          Continue Shopping{" "}
        </Link>{" "}
      </div>
    );
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
              <span>{`#${order.orderNumber}`}</span>
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
