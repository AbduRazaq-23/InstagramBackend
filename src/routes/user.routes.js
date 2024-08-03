import { Router } from "express";

const router = Router();
import { registerUser } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";

router.route("/register").post(upload.single("imageUrl"), registerUser);

router.get("/login", () => {
  console.log("login");
});

export default router;
