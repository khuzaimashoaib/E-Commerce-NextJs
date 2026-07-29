"use client";

import AvailabilityFilter from "./filters/AvailaibilityFilter";
import CategoryFilter from "./filters/CategoryFilter";
import PriceFilter from "./filters/PrizeFilter";
import RatingFilter from "./filters/RatingFilter";
import SizeFilter from "./filters/SizeFilter";

export default function ShopSidebarClient({
  categories,
  filters,
  setFilters,
  onApply,
  onReset,
}) {
  const toggleCategory = (slug) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(slug)
        ? prev.categories.filter((c) => c !== slug)
        : [...prev.categories, slug],
    }));
  };

  const toggleSize = (size) => {
    setFilters((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };
  const toggleAvailability = (key) => {
    setFilters((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        [key]: !prev.availability[key],
      },
    }));
  };

  const handlePriceChange = (newRange) => {
    setFilters((prev) => ({ ...prev, priceRange: newRange }));
  };

  const handleRatingChange = (rating) => {
    setFilters((prev) => ({ ...prev, rating }));
  };

  return (
    <div className="shop-sidebar-area">
      {/* Category Filter */}
      <CategoryFilter
        categories={categories}
        selectedCategories={filters.categories}
        onChange={toggleCategory}
      />

      {/* Availability Filter */}
      <AvailabilityFilter
        availability={filters.availability}
        onChange={toggleAvailability}
      />

      {/* Size Filter */}
      <SizeFilter selectedSizes={filters.sizes} onChange={toggleSize} />

      {/* Price Filter */}
      <PriceFilter
        priceRange={filters.priceRange}
        onChange={handlePriceChange}
      />

      <RatingFilter
        selectedRating={filters.rating}
        onChange={handleRatingChange}
      />
      <div className="shop-sidebar-widget">
        <button
          className="theme-btn w-100 mb-2"
          type="button"
          onClick={onApply}
        >
          Apply Now
        </button>
        <button
          className="theme-btn style-2 w-100"
          type="button"
          onClick={onReset}
        >
          Reset Now
        </button>
      </div>
    </div>
  );
}
