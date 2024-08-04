import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  const verifyToken =
    req.cookies?.token || req.header("Authorization")?.replace("Bearer", "");

  if (!verifyToken) {
    throw new ApiError(400, "unauthorized request");
  }

  const decodedToken = jwt.verify(verifyToken, process.env.TOKEN_SECRET);

  const user = await User.findById(decodedToken?._id).select(
    "-password -token"
  );

  if (!user) {
    throw new ApiError(401, "invalid access token");
  }
  req.user = user;
  next();
});
