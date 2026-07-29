"use client";

import { useAuthContext } from "@/lib/context/AuthContext";
import { logoutUser } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminHeader() {
  const { user, clearUser } = useAuthContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logoutUser();
      clearUser();
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="admin-header">
      {/* Left — Page title comes from each page */}
      <div className="admin-header-left">
        <h5 className="admin-header-title">Admin Panel</h5>
      </div>

      {/* Right — User info + logout */}
      <div className="admin-header-right">
        <div className="admin-header-user">
          <div className="admin-user-avatar">
            <i className="fa-solid fa-user"></i>
          </div>
          <div className="admin-user-info">
            <span className="admin-user-name">{user?.name}</span>
            <span className="admin-user-role">Administrator</span>
          </div>
        </div>

        <button
          className="admin-logout-btn"
          onClick={handleLogout}
          disabled={loading}
        >
          <i className="fa-solid fa-right-from-bracket"></i>
          <span>{loading ? "..." : "Logout"}</span>
        </button>
      </div>
    </header>
  );
}
