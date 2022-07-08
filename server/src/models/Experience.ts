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
        ticketAvailable: {
          type: Number,
          trim: true,
          required: [true, "availability is required"],
        },
        minAvailable: {
          type: Number,
          trim: true,
          required: [true, "Min tickets field is required"],
        },
        maxAvailable: {
          type: Number,
          trim: true,
          required: [true, "Max tickets field is required"],
        },
        booked: {
          type: Number,
          trim: true,
          default: 0,
        },
      },
    ],
    files: []
  },
  { timestamps: true }
);
// Validations for array size
ExperienceType.path("tickets").validate(
  (val: any) => val.length > 0,
  "Must have minimum one option"
);

export default mongoose.model("Experience", ExperienceType);
