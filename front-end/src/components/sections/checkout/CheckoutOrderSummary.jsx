"use client";

import { useCartContext } from "@/lib/context/CartContext";
import { getShipping, getCartTotal } from "@/lib/utils/cartUtils";

export default function CheckoutOrderSummary() {
  const { cartItems, subtotal, updateQuantity, removeFromCart } =
    useCartContext();

  const shipping = getShipping(subtotal);
  const total = getCartTotal(subtotal);

  return (
    <div className="checkout-right">
      <div className="order-list-box">
        <h2 className="title">Order List</h2>

        {/* Header */}
        <div className="list-head">
          <span>Product name</span>
          <span>Total</span>
        </div>

        {/* Items */}
        <div className="items-container">
          {cartItems.map((item) => (
            <div key={item.sku} className="order-item">
              <div className="item-img">
                <img
                  src={item.image || "/assets/front-end-images/placeholder.jpg"}
                  alt={item.name}
                />
              </div>

              <div className="item-info">
                <span className="cat">{item.category?.toUpperCase()}</span>
                <p className="name">{item.name}</p>
                <p className="price">${item.price.toFixed(2)}</p>
                <small>Size: {item.size}</small>
                {item.color && (
                  <small className="ms-2">Color: {item.color}</small>
                )}
              </div>

              <div className="qty-control">
                <div className="qty-box">
                  <button
                    className="minus"
                    onClick={() => updateQuantity(item.sku, item.quantity - 1)}
                  >
                    <i className="fa-solid fa-minus"></i>
                  </button>
                  <input type="number" value={item.quantity} readOnly />
                  <button
                    className="plus"
                    onClick={() => updateQuantity(item.sku, item.quantity + 1)}
                  >
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>
                <button
                  className="del"
                  onClick={() => removeFromCart(item.sku)}
                >
                  <i className="fa-regular fa-trash-can"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="totals">
          <div className="rows">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="rows">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="rows grand-total">
            <strong>Total</strong>
            <strong>${total.toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
