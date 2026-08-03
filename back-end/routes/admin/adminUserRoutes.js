import express from "express";
import { adminOnly, protect } from "../../middleware/authMiddleware.js";
import {
  deleteUser,
  getAdminUsers,
  updateUserRole,
} from "../../controllers/admin/adminUserController.js";

const router = express.Router();

router.use(protect, adminOnly);

router.get("/", getAdminUsers);
router.delete("/:id", deleteUser);
router.put("/:id/role", updateUserRole);

export default router;
