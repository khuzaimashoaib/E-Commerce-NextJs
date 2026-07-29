import Link from "next/link";
import React from "react";

const ShopCard = ({ product }) => {
  const { name, slug, images, category, price, discountPrice, variants } =
    product;

  const colors = [...new Set(variants.map((v) => v.color).filter(Boolean))];
  const extraColors = colors.length > 3 ? colors.length - 3 : 0;

  const discountPercent =
    discountPrice > 0
      ? `-${Math.round(((price - discountPrice) / price) * 100)}%`
      : null;

  return (
    <div className="shop-card-items mt-0">
      <div className="thumb">
        <Link href={`/shop/${slug}`}>
          <img
            className="font-image"
            src={images[0] || "/assets/img/placeholder.jpg"}
            alt={name}
          />
          <img
            className="back-image"
            src={images[1] || images[0] || "/assets/img/placeholder.jpg"}
            alt={name}
          />
        </Link>

        {discountPercent && (
          <span className="discount-text">{discountPercent}</span>
        )}

        <Link href={`#`} className="theme-btn">
          <i className="fa-regular fa-basket-shopping"></i> Add to Cart
        </Link>

        <ul className="gt-shop-icon d-grid justify-content-center align-items-center">
          <li>
            <a href="/wishlist">
              <i className="far fa-heart"></i>
            </a>
          </li>
          <li>
            <a href="/compare">
              <i className="fa-solid fa-code-compare"></i>
            </a>
          </li>
          <li>
            <button data-bs-toggle="modal" data-bs-target="#exampleModal2">
              <i className="far fa-eye"></i>
            </button>
          </li>
        </ul>
      </div>

      <div className="shop-content">
        <div className="content">
          <span>{category?.name}</span>
          <h3>
            <Link href={`/shop/${slug}`}>{name}</Link>
          </h3>
          {discountPrice > 0 ? (
            <h4>
              <del>${price.toFixed(2)}</del> ${discountPrice.toFixed(2)}
            </h4>
          ) : (
            <h4>${price.toFixed(2)}</h4>
          )}
        </div>

        {colors.length > 0 && (
          <div className="color-picker">
            {colors.slice(0, 3).map((color, i) => (
              <button
                key={i}
                className={`color-box box-${color.toLowerCase()}`}
              ></button>
            ))}
            {extraColors > 0 && (
              <span className="more-count">+{extraColors}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopCard;
