"use client";

import AttributeFilter from "./filters/AttributeFilter";
import AvailabilityFilter from "./filters/AvailaibilityFilter";
import CategoryFilter from "./filters/CategoryFilter";
import PriceFilter from "./filters/PrizeFilter";

export default function ShopSidebarClient({
  categories,
  attributes,
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

  const toggleAttribute = (attrName, value) => {
    setFilters((prev) => {
      const current = prev.attributes?.[attrName] || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return {
        ...prev,
        attributes: {
          ...prev.attributes,
          [attrName]: updated,
        },
      };
    });
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

  return (
    <div className="shop-sidebar-area">
      {/* Category Filter */}
      <CategoryFilter
        categories={categories}
        selectedCategories={filters.categories}
        onChange={toggleCategory}
      />
      {attributes.map((attribute) => (
        <AttributeFilter
          key={attribute._id}
          attribute={attribute}
          selectedValues={filters.attributes?.[attribute.name] || []}
          onChange={toggleAttribute}
        />
      ))}

      <PriceFilter
        priceRange={filters.priceRange}
        onChange={handlePriceChange}
      />
      {/* Availability Filter */}
      <AvailabilityFilter
        availability={filters.availability}
        onChange={toggleAvailability}
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
