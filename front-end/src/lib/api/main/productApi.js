const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function getProducts(filters = {}) {
  const params = new URLSearchParams();

  if (filters.categories?.length)
    params.append("category", filters.categories.join(","));
  // if (filters.rating) params.append("rating", filters.rating);
  if (filters.priceRange?.min !== undefined)
    params.append("minPrice", filters.priceRange.min);
  if (filters.priceRange?.max !== undefined)
    params.append("maxPrice", filters.priceRange.max);
  if (filters.availability?.inStock && !filters.availability?.outOfStock)
    params.append("inStock", "true");
  if (filters.availability?.outOfStock && !filters.availability?.inStock)
    params.append("inStock", "false");
  if (filters.attributes && Object.keys(filters.attributes).length > 0) {
    const attrString = Object.entries(filters.attributes)
      .filter(([_, values]) => values.length > 0) // skip empty
      .map(([name, values]) => `${name}:${values.join(",")}`)
      .join("|");
    if (attrString) params.append("attributes", attrString);
  }

  const queryString = params.toString();
  const url = `${API_URL}/products${queryString ? `?${queryString}` : ""}`;
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export async function getProductBySlug(slug) {
  const url = `${API_URL}/products/${slug}`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null; // return null instead of throwing — page handles notFound()
    return res.json();
  } catch (error) {
    console.error("Network error fetching product:", error.message);
    return null;
  }
}
