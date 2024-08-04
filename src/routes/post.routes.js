import { Router } from "express";

const router = Router();

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import {
  PostTheFiles,
  deletePost,
  likePost,
} from "../controllers/post.controllers.js";

router.route("/").post(verifyJWT, upload.single("imageUrl"), PostTheFiles);
router.route("/:postId").delete(verifyJWT, deletePost);
router.route("/:postId").patch(verifyJWT, likePost);

export default router;
