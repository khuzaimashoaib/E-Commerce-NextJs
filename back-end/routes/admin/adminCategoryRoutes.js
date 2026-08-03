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

router.get("/", getAdminCategories);
router.post("/", upload.single("image"), createCategory);
router.put("/:id", upload.single("image"), updateCategory);
router.delete("/:id", deleteCategory);

export default router;
