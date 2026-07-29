"use client";

import ShopGrid from "@/components/sections/shop/ShopGrid";
import ShopNotices from "@/components/sections/shop/ShopNotices";
import ShopSidebarClient from "@/components/sections/shop/ShopSidebarClient";

import useShopFilters from "@/lib/hooks/useShopFilters";

export default function ShopClient({ initialProducts, initialCategories }) {
  const {
    products,
    loading,
    pendingFilters,
    setPendingFilters,
    applyFilters,
    resetFilters,
  } = useShopFilters(initialProducts);

  return (
    <section className="shop-section fix section-padding section-bg">
      <div className="container">
        <ShopNotices total={products.length} />
        <div className="row g-4">
          <div className="col-lg-3">
            <ShopSidebarClient
              categories={initialCategories}
              filters={pendingFilters}
              setFilters={setPendingFilters}
              onApply={applyFilters}
              onReset={resetFilters}
            />
          </div>
          <div className="col-lg-9">
            {loading ? (
              <p>Loading products...</p>
            ) : products.length === 0 ? (
              <p>No products found.</p>
            ) : (
              <ShopGrid products={products} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
