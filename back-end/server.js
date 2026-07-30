import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminProductRoutes from "./routes/admin/adminProductRoutes.js";
import adminCategoryRoutes from "./routes/admin/adminCategoryRoutes.js";
import adminUserRoutes from "./routes/admin/adminUserRoutes.js";
import adminOrderRoutes from "./routes/admin/adminOrderRoutes.js";
import adminStatsRoutes from "./routes/admin/adminStatsRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  quiet: true,
});

connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // allow cookies cross-origin
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminProductRoutes);
app.use("/api/admin", adminCategoryRoutes);
app.use("/api/admin", adminUserRoutes);
app.use("/api/admin", adminOrderRoutes);
app.use("/api/admin", adminStatsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
