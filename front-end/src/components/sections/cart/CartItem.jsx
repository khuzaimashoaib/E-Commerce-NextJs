"use client";

import { useCartContext } from "@/lib/context/CartContext";

export default function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useCartContext();

  return (
    <div className="cart-item">
      {/* Product Info */}
      <div className="product-info">
        <div className="product-img">
          <img
            src={item.image || "/assets/front-end-images/placeholder.jpg"}
            alt={item.name}
          />
        </div>
        <div className="product-details">
          <p className="category">{item.category?.toUpperCase()}</p>
          <h2 className="name">{item.name}</h2>
          <p className="price">${item.price.toFixed(2)}</p>
          <small>Size: {item.size}</small>
          {item.color && <small className="ms-2">Color: {item.color}</small>}
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
