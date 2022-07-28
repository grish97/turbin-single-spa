import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import Joi from "@hapi/joi";
import User from "../models/user";
import { COOKIE_JWT_KEY, REFRESH_TOKEN_EXP_AGE } from "../middleware/helpers";
import { verifyRefreshToken } from "../middleware/auth";
import { handleError } from "../configs/handleError";

// validate user info
const reqisterSchema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

/**
 * Login user
 * @param {Request} req
 * @param {Response} res
 */
export async function login(req: Request, res: Response) {
  const body = req.body;
  const user = await User.findOne({ email: body.email });

  const isValidPassword = await bcrypt.compare(
    body.password,
    user?.password || ""
  );

  if (!isValidPassword || !user) {
    res
      .status(400)
      .send({ success: false, message: "Email or password incorrect" });
    return;
  }

  try {
    const { error } = await loginSchema.validateAsync(body);

    if (error) {
      return res.json({ success: false, message: error.details[0].message });
    } else {
      await user.generateRefreshToken();

      await user.generateAccessToken();

      await user.save();

      return res
        .cookie(COOKIE_JWT_KEY, user.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: REFRESH_TOKEN_EXP_AGE,
        })
        .status(200)
        .json({
          success: true,
          data: user.getPublicFields(),
        });
    }
  } catch (error: any) {
    handleError(error);
    res.status(400).json({ success: false, message: JSON.stringify(error) });
  }
}

/**
 * Update user refresh/access tokens
 * @param {Request} req
 * @param {Response} res
 */
export async function refreshToken(req: Request, res: Response) {
  try {
    const cookies = req.cookies;

    if (!cookies[COOKIE_JWT_KEY]) {
      return res.status(401).json({
        success: false,
        error: "No refresh token provided",
      });
    }

    const cookieRefreshToken = cookies[COOKIE_JWT_KEY];

    const payload: any = await verifyRefreshToken(cookieRefreshToken);

    const user = await User.findOne({ _id: payload._id }).exec();

    if (!user) {
      return res.status(401).json({
        status: false,
        message: "User not found",
      });
    } else if (user.refreshToken !== cookieRefreshToken) {
      return res.status(403).json({
        success: false,
        message: "Old token. Not valid anymore",
      });
    }

    await user.generateAccessToken();

    return res.status(200).json({
      success: true,
      data: user.getPublicFields(),
    });
  } catch (error: any) {
    handleError(error);
    res.status(403).json({
      success: false,
      error: error?.message || "Something wen wrong",
    });
  }
}

/**
 * Register user
 * @param {Request} req
 * @param {Response} res
 */
export async function logout(req: Request, res: Response) {
  try {
    const cookies = req.cookies;
    const refreshToken = cookies[COOKIE_JWT_KEY];

    if (!refreshToken) {
      return res.sendStatus(204);
    }

    const payload: any = await verifyRefreshToken(refreshToken);

    const user = await User.findOne({ _id: payload._id }).exec();

    if (!user) {
      res.clearCookie(COOKIE_JWT_KEY, {
        httpOnly: true,
      });

      return res.sendStatus(204);
    }

    user.refreshToken = "";

    await user.save();

    return res.status(200).clearCookie(COOKIE_JWT_KEY).json({
      success: true,
      message: "Successfully logged out",
    });
  } catch (error: any) {
    handleError(error);
    res.status(400).json({
      success: false,
      error: error,
    });
  }
}

export async function register(req: Request, res: Response) {
  const body = req.body;
  // check user by email is exist
  const existUser = await User.findOne({ email: body.email });

  if (existUser) {
    res.status(400).json({
      success: false,
      message: "User with this email already exists",
    });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(body.password, salt);

  const user = new User({
    username: body.username,
    email: body.email,
    password: hashedPassword,
  });

  try {
    const { error } = await reqisterSchema.validateAsync(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    } else {
      const savedUser = await user.save();
      res.status(200).json({
        success: true,
        data: savedUser,
      });
    }
  } catch (error: any) {
    handleError(error);
    return res.status(400).json({ success: false, message: error });
  }
}
