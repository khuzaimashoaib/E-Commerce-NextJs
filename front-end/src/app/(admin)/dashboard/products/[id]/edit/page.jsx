import ProductForm from "@/components/admin/products/ProductsForm";
import AdminPageHeader from "@/components/admin/ui/AdminPageHeader";

export default async function EditProductPage({ params }) {
  const { id } = await params;

  return (
    <div>
      <AdminPageHeader title="Edit Product" />
      <ProductForm productId={id} />
    </div>
  );
}
