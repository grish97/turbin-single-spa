import { Schema, Model, model } from "mongoose";

import { IMessageModelData } from "../types/message";

const Message = new Schema<IMessageModelData, Model<IMessageModelData>>(
  {
    content: String,
    lastIndex: Number,
    log: {
      isSeen: Boolean,
      seenDate: Schema.Types.Date,
    },
    groupId: {
      type: Schema.Types.ObjectId,
      ref: "group",
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

export default model("message", Message);
