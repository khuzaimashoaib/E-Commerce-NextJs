import Breadcrumb from "@/components/sections/Breadcrumb";
import CheckoutClient from "@/components/sections/checkout/CheckoutClient";

export default function CheckoutPage() {
  return (
    <>
      <Breadcrumb
        title="Checkout"
        bgImage="/assets/front-end-images/breadcrumb-bg.jpg"
        items={[
          { label: "Home", href: "/", icon: "fa-solid fa-house" },
          { label: "Cart", href: "/cart" },
          { label: "Checkout" },
        ]}
      />
      <CheckoutClient />
    </>
  );
}
