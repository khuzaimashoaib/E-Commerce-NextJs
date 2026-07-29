import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "admin@sports.com" });
    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    await User.create({
      name: "Khuzaima",
      email: "admin@sports.com",
      password: "admin123",
      role: "admin", // ← set role to admin
    });

    console.log("Admin created successfully!");
    console.log("Email: admin@sports.com");
    console.log("Password: admin123");
    process.exit();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

createAdmin();
