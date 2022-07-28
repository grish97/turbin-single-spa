import Joi from "@hapi/joi";
import { Request, Response } from "express";
import { handleError } from "../configs/handleError";
import MemberModel from "../models/member";

const validationSchema = Joi.object({
  groupId: Joi.string().required(),
  userId: Joi.string().required(),
});

async function validate(data: any) {
  try {
    return await validationSchema.validateAsync(data);
  } catch (error: any) {
    handleError(error);
  }
}

export async function create(req: Request, res: Response) {
  const { body } = req;
  const validationResult = await validate(body);

  if (!validationResult.error) {
    const member = await MemberModel.create({
      groupId: body.groupId,
      userId: body.userId,
    });

    res.send(member);
  }
}
