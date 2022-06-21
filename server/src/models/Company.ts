import mongoose from "mongoose";

const { Schema } = mongoose;

const { ObjectId } = mongoose.Schema.Types;

const CompanyType = new Schema (
  {

    companyName: {
      type: String,
      trim: true,
      required: [true, "please provide a company name"],
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

  },
  { timestamps: true }
);



export default mongoose.model("Company", CompanyType);

