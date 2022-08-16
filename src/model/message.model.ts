import mongoose from "mongoose";
import { nanoid } from "nanoid";
import { UserDocument } from "./authModel/user.model";

export interface MessageDocument extends mongoose.Document {
  user: UserDocument["_id"];
  question: string;
  answer: string;
}

const MessageSchema = new mongoose.Schema(
  {
    messageId: {
      type: String,
      required: true,
      unique: true,
      default: () => nanoid(10)
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    question: { type: String, required:true},
    answer: { type: String, default: "" },
  },
  { timestamps: true }
);

const Message = mongoose.model<MessageDocument>("Message", MessageSchema);

export default Message;
