import ShopCard from "./ShopCard";

export default function ShopGrid({ products }) {
  return (
    <div className="row g-4">
      {products.map((product, index) => (
        <div
          key={product._id}
          className="col-xl-4 col-lg-4 col-md-6 wow fadeInUp"
          data-wow-delay={`${0.2 + (index % 3) * 0.2}s`}
        >
          <ShopCard product={product} />
        </div>
      ))}
    </div>
  );
}