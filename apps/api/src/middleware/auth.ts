import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { fromEnv } from "../configs/envConfig";
import { handleError } from "../configs/handleError";

const ACCESS_TOKEN_SECRET = fromEnv("ACCESS_TOKEN_SECRET");
const REFRESH_TOKEN_SECRET = fromEnv("REFRESH_TOKEN_SECRET");

/**
 * Verify access token
 * @param {Request} req
 * @param {Response} res
 */
export function verfiyAccessToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers["authorization"] || "";
    const accessToken = authHeader.split(" ")[1];

    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid access token",
      });
    }

    jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (error, data: any) => {
      if (error) {
        return res.status(403).json({
          success: false,
          message: "A token is required for authentication",
        });
      } else if (data._id) {
        (req as any)._id = data._id;
        next();
      }
    });
  } catch (error) {
    handleError(error);
    res.status(401).json({
      success: false,
      message: error,
    });
  }
}

/**
 * Verfy refresh token
 * @param {string} refreshToken
 */
export async function verifyRefreshToken(refreshToken: string) {
  return await jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
}
