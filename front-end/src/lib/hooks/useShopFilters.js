"use client";

import { useState, useEffect } from "react";
import { getProducts, getCategories } from "@/lib/api";

const DEFAULT_FILTERS = {
  categories: [],
  sizes: [],
  rating: null,
  priceRange: { min: 0, max: 1000 },
  availability: { inStock: true, outOfStock: false },
};

import React from "react";

const useShopFilters = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pendingFilters, setPendingFilters] = useState(DEFAULT_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState(DEFAULT_FILTERS);

  useEffect(() => {
    if (appliedFilters === null) return;

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
