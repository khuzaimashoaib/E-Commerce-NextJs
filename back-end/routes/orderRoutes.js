import express from "express";
import { createOrder, getMyOrders } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public — guest can place order
router.post("/", createOrder);

// Protected — logged in users only
router.get("/my", protect, getMyOrders);

export default router;
