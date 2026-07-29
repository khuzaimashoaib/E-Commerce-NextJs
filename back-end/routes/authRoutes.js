import express from "express";
import {
  getProfile,
  login,
  logout,
  register,
} from "../controllers/authControllers.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", protect, getProfile);
//Temp Route
router.get("/admin-test", protect, adminOnly, (req, res) => {
  res.json({ message: `Welcome Admin ${req.user.name}!` });
});

export default router;
