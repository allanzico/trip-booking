"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const { ObjectId } = mongoose_1.default.Schema.Types;
const reviewType = new Schema({
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
    },
    reviewedBy: { type: ObjectId, ref: "User" },
}, { timestamps: true });
const ExperienceType = new Schema({
    title: {
        type: String,
        required: [true, "title is required"],
    },
    description: {
        type: String,
        required: [true, "description is required"],
        maxlength: 10000,
    },
    location: {
        type: String,
        required: [true, "location is required"],
    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    postedBy: {
        type: ObjectId,
        ref: "User",
    },
    itenerary: [
        {
            date: {
                type: Date,
                required: [true, "please provide a date"],
            },
            title: {
                type: String,
            },
            data: Map,
        },
    ],
    lat: {
        type: String,
    },
    lng: {
        type: String,
    },
    reviews: [reviewType],
    numReviews: {
        type: Number,
        default: 0,
    },
    extraPerks: [],
    tickets: [
        {
            ticketTitle: {
                type: String,
                required: [true, "title is required"],
            },
            ticketPrice: {
                type: Number,
                trim: true,
                required: [true, "price is required"],
            },
            // minTickets: {
            //   type: Number,
            //   trim: true,
            //   required: [true, "Min tickets field is required"],
            // },
            // maxTickets: {
            //   type: Number,
            //   trim: true,
            //   required: [true, "Max tickets field is required"],
            // },
        },
    ],
    booked: {
        type: Number,
        trim: true,
        default: 0,
    },
    available: {
        type: Number,
        trim: true,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    files: []
}, { timestamps: true });
// Validations for array size
ExperienceType.path("tickets").validate((val) => val.length > 0, "Must have minimum one option");
exports.default = mongoose_1.default.model("Experience", ExperienceType);
