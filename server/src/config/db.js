import mongoose from "mongoose";
import { env } from "./env.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error(" ❌Database connection error :", error);
  }
};

if (!env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing in .env file");
  // process.exit(1);
}
