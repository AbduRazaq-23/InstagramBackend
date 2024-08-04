import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { Post } from "../models/post.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

//@dec --- Posting The image or video controller ---
const PostTheFiles = asyncHandler(async (req, res) => {
  const { description } = req.body;
  const userId = req.user?._id;

  const user = await User.findById(userId);
  if (user) {
    throw new ApiError(400, "u can't post");
  }
  const imageUrl = req.file?.path;

  if (!imageUrl) {
    throw new ApiError(400, "Image is required");
  }

  const post = await uploadOnCloudinary(imageUrl);
  if (!post) {
    throw new ApiError(400, "problem while uploading to cloudinary");
  }

  const postData = await Post.create({
    user: new mongoose.Types.ObjectId(user._id),
    imageUrl: post?.url,
    description,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, postData, "post successfully posted"));
});
//@dec --- deletePost controller ---
const deletePost = asyncHandler(async (req, res) => {
  const postId = req.params;
  const userId = req.user?._id;

  const user = await Post.findByIdAndDelete({ user: userId, postId });
  if (!user) {
    throw new ApiError(400, "u can't delete");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "post deleted successfully"));
});
//@dec --- likePost controller ---
const likePost = asyncHandler(async (req, res) => {
  const postId = new mongoose.Types.ObjectId(req.params);
  const likedById = new mongoose.Types.ObjectId(req.user?._id);

  const user = await Post.findByIdAndUpdate(postId, [
    {
      $set: {
        followers: {
          $cond: {
            if: { $in: [likedById, "$likes"] },
            then: {
              $filter: {
                input: "$likes",
                as: "f",
                cond: { $ne: ["$$f", likedById] },
              },
            },
            else: { $concatArrays: ["$likes", [likedById]] },
          },
        },
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, user, "post liked or not like"));
});

export { PostTheFiles, deletePost, likePost };
