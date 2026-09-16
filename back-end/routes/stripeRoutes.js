import express from "express";
import {
  createStripeSession,
  verifyStripeSession,
} from "../controllers/main/stripeController.js";

const router = express.Router();

router.post("/create-session", createStripeSession);
router.post("/verify-session", verifyStripeSession);

export default router;
