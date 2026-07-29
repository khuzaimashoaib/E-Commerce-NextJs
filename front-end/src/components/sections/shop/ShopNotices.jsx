export default function ShopNotices({ total = 0 }) {
  return (
    <div className="gt-shop-notices-wrapper">
      <div className="gt-shop-showing">
        <p>Showing 1–{total} of {total} results</p>
      </div>
      <div className="form-clt">
        <div className="form">
          <select className="single-select w-100">
            <option>Sort by : Default</option>
            <option>Sort by popularity</option>
            <option>Sort by latest</option>
          </select>
        </div>
      </div>
    </div>
  );
}