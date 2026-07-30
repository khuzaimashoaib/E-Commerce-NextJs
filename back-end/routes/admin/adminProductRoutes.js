import express from "express";
import { protect, adminOnly } from "../../middleware/authMiddleware.js";
import upload from "../../middleware/uploadMiddleware.js";
import {
  createProduct,
  deleteProduct,
  getAdminProducts,
  updateProduct,
} from "../../controllers/admin/adminProductController.js";

const router = express.Router();
router.use(protect, adminOnly);

router.get("/products", getAdminProducts);
router.post("/products", upload.single("image"), createProduct);
router.put("/products/:id", upload.single("image"), updateProduct);
router.delete("/products/:id", deleteProduct);

export default router;
