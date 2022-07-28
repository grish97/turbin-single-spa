import { Request, Response, NextFunction } from "express";
import MessageModel from "../models/message";
import GroupModel from "../models/group";
import MemberModel from "../models/member";
import { catchAsync } from "../middleware/helpers";
import AppError from "../services/AppError";
import { IMessageBody } from "../types/message";

/**
 * Get all messages by group id
 * @param req
 * @param res
 * @param next
 */
async function getAll(req: Request, res: Response, next: NextFunction) {
  const groupId = req.params.groupId;
  const messages = await MessageModel.find({ groupId });

  res.status(200).json({
    success: true,
    data: messages || [],
  });
}

/**
 * Create message
 * @param req
 * @param res
 * @param next
 */
async function create(
  req: Request<any, any, IMessageBody>,
  res: Response,
  next: NextFunction
) {
  const userId = (req as any)._id;
  const body = req.body;
  let group = null;

  // @todo create new group and member
  if (!body.groupId && body.toId) {
    group = await createGroup(userId, body.toId);
  } else {
    group = await GroupModel.findOne({ groupId: body.groupId });
  }

  if (!group) {
    return next(new AppError("Group not found", 400));
  }

  const message = new MessageModel({
    content: body.content,
    groupId: (group as any)._id,
    log: {
      isSeen: false,
      seenDate: null,
    },
    creatorId: userId,
    lastIndex: 1, // temporary value
  });

  await message.save();

  res.status(200).json({
    success: true,
    data: message,
  });
}

/**
 * Create new group and member for this group
 * this method is experemental and can change in feature
 * @param creatorId
 * @param toId
 * @returns
 */
async function createGroup(creatorId: string, toId: string) {
  const group = new GroupModel({
    creatorId: creatorId,
  });

  await group.save();

  // add new member of this group
  const member = new MemberModel({
    groupId: group.id,
    userId: toId,
  });

  await member.save();

  return group;
}

/**
 * Update message
 * @param req
 * @param res
 * @param next
 */
async function update(
  req: Request<any, any, IMessageBody>,
  res: Response,
  next: NextFunction
) {
  const messageId = req.params.messageId;
  const body = req.body;

  const message = await MessageModel.findOne({
    id: messageId,
  });

  if (!message) {
    return next(new AppError("Message not found", 400));
  }

  message.content = body.content;

  await message.save();

  res.status(200).json({
    success: true,
    data: message,
  });
}

/**
 * Update message
 * @param req
 * @param res
 * @param next
 */
async function remove(req: Request, res: Response, next: NextFunction) {
  const messageId = req.params.messageId;

  await MessageModel.deleteOne({
    id: messageId,
  });

  res.status(200).json({
    success: true,
    message: "Message Deleted",
  });
}

export default {
  getAll: catchAsync(getAll),
  create: catchAsync(create),
  update: catchAsync(update),
  remove: catchAsync(remove),
};
