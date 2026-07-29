import Product from "../models/Product.js";
import Category from "../models/Category.js";

// @desc    Get all products
// @route   GET /api/products
export const getProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, size, rating, inStock } = req.query;
    const filter = {};
    // Category filter — find category by slug first, then use its _id

    if (category) {
      const slugs = category.split(","); // support multiple: ?category=shoes,gloves
      const categories = await Category.find({ slug: { $in: slugs } });
      const categoryIds = categories.map((c) => c._id);
      filter.category = { $in: categoryIds };
    }

    // Price filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    // Size filter — check inside variants array
    if (size) {
      const sizes = size.split(","); // support multiple: ?size=M,L
      filter["variants.size"] = { $in: sizes };
    }

    // Rating filter
    if (rating) {
      filter.rating = { $gte: Number(rating) };
    }

    // Availability filter
    if (inStock === "true") {
      filter["variants.stock"] = { $gt: 0 };
    } else if (inStock === "false") {
      filter["variants.stock"] = { $lte: 0 };
    }

    const products = await Product.find(filter).populate(
      "category",
      "name slug",
    );
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single product by slug
// @route   GET /api/products/:slug
export const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).populate(
      "category",
      "name slug",
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
