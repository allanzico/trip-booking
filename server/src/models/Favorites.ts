import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const FavoriteType = new Schema(
  {
    experience: {
      type: ObjectId,
      ref: "Experience",
    },
    favoritedBy: { type: ObjectId, ref: "User" }
  },
  { timestamps: true }
);

export default mongoose.model("Favorite", FavoriteType);
