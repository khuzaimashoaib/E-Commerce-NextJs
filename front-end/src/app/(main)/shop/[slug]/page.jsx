import Breadcrumb from "@/components/sections/Breadcrumb";
import ProductClient from "@/components/sections/product/ProductClient";
import { getProductBySlug } from "@/lib/api";
import { notFound } from "next/navigation";

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <Breadcrumb
        title={product.name}
        bgImage="/assets/front-end-images/breadcrumb-bg.jpg"
        items={[
          { label: "Home", href: "/", icon: "fa-solid fa-house" },
          { label: "Shop", href: "/shop" },
          { label: product.name },
        ]}
      />
      <ProductClient product={product} />
    </>
  );
}
