import Joi, { ObjectSchema } from "joi";
import { IGroupBody } from "../types/group";

export const createGroupSchema = Joi.object<IGroupBody>({
  name: Joi.string().empty(),
  members: Joi.array().items(Joi.string()).min(1).required(),
  isPrivate: Joi.bool().required(),
  creatorId: Joi.string().required(),
});

export const updateGroupSchema = Joi.object<Partial<IGroupBody>>({
  name: Joi.string().required(),
});

export default function validateGroup<T = IGroupBody>(schema: ObjectSchema<T>) {
  return async (payload: Partial<IGroupBody>) => {
    return await schema.validateAsync(payload, {
      abortEarly: true,
    });
  };
}
