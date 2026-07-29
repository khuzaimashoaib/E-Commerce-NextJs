import AdminPageHeader from "@/components/admin/ui/AdminPageHeader";
import UsersClient from "@/components/admin/users/UsersClient";

export default function UsersPage() {
  return (
    <div>
      <AdminPageHeader title="Users" />
      <UsersClient />
    </div>
  );
}
