import mongoose from "mongoose";

const connectDB = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URI);
    console.log("db connected");
  } catch (error) {
    console.log("mongoose connection error", error);
  }
};

export { connectDB };
