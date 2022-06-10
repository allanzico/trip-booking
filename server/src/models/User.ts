import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";

const { Schema } = mongoose;

const UserType = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "please provide a name"],
    },
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

//Signup user middleware

UserType.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//Login User
UserType.methods.matchPasswords = async function (password: any) {
  return await bcrypt.compare(password, this.password);
};

//User reset token
UserType.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);
  return resetToken;
};

export default mongoose.model("User", UserType);
