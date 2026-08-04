import AdminPageHeader from "@/components/admin/ui/AdminPageHeader";
import CategoriesClient from "@/components/admin/categories/CategoriesClient";

export default function CategoriesPage() {
  return (
    <div>
      <AdminPageHeader
        title="Categories"
        actionText="Add Category"
        actionHref="/dashboard/categories/add"
        className="mb-3"
      />
      <CategoriesClient />
    </div>
  );
}
