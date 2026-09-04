export function addToWishlist(wishlistItems, product) {
  // Already in wishlist — return unchanged
  const exists = wishlistItems.find((item) => item.productId === product._id);
  if (exists) return wishlistItems;

  return [
    ...wishlistItems,
    {
      productId: product._id,
      name: product.name,
      slug: product.slug,
      image: product.images?.[0] || "",
      price: product.price,
      discountPrice: product.discountPrice || 0,
      categories: product.categories || [],
      addedAt: new Date().toISOString(),
    },
  ];
}

export function removeFromWishlist(wishlistItems, productId) {
  return wishlistItems.filter((item) => item.productId !== productId);
}

/** Check if product is in wishlist */
export function isInWishlist(wishlistItems, productId) {
  return wishlistItems.some((item) => item.productId === productId);
}

/** Get wishlist item count */
export function getWishlistCount(wishlistItems) {
  return wishlistItems.length;
}
