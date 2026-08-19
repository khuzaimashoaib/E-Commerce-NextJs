import express from "express";
import {
  createAttribute,
  deleteAttribute,
  getAttributeById,
  getAttributes,
  updateAttribute,
} from "../../controllers/admin/adminAttributeController.js";
import { adminOnly, protect } from "../../middleware/authMiddleware.js";

const router = express.Router();
router.use(protect, adminOnly);

router.get("/", getAttributes);
router.get("/:id", getAttributeById);
router.post("/", createAttribute);
router.put("/:id", updateAttribute);
router.delete("/:id", deleteAttribute);

export default router;
