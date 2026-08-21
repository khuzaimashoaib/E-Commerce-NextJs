"use client";

import { getMyOrders } from "@/lib/api";
import { useAuthContext } from "@/lib/context/AuthContext";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const STATUS_COLORS = {
  pending: { bg: "#fff3cd", color: "#856404" },
  processing: { bg: "#cfe2ff", color: "#084298" },
  shipped: { bg: "#d1ecf1", color: "#0c5460" },
  delivered: { bg: "#d1e7dd", color: "#0a3622" },
  cancelled: { bg: "#f8d7da", color: "#842029" },
};

const OrdersClient = () => {
  const { user, authLoaded } = useAuthContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoaded) return;
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const data = await getMyOrders();
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, authLoaded]);

  if (!authLoaded || loading) {
    return (
      <div className="text-center py-5">
        <i className="fa-solid fa-spinner fa-spin me-2"></i>
        Loading...
      </div>
    );
  }
  if (orders.length === 0) {
    return (
      <section className="section-padding fix section-bg">
        <div className="container text-center py-5">
          <i
            className="fa-solid fa-bag-shopping mb-3"
            style={{ fontSize: "50px", color: "#ccc" }}
          ></i>
          <h4 className="mb-3">No orders yet</h4>
          <Link href="/shop" className="theme-btn w-25">
            Start Shopping
          </Link>
        </div>
      </section>
    );
  }
  return (
    <section className="section-padding fix section-bg">
      <div className="container">
        <div className="row g-4">
          {orders.map((order) => {
            const statusStyle = STATUS_COLORS[order.status] || {};
            return (
              <div key={order._id} className="col-12">
                <div className="order-card">
                  {/* Order Header */}
                  <div className="order-card-header">
                    <div>
                      <h6 className="mb-1">Order #{order.orderNumber}</h6>
                      <small className="text-muted">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </small>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <span
                        className="order-status-badge"
                        style={{
                          backgroundColor: statusStyle.bg,
                          color: statusStyle.color,
                        }}
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                      <strong>${order.total?.toFixed(2)}</strong>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="order-card-items">
                    {order.items.map((item, i) => (
                      <div key={i} className="order-card-item">
                        <span className="item-name">{item.name}</span>
                        <span className="item-attrs text-muted">
                          {item.attributeLabel && `(${item.attributeLabel})`}
                        </span>
                        <span className="item-qty">x{item.quantity}</span>
                        <span className="item-price">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer */}
                  <div className="order-card-footer">
                    <span className="text-muted" style={{ fontSize: "13px" }}>
                      {order.paymentMethod}
                    </span>
                    <div>
                      <span className="text-muted me-3">
                        Shipping:{" "}
                        {order.shipping === 0
                          ? "Free"
                          : `$${order.shipping.toFixed(2)}`}
                      </span>
                      <strong>Total: ${order.total?.toFixed(2)}</strong>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OrdersClient;
