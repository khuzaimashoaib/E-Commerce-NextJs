import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, default: "" },
  price: { type: Number, required: true },
  size: { type: String, required: true },
  color: { type: String, default: "" },
  quantity: { type: Number, required: true },
  sku: { type: String, required: true },
});

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, // null = guest order
    },
    customerInfo: {
      firstName: String,
      lastName: String,
      email: String,
      phone: String,
      country: String,
      city: String,
      street: String,
      state: String,
      postalCode: String,
      note: String,
    },
    items: [orderItemSchema],
    subtotal: { type: Number, required: true },
    shipping: { type: Number, default: 0 },
    total: { type: Number, required: true },
    paymentMethod: {
      type: String,
      default: "Cash on Delivery",
    },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
