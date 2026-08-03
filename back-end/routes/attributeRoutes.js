import express from "express";
import Attribute from "../models/Attributes";

const router = express.Router();

// Public — frontend product form needs this to show attribute options
router.get("/", async (req, res) => {
  try {
    const attributes = await Attribute.find().sort({ name: 1 });
    res.json(attributes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
