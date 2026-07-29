const RATINGS = [5, 4, 3, 2, 1];

export default function RatingFilter({ selectedRating, onChange }) {
  return (
    <div className="shop-sidebar-widget">
      <div className="widget-title">
        <h2>Rating</h2>
      </div>
      <div className="product-type-box">
        <ul className="mb-4">
          {RATINGS.map((rating) => (
            <li key={rating}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedRating === rating}
                  onChange={() => onChange(selectedRating === rating ? null : rating)}
                />
                <span className="checkmark"></span>
                <span className="text">
                  <span className="star">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={
                          i < rating ? "fa-solid fa-star" : "fa-regular fa-star"
                        }
                      ></i>
                    ))}
                  </span>
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}