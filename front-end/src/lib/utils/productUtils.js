/**
 * Extract unique sizes from variants array
 */
export function getSizes(variants = []) {
  return [...new Set(variants.map((v) => v.size).filter(Boolean))];
}

/**
 * Extract unique colors from variants array
 */
export function getColors(variants = []) {
  return [
    ...new Set(
      variants
        .map((v) => v.color)
        .filter((c) => c !== null && c !== undefined && c.trim() !== ""),
    ),
  ];
}

/**
 * Check if a size is completely out of stock
 */
export function isSizeOutOfStock(variants = [], size) {
  return variants.filter((v) => v.size === size).every((v) => v.stock === 0);
}

/**
 * Check if a color is out of stock for selected size
 */
export function isColorOutOfStock(variants = [], selectedSize, color) {
  if (!selectedSize) return false;
  const variant = variants.find(
    (v) => v.size === selectedSize && v.color === color,
  );
  return variant ? variant.stock === 0 : true;
}

/**
 * Find a specific variant by size and color
 */
export function findVariant(variants = [], size, color = null) {
  return variants.find((v) => {
    const sizeMatch = v.size === size;
    const colorMatch = color ? v.color === color : true;
    return sizeMatch && colorMatch;
  });
}

/**
 * Calculate discount percentage
 * returns 0 if no discount
 */
export function getDiscountPercent(price, discountPrice) {
  if (!discountPrice || discountPrice <= 0) return 0;
  return Math.round(((price - discountPrice) / price) * 100);
}
