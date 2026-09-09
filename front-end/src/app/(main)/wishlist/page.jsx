import Breadcrumb from "@/components/sections/Breadcrumb";
import WishlistClient from "@/components/sections/wishlist/wishlistClient";

export default function WishlistPage() {
  return (
    <>
      <Breadcrumb
        title="Wishlist"
        bgImage="/assets/front-end-images/breadcrumb-bg.jpg"
        items={[
          { label: "Home", href: "/", icon: "fa-solid fa-house" },
          { label: "Wishlist" },
        ]}
      />
      <WishlistClient />
    </>
  );
}
