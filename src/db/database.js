import mongoose from "mongoose";

const connectDB = async (req, res) => {
  try {
    const db = await mongoose.connect(process.env.MONGOOSE_URI);
    console.log("db connected", db.connection.host);
  } catch (error) {
    console.log("mongoose connection error", error);
  }
};

export { connectDB };
