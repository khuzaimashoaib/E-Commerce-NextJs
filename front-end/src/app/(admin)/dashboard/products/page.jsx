import ProductsClient from "@/components/admin/products/ProductsClient";
import AdminPageHeader from "@/components/admin/ui/AdminPageHeader";

export default function ProductsPage() {
  return (
    <div>
      <AdminPageHeader
        title="Products"
        actionText="Add Product"
        actionHref="/dashboard/products/add"
        className="mb-3"
      />
      <ProductsClient />
    </div>
  );
}
