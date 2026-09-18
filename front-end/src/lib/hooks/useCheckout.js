"use client";

import { useState } from "react";
import { useCartContext } from "@/lib/context/CartContext";
import { useRouter } from "next/navigation";
import { getShipping, getCartTotal } from "@/lib/utils/cartUtils";
import { createOrder, createStripeSession } from "../api";
import toast from "react-hot-toast";
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
  const { cartItems, subtotal, clearCart } = useCartContext();
  const router = useRouter();

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

    if (method === "cod") {
      setStripeClientSecret(null);
      sessionStorage.removeItem("pending_stripe_order");
    }
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
        const orderNumber = generateOrderNumber();

        const orderData = {
          orderNumber,
          customerInfo: form,
          items: cartItems,
          subtotal,
          shipping,
          total,
          paymentMethod: "Card (Stripe)",
          status: "processing",
        };

        sessionStorage.setItem(
          "pending_stripe_order",
          JSON.stringify(orderData),
        );

        const { clientSecret } = await createStripeSession({
          items: cartItems,
          customerInfo: form,
          shipping,
          orderNumber,
        });

        setStripeClientSecret(clientSecret);

        toast.success("Payment form ready!");
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

      const savedOrder = await createOrder(orderData);

      // Store for confirmation page
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
      toast.success("Order placed successfully!");
      router.push("/order-confirmation");
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
      setErrors({ submit: error.message });
    } finally {
      setLoading(false);
    }
  };

  // Called if Stripe payment fails
  const handleStripeError = (message) => {
    toast.error(message || "Payment failed. Please try again.");
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
    handleStripeError,
  };
}
