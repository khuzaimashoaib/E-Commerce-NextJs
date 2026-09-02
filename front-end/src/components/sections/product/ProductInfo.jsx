export default function ProductInfo({ product }) {
  const {
    name,
    price,
    discountPrice,
    description,
    brand,
    categories,
    rating,
    numReviews,
  } = product;

  return (
    <div className="gt-shop-details-content">
      {/* Category + Brand */}
      <span>{categories?.map((c) => c.name).join(", ")}</span>

      {/* Name */}
      <h2>{name}</h2>

      {/* Price */}
      <ul className="price-list">
        <li>
          Price:{" "}
          <span>${(discountPrice > 0 ? discountPrice : price).toFixed(2)}</span>
        </li>
        {discountPrice > 0 && (
          <li>
            <del>${price.toFixed(2)}</del>
          </li>
        )}
      </ul>

      {/* Views */}
      <span className="eye-icon">
        <i className="fa-regular fa-eye"></i>
        16 people are viewing this right now
      </span>

      {/* Rating */}
      <div className="star">
        {[...Array(5)].map((_, i) => (
          <i
            key={i}
            className={
              i < Math.round(rating) ? "fa-solid fa-star" : "fa-regular fa-star"
            }
          ></i>
        ))}
        <span>({numReviews}+ Review)</span>
      </div>

      {/* Brand */}
      {brand && (
        <ul className="gt-list-items mt-2">
          <li>
            <span>Brand:</span> {brand}
          </li>
        </ul>
      )}

      {/* Share */}
      <div className="share-list">
        <span>Share With:</span>
        <a href="#">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="#">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#">
          <i className="fab fa-vimeo-v"></i>
        </a>
        <a href="#">
          <i className="fab fa-pinterest-p"></i>
        </a>
      </div>
    </div>
  );
}
