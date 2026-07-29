import Breadcrumb from "@/components/sections/Breadcrumb";
import CartClient from "@/components/sections/cart/CartClient";
import React from "react";

const CartPage = () => {
  return (
    <>
      <Breadcrumb
        title="Shopping Cart"
        bgImage="/assets/front-end-images/breadcrumb-bg.jpg"
        items={[
          { label: "Home", href: "/", icon: "fa-solid fa-house" },
          { label: "Cart" },
        ]}
      />
      <CartClient />
    </>
  );
};

export default CartPage;
