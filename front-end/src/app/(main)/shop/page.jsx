import Breadcrumb from "@/components/sections/Breadcrumb";
import { getCategories, getProducts } from "@/lib/api";
import ShopClient from "./ShopClient";
import { Suspense } from "react";

export default async function ShopPage() {
  // Fetch initial data on the server
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <>
      <Breadcrumb
        title="Shop"
        bgImage="/assets/front-end-images/breadcrumb-bg.jpg"
        items={[
          { label: "Home", href: "/", icon: "fa-solid fa-house" },
          { label: "Shop" },
        ]}
      />
      <Suspense fallback={<p className="text-center py-5">Loading...</p>}>
        <ShopClient initialProducts={products} initialCategories={categories} />
      </Suspense>
    </>
  );
}
