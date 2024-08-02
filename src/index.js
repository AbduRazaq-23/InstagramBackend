import app from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./db/database.js";

dotenv.config();

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`app is running on : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("mongodb connection error ");
  });
