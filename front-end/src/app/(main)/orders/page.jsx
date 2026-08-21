import Breadcrumb from "@/components/sections/Breadcrumb";
import OrdersClient from "@/components/sections/order/OrdersClient";

export default function OrdersPage() {
  return (
    <>
      <Breadcrumb
        title="My Orders"
        bgImage="/assets/front-end-images/breadcrumb-bg.jpg"
        items={[
          { label: "Home", href: "/", icon: "fa-solid fa-house" },
          { label: "My Orders" },
        ]}
      />
      <OrdersClient />
    </>
  );
}
