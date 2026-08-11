import ProductForm from "@/components/admin/products/ProductForm";
import AdminPageHeader from "@/components/admin/ui/AdminPageHeader";

export default function AddProductPage() {
  return (
    <div>
      <AdminPageHeader title="Add Product" className="mb-3" />
      <ProductForm />
    </div>
  );
}
