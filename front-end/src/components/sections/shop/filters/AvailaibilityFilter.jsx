export default function AvailabilityFilter({ availability, onChange }) {
  return (
    <div className="shop-sidebar-widget">
      <div className="widget-title">
        <h2>Availability</h2>
      </div>
      <div className="product-type-box">
        <ul>
          <li>
            <label>
              <input
                type="checkbox"
                checked={availability.inStock}
                onChange={() => onChange("inStock")}
              />
              <span className="checkmark"></span>
              <span className="text">In Stock</span>
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                checked={availability.outOfStock}
                onChange={() => onChange("outOfStock")}
              />
              <span className="checkmark"></span>
              <span className="text">Out of Stock</span>
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
}