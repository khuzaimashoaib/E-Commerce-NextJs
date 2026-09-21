"use client";

import { useEffect, useState } from "react";
import AdminTable from "@/components/admin/ui/AdminTable";
import AdminBadge from "@/components/admin/ui/AdminBadge";
import AdminPageHeader from "../ui/AdminPageHeader";
import {
  getAdminOrders,
  updateOrderStatus,
  updatePaymentStatus,
} from "@/lib/api";

const COLUMNS = [
  "#",
  "Order No.",
  "Customer",
  "Date",
  "Items",
  "Total",
  "Method",
  "Payment",
  "Status",
  "Actions",
];
const STATUSES = [
  "All",
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

// paymentMethod comes as a free-form string, e.g. "Card (Stripe)" or "Cash on Delivery".
// We detect by substring rather than exact match so backend copy changes don't break the UI.
const getPaymentMethodMeta = (method) => {
  const normalized = (method || "").toLowerCase();

  if (normalized.includes("card") || normalized.includes("stripe")) {
    return {
      label: "Card",
      icon: "fa-solid fa-credit-card",
      className: "admin-method-card",
    };
  }

  if (normalized.includes("cash") || normalized.includes("cod")) {
    return {
      label: "Cash",
      icon: "fa-solid fa-money-bill-wave",
      className: "admin-method-cash",
    };
  }

  return {
    label: method || "Unknown",
    icon: "fa-solid fa-circle-question",
    className: "admin-method-unknown",
  };
};
const isCashOnDelivery = (method) => {
  const normalized = (method || "").toLowerCase();
  return normalized.includes("cash") || normalized.includes("cod");
};

// paymentStatus is typically "paid", "unpaid", "pending", "refunded", etc.
const getPaymentStatusMeta = (status) => {
  const normalized = (status || "").toLowerCase();

  if (normalized === "paid") {
    return {
      label: "Paid",
      icon: "fa-solid fa-circle-check",
      className: "admin-paystatus-paid",
    };
  }

  if (normalized === "refunded") {
    return {
      label: "Refunded",
      icon: "fa-solid fa-rotate-left",
      className: "admin-paystatus-refunded",
    };
  }

  // covers "unpaid", "pending", or anything else not explicitly handled
  return {
    label: normalized === "pending" ? "Pending" : "Unpaid",
    icon: "fa-solid fa-circle-exclamation",
    className: "admin-paystatus-unpaid",
  };
};

export default function OrdersClient() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // ← was missing
  const [activeStatus, setActiveStatus] = useState("All");

  const fetchOrders = async () => {
    try {
      const data = await getAdminOrders();
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateOrderStatus(id, newStatus);
      setOrders((prev) =>
        prev.map((o) => (o._id === id ? { ...o, status: newStatus } : o)),
      );

      // Auto-mark COD orders as "paid" once they're delivered — cash
      // has been collected by that point. Card/Stripe orders are already
      // marked paid at checkout, so we leave those untouched.
      const order = orders.find((o) => o._id === id);
      const shouldAutoMarkPaid =
        newStatus === "delivered" &&
        order &&
        isCashOnDelivery(order.paymentMethod) &&
        order.paymentStatus !== "paid";

      if (shouldAutoMarkPaid) {
        try {
          await updatePaymentStatus(id, "paid");
          setOrders((prev) =>
            prev.map((o) =>
              o._id === id ? { ...o, paymentStatus: "paid" } : o,
            ),
          );
        } catch (paymentError) {
          // Order status update already succeeded — don't roll that back,
          // just surface that the payment flag needs manual attention.
          console.error("Failed to auto-update payment status:", paymentError);
          alert(
            "Order marked as delivered, but payment status couldn't be auto-updated to Paid. Please update it manually.",
          );
        }
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const filteredOrders =
    activeStatus === "All"
      ? orders
      : orders.filter((o) => o.status === activeStatus);

  if (loading) {
    return (
      <div className="admin-loading">
        <i className="fa-solid fa-spinner fa-spin"></i>
        <span>Loading orders...</span>
      </div>
    );
  }

  return (
    <>
      {/* Header + Filter Tabs */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <AdminPageHeader title="Orders" />
        <div className="admin-filter-tabs">
          {STATUSES.map((status) => (
            <button
              key={status}
              className={`admin-filter-tab ${activeStatus === status ? "active" : ""}`}
              onClick={() => setActiveStatus(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              {/* Show count per status */}
              {status !== "All" && (
                <span className="ms-1">
                  ({orders.filter((o) => o.status === status).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <AdminTable columns={COLUMNS} isEmpty={filteredOrders.length === 0}>
        {filteredOrders.map((order, index) => {
          const methodMeta = getPaymentMethodMeta(order.paymentMethod);
          const payStatusMeta = getPaymentStatusMeta(order.paymentStatus);

          return (
            <tr key={order._id}>
              <td>{index + 1}</td>

              {/* Order Number */}
              <td>
                <span className="admin-order-number">#{order.orderNumber}</span>
              </td>

              {/* Customer — from customerInfo */}
              <td>
                <div>
                  <p className="mb-0 fw-500">
                    {order.customerInfo?.firstName}{" "}
                    {order.customerInfo?.lastName}
                  </p>
                  <small className="text-muted">
                    {order.customerInfo?.email}
                  </small>
                </div>
              </td>

              {/* Date — from createdAt */}
              <td>
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </td>

              {/* Items count */}
              <td>{order.items?.length} items</td>

              {/* Total */}
              <td>
                <strong>${order.total?.toFixed(2)}</strong>
              </td>

              {/* Payment Method + Payment Status */}
              <td>
                <span
                  className={`admin-method-badge ${methodMeta.className}`}
                  title={order.paymentMethod}
                >
                  <i className={methodMeta.icon}></i> {methodMeta.label}
                </span>
              </td>

              {/* Payment Status — separate column */}
              <td>
                <span
                  className={`admin-paystatus-badge ${payStatusMeta.className}`}
                  title={order.paymentStatus}
                >
                  <i className={payStatusMeta.icon}></i> {payStatusMeta.label}
                </span>
              </td>

              {/* Status Badge */}
              <td>
                <AdminBadge status={order.paymentStatus} />
              </td>

              {/* Actions — status dropdown */}
              <td>
                <div className="admin-action-btns">
                  <select
                    className="admin-status-select"
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                  >
                    {STATUSES.filter((s) => s !== "All").map((s) => (
                      <option key={s} value={s}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </td>
            </tr>
          );
        })}
      </AdminTable>
    </>
  );
}
