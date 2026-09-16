"use client";

import { useCartContext } from "../context/CartContext";
import { useState } from "react";
import { getCartTotal, getShipping } from "../utils/cartUtils";
import { useRouter } from "next/navigation";
import { createOrder, createStripeSession, verifyStripeSession } from "../api";

const DEFAULT_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  country: "",
  city: "",
  street: "",
  state: "",
  postalCode: "",
  note: "",
  paymentMethod: "cod",
};
function generateOrderNumber() {
  return Math.floor(Math.random() * 90000 + 10000).toString();
}

export default function useCheckout() {
  const router = useRouter();
  const { cartItems, subtotal, clearCart } = useCartContext();
  const [form, setForm] = useState(DEFAULT_FORM);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [stripeClientSecret, setStripeClientSecret] = useState(null);

  const shipping = getShipping(subtotal);
  const total = getCartTotal(subtotal);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };
  const onPaymentMethodChange = (method) => {
    setForm((prev) => ({
      ...prev,
      paymentMethod: method,
    }));
  };
  const validate = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    if (!form.country.trim()) newErrors.country = "Country is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.street.trim()) newErrors.street = "Street is required";
    // if (!form.postalCode.trim())
    //   newErrors.postalCode = "Postal code is required";
    return newErrors;
  };

  const handlePlaceOrder = async () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      if (form.paymentMethod === "stripe") {
        const session = await createStripeSession({
          items: cartItems,
          customerInfo: form,
          shipping,
          orderNumber,
        });

        console.log("Stripe session response:", session);
        setStripeClientSecret(session.clientSecret);

        return;
      }
      const orderData = {
        orderNumber: generateOrderNumber(),
        customerInfo: form,
        items: cartItems,
        subtotal,
        shipping,
        total,
        paymentMethod: "Cash on Delivery",
        status: "pending",
      };

      // ← Save to backend instead of sessionStorage
      const savedOrder = await createOrder(orderData);

      // Store order ID for confirmation page
      sessionStorage.setItem(
        "last_order",
        JSON.stringify({
          orderNumber: savedOrder.orderNumber,
          date: new Date(savedOrder.createdAt).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }),
          items: savedOrder.items,
          subtotal: savedOrder.subtotal,
          shipping: savedOrder.shipping,
          total: savedOrder.total,
          paymentMethod: savedOrder.paymentMethod,
          _id: savedOrder._id,
        }),
      );

      clearCart();
      router.push("/order-confirmation");
    } catch (error) {
      console.error("Order failed:", error.message);
      setErrors({ submit: "Failed to place order. Please try again." });
    } finally {
      setLoading(false);
    }
  };
  return {
    form,
    errors,
    loading,
    shipping,
    total,
    stripeClientSecret,
    handleChange,
    handlePlaceOrder,
    onPaymentMethodChange,
  };
}
