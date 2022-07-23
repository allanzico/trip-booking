import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const UserChatType = new Schema(
  {
    members:[
        {
            type: ObjectId,
            ref: "User"
          },
    ], latestMessage: {
        type: ObjectId,
        ref: "Message"
    }
  },
  { timestamps: true }
);

export default mongoose.model("UserChat", UserChatType);
