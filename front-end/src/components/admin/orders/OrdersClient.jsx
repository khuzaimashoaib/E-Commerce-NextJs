"use client";

import { useState } from "react";
import AdminTable from "@/components/admin/ui/AdminTable";
import AdminBadge from "@/components/admin/ui/AdminBadge";
import AdminPageHeader from "../ui/AdminPageHeader";

const STATIC_ORDERS = [
  {
    _id: "1",
    orderNumber: "097300430",
    customer: "John Doe",
    email: "john@example.com",
    date: "01 Jan 2024",
    total: 120,
    status: "pending",
    items: 3,
  },
  {
    _id: "2",
    orderNumber: "097300431",
    customer: "Jane Smith",
    email: "jane@example.com",
    date: "02 Jan 2024",
    total: 250,
    status: "processing",
    items: 2,
  },
  {
    _id: "3",
    orderNumber: "097300432",
    customer: "Mike Johnson",
    email: "mike@example.com",
    date: "03 Jan 2024",
    total: 75,
    status: "delivered",
    items: 1,
  },
  {
    _id: "4",
    orderNumber: "097300432",
    customer: "khuzaima",
    email: "khuzaima@example.com",
    date: "30 Jan 2026",
    total: 75,
    status: "pending",
    items: 1,
  },
];

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
  const [orders] = useState(STATIC_ORDERS);
  const [activeStatus, setActiveStatus] = useState("All");

  const filteredOrders =
    activeStatus === "All"
      ? orders
      : orders.filter((o) => o.status === activeStatus);

  return (
    <>
      {/* Status Filter Tabs */}
      <div className="d-flex justify-content-between align-items-center ">
        <AdminPageHeader title="Orders" className="mb-0" />
        <div className="admin-filter-tabs ">
          {STATUSES.map((status) => (
            <button
              key={status}
              className={`admin-filter-tab ${activeStatus === status ? "active" : ""}`}
              onClick={() => setActiveStatus(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <AdminTable columns={COLUMNS} isEmpty={filteredOrders.length === 0}>
        {filteredOrders.map((order, index) => (
          <tr key={order._id}>
            <td>{index + 1}</td>
            <td>
              <span className="admin-order-number">#{order.orderNumber}</span>
            </td>
            <td>
              <div>
                <p className="mb-0 fw-500">{order.customer}</p>
                <small className="text-muted">{order.email}</small>
              </div>
            </td>
            <td>{order.date}</td>
            <td>{order.items} items</td>
            <td>
              <strong>${order.total.toFixed(2)}</strong>
            </td>
            <td>
              <AdminBadge status={order.status} />
            </td>
            <td>
              <div className="admin-action-btns">
                <button className="admin-btn-edit">
                  <i className="fa-solid fa-eye"></i>
                </button>
                <select className="admin-status-select">
                  {STATUSES.filter((s) => s !== "All").map((s) => (
                    <option key={s} value={s}>
                      {s}
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
