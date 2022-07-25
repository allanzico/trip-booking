"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperienceSetup = void 0;
const Experience_1 = __importDefault(require("../models/Experience"));
const cloudinary = require("cloudinary").v2;
class ExperienceSetup {
    async createExperience(req, res) {
        const data = req.body;
        try {
            let experience = await new Experience_1.default(data);
            experience.postedBy = req.user._id;
            experience.save((error, result) => {
                if (error) {
                    console.log(error);
                    res.status(400).send("Error saving");
                }
                res.json(result);
            });
        }
        catch (error) {
            console.log(error);
            res.status(400).json({
                error,
            });
        }
    }
    async getExperiences(_req, res) {
        try {
            let experiences = await Experience_1.default.find({})
                .select({})
                .populate("postedBy", "_id firstName lastName")
                .exec();
            res.json(experiences);
        }
        catch (error) {
            console.log(error);
        }
    }
    async getSellerExperiences(req, res) {
        let all = await Experience_1.default.find({ postedBy: req.user._id })
            .select({})
            .populate("postedBy", "_id firstName lastName")
            .exec();
        res.send(all);
    }
    async getSingleExperience(req, res) {
        let experience = await Experience_1.default.findById(req.params.expId)
            .populate("postedBy", "_id firstName lastName")
            .populate({
            path: "reviews",
            populate: {
                path: "reviewedBy",
            },
        })
            .select({})
            .exec();
        res.json(experience);
    }
    async updateExperience(req, res) {
        const data = req.body;
        try {
            if (!Array.isArray(data.tickets) || !data.tickets.length) {
                return res.status(400).json({
                    success: false,
                    error: "Please add a ticket type",
                });
            }
            let updated = await Experience_1.default.findByIdAndUpdate(req.params.expId, data, {
                new: true,
            }).select({});
            res.json(updated);
        }
        catch (error) {
            console.log(error);
            res.status(400).send("Update failed");
        }
    }
    async deleteExperience(req, res) {
        try {
            await Experience_1.default.findByIdAndDelete(req.params.expId);
        }
        catch (error) {
            console.log(error);
            res.status(400).send("Delete failed");
        }
    }
    async deleteTicket(req, res) {
        const { ticketId } = req.body;
        const expId = req.params.expId;
        try {
            await Experience_1.default.updateOne({ _id: expId }, { $pull: { tickets: { _id: ticketId } } });
            const newTickets = await Experience_1.default.findById(expId)
                .select("tickets -_id")
                .exec();
            res.status(200).send({ success: true, tickets: newTickets });
        }
        catch (error) {
            console.log(error);
            res.status(400).send(" failed");
        }
    }
    async searchListings(req, res) {
        const { location, date } = req.body;
        // const dates = date.split(",");
        // console.log(dates);
        // let result = await Experience.find({
        //   startDate: { $gte: dates[0] },
        //   endDate: { $lte: dates[1] },
        //   location: new RegExp(location, "i"),
        // })
        //   .select({})
        //   .exec();
        let result = await Experience_1.default.find({
            startDate: { $gte: date },
            location: new RegExp(location, "i"),
        })
            .select({})
            .exec();
        res.json(result);
    }
    async reviewExperience(req, res) {
        const { rating, comment } = req.fields;
        const experience = await Experience_1.default.findById(req.params.expId).select({});
        try {
            if (experience) {
                const alreadyReviewed = experience.reviews.find((review) => review.user.toString() === req.user._id.toString());
                if (alreadyReviewed) {
                    res.status(400);
                    throw new Error("Experience already Reviewed");
                }
                const review = {
                    rating: Number(rating),
                    comment,
                    reviewedBy: req.user._id,
                };
                experience.reviews.push(review);
                experience.numReviews = experience.reviews.length;
                experience.rating =
                    experience.reviews.reduce((acc, item) => item.rating + acc, 0) / experience.reviews.length;
                await experience.save();
                res.status(201).json("Review added");
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async favoriteExperience(req, res) {
        console.log(req.body);
        res.json({ success: true, });
    }
    async createItenerary(req, res) {
        const itenerary = req.body;
        try {
            const updatedExperience = await Experience_1.default.findByIdAndUpdate(req.params.expId, { itenerary: itenerary }, {
                new: true,
            });
            res.status(201).json({ success: true, updatedExperience });
        }
        catch (error) {
            console.log(error);
            res.status(400).json({
                error,
            });
        }
    }
    async getCloudinarySignature(res) {
        var _a;
        const timestamp = Math.round(new Date().getTime() / 1000);
        var signature = cloudinary.utils.api_sign_request({
            timestamp: timestamp,
        }, (_a = process.env) === null || _a === void 0 ? void 0 : _a['CLOUDINARY_API_SECRET']);
        res.statusCode = 200;
        res.json({ signature, timestamp });
    }
}
exports.ExperienceSetup = ExperienceSetup;
