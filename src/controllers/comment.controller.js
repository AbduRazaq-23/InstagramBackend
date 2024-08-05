import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { Comment } from "../models/comment.model.js";
import { Post } from "../models/post.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

//@dec --- commentOnPost The image or video controller ---
const commentOnPost = asyncHandler(async (req, res) => {
  const { text } = req.body;
  const userId = req.user?._id;
  const { postId } = req.params;

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(500, "u can not comment");
  }

  const post = await Post.findById(userId);
  if (!post) {
    throw new ApiError(500, "u can not comment");
  }

  const postData = await Comment.create({
    user: new mongoose.Types.ObjectId(user._id),
    post: new mongoose.Types.ObjectId(postId),
    text,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, postData, "post successfully posted"));
});

export { commentOnPost };
