import Category from "../../models/Category.js";
import Product from "../../models/Product.js";

// @desc    Get all products
// @route   GET /api/products
export const getProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, rating, inStock, attributes } =
      req.query;
    const filter = {};
    // Category filter — find category by slug first, then use its _id

    if (category) {
      const slugs = category.split(",");
      const cats = await Category.find({ slug: { $in: slugs } });
      const categoryIds = cats.map((c) => c._id);
      filter.categories = { $in: categoryIds }; // ← categories not category
    }

    // Price filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (attributes) {
      const attrFilters = attributes.split("|"); // ["Size:M,L", "Color:Red"]
      attrFilters.forEach((attrFilter) => {
        const [attrName, valuesStr] = attrFilter.split(":");
        const values = valuesStr.split(",");
        // Filter variants where attribute matches
        filter[`variants.attributes.${attrName}`] = { $in: values };
      });
    }

    // Rating filter
    // if (rating) {
    //   filter.rating = { $gte: Number(rating) };
    // }

    // Availability filter
    if (inStock === "true") {
      filter["variants.stock"] = { $gt: 0 };
    } else if (inStock === "false") {
      filter["variants.stock"] = { $lte: 0 };
    }

    const products = await Product.find(filter).populate(
      "categories",
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
      "categories",
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
