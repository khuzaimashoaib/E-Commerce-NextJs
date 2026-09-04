"use client";
import { createContext, useContext } from "react";
import useWishlist from "../hooks/useWishlist";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const wishlist = useWishlist();

  return (
    <WishlistContext.Provider value={wishlist}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlistContext() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlistContext must be used inside WishlistProvider");
  }
  return context;
}
