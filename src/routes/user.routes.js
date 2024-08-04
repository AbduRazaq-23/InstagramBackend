import { Router } from "express";

const router = Router();
import {
  registerUser,
  logInUser,
  logOutUser,
  updateUser,
  updateUserAvatar,
  changeCurrentPassword,
  getLogInUser,
  userToggleFollowing,
  getUserFollowingAndCount,
  getUserFollowerAndCount,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

router.route("/register").post(upload.single("imageUrl"), registerUser);
router.route("/login").post(logInUser);

router.route("/logout").patch(verifyJWT, logOutUser);
router.route("/update").patch(verifyJWT, updateUser);
router
  .route("/uploadavatar")
  .patch(verifyJWT, upload.single("imageUrl"), updateUserAvatar);
router.route("/changpassword").patch(verifyJWT, changeCurrentPassword);
router.route("/getuser").get(verifyJWT, getLogInUser);
router.route("/:userId").patch(verifyJWT, userToggleFollowing);

router.route("/following").get(verifyJWT, getUserFollowingAndCount);
router.route("/follower").get(verifyJWT, getUserFollowerAndCount);

export default router;
