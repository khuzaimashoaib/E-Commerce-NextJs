import express from "express";
import { adminOnly, protect } from "../../middleware/authMiddleware.js";
import { getDashboardStats } from "../../controllers/admin/adminStatsController.js";

const router = express.Router();
router.use(protect, adminOnly);

router.get("/", getDashboardStats);

export default router;
