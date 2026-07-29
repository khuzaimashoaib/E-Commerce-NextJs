import Breadcrumb from "@/components/sections/Breadcrumb";
import OrderConfirmation from "@/components/sections/order/OrderConfirmation";

export default function OrderConfirmationPage() {
  return (
    <>
      <Breadcrumb
        title="Order Confirmed"
        bgImage="/assets/front-end-images/breadcrumb-bg.jpg"
        items={[
          { label: "Home", href: "/", icon: "fa-solid fa-house" },
          { label: "Order Confirmed" },
        ]}
      />
      <OrderConfirmation />
    </>
  );
}
