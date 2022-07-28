import { Request, Response } from "express";
import User from "../models/user";
import { handleError } from "../configs/handleError";

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await User.find();

    if (!users) {
      res.status(400).json({
        success: false,
        message: "Can not find any user",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error: any) {
    handleError(error);

    res.status(400).json({
      success: false,
      message: error?.message || "Something went wrong",
    });
  }
}
