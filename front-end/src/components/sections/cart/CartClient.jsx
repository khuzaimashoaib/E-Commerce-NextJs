"use client";

import { useCartContext } from "@/lib/context/CartContext";
import CartItem from "./CartItem";
import Link from "next/link";
import CartSummary from "./CartSummary";

export default function CartClient() {
  const { cartItems, subtotal, cartLoaded } = useCartContext();

  if (!cartLoaded) {
    return <p className="text-center py-5">Loading cart...</p>;
  }

  return (
    <div className="shop-cart-section section-padding fix section-bg">
      <div className="container">
        <div className="shop-cart-wrapper">
          <div className="cart-main-content">
            {/* Left — Items */}
            {/* Left — Items */}
            <div className="cart-left">
              <div className="cart-header">
                <span className="col-name">Product name</span>
                <span className="col-qty">Quantity</span>
                <span className="col-total">Total</span>
              </div>

              {cartItems.length > 0 ? (
                cartItems.map((item) => <CartItem key={item.sku} item={item} />)
              ) : (
                <div className="text-center py-5 ">
                  <i
                    className="fa fa-basket-shopping mb-3"
                    style={{ fontSize: "60px", color: "#ccc" }}
                  ></i>
                  <h3 className="mb-3">Your cart is empty</h3>
                  <p className="mb-3">
                    Looks like you haven't added anything yet.
                  </p>
                  <Link href="/shop" className="theme-btn">
                    Start Shopping
                  </Link>
                </div>
              )}
            </div>

            {/* Right — Summary */}
            <CartSummary subtotal={subtotal} />
          </div>
        </div>
      </div>
    </div>
  );
}
