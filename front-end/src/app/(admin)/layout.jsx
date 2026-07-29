import AdminHeader from "@/components/admin/layouts/AdminHeader";
import AdminProtect from "@/components/admin/AdminProtect";
import AdminSidebar from "@/components/admin/layouts/AdminSidebar";
import { AuthProvider } from "@/lib/context/AuthContext";

export default function AdminLayout({ children }) {
  return (
    <AuthProvider>
      <AdminProtect>
        <div className="admin-wrapper">
          <AdminSidebar />
          <div className="admin-main">
            <AdminHeader />
            <main className="admin-content">{children}</main>
          </div>
        </div>
      </AdminProtect>
    </AuthProvider>
  );
}
