import Joi, { ObjectSchema } from "joi";
import { IMessageBody } from "../types/message";

export const createMessageSchema = Joi.object<IMessageBody>({
  content: Joi.string().required(),
  groupId: Joi.string().empty(),
  toId: Joi.string(),
});

export const updateMessageSchema = Joi.object<Partial<IMessageBody>>({
  content: Joi.string().required(),
});

export default function validateMessage<T = IMessageBody>(
  schema: ObjectSchema<T>
) {
  return async (payload: Partial<IMessageBody>) => {
    return await schema.validateAsync(payload, {
      abortEarly: true,
    });
  };
}
