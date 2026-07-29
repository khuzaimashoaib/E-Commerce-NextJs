"use client";

import { useAuthContext } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminProtect({ children }) {
  const { user, authLoaded } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!authLoaded) return;
    if (!user) {
      router.push("/login");
      return;
    }
    if (user.role !== "admin") {
      router.push("/shop");
    }
  }, [user, authLoaded, router]);

  // Still checking auth
  if (!authLoaded) {
    return (
      <div className="admin-loading">
        <i className="fa-solid fa-spinner fa-spin"></i>
        <span>Loading...</span>
      </div>
    );
  }

  // Not admin
  if (!user || user.role !== "admin") {
    return null;
  }

  return <>{children}</>;
}
