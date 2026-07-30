import express from "express";
import { adminOnly, protect } from "../../middleware/authMiddleware.js";
import {
  deleteUser,
  getAdminUsers,
  updateUserRole,
} from "../../controllers/admin/adminUserController.js";

const router = express.Router();

router.use(protect, adminOnly);

router.get("/users", getAdminUsers);
router.delete("/users/:id", deleteUser);
router.put("/users/:id/role", updateUserRole);

export default router;
