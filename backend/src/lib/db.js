import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log("🚀 TERMINAL IS NOW READING THE CORRECT FILE!");
    
    if (!process.env.MONGODB_URI) {
      console.log("❌ Error: MONGODB_URI is missing from your .env file!");
      process.exit(1);
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};