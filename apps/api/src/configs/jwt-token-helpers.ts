import { Request, Response, NextFunction } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "";

const tokenExpireTime = "1800s";

export const COOKIE_KEY = "access_token";

export function generateAccessToken(id: string) {
  return jwt.sign({ _id: id }, ACCESS_TOKEN_SECRET, {
    expiresIn: tokenExpireTime,
  });
}

export function verifyJWT(req: Request, res: Response, next: NextFunction) {
  const authCookie = req.cookies[COOKIE_KEY];

  jwt.verify(
    authCookie,
    ACCESS_TOKEN_SECRET,
    (error: VerifyErrors | null, data: any) => {
      if (error) {
        return res.sendStatus(403);
      } else if (data.user) {
        (req as any).user = data.user;
        return next();
      }
    }
  );
}
