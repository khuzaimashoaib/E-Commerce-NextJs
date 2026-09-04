"use client";

import { useCartContext } from "@/lib/context/CartContext";
import { useWishlistContext } from "@/lib/context/WishlistContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProductVariants({ variants, product }) {
  const { toggleWishlist, isInWishlist } = useWishlistContext();
  const { addToCart } = useCartContext();
  const router = useRouter();

  const inWishlist = isInWishlist(product._id);

  const attributeKeys =
    variants.length > 0 && variants[0].attributes
      ? Object.keys(variants[0].attributes)
      : [];

  // Get unique values per attribute key
  const getAttributeValues = (attrName) => {
    return [
      ...new Set(variants.map((v) => v.attributes?.[attrName]).filter(Boolean)),
    ];
  };
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [addedMsg, setAddedMsg] = useState("");

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
    if (type === "increment" && quantity < stockLeft) {
      setQuantity((prev) => prev + 1);
    }
    if (type === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (!allSelected) {
      alert("Please select all options first");
      return;
    }
    if (!inStock) {
      alert("This variant is out of stock");
      return;
    }
    addToCart(product, selectedVariant, quantity);
    setAddedMsg("Added to cart!");
    setTimeout(() => setAddedMsg(""), 3000);
  };

  const handleBuyNow = () => {
    if (!allSelected || !inStock) return;
    addToCart(product, selectedVariant, quantity);
    router.push("/cart");
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

      {/* Success Message */}
      {addedMsg && (
        <div className="alert alert-success py-2 mb-3">
          <i className="fa-solid fa-check me-2"></i>
          {addedMsg}
        </div>
      )}

      {/* Quantity + Add to Cart */}
      <div className="cart-quantity">
        <p className="qty">
          <button
            className="qtyminus"
            onClick={() => handleQuantityChange("decrement")}
          >
            -
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

        <div className="icon-item">
          <a href="/wishlist" className="icon">
            <i
              className={inWishlist ? "fas fa-heart" : "far fa-heart"}
              style={{ color: inWishlist ? "red" : "inherit" }}
            ></i>
          </a>
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
