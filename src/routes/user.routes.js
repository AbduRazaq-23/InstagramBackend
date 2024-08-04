import { Router } from "express";

const router = Router();
import {
  registerUser,
  logInUser,
  logOutUser,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

router.route("/register").post(upload.single("imageUrl"), registerUser);
router.route("/login").post(logInUser);
router.route("/logout").patch(verifyJWT, logOutUser);

export default router;
