import mongoose from "mongoose";

const { Schema } = mongoose;

const UserInterestsType = new Schema (
  {
    title: {
      type: String,
      trim: true,
      required: [true, "please provide a title"],
    },

    image: {
      data: Buffer,
      contentType: String,
    },

  },
  { timestamps: true }
);

export default mongoose.model("UserInterests", UserInterestsType);
