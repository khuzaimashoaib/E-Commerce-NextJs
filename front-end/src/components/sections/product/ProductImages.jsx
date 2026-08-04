import { getImageUrl } from "@/lib/utils/imageUtils";

export default function ProductImages({ images, name, discountPercent }) {
  return (
    <div className="gt-shop-details-image">
      <img
        src={
          getImageUrl(images[0]) || "/assets/front-end-images/placeholder.jpg"
        }
        alt={name}
      />
      {discountPercent > 0 && (
        <span className="gt-box-text">({discountPercent}% Off)</span>
      )}
    </div>
  );
}
