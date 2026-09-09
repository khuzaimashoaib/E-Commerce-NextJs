import express from "express";
import { getCategories } from "../controllers/main/categoryControllers.js";

const router = express.Router();

router.get("/", getCategories);

export default router;
