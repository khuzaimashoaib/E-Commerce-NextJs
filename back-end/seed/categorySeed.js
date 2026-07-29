import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "../models/Category.js";

dotenv.config();

const categories = [
  { name: "Football T-Shirts", slug: "football-tshirts" },
  { name: "Shorts", slug: "shorts" },
  { name: "Gloves", slug: "gloves" },
  { name: "Shin Guards", slug: "shin-guards" },
  { name: "Socks", slug: "socks" },
  { name: "Shoes", slug: "shoes" },
  { name: "Footballs", slug: "footballs" },
];

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Category.deleteMany(); // clear existing categories first
    await Category.insertMany(categories);

    console.log("Categories imported successfully!");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
