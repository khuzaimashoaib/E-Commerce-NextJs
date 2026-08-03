import mongoose from "mongoose";

const attributeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    values: {
      type: [String], // ["XS", "S", "M", "L", "XL"]
      default: [],
    },
  },
  { timestamps: true },
);

const Attribute = mongoose.model("Attribute", attributeSchema);
export default Attribute;
