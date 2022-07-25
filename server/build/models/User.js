"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const { Schema } = mongoose_1.default;
const { ObjectId } = mongoose_1.default.Schema.Types;
const UserType = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, "please provide a first name"],
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, "please provide a last name"],
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
    role: {
        type: String,
        default: "buyer",
        enum: ["buyer", "seller", "superadmin"],
        required: [true]
    },
    userInterests: [
        { type: ObjectId, ref: 'UserInterests' }
    ],
    favorites: [
        { type: ObjectId, ref: 'Experience' }
    ],
    phone: {},
    verifyToken: {
        type: String,
        default: null
    },
    verificationStatus: {
        type: String,
        default: "pending"
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
}, { timestamps: true });
//Signup user middleware
UserType.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt_1.default.genSalt(10);
    this.password = await bcrypt_1.default.hash(this.password, salt);
    next();
});
//Login User
//Login User
UserType.methods["matchPasswords"] = async function (password) {
    return await bcrypt_1.default.compare(password, this["password"]);
};
//User reset token
//User reset token
UserType.methods["getResetPasswordToken"] = function () {
    const resetToken = crypto_1.default.randomBytes(20).toString("hex");
    this["resetPasswordToken"] = crypto_1.default
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this["resetPasswordExpire"] = Date.now() + 10 * (60 * 1000);
    return resetToken;
};
exports.default = mongoose_1.default.model("User", UserType);
