"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orders_1 = require("../controllers/orders");
const middlewares_1 = require("../middlewares/middlewares");
const orders = new orders_1.OrderClass();
const router = express_1.default.Router();
router.post('/create-order', middlewares_1.requireSignIn, orders.createOrder);
router.get("/user-experience-bookings", middlewares_1.requireSignIn, middlewares_1.apiLimiter, orders.getUserBookings);
router.get("/booking/:bookingId", middlewares_1.requireSignIn, middlewares_1.apiLimiter, orders.getSingleBooking);
router.get("/is-already-booked/:expId", middlewares_1.requireSignIn, middlewares_1.apiLimiter, orders.isAlreadyBooked);
module.exports = router;
