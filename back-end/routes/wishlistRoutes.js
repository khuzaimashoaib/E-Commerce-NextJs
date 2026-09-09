import express from "express";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  toggleWishlist,
} from "../controllers/main/wishlistController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All wishlist routes require login
router.use(protect);

router.get("/", getWishlist);
router.post("/:productId", addToWishlist);
router.delete("/:productId", removeFromWishlist);
router.put("/:productId", toggleWishlist);

export default router;
