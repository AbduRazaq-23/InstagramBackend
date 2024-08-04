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
  if (!avatar) {
    throw new ApiError(400, "problem while uploading to cloudinary");
  }

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

//@dec --- logInUser controller ---
const logInUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!(username, password)) {
    throw new ApiError(400, "fill the field");
  }

  const user = await User.findOne({ username });
  if (!user) {
    throw new ApiError(400, "username not exist");
  }

  const isValidPassword = await user.isPasswordCorrect(password);
  if (!isValidPassword) {
    throw new ApiError(400, "invalid credentials");
  }

  // const userToken = await User.findById(user._id);
  const token = user.generateToken();
  user.token = token;
  await user.save({ validateBeforeSave: false });

  const options = {
    httpOnly: true,
  };

  return res
    .status(200)
    .cookie("token", token, options)
    .json(
      new ApiResponse(200, { user, token }, "user registered successfully")
    );
});
//@dec --- logOutUser controller ---
const logOutUser = asyncHandler(async (req, res) => {
  const userId = req.user;

  const user = await User.findByIdAndUpdate(userId, {
    $unset: { token: 1 },
  });

  const options = {
    httpOnly: true,
  };

  return res
    .status(200)
    .clearCookie("token", options)
    .json(new ApiResponse(200, "user logOut successfully"));
});

export { registerUser, logInUser, logOutUser };
