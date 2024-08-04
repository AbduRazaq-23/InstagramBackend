import { Router } from "express";

const router = Router();

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import {
  PostTheFiles,
  deletePost,
  likePost,
} from "../controllers/post.controllers.js";

router.route("/").post(upload.single("imageUrl"), PostTheFiles);
router.route("/").delete(verifyJWT, deletePost);
router.route("/").patch(verifyJWT, likePost);

export default router;
