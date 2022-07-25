"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const { ObjectId } = mongoose_1.default.Schema.Types;
const MessagesType = new Schema({
    sender: { type: ObjectId, ref: "User" },
    content: {
        type: String,
    },
    chat: {
        type: ObjectId,
        ref: "UserChat",
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model("Message", MessagesType);
