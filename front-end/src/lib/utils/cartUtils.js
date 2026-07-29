export function addToCart(cartItems, product, variant, quantity = 1) {
  const ExistingCartItem = cartItems.find(
    (items) =>
      items.productId === product._id &&
      items.size === variant.size &&
      items.color === variant.color,
  );

  if (ExistingCartItem) {
    return cartItems.map((item) =>
      item.productId === product._id &&
      item.size === variant.size &&
      item.color === variant.color
        ? {
            ...item,
            quantity: Math.min(item.quantity + quantity, variant.stock),
          }
        : item,
    );
  }
  return [
    ...cartItems,
    {
      productId: product._id,
      name: product.name,
      slug: product.slug,
      image: product.images?.[0] || "",
      price: product.discountPrice > 0 ? product.discountPrice : product.price,
      originalPrice: product.price,
      size: variant.size,
      color: variant.color || null,
      stock: variant.stock,
      sku: variant.sku,
      quantity,
    },
  ];
}
export function removeFromCart(cartItems, sku) {
  return cartItems.filter((item) => item.sku !== sku);
}

export function updateQuantity(cartItems, sku, quantity) {
  if (quantity < 1) return removeFromCart(cartItems, sku);

  return cartItems.map((item) =>
    item.sku === sku
      ? { ...item, quantity: Math.min(quantity, item.stock) }
      : item,
  );
}

export function getCartSubtotal(cartItems) {
  return cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
}

export function getCartItemCount(cartItems) {
  return cartItems.reduce((count, item) => count + item.quantity, 0);
}

// Check if a specific variant is already in cart
export function isInCart(cartItems, productId, size, color = null) {
  return cartItems.some(
    (item) =>
      item.productId === productId &&
      item.size === size &&
      item.color === color,
  );
}

export function clearCart() {
  return [];
}

export function getShipping(subtotal) {
  return subtotal >= 100 ? 0 : 10;
}

export function getCartTotal(subtotal) {
  return subtotal + getShipping(subtotal);
}
