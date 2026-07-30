import Order from "../../models/Order.js";

// @desc   Get all orders
// @route  GET /api/admin/orders
export const getAdminOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Update order status
// @route  PUT /api/admin/orders/:id
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const { status } = req.body;
    const validStatuses = [
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    order.status = status;
    const updated = await order.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
