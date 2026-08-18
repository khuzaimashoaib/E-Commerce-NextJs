"use client";

import { useCartContext } from "@/lib/context/CartContext";
import { getImageUrl } from "@/lib/utils/imageUtils";

export default function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useCartContext();

  return (
    <div className="cart-item">
      {/* Product Info */}
      <div className="product-info">
        <div className="product-img">
          <img src={getImageUrl(item.image)} alt={item.name} />
        </div>
        <div className="product-details">
          <p className="category">{item.category?.toUpperCase()}</p>
          <h2 className="name">{item.name}</h2>
          <p className="price">${item.price.toFixed(2)}</p>
          {item.attributeLabel && (
            <small className="text-muted">{item.attributeLabel}</small>
          )}
        </div>
      </div>

      {/* Quantity + Remove */}
      <div className="product-qty">
        <div className="qty-box">
          <button
            className="minus-btn"
            onClick={() => updateQuantity(item.sku, item.quantity - 1)}
          >
            <i className="fa-solid fa-minus"></i>
          </button>
          <input
            type="number"
            className="qty-input"
            value={item.quantity}
            min="1"
            max={item.stock}
            readOnly
          />
          <button
            className="plus-btn"
            onClick={() => updateQuantity(item.sku, item.quantity + 1)}
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
        <button
          className="remove-btn"
          onClick={() => removeFromCart(item.sku)}
          title="Remove item"
        >
          <i className="fa-regular fa-trash-can"></i>
        </button>
      </div>

      {/* Item Total */}
      <div className="product-total">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
}
