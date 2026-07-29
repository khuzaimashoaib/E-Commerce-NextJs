import mongoose from "mongoose";

const variantSchema = new mongoose.Schema(
  {
    size: {
      type: String, // e.g. "S", "M", "L", "XL" or "7", "8", "9" for shoes
      required: true,
    },
    color: {
      type: String, // e.g. "Red", "Black" — optional for some products
      default: "",
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    sku: {
      type: String, // unique code per variant, e.g. "SHO-NIKE-9-BLK"
      required: true,
    },
  },
  { _id: false },
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      default: "",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      default: 0,
    },
    images: {
      type: [String], // array of image URLs/paths
      default: [],
    },
    variants: {
      type: [variantSchema],
      default: [],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
