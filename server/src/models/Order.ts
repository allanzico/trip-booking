import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const OrderType = new Schema(
  {
    experience: {
      type: ObjectId,
      ref: "Experience",
    },
    session: {},
    orderedBy: { type: ObjectId, ref: "User" }
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderType);
