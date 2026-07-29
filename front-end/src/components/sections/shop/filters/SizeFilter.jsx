const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export default function SizeFilter({ selectedSizes, onChange }) {
  return (
    <div className="shop-sidebar-widget">
      <div className="widget-title">
        <h2>Size</h2>
      </div>
      <div className="product-type-box">
        <ul>
          {SIZES.map((size) => (
            <li key={size}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedSizes.includes(size)}
                  onChange={() => onChange(size)}
                />
                <span className="checkmark"></span>
                <span className="text">{size}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}