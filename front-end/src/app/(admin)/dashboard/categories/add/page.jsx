import CategoryForm from "@/components/admin/categories/CategoryForm";
import AdminPageHeader from "@/components/admin/ui/AdminPageHeader";

export default function AddCategoryPage() {
  return (
    <div>
      <AdminPageHeader title="Add Category" className="mb-3" />
      <CategoryForm />
    </div>
  );
}
