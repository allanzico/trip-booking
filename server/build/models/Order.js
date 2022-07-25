"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const { ObjectId } = mongoose_1.default.Schema.Types;
const OrderType = new Schema({
    experience: {
        type: ObjectId,
        ref: "Experience",
    },
    session: {},
    cart: [],
    orderedBy: { type: ObjectId, ref: "User" }
}, { timestamps: true });
exports.default = mongoose_1.default.model("Order", OrderType);
