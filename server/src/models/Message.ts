import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const MessagesType = new Schema(
  {
    conversationId: {
      type: String,
    },
    sender: { type: String },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Message", MessagesType);
