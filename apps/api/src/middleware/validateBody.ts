import { Request, Response, NextFunction } from "express";
import { ValidationResult } from "joi";
import AppError from "../services/AppError";

type TValidateCallback<T> = (payload: T) => Promise<ValidationResult<T>>;

export default function validateBody<T>(validateCb: TValidateCallback<T>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await validateCb(req.body);

      req.body = result;
      next();
    } catch (err: any) {
      next(new AppError(err.message, 400));
    }
  };
}
