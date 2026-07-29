"use client";

import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import ProductTabs from "./ProductTabs";
import ProductVariants from "./ProductVariants";

export default function ProductClient({ product }) {
  const discountPercent =
    product.discountPrice > 0
      ? Math.round(
          ((product.price - product.discountPrice) / product.price) * 100,
        )
      : 0;

  return (
    <div className="shop-section section-padding fix section-bg">
      <div className="container">
        <div className="gt-shop-details-wrapper">
          <div className="row g-4">
            {/* Left — Image */}
            <div className="col-lg-6">
              <ProductImages
                images={product.images}
                name={product.name}
                p
                discountPercent={discountPercent}
              />
            </div>

            {/* Right — Info + Variants */}
            <div className="col-lg-6">
              <ProductInfo product={product} />
              <ProductVariants variants={product.variants} product={product} />
            </div>
          </div>

          {/* Tabs — Description + Additional Info */}
          <ProductTabs description={product.description} />
        </div>
      </div>
    </div>
  );
}
