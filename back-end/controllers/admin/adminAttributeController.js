// @desc   Get all attributes

import Attribute from "../../models/Attribute.js";

// @route  GET /api/admin/attributes
export const getAttributes = async (req, res) => {
  try {
    const attributes = await Attribute.find().sort({ createdAt: -1 });
    res.json(attributes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Create attribute
// @route  POST /api/admin/attributes
export const createAttribute = async (req, res) => {
  try {
    const { name, values } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Attribute name is required" });
    }

    const existing = await Attribute.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") },
    });
    if (existing) {
      return res.status(400).json({ message: "Attribute already exists" });
    }

    // Clean values — trim whitespace, remove empty strings
    const cleanValues = values.map((v) => v.trim()).filter((v) => v !== "");

    const attribute = await Attribute.create({ name, values: cleanValues });
    res.status(201).json(attribute);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Update attribute
// @route  PUT /api/admin/attributes/:id
export const updateAttribute = async (req, res) => {
  try {
    const attribute = await Attribute.findById(req.params.id);
    if (!attribute) {
      return res.status(404).json({ message: "Attribute not found" });
    }

    const { name, values } = req.body;

    const cleanValues = values.map((v) => v.trim()).filter((v) => v !== "");

    attribute.name = name;
    attribute.values = cleanValues;

    const updated = await attribute.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Delete attribute
// @route  DELETE /api/admin/attributes/:id
export const deleteAttribute = async (req, res) => {
  try {
    const attribute = await Attribute.findById(req.params.id);
    if (!attribute) {
      return res.status(404).json({ message: "Attribute not found" });
    }
    await attribute.deleteOne();
    res.json({ message: "Attribute deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
