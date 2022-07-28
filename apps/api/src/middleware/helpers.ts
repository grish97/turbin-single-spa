import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { fromEnv } from "../configs/envConfig";

const ACCESS_TOKEN_SECRET = fromEnv("ACCESS_TOKEN_SECRET");
const REFRESH_TOKEN_SECRET = fromEnv("REFRESH_TOKEN_SECRET");

export const ACCESS_TOKEN_EXP_TIME = "10h";
export const REFRESH_TOKEN_EXP_TIME = "1d";
export const REFRESH_TOKEN_EXP_AGE = 24 * 60 * 60 * 1000;

export const COOKIE_JWT_KEY = "jwt";

export type TCallback<TR = void> = (...args: any[]) => TR;

/**
 * Sign token by options
 * @param {string} userId
 * @param {string} secret
 * @param {string} expireIn
 */
function signToken(userId: string, secret: string, expireIn: string) {
  return jwt.sign({ _id: userId }, secret, {
    expiresIn: expireIn,
  });
}

/**
 * Generate access token
 * @param {string} userId
 */
export function signAccessToken(userId: string) {
  return signToken(userId, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXP_TIME);
}

/**
 * Generate refresh token
 * @param {string} userId
 */
export function signRefreshToken(userId: string) {
  return signToken(userId, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXP_TIME);
}

/**
 * Catching Errors in Async Functions
 * @param {TCallback<any>} callbackFn
 * @returns {TCallback}
 */
export function catchAsync(callbackFn: TCallback<any>): TCallback {
  return (req: Request, res: Response, next: NextFunction) => {
    callbackFn(req, res, next).catch(next);
  };
}
