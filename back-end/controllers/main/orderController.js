// @desc   Create order (guest + logged in)

import Order from "../../models/Order.js";
import Product from "../../models/Product.js";

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
    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          message: `Product not found: ${item.name}`,
        });
      }

      // Find matching variant by SKU
      const variant = product.variants.find((v) => v.sku === item.sku);

      if (!variant) {
        return res.status(404).json({
          message: `Variant not found for: ${item.name}`,
        });
      }

      if (variant.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${item.name}. 
            Available: ${variant.stock}, Requested: ${item.quantity}`,
        });
      }
    }
    for (const item of items) {
      const product = await Product.findById(item.productId);

      // Find variant index by SKU
      const variantIndex = product.variants.findIndex(
        (v) => v.sku === item.sku,
      );

      if (variantIndex !== -1) {
        // Decrement stock
        product.variants[variantIndex].stock -= item.quantity;
        product.markModified("variants"); // ← tell mongoose variants changed
        await product.save();
      }
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
