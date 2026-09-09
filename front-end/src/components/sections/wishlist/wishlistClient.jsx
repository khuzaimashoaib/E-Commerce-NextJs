"use client";

import Link from "next/link";
import { useWishlistContext } from "@/lib/context/WishlistContext";
import { getImageUrl } from "@/lib/utils/imageUtils";
import { getDiscountPercent } from "@/lib/utils/productUtils";

export default function WishlistClient() {
  const { wishlistItems, wishlistLoaded, toggleWishlist } =
    useWishlistContext();

  if (!wishlistLoaded) {
    return (
      <div className="text-center py-5">
        <i className="fa-solid fa-spinner fa-spin me-2"></i>
        Loading...
      </div>
    );
  }

  // Empty wishlist
  if (wishlistItems.length === 0) {
    return (
      <section className="section-padding fix section-bg">
        <div className="container text-center py-5">
          <i
            className="fa-regular fa-heart mb-3"
            style={{ fontSize: "60px", color: "#ccc" }}
          ></i>

          <h3 className="mb-3">Your wishlist is empty</h3>

          <p className="mb-4 text-muted">
            Save items you love by clicking the heart icon
          </p>

          <Link href="/shop" className="theme-btn w-25">
            Browse Products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding fix section-bg justify-content-between">
      <div className="container">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="mb-0">
            My Wishlist
            <span className="text-muted ms-2" style={{ fontSize: "16px" }}>
              ({wishlistItems.length} items)
            </span>
          </h4>

          <Link
            href="/shop"
            className="theme-btn w-25 d-flex justify-content-center"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Wishlist Grid */}
        <div className="row g-4">
          {wishlistItems.map((item) => {
            const discountPercent = getDiscountPercent(
              item.price,
              item.discountPrice,
            );

            return (
              <div key={item._id} className="col-xl-3 col-lg-4 col-md-6">
                <div className="shop-card-items mt-0">
                  <div className="thumb">
                    {/* Product Image */}
                    <Link href={`/shop/${item.slug}`}>
                      <img
                        className="font-image"
                        src={
                          getImageUrl(item.images?.[0]) ||
                          "/assets/img/placeholder.jpg"
                        }
                        alt={item.name}
                      />

                      <img
                        className="back-image"
                        src={
                          getImageUrl(item.images?.[0]) ||
                          "/assets/img/placeholder.jpg"
                        }
                        alt={item.name}
                      />
                    </Link>

                    {/* Discount Badge */}
                    {discountPercent > 0 && (
                      <span className="discount-text">-{discountPercent}%</span>
                    )}

                    {/* Add to Cart */}
                    <Link href={`/shop/${item.slug}`} className="theme-btn">
                      <i className="fa-regular fa-basket-shopping"></i> Add to
                      Cart
                    </Link>

                    {/* Remove from wishlist */}
                    <ul className="gt-shop-icon d-grid justify-content-center align-items-center">
                      <li>
                        <button
                          onClick={() => toggleWishlist(item)}
                          title="Remove from wishlist"
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          <i
                            className="fas fa-heart"
                            style={{ color: "red" }}
                          ></i>
                        </button>
                      </li>

                      <li>
                        <Link href={`/shop/${item.slug}`}>
                          <i className="far fa-eye"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Product Info */}
                  <div className="shop-content">
                    <div className="content">
                      <span>{item.categories?.[0]?.name}</span>

                      <h3>
                        <Link href={`/shop/${item.slug}`}>{item.name}</Link>
                      </h3>

                      {item.discountPrice > 0 ? (
                        <h4>
                          <del>${item.price.toFixed(2)}</del> $
                          {item.discountPrice.toFixed(2)}
                        </h4>
                      ) : (
                        <h4>${item.price.toFixed(2)}</h4>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
