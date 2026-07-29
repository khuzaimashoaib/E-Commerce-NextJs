export default function PriceFilter({ priceRange, onChange }) {
  const handleChange = (key, value) => {
    onChange({ ...priceRange, [key]: Number(value) });
  };

  return (
    <div className="shop-sidebar-widget">
      <div className="widget-title">
        <h2>Price</h2>
      </div>
      <div className="price-filter-box">
        <div className="input-wrapper">
          <div className="input-field">
            <span>$</span>
            <input
              type="number"
              value={priceRange.min}
              onChange={(e) => handleChange("min", e.target.value)}
            />
          </div>
          <div className="input-field">
            <span>$</span>
            <input
              type="number"
              value={priceRange.max}
              onChange={(e) => handleChange("max", e.target.value)}
            />
          </div>
        </div>
        <div className="range-slider">
          <div className="slider-track"></div>
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange.min}
            onChange={(e) => handleChange("min", e.target.value)}
          />
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange.max}
            onChange={(e) => handleChange("max", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}