export default function AttributeFilter({
  attribute,
  selectedValues,
  onChange,
}) {
  return (
    <div className="shop-sidebar-widget">
      <div className="widget-title">
        <h2>{attribute.name}</h2>
      </div>
      <div className="product-type-box">
        <ul>
          {attribute.values.map((value) => (
            <li key={value}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedValues.includes(value)}
                  onChange={() => onChange(attribute.name, value)}
                />
                <span className="checkmark"></span>
                <span className="text">{value}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
