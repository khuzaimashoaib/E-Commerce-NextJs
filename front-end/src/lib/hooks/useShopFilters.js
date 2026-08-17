"use client";

import { useState, useEffect } from "react";
import { getProducts, getCategories } from "@/lib/api";
import { useSearchParams } from "next/navigation";

const DEFAULT_FILTERS = {
  categories: [],
  sizes: [],
  rating: null,
  priceRange: { min: 0, max: 1000 },
  availability: { inStock: true, outOfStock: false },
};

const useShopFilters = (initialProducts = []) => {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [pendingFilters, setPendingFilters] = useState({
    ...DEFAULT_FILTERS,
    categories: categoryParam ? [categoryParam] : [],
  });

  const [appliedFilters, setAppliedFilters] = useState({
    ...DEFAULT_FILTERS,
    categories: categoryParam ? [categoryParam] : [], // ← apply immediately
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProducts(appliedFilters);
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [appliedFilters]);

  useEffect(() => {
    if (categoryParam) {
      const newFilters = {
        ...DEFAULT_FILTERS,
        categories: [categoryParam],
      };
      setPendingFilters(newFilters);
      setAppliedFilters(newFilters);
    } else {
      // No category param — reset to default
      setPendingFilters(DEFAULT_FILTERS);
      setAppliedFilters(DEFAULT_FILTERS);
    }
  }, [categoryParam]);

  const applyFilters = () => setAppliedFilters({ ...pendingFilters });

  const resetFilters = () => {
    setPendingFilters(DEFAULT_FILTERS);
    setAppliedFilters(DEFAULT_FILTERS);
  };
  return {
    products,
    loading,
    pendingFilters,
    setPendingFilters,
    applyFilters,
    resetFilters,
  };
};

export default useShopFilters;
