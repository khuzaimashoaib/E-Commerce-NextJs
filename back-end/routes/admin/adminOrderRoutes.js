import express from "express";
import { adminOnly, protect } from "../../middleware/authMiddleware.js";
import {
  getAdminOrders,
  updateOrderStatus,
  updatePaymentStatus,
} from "../../controllers/admin/adminOrderController.js";

const router = express.Router();
router.use(protect, adminOnly);

router.get("/", getAdminOrders);
router.put("/:id", updateOrderStatus);
router.put("/:id/payment-status", updatePaymentStatus);

export default router;
