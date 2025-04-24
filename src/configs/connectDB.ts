import mongoose from "mongoose";
import env from "./environment";

export const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log("Connected to database successfully");
  } catch (error) {
    console.error("Error connecting to database", error);
    process.exit(1);
  }
};
