import express from 'express'
import { OrderClass } from '../controllers/orders'
import { apiLimiter, requireSignIn } from '../middlewares/middlewares'

const orders = new OrderClass()
const router = express.Router()

router.post('/create-order', requireSignIn, orders.createOrder)
router.get(
  "/user-experience-bookings",
  requireSignIn,
  apiLimiter,
  orders.getUserBookings
);
router.get(
  "/booking/:bookingId",
  requireSignIn,
  apiLimiter,
  orders.getSingleBooking
);

router.get(
    "/is-already-booked/:expId",
    requireSignIn,
    apiLimiter,
    orders.isAlreadyBooked
  );
module.exports = router