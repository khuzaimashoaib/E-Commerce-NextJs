"use client";

import { useCartContext } from "../context/CartContext";
import { useState } from "react";
import { getCartTotal, getShipping } from "../utils/cartUtils";
import { useRouter } from "next/navigation";

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
  return Math.floor(Math.random() * 900000000 + 100000000).toString();
}

export default function useCheckout() {
  const router = useRouter();
  const { cartItems, subtotal, clearCart } = useCartContext();
  const [form, setForm] = useState(DEFAULT_FORM);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const shipping = getShipping(subtotal);
  const total = getCartTotal(subtotal);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
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
    if (!form.postalCode.trim())
      newErrors.postalCode = "Postal code is required";
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
      // Order object — ready for backend later
      const order = {
        orderNumber: generateOrderNumber(),
        date: new Date().toLocaleDateString("en-US", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
        customerInfo: form,
        items: cartItems,
        subtotal,
        shipping,
        total,
        paymentMethod: "Cash on Delivery",
        status: "pending",
      };

      sessionStorage.setItem("last_order", JSON.stringify(order));

      console.log("Order placed:", order);

      // Clear cart after order
      clearCart();

      // Redirect to confirmation page
      router.push("/order-confirmation");
    } catch (error) {
      console.error("Order failed:", error);
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
    handleChange,
    handlePlaceOrder,
  };
}
