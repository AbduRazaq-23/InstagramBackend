import { Router } from "express";

const router = Router();

import { verifyJWT } from "../middlewares/auth.middleware.js";

import {
  commentOnPost,
  deleteComment,
} from "../controllers/comment.controller.js";

router.route("/:userId").post(verifyJWT, commentOnPost);
router.route("/:commentId").delete(verifyJWT, deleteComment);

export default router;
