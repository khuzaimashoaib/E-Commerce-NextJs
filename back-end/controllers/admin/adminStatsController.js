import Category from "../../models/Category.js";
import Order from "../../models/Order.js";
import Product from "../../models/Product.js";
import User from "../../models/User.js";

// @desc   Get dashboard stats
// @route  GET /api/admin/stats
export const getDashboardStats = async (req, res) => {
  try {
    const [totalProducts, totalCategories, totalUsers, totalOrders, orders] =
      await Promise.all([
        Product.countDocuments(),
        Category.countDocuments(),
        User.countDocuments(),
        Order.countDocuments(),
        Order.find().select("total status"),
      ]);

    // Calculate total revenue from delivered orders only
    const totalRevenue = orders
      .filter((o) => o.status === "delivered")
      .reduce((sum, o) => sum + o.total, 0);

    res.json({
      totalProducts,
      totalCategories,
      totalUsers,
      totalOrders,
      totalRevenue,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
