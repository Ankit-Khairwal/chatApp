import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // Fail fast instead of buffering operations for ~10s
    mongoose.set("bufferCommands", false);

    if (!process.env.MONGODB_URI) {
      console.log("MongoDB connection skipped: MONGODB_URI is missing in environment variables");
      return null;
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.log("MongoDB connection error:", error.message);
    return null;
  }
};

export const isDatabaseConnected = () => mongoose.connection.readyState === 1;
