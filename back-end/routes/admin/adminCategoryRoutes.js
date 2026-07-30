import express from "express";
import { protect, adminOnly } from "../../middleware/authMiddleware.js";
import upload from "../../middleware/uploadMiddleware.js";
import {
  createCategory,
  deleteCategory,
  getAdminCategories,
  updateCategory,
} from "../../controllers/admin/adminCategoryController.js";

const router = express.Router();
router.use(protect, adminOnly);

router.get("/categories", getAdminCategories);
router.post("/categories", upload.single("image"), createCategory);
router.put("/categories/:id", upload.single("image"), updateCategory);
router.delete("/categories/:id", deleteCategory);

export default router;
