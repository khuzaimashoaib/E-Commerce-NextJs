import CategoryForm from "@/components/admin/categories/CategoryForm";
import AdminPageHeader from "@/components/admin/ui/AdminPageHeader";

export default async function EditCategoryPage({ params }) {
  const { id } = await params;
  return (
    <div>
      <AdminPageHeader title="Edit Category" />
      <CategoryForm categoryId={id} />
    </div>
  );
}
