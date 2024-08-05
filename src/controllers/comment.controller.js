import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

//@dec --- commentOnPost The image or video controller ---
const commentOnPost = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const userId = req.user?._id;
  const { postId } = req.params;

  // you can put if condition if not available

  const postComment = await Comment.create({
    user: new mongoose.Types.ObjectId(userId),
    post: new mongoose.Types.ObjectId(postId),
    text,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, postComment, "comment successfully posted"));
});
//@dec --- deleteComment controller ---
const deleteComment = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { commentId } = req.params;

  // you can put if condition if not available

  await Comment.findByIdAndDelete({
    _id: commentId,
    user: userId,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "comment deleted successfully"));
});

export { commentOnPost, deleteComment };
