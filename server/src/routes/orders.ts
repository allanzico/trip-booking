import express from 'express'
import { OrderClass } from '../controllers/orders'
import { requireSignIn } from '../middlewares/middlewares'

const orders = new OrderClass()
const router = express.Router()

router.post('/create-order', requireSignIn, orders.createOrder)
router.get(
  "/user-experience-bookings",
  requireSignIn,
  orders.getUserBookings
);
router.get(
  "/booking/:bookingId",
  requireSignIn,
  orders.getSingleBooking
);

router.get(
    "/is-already-booked/:expId",
    requireSignIn,
    orders.isAlreadyBooked
  );
module.exports = router