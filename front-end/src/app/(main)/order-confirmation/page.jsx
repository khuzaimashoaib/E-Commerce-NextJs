import Breadcrumb from "@/components/sections/Breadcrumb";
import OrderConfirmation from "@/components/sections/order/OrderConfirmation";
import { Suspense } from "react";

export default function OrderConfirmationPage() {
  return (
    <>
      <Suspense>
        <Breadcrumb
          title="Order Confirmed"
          bgImage="/assets/front-end-images/breadcrumb-bg.jpg"
          items={[
            { label: "Home", href: "/", icon: "fa-solid fa-house" },
            { label: "Order Confirmed" },
          ]}
        />
        <OrderConfirmation />
      </Suspense>
    </>
  );
}
