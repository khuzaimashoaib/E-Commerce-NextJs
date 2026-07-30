import Category from "../../models/Category.js";
import Product from "../../models/Product.js";

// @desc   Get all categories with product count
// @route  GET /api/admin/categories
export const getAdminCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    const categoriesWithCount = await Promise.all(
      categories.map(async (cat) => {
        const count = await Product.countDocuments({ category: cat._id });
        return { ...cat.toObject(), productCount: count };
      }),
    );

    res.json(categoriesWithCount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name, slug } = req.body;

    const image = req.file ? `/uploads/products/${req.file.filename}` : "";

    const existing = await Category.findOne({ slug });
    if (existing) {
      return res.status(400).json({ message: "Category slug already exists" });
    }

    const category = await Category.create({ name, slug, image });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Update category
// @route  PUT /api/admin/categories/:id
export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const { name, slug } = req.body;
    const image = req.file ? `/uploads/products/${req.file.filename}` : null;

    category.name = name;
    category.slug = slug;
    if (image) category.image = image;

    const updated = await category.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Delete category
// @route  DELETE /api/admin/categories/:id
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    await category.deleteOne();
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
