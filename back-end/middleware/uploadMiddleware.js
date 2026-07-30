import multer from "multer";
import path from "path";
import fs from "fs";

// Define storage — where and how to save files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/products";

    // Create folder if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    // Unique filename: fieldname-timestamp.ext
    // e.g. image-1704067200000.jpg
    const uniqueName = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

// File filter — only allow images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // accept file
  } else {
    cb(new Error("Only jpeg, jpg, png, webp images are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
  },
});

export default upload;
