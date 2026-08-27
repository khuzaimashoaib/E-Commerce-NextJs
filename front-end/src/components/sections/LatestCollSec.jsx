import { getProducts } from "@/lib/api";
import { getImageUrl } from "@/lib/utils/imageUtils";
import { getDiscountPercent } from "@/lib/utils/productUtils";
import Link from "next/link";

export default async function LatestCollSec() {
  // Fetch featured products only
  const allProducts = await getProducts();
  const featuredProducts = allProducts.filter((p) => p.isFeatured).slice(0, 5);

  return (
    <section className="latest-collection-section fix section-padding">
      <div className="container">
        <div className="shop-collection-wrapper">
          <div className="row g-4">
            {/* Left — static image (kept as is) */}
            <div className="col-lg-6 wow fadeInUp" data-wow-delay=".3s">
              <div className="shop-collection-image">
                <img
                  className="font-image"
                  src="/assets/front-end-images/barca-away.png"
                  alt="Latest Collection"
                />
              </div>
            </div>

            {/* Right — dynamic featured products */}
            <div className="col-lg-6">
              <div className="shop-collenction-content">
                <div className="section-title mb-0">
                  <span className="sub-title">PREMIUM SPORTS GEAR</span>
                  <h2 className="wow fadeInUp" data-wow-delay=".3s">
                    Latest Collection
                  </h2>
                  <p className="mt-2 wow fadeInUp" data-wow-delay=".5s">
                    Explore our latest arrivals — premium football gear
                    <br className="d-none d-xl-block" />
                    designed for performance and style
                  </p>
                </div>

                <div className={`swiper shop-slider-6`}>
                  <div className="swiper-wrapper">
                    {featuredProducts.length > 0 ? (
                      featuredProducts.map((product) => {
                        const discountPercent = getDiscountPercent(
                          product.price,
                          product.discountPrice,
                        );

                        return (
                          <div key={product._id} className="swiper-slide">
                            <div className="shop-card-items style-2">
                              <div className="thumb">
                                {/* Product Images */}
                                <img
                                  className="font-image"
                                  src={getImageUrl(product.images?.[0])}
                                  alt={product.name}
                                />
                                <img
                                  className="back-image"
                                  src={getImageUrl(
                                    product.images?.[1] || product.images?.[0],
                                  )}
                                  alt={product.name}
                                />

                                {/* Discount Badge */}
                                {discountPercent > 0 && (
                                  <span className="discount-text bg-white">
                                    -{discountPercent}%
                                  </span>
                                )}

                                {/* Add to Cart */}
                                <Link
                                  href={`/shop/${product.slug}`}
                                  className="theme-btn"
                                >
                                  <i className="fa fa-basket-shopping"></i> Add
                                  to Cart
                                </Link>

                                {/* Icons */}
                                <ul className="gt-shop-icon d-grid justify-content-center align-items-center">
                                  <li>
                                    <a href="/wishlist">
                                      <i className="far fa-heart"></i>
                                    </a>
                                  </li>
                                  <li>
                                    <Link href={`/shop/${product.slug}`}>
                                      <i className="far fa-eye"></i>
                                    </Link>
                                  </li>
                                </ul>
                              </div>

                              {/* Product Info */}
                              <div className="shop-content">
                                <div className="content">
                                  <span>
                                    {product.brand || product.category?.name}
                                  </span>
                                  <h3>
                                    <Link href={`/shop/${product.slug}`}>
                                      {product.name}
                                    </Link>
                                  </h3>
                                  {product.discountPrice > 0 ? (
                                    <h4>
                                      <del className="text-muted me-1">
                                        ${product.price.toFixed(2)}
                                      </del>
                                      ${product.discountPrice.toFixed(2)}
                                    </h4>
                                  ) : (
                                    <h4>${product.price.toFixed(2)}</h4>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      // Fallback if no featured products
                      <div className="swiper-slide">
                        <p className="text-muted">No featured products yet.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Slider Controls */}
                <div className="button-items-2">
                  <div
                    className="array-button style-2 wow fadeInUp"
                    data-wow-delay=".3s"
                  >
                    <button className="array-prev">
                      <i className="fa-solid fa-chevron-left"></i>
                    </button>
                    <button className="array-next">
                      <i className="fa-solid fa-chevron-right"></i>
                    </button>
                  </div>
                  <div className="pagi-item">
                    <div className="dot-number">
                      <span className="dot-num">
                        <span>{String(featuredProducts.length)}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
