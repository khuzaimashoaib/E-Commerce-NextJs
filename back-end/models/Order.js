import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, default: "" },
  price: { type: Number, required: true },
  attributes: { type: Object, default: {} }, // ← { Size: "M", Color: "Red" }
  attributeLabel: { type: String, default: "" }, // ← "Size: M, Color: Red"
  stock: { type: Number, default: 0 },
  sku: { type: String, required: true },
  quantity: { type: Number, required: true },
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
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    stripeSessionId: {
      type: String,
      default: null,
    },
  },

  { timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
