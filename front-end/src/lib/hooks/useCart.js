import { useEffect, useState } from "react";
import {
  addToCart,
  clearCart,
  getCartItemCount,
  getCartSubtotal,
  removeFromCart,
  updateQuantity,
} from "../utils/cartUtils";

const CART_KEY = "sports_cart";

function loadCart() {
  try {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}
function saveCart(cartItems) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  } catch {
    console.error("Failed to save cart to localStorage");
  }
}

export default function useCart() {
  const [cartItems, setCartItems] = useState([]);
  const [cartLoaded, setCartLoaded] = useState(false);

  useEffect(() => {
    setCartItems(loadCart());
    setCartLoaded(true);
  }, []);

  useEffect(() => {
    if (cartLoaded) saveCart(cartItems);
  }, [cartItems, cartLoaded]);

  /** Add product + variant to cart */
  const handleAddToCart = (product, variant, quantity = 1) => {
    setCartItems((prev) => addToCart(prev, product, variant, quantity));
  };
  /** Remove item from cart by SKU */
  const handleRemoveFromCart = (sku) => {
    setCartItems((prev) => removeFromCart(prev, sku));
  };

  const handleUpdateQuantity = (sku, quantity) => {
    setCartItems((prev) => updateQuantity(prev, sku, quantity));
  };
  const handleClearCart = () => {
    setCartItems(clearCart());
  };

  return {
    cartItems,
    cartLoaded,
    itemCount: getCartItemCount(cartItems),
    subtotal: getCartSubtotal(cartItems),
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
    updateQuantity: handleUpdateQuantity,
    clearCart: handleClearCart,
  };
}
