import { app } from "./app.js";
import { connectDB } from "./db/database.js";
import dotenv from "dotenv";

dotenv.config();

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`app is running at Port ${process.env.PORT}`);
    });
  })
  .catch(() => {});
