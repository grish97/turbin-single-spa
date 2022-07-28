import mongoose, { Model, Schema } from "mongoose";
import { signAccessToken, signRefreshToken } from "../middleware/helpers";

import { IUserModelData } from "../types/user";

const User = new Schema<IUserModelData, Model<IUserModelData>>(
  {
    username: String,
    email: String,
    picture: {
      type: String,
      default: null,
    },
    lastSeen: mongoose.Schema.Types.Date,
    password: String,
    refreshToken: String,
  },
  { timestamps: true }
);

/**
 * Generate refresh token for user
 */
User.methods.generateRefreshToken = function () {
  const User = this;

  const refreshToken = signRefreshToken(User._id);
  User.refreshToken = refreshToken;
};

/**
 * Generate access token for user
 */
User.methods.generateAccessToken = function () {
  const User = this;

  const accessToken = signAccessToken(User._id);
  User.accessToken = accessToken;
};

User.methods.getPublicFields = function () {
  const User = this;

  return {
    id: User.id,
    username: User.username,
    email: User.email,
    accessToken: User.accessToken,
  };
};

export default mongoose.model("user", User);
