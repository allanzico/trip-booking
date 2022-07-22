import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const MessagesType = new Schema(
  {
    sender: { type: ObjectId, ref: "User" },
    content: {
      type: String,
    },
    chat: {
      type: ObjectId,
      ref: "UserChat",
    }
  },
  { timestamps: true }
);

export default mongoose.model("Message", MessagesType);
