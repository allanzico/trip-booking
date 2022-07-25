"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const UserInterestsType = new Schema({
    title: {
        type: String,
        trim: true,
        required: [true, "please provide a title"],
    },
    image: {
        data: Buffer,
        contentType: String,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("UserInterests", UserInterestsType);
