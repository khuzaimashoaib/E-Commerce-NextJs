"use client";

import { useCartContext } from "@/lib/context/CartContext";
import { useState } from "react";

export default function ProductVariants({ variants, product }) {
  const { addToCart } = useCartContext();

  const sizes = [...new Set(variants.map((v) => v.size))];
  const colors = [...new Set(variants.map((v) => v.color).filter(Boolean))];
  const hasColors = colors.length > 0;

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const selectedVariant = variants.find(
    (v) =>
      v.size === selectedSize &&
      (colors.length === 0 || v.color === selectedColor),
  );
  const inStock = selectedVariant ? selectedVariant.stock > 0 : false;
  const stockLeft = selectedVariant?.stock || 0;

  const handleQuantityChange = (type) => {
    if (type === "increment" && quantity < stockLeft) {
      setQuantity((prev) => prev + 1);
    }
    if (type === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) return alert("Please select a size first");
    if (hasColors && !selectedColor) return alert("Please select a color");

    // ← calls context which updates shared cart state + localStorage
    addToCart(product, selectedVariant, quantity);

    alert(`${product.name} (${selectedSize}) added to cart!`);
  };

  return (
    <div className="gt-shop-details-content">
      {/* Size Picker */}
      {sizes.length > 0 && (
        <div className="d-flex align-items-baseline gap-2">
          <span>Size:</span>
          <ul className="color-list mb-3 ">
            {sizes.map((size) => {
              const variant = variants.find((v) => v.size === size);
              const outOfStock = variant?.stock === 0;
              return (
                <li key={size}>
                  <button
                    className={`size-btn ${selectedSize === size ? "active" : ""} ${outOfStock ? "disabled" : ""}`}
                    onClick={() => !outOfStock && setSelectedSize(size)}
                    disabled={outOfStock}
                    title={outOfStock ? "Out of stock" : size}
                  >
                    {size}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {colors.length > 0 && (
        <div className="d-flex align-items-center gap-2">
          <span>Color:</span>
          <ul className="color-list mb-3">
            {colors.map((color) => {
              const variant = variants.find((v) => v.color === color);
              const outOfStock = variant?.stock === 0;
              return (
                <li key={color}>
                  <button
                    className={`color-btn ${selectedColor === color ? "active" : ""} ${outOfStock ? "disabled" : ""}`}
                    onClick={() => !outOfStock && setSelectedColor(color)}
                    disabled={outOfStock}
                    title={outOfStock ? "Out of stock" : color}
                    style={{
                      backgroundColor: color.toLowerCase(),
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      border:
                        selectedColor === color
                          ? "3px solid #000"
                          : "2px solid #ddd",
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Stock Status */}
      {selectedSize && (
        <p className={inStock ? "text-success" : "text-danger"}>
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
          disabled={!selectedSize || !inStock}
        >
          Add to Cart
        </button>

        <div className="icon-item">
          <a href="/wishlist" className="icon">
            <i className="far fa-heart"></i>
          </a>
        </div>
      </div>

      {/* Buy Now */}
      <button
        type="button"
        className="buy-btn mt-3"
        disabled={!selectedSize || !inStock}
        onClick={handleAddToCart}
      >
        Buy It Now
      </button>
      <div className="gt-bank-list">
        <div>
          Guaranteed <span>Safe &amp; Secure Checkout</span>
        </div>
        <img src="/assets/front-end-images/card.png" alt="payment methods" />
      </div>
    </div>
  );
}
