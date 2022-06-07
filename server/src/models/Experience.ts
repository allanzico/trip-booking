import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;
const reviewType = new Schema(
  {
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
    },

    reviewedBy: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const ExperienceType = new Schema(
  {
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
    price: {
      type: Number,
      trim: true,
      required: [true, "price is required"],
    },
    available: {
      type: Number,
      trim: true,
      required: [true, "availability is required"],
    },
    booked: {
      type: Number,
      trim: true,
      default: 0
    },
    image: {
      data: Buffer,
      contentType: String,
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
    lat: {
      type: String,
    },
    lng: {
      type: String,
    },
    reviews:[reviewType],
    numReviews: {
      type: Number,
      default: 0,
    },
    tickets: [
      {
        title: {
          type: String,
          required: [true, "title is required"],
        },
        price: {
          type: Number,
          trim: true,
          required: [true, "price is required"],
        },
        available: {
          type: Number,
          trim: true,
          required: [true, "availability is required"],
        },
        minTickets: {
          type: Number,
          trim: true,
          required: [true, "Min tickets field is required"],
        },
        maxTickets: {
          type: Number,
          trim: true,
          required: [true, "Max tickets field is required"],
        },
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Experience", ExperienceType);
