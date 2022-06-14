import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";

const { Schema } = mongoose;

const UserLikesType = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "please provide a name"],
    },
    // firstName: {
    //   type: String,
    //   trim: true,
    //   required: [true, "please provide a first name"],
    // },
    // lastName: {
    //   type: String,
    //   trim: true,
    //   required: [true, "please provide a last name"],
    // },
    email: {
      type: String,
      trim: true,
      required: [true, "email is required"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "password is required"],
      min: 8,
      max: 64,
    },
    role: {
        type: String,
        default: "buyer",
        enum: ["buyer", "seller", "superadmin"],
        required: [true]
    },
    phone: {},
    authyId: {
      type: String,
      default: null
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    image: {
      data: Buffer,
      contentType: String,
    },
    stripe_account_id: "",
    stripe_seller: {},
    stripeSession: {},
  },
  { timestamps: true }
);


export default mongoose.model("UserLikes", UserLikesType);
