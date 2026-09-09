import { useWishlistContext } from "@/lib/context/WishlistContext";
import { getImageUrl } from "@/lib/utils/imageUtils";
import Link from "next/link";
import toast from "react-hot-toast";

const ShopCard = ({ product }) => {
  const { toggleWishlist, isInWishlist } = useWishlistContext();
  const {
    name,
    slug,
    images,
    categories,
    price,
    discountPrice,
    variants = [],
  } = product;
  const handleWishlist = async () => {
    const response = await toggleWishlist(product);

    if (!response?.success) {
      toast.error("Please login first to add items to wishlist");
    }
  };

  const inWishlist = isInWishlist(product._id);

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
            src={getImageUrl(images[0]) || "/assets/img/placeholder.jpg"}
            alt={name}
          />
          <img
            className="back-image"
            src={getImageUrl(images[0]) || "/assets/img/placeholder.jpg"}
            alt={name}
          />
        </Link>

        {discountPercent && (
          <span className="discount-text">{discountPercent}</span>
        )}

        <Link href={`/shop/${slug}`} className="theme-btn">
          <i className="fa fa-basket-shopping"></i> Add to Cart
        </Link>

        <ul className="gt-shop-icon d-grid justify-content-center align-items-center">
          <li>
            <button
              onClick={handleWishlist}
              title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              <i
                className={inWishlist ? "fas fa-heart" : "far fa-heart"}
                style={{
                  color: inWishlist ? "red" : "inherit",
                }}
              ></i>
            </button>
          </li>

          <li>
            <Link href={`/shop/${slug}`}>
              <i className="far fa-eye"></i>
            </Link>
          </li>
        </ul>
      </div>

      <div className="shop-content">
        <div className="content">
          <span>{categories?.[0]?.name}</span>
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
