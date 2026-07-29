import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";
import Category from "../models/Category.js";

dotenv.config();

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Find category IDs we need (categories must already be seeded)
    const tshirtCategory = await Category.findOne({ slug: "football-tshirts" });
    const shoesCategory = await Category.findOne({ slug: "shoes" });

    if (!tshirtCategory || !shoesCategory) {
      console.log(
        "Categories not found. Run 'npm run seed' for categories first.",
      );
      process.exit(1);
    }

    const products = [
      {
        name: "Nike Dri-FIT Football Jersey",
        slug: "nike-dri-fit-football-jersey",
        description:
          "Lightweight, breathable football jersey designed for performance on the pitch.",
        brand: "Nike",
        category: tshirtCategory._id,
        price: 45,
        discountPrice: 35,
        images: ["/assets/back-end-images/products/t-shirt.jpg"],
        variants: [
          { size: "S", color: "Red", stock: 10, sku: "TSH-NIKE-S-RED" },
          { size: "M", color: "Red", stock: 15, sku: "TSH-NIKE-M-RED" },
          { size: "L", color: "Red", stock: 8, sku: "TSH-NIKE-L-RED" },
          { size: "L", color: "Blue", stock: 8, sku: "TSH-NIKE-L-BLU" },
        ],
        isFeatured: true,
      },
      {
        name: "Nike Mercurial Vapor 15",
        slug: "nike-mercurial-vapor-15",
        description:
          "Engineered for speed, these football boots give explosive acceleration.",
        brand: "Nike",
        category: shoesCategory._id,
        price: 180,
        discountPrice: 0,
        images: ["/assets/back-end-images/products/shoes-1.jpg"],
        variants: [
          { size: "8", color: "Black", stock: 5, sku: "SHO-NIKE-8-BLK" },
          { size: "9", color: "Black", stock: 7, sku: "SHO-NIKE-9-BLK" },
          { size: "10", color: "Black", stock: 4, sku: "SHO-NIKE-10-BLK" },
        ],
        isFeatured: true,
      },
    ];

    await Product.deleteMany();
    await Product.insertMany(products);

    console.log("Products imported successfully!");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
