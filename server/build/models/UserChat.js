"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const { ObjectId } = mongoose_1.default.Schema.Types;
const UserChatType = new Schema({
    members: [
        {
            type: ObjectId,
            ref: "User"
        },
    ], latestMessage: {
        type: ObjectId,
        ref: "Message"
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model("UserChat", UserChatType);
