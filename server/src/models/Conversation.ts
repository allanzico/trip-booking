import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const ConversationType = new Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Conversation", ConversationType);
