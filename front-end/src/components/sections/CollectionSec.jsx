import Link from "next/link";
import { getProducts } from "@/lib/api";
import { getImageUrl } from "@/lib/utils/imageUtils";
import { getDiscountPercent } from "@/lib/utils/productUtils";

export default async function CollectionSec() {
  // Fetch all products then filter by football-tshirts category
  const allProducts = await getProducts();
  const jerseys = allProducts
    .filter((p) => p.category?.slug === "football-tshirts")
    .slice(0, 8); // max 8 products

  return (
    <section className="shop-section-4 fix section-padding">
      <div className="container">
        <div className="section-title-area">
          <div className="section-title mb-0">
            <span className="sub-title">Football Gear</span>
            <h2 className="wow fadeInUp" data-wow-delay=".3s">
              Jersey Collection
            </h2>
          </div>
          <div className="array-button wow fadeInUp" data-wow-delay=".3s">
            <button className="array-prev">
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button className="array-next">
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>

        <div className="shop-slider swiper wow fadeInUp" data-wow-delay=".3s">
          <div className="swiper-wrapper">
            {jerseys.length > 0 ? (
              jerseys.map((product) => {
                const discountPercent = getDiscountPercent(
                  product.price,
                  product.discountPrice,
                );

                return (
                  <div key={product._id} className="swiper-slide">
                    <div className="shop-card-items style-4">
                      <div className="thumb">
                        {/* Front Image */}
                        <img
                          className="font-image"
                          src={getImageUrl(product.images?.[0])}
                          alt={product.name}
                        />

                        {/* Back Image */}
                        <img
                          className="back-image"
                          src={getImageUrl(
                            product.images?.[1] || product.images?.[0],
                          )}
                          alt={product.name}
                        />

                        {/* Badge */}
                        {discountPercent > 0 ? (
                          <span className="discount-text">
                            -{discountPercent}%
                          </span>
                        ) : product.isFeatured ? (
                          <span className="discount-text">Hot</span>
                        ) : null}

                        {/* Add to Cart */}
                        <Link
                          href={`/shop/${product.slug}`}
                          className="theme-btn"
                        >
                          <i className="fa-regular fa-basket-shopping"></i> Add
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
                          <span>{product.category?.name}</span>
                          <h3>
                            <Link
                              href={`/shop/${product.slug}`}
                              className="product-name"
                            >
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

                        {/* Rating Stars */}
                        <div className="star">
                          {[...Array(5)].map((_, i) => (
                            <i
                              key={i}
                              className={
                                i < Math.round(product.rating)
                                  ? "fa-solid fa-star"
                                  : "fa-regular fa-star"
                              }
                            ></i>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              // Fallback if no jerseys found
              <div className="swiper-slide">
                <p className="text-muted py-4">
                  No jerseys available yet.{" "}
                  <Link href="/shop">Browse all products</Link>
                </p>
              </div>
            )}
          </div>

          {/* Swiper Dots */}
          <div className="swiper-dot text-center pt-5">
            <div className="dot"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
