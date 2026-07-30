import express from "express";
import { adminOnly, protect } from "../../middleware/authMiddleware.js";
import {
  getAdminOrders,
  updateOrderStatus,
} from "../../controllers/admin/adminOrderController.js";

const router = express.Router();
router.use(protect, adminOnly);

router.get("/orders", getAdminOrders);
router.put("/orders/:id", updateOrderStatus);

export default router;
