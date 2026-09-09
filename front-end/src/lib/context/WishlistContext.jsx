"use client";
import { createContext, useContext } from "react";
import useWishlist from "../hooks/useWishlist";
import { useAuthContext } from "./AuthContext";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const { user } = useAuthContext();
  const wishlist = useWishlist(user);

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
