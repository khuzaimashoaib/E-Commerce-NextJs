import Product from "../../models/Product.js";

function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// @desc   Get all products
// @route  GET /api/admin/products
export const getAdminProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category", "name slug")
      .sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Create product
// @route  POST /api/admin/products
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      brand,
      price,
      discountPrice,
      description,
      isFeatured,
      variants,
    } = req.body;

    const image = req.file ? `/uploads/products/${req.file.filename}` : "";

    const slug = generateSlug(name);

    const parsedVariants =
      typeof variants === "string" ? JSON.parse(variants) : variants;

    const product = await Product.create({
      name,
      slug,
      category,
      brand,
      price: Number(price),
      discountPrice: Number(discountPrice) || 0,
      description,
      isFeatured: isFeatured === "true" || isFeatured === true,
      images: image ? [image] : [],
      variants: parsedVariants || [],
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const {
      name,
      category,
      brand,
      price,
      discountPrice,
      description,
      isFeatured,
      variants,
    } = req.body;

    const image = req.file ? `/uploads/products/${req.file.filename}` : null;

    const parsedVariants =
      typeof variants === "string" ? JSON.parse(variants) : variants;

    product.name = name;
    product.slug = generateSlug(name);
    product.category = category;
    product.brand = brand;
    product.price = Number(price);
    product.discountPrice = Number(discountPrice) || 0;
    product.description = description;
    product.isFeatured = isFeatured === "true" || isFeatured === true;
    product.variants = parsedVariants || product.variants;
    if (image) product.images = [image];

    const updated = await product.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Delete product
// @route  DELETE /api/admin/products/:id
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
