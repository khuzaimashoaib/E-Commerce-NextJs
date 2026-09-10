"use client";

import { useState } from "react";
import { useCartContext } from "@/lib/context/CartContext";
import { useWishlistContext } from "@/lib/context/WishlistContext";
import { useAuthContext } from "@/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ProductVariants({ variants, product }) {
  const { addToCart } = useCartContext();
  const { toggleWishlist, isInWishlist } = useWishlistContext();
  const { user } = useAuthContext();
  const router = useRouter();

  const inWishlist = isInWishlist(product._id);

  const attributeKeys =
    variants.length > 0 && variants[0].attributes
      ? Object.keys(variants[0].attributes)
      : [];

  const getAttributeValues = (attrName) => {
    return [
      ...new Set(variants.map((v) => v.attributes?.[attrName]).filter(Boolean)),
    ];
  };

  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [quantity, setQuantity] = useState(1);

  const selectedVariant = variants.find((v) =>
    Object.entries(selectedAttributes).every(
      ([key, val]) => v.attributes?.[key] === val,
    ),
  );

  const allSelected = attributeKeys.every((key) => selectedAttributes[key]);
  const inStock = selectedVariant ? selectedVariant.stock > 0 : false;
  const stockLeft = selectedVariant?.stock || 0;

  const handleAttributeSelect = (attrName, value) => {
    setSelectedAttributes((prev) => ({ ...prev, [attrName]: value }));
    setQuantity(1);
  };

  const handleQuantityChange = (type) => {
    if (type === "increment" && quantity < stockLeft)
      setQuantity((prev) => prev + 1);
    if (type === "decrement" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    if (!allSelected) {
      toast.error("Please select all options first");
      return;
    }
    if (!inStock) {
      toast.error("This variant is out of stock");
      return;
    }
    addToCart(product, selectedVariant, quantity);
    toast.success(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    if (!allSelected) {
      toast.error("Please select all options first");
      return;
    }
    if (!inStock) {
      toast.error("This variant is out of stock");
      return;
    }
    addToCart(product, selectedVariant, quantity);
    router.push("/cart");
  };

  const handleWishlist = async () => {
    if (!user) {
      toast.error("Please login to add to wishlist");
      return;
    }
    try {
      const result = await toggleWishlist(product);
      if (result?.inWishlist) {
        toast.success("Added to wishlist!");
      } else {
        toast.success("Removed from wishlist");
      }
    } catch {
      toast.error("Failed to update wishlist");
    }
  };

  return (
    <div className="gt-shop-details-content">
      {/* Attribute Selectors */}
      {attributeKeys.map((attrName) => (
        <div key={attrName} className="d-flex align-items-baseline gap-2 mb-3">
          <span>{attrName}:</span>
          <ul className="color-list mb-0">
            {getAttributeValues(attrName).map((value) => (
              <li key={value}>
                <button
                  className={`size-btn ${
                    selectedAttributes[attrName] === value ? "active" : ""
                  }`}
                  onClick={() => handleAttributeSelect(attrName, value)}
                >
                  {value}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Stock Status */}
      {allSelected && (
        <p className={`mb-3 ${inStock ? "text-success" : "text-danger"}`}>
          {inStock
            ? `Hurry! Only ${stockLeft} units left in stock!`
            : "Out of Stock"}
        </p>
      )}

      {/* Quantity + Add to Cart */}
      <div className="cart-quantity">
        <p className="qty">
          <button
            className="qtyminus"
            onClick={() => handleQuantityChange("decrement")}
          >
            −
          </button>
          <input
            type="number"
            value={quantity}
            min="1"
            max={stockLeft}
            readOnly
          />
          <button
            className="qtyplus"
            onClick={() => handleQuantityChange("increment")}
          >
            +
          </button>
        </p>

        <button
          className="shop-btn theme-btn"
          onClick={handleAddToCart}
          disabled={!allSelected || !inStock}
        >
          Add to Cart
        </button>

        {/* Wishlist heart button */}
        <div className="icon-item">
          <button
            onClick={handleWishlist}
            className="icon"
            title={
              !user
                ? "Login to add to wishlist"
                : inWishlist
                  ? "Remove from wishlist"
                  : "Add to wishlist"
            }
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <i
              className={user && inWishlist ? "fas fa-heart" : "far fa-heart"}
              style={{ color: user && inWishlist ? "red" : "inherit" }}
            ></i>
          </button>
        </div>
      </div>

      {/* Buy Now */}
      <button
        type="button"
        className="buy-btn mt-3"
        disabled={!allSelected || !inStock}
        onClick={handleBuyNow}
      >
        Buy It Now
      </button>

      {/* Safe Checkout */}
      <div className="gt-bank-list mt-3">
        <div>
          Guaranteed <span>Safe &amp; Secure Checkout</span>
        </div>
        <img src="/assets/front-end-images/card.png" alt="payment methods" />
      </div>
    </div>
  );
}
