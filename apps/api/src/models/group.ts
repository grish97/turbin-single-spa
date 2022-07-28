import mongoose, { Model, Schema, model } from "mongoose";
import { IGroupModelData } from "../types/group";

const Group = new Schema<IGroupModelData, Model<IGroupModelData>>(
  {
    name: {
      type: String,
      default: null,
    },
    picture: {
      type: String,
      default: null,
    },
    isPrivate: {
      type: Boolean,
      default: true,
    },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

export default model("group", Group);
