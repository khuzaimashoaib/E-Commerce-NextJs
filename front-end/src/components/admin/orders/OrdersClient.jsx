"use client";

import { useEffect, useState } from "react";
import AdminTable from "@/components/admin/ui/AdminTable";
import AdminBadge from "@/components/admin/ui/AdminBadge";
import AdminPageHeader from "../ui/AdminPageHeader";
import { getAdminOrders, updateOrderStatus } from "@/lib/api";

const COLUMNS = [
  "#",
  "Order No.",
  "Customer",
  "Date",
  "Items",
  "Total",
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
        {filteredOrders.map((order, index) => (
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
                  {order.customerInfo?.firstName} {order.customerInfo?.lastName}
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

            {/* Status Badge */}
            <td>
              <AdminBadge status={order.status} />
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
        ))}
      </AdminTable>
    </>
  );
}
