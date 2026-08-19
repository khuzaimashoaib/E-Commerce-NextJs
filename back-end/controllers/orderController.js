// @desc   Create order (guest + logged in)

import Order from "../models/Order.js";

// @route  POST /api/orders
export const createOrder = async (req, res) => {
  try {
    const {
      orderNumber,
      customerInfo,
      items,
      subtotal,
      shipping,
      total,
      paymentMethod,
      note,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in order" });
    }

    // req.user is set if logged in (via cookie)
    // null if guest
    const userId = req.cookies?.token
      ? (await import("jsonwebtoken")).default.verify(
          req.cookies.token,
          process.env.JWT_SECRET,
        )?.id
      : null;

    const order = await Order.create({
      orderNumber,
      user: userId || null,
      customerInfo,
      items,
      subtotal,
      shipping,
      total,
      paymentMethod,
      status: "pending",
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get logged in user's orders
// @route  GET /api/orders/my
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
