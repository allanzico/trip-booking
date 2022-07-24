"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const { ObjectId } = mongoose_1.default.Schema.Types;
const CompanyType = new Schema({
    companyName: {
        type: String,
        required: [true, "please provide a company name"],
    },
    position: {
        type: String,
        required: [true, "please provide a position at the company"],
    },
    companyUrl: {
        type: String,
        trim: true,
        required: [true, "please provide a company URL"],
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
    location: {
        type: String,
        required: [true, "location is required"],
    },
    coordinates: {},
    registeredBy: {
        type: ObjectId,
        ref: "User",
    },
    isApproved: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model("Company", CompanyType);
