import { Schema, Model, model } from "mongoose";
import { IMemberModelData } from "../types/member";

const Member = new Schema<IMemberModelData, Model<IMemberModelData>>(
  {
    groupId: {
      type: Schema.Types.ObjectId,
      ref: "group",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

export default model("memeber", Member);
