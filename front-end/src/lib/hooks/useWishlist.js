import { useEffect, useState } from "react";
import { getWishlist, toggleWishlistItem } from "../api";

export default function useWishlist(user) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [wishlistLoaded, setWishlistLoaded] = useState(false);
  const [wishlistIds, setWishlistIds] = useState([]);

  useEffect(() => {
    if (!user) {
      setWishlistItems([]);
      setWishlistIds([]);
      setWishlistLoaded(true);
      return;
    }

    const fetchWishlist = async () => {
      try {
        const data = await getWishlist();
        setWishlistItems(data);
        setWishlistIds(data.map((p) => p._id));
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
      } finally {
        setWishlistLoaded(true);
      }
    };
    fetchWishlist();
  }, [user]);

  const handleToggleWishlist = async (product) => {
    if (!user) {
      return {
        success: false,
        message: "Please login first to use wishlist",
      };
    }

    try {
      const result = await toggleWishlistItem(product._id);

      if (result.inWishlist) {
        // Added — add full product to items
        setWishlistItems((prev) => [...prev, product]);
        setWishlistIds((prev) => [...prev, product._id]);
      } else {
        // Removed
        setWishlistItems((prev) => prev.filter((p) => p._id !== product._id));
        setWishlistIds((prev) => prev.filter((id) => id !== product._id));
      }
      return result;
    } catch (error) {
      console.error("Failed to toggle wishlist:", error);
      throw error;
    }
  };

  return {
    wishlistItems,
    wishlistLoaded,
    wishlistCount: wishlistIds.length,
    toggleWishlist: handleToggleWishlist,
    isInWishlist: (productId) => wishlistIds.includes(productId),
  };
}
