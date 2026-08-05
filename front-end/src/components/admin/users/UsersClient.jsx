"use client";

import { useEffect, useState } from "react";
import AdminTable from "@/components/admin/ui/AdminTable";
import AdminBadge from "@/components/admin/ui/AdminBadge";
import { deleteUser, getAdminUsers, updateUserRole } from "@/lib/api";

const COLUMNS = ["#", "Name", "Email", "Role", "Joined", "Actions"];

export default function UsersClient() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchUsers = async () => {
    try {
      const data = await getAdminUsers();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete user "${name}"?`)) return;
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (error) {
      alert(error.message);
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      const updated = await updateUserRole(id, newRole);

      setUsers((prev) => {
        const updatedList = prev.map((u) =>
          u._id === id ? { ...u, role: updated.role } : u,
        );

        return updatedList.sort((a, b) => {
          if (a.role === "admin" && b.role !== "admin") return -1;
          if (a.role !== "admin" && b.role === "admin") return 1;
          return 0;
        });
      });
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <i className="fa-solid fa-spinner fa-spin"></i>
        <span>Loading users...</span>
      </div>
    );
  }

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
          <td>
            {new Date(user.createdAt).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </td>

          <td>
            <div className="admin-action-btns">
              {/* Role Toggle */}
              {user.role !== "admin" && (
                <button
                  className="admin-btn-edit"
                  title="Make Admin"
                  onClick={() => handleRoleChange(user._id, "admin")}
                >
                  <i className="fa-solid fa-user-shield"></i>
                </button>
              )}

              {user.role === "admin" && (
                <button
                  className="admin-btn-edit"
                  title="Make Customer"
                  onClick={() => handleRoleChange(user._id, "customer")}
                >
                  <i className="fa-solid fa-user"></i>
                </button>
              )}

              {/* Delete */}
              <button
                className="admin-btn-delete"
                onClick={() => handleDelete(user._id, user.name)}
                title="Delete user"
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      ))}
    </AdminTable>
  );
}
