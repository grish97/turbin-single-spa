import mongoose, { Types } from "mongoose";
import { Response, Request, NextFunction } from "express";
import { handleError } from "../configs/handleError";
import GroupModel from "../models/group";
import MemberModel from "../models/member";
import UserModel from "../models/user";
import MessageModel from "../models/message";
import { catchAsync } from "../middleware/helpers";
import AppError from "../services/AppError";

import { IGroupBody, IGroupModelData } from "../types/group";
import { IMemberModelData } from "../types/member";
import { IMessageModelData } from "../types/message";

/**
 * Get all groups by creatorId
 * @param {Request<any, any, IGroupBody>} req
 * @param {Response} res
 * @param {NextFunction} next
 */
async function getAll(
  req: Request<any, any, IGroupBody>,
  res: Response,
  next: NextFunction
) {
  const userId = (req as any)._id;
  const groups = await GroupModel.find<IMemberModelData>({ creatorId: userId });

  res.status(200).json({
    success: true,
    data: groups || [],
  });
}

async function conversationsList(
  req: Request<any, any, IGroupBody>,
  res: Response,
  next: NextFunction
) {
  const userId = (req as any)._id;

  const conversations = await GroupModel.aggregate([
    {
      $match: { creatorId: new Types.ObjectId(userId) },
    },
    {
      $lookup: {
        as: "member",
        from: "memebers",
        let: { id: "$_id" },
        pipeline: [
          {
            $match: { $expr: { $eq: ["$groupId", "$$id"] } },
          },
          {
            $lookup: {
              from: "users",
              localField: "userId",
              foreignField: "_id",
              as: "user",
            },
          },
          { $unwind: "$user" },
          {
            $addFields: {
              username: "$user.username",
              picture: "$user.picture",
            },
          },
          {
            $project: {
              username: 1,
              picture: 1,
            },
          },
        ],
      },
    },
    { $unwind: "$member" },
    {
      $addFields: {
        username: "$member.username",
        picture: "$member.picture",
      },
    },
    {
      $lookup: {
        as: "message",
        from: "messages",
        let: { id: "$_id" },
        pipeline: [
          {
            $match: { $expr: { $eq: ["$groupId", "$$id"] } },
          },
          {
            $group: {
              _id: "$groupId",
              notSeenCount: {
                $sum: {
                  $cond: {
                    if: { $eq: ["$log.isSeen", false] },
                    then: 1,
                    else: 0,
                  },
                },
              },
              lastMessage: {
                $last: "$$ROOT",
              },
            },
          },
        ],
      },
    },
    {
      $project: {
        name: 1,
        picture: 1,
        isPrivate: 1,
        creatorId: 1,
        username: 1,
        userId: 1,
        message: 1,
      },
    },
  ]);

  return res.status(200).json({
    success: true,
    data: conversations,
  });
}

/**
 * Create new group and members
 * @param {Request} req
 * @param {Response} res
 */
async function create(req: Request<any, any, IGroupBody>, res: Response) {
  const { body } = req;
  const creatorId = (req as any)._id;

  const group = await GroupModel.create({
    name: body.name,
    isPrivate: body.isPrivate,
    creatorId: creatorId,
  });

  await group.save();

  // create members
  const members: any[] = await createMemebrs(body.members, group.id);

  res.status(200).json({
    success: true,
    data: {
      group,
      members,
    },
  });
}

/**
 * Create members by ids
 * @param {string[]} memberIds
 * @param {string} groupId
 * @returns {Promise<any[]>}
 */
async function createMemebrs(
  memberIds: string[],
  groupId: string
): Promise<any[]> {
  const promises: Array<Promise<any>> = [];

  //@todo if needed check members are exist in requested id

  for (const userId of memberIds) {
    if (Types.ObjectId.isValid(userId)) {
      const member = new MemberModel({
        groupId: groupId,
        userId: userId,
      });

      promises.push(member.save());
    }
  }

  return await Promise.all(promises);
}

/**
 * Update Group
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
async function update(
  req: Request<any, any, IGroupBody>,
  res: Response,
  next: NextFunction
) {
  const { body, params } = req;
  const creatorId = (req as any)._id;
  const groupId = params.groupId;

  const group = await GroupModel.findById(groupId);

  if (!group) {
    return next(new AppError("Group with requested id is not defined", 400));
  }

  group.name = body.name;

  await group.save();

  res.status(200).json({
    success: true,
    message: "Group successfuly updated",
  });
}

async function remove(req: Request, res: Response, next: NextFunction) {
  const { params } = req;
  const userId = (req as any)._id;
  const groupId = params.groupId;

  if (!params.groupId) {
    return next(new AppError("Incorrect group id", 401));
  }

  const group = await GroupModel.findOne({ creatorId: userId });

  if (!group) {
    return next(new AppError("Group by this id not found", 403));
  }

  await MemberModel.deleteMany({ groupId });

  await GroupModel.deleteOne({ groupId });

  res.status(200).json({
    success: true,
    message: "Group was deleted",
  });
}

export default {
  getAll: catchAsync(getAll),
  conversationsList: catchAsync(conversationsList),
  create: catchAsync(create),
  update: catchAsync(update),
  remove: catchAsync(remove),
};
