import { useEffect, useState } from "react";
import {
  addToWishlist,
  getWishlistCount,
  isInWishlist,
  removeFromWishlist,
} from "../utils/wishlistUtils";

const WISHLIST_KEY = "sports_wishlist";

function saveWishlist(items) {
  try {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
  } catch {
    console.error("Failed to save wishlist");
  }
}

function loadWishlist() {
  try {
    const stored = localStorage.getItem(WISHLIST_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export default function useWishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [wishlistLoaded, setWishlistLoaded] = useState(false);

  useEffect(() => {
    setWishlistItems(loadWishlist());
    setWishlistLoaded(true);
  }, []);

  useEffect(() => {
    if (wishlistLoaded) saveWishlist(wishlistItems);
  }, [wishlistItems, wishlistLoaded]);

  /** Add product to wishlist */
  const handleAddToWishlist = (product) => {
    setWishlistItems((prev) => addToWishlist(prev, product));
  };

  /** Remove product from wishlist */
  const handleRemoveFromWishlist = (productId) => {
    setWishlistItems((prev) => removeFromWishlist(prev, productId));
  };

  const handleToggleWishlist = (product) => {
    setWishlistItems((prev) => {
      if (isInWishlist(prev, product._id)) {
        return removeFromWishlist(prev, product._id);
      }
      return addToWishlist(prev, product);
    });
  };

  return {
    wishlistItems,
    wishlistLoaded,
    wishlistCount: getWishlistCount(wishlistItems),
    addToWishlist: handleAddToWishlist,
    removeFromWishlist: handleRemoveFromWishlist,
    toggleWishlist: handleToggleWishlist,
    isInWishlist: (productId) => isInWishlist(wishlistItems, productId),
  };
}
