"use client";

import { useState } from "react";
import AdminTable from "@/components/admin/ui/AdminTable";
import AdminBadge from "@/components/admin/ui/AdminBadge";

const STATIC_USERS = [
  {
    _id: "1",
    name: "Admin",
    email: "admin@sports.com",
    role: "admin",
    joined: "01 Jan 2024",
  },
  {
    _id: "2",
    name: "Test User",
    email: "test@example.com",
    role: "customer",
    joined: "02 Jan 2024",
  },
  {
    _id: "3",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "customer",
    joined: "03 Jan 2024",
  },
];

const COLUMNS = ["#", "Name", "Email", "Role", "Joined", "Actions"];

export default function UsersClient() {
  const [users] = useState(STATIC_USERS);

  return (
    <AdminTable columns={COLUMNS} isEmpty={users.length === 0}>
      {users.map((user, index) => (
        <tr key={user._id}>
          <td>{index + 1}</td>
          <td>
            <div className="admin-user-row">
              <div className="admin-table-avatar">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span>{user.name}</span>
            </div>
          </td>
          <td>{user.email}</td>
          <td>
            <AdminBadge status={user.role} />
          </td>
          <td>{user.joined}</td>
          <td>
            <div className="admin-action-btns">
              <button className="admin-btn-edit">
                <i className="fa-solid fa-eye"></i>
              </button>
              <button className="admin-btn-delete">
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      ))}
    </AdminTable>
  );
}
