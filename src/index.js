import { app } from "./app.js";
import { connectDB } from "./db/database.js";
import dotenv from "dotenv";

dotenv.config();

app.get("/", () => {
  console.log("bas tera hu");
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`db connected app is running at Port ${process.env.PORT}`);
    });
  })
  .catch(() => {});
