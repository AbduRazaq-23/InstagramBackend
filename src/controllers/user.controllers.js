import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

//@dec --- registeruser controller ---
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!(username, email, password)) {
    throw new ApiError(400, "fill the field");
  }

  const user = await User.findOne({ username });
  if (user) {
    throw new ApiError(400, "username already exist");
  }
  const imageUrl = req.file?.path;

  if (!imageUrl) {
    throw new ApiError(400, "Image is required");
  }
  const avatar = await uploadOnCloudinary(imageUrl);

  const regUser = await User.create({
    username,
    email,
    password,
    imageUrl: avatar?.url,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, regUser, "user registered successfully"));
});

export { registerUser };
