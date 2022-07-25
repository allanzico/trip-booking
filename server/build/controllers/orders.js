"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderClass = void 0;
const sendEmail_1 = __importDefault(require("../lib/sendEmail"));
const Experience_1 = __importDefault(require("../models/Experience"));
const Order_1 = __importDefault(require("../models/Order"));
const User_1 = __importDefault(require("../models/User"));
class OrderClass {
    async createOrder(req, res, next) {
        var _a;
        const { experience, cart } = req.body;
        const totalSold = cart.reduce((acc, curr) => acc + curr.quantity, 0);
        const exp = await Experience_1.default.findById(experience)
            .populate("postedBy", "_id firstName lastName")
            .select({})
            .exec();
        // cart.map( async (item: any)  => {
        // const exists = exp.tickets.map((ticket: any) => 
        //  ticket
        // );
        // console.log(exists);
        // })
        const user = await User_1.default.findById(req.user._id).exec();
        const email = user === null || user === void 0 ? void 0 : user.email;
        const emailSender = new sendEmail_1.default();
        const message = `
        <h1> Thank you for your order </h1>
        <p> ${((_a = exp === null || exp === void 0 ? void 0 : exp.postedBy) === null || _a === void 0 ? void 0 : _a.firstName) || undefined} can't wait to see You there! </p>
        `;
        try {
            if (!user) {
                return next(new ErrorResponse("Email could not be sent", 404));
            }
            //Create new order
            await new Order_1.default({
                experience,
                cart,
                orderedBy: user._id,
            }).save();
            //send email
            emailSender.sendEmail({
                to: email,
                subject: "Order confirmation",
                text: message,
            });
            // await User.findByIdAndUpdate(user._id, {
            //   $set: { stripeSession: {} },
            // });
            //Edit tickets
            await Experience_1.default.findByIdAndUpdate(experience, {
                $inc: { booked: +totalSold },
            }, { new: true });
            res.json({ success: true });
        }
        catch (error) {
            console.log(error);
        }
    }
    async getUserBookings(req, res) {
        try {
            const all = await Order_1.default.find({ orderedBy: req.user._id })
                .select({})
                .populate("experience")
                .populate({
                path: "experience",
                populate: {
                    path: "postedBy",
                    select: "_id firstName lastName",
                },
            })
                .populate("orderedBy", "_id firstName lastName")
                .exec();
            res.json(all);
        }
        catch (error) {
            console.log(error);
        }
    }
    async getSingleBooking(req, res) {
        try {
            let booking = await Order_1.default.findById(req.params.bookingId)
                .select({})
                .populate("experience")
                .populate({
                path: "experience",
                populate: {
                    path: "postedBy",
                    select: "_id firstName lastName",
                },
            })
                .populate("orderedBy", "_id firstName lastName")
                .exec();
            res.json(booking);
        }
        catch (error) { }
    }
    async isAlreadyBooked(req, res) {
        var _a, _b;
        const { expId } = req.params;
        const userOrders = await Order_1.default.find({ orderedBy: req.user._id })
            .select("experience")
            .exec();
        //check if ID exists in orders array
        let ids = [];
        for (let i = 0; i < userOrders.length; i++) {
            ids === null || ids === void 0 ? void 0 : ids.push((_b = (_a = userOrders[i]) === null || _a === void 0 ? void 0 : _a.experience) === null || _b === void 0 ? void 0 : _b.toString());
        }
        res.json({
            ok: ids === null || ids === void 0 ? void 0 : ids.includes(expId),
        });
    }
}
exports.OrderClass = OrderClass;
