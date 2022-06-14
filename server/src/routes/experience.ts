
import express from "express";
import { ExperienceSetup } from "../controllers/experience";
import {  authSeller, expOwner, requireSignIn } from "../middlewares/middlewares";
import formidable from "express-formidable"

const experience = new ExperienceSetup()

const router = express.Router();

router.post(
  "/create-experience",
  requireSignIn,
  authSeller,
  formidable(),
  experience.createExperience
);

router.delete(
  "/delete-experience/:expId",
  requireSignIn,
  authSeller,
  experience.deleteExperience
);

router.patch(
  "/delete-ticket/:expId",
  requireSignIn,
  authSeller,
  experience.deleteTicket
);

router.post(
  "/search-listings",
  experience.searchListings
);

router.post(
  "/review-experience/:expId",
  requireSignIn,
  formidable(),
  experience.reviewExperience
);

router.post(
  "/favorite-experience",
  requireSignIn,
  experience.favoriteExperience
);

router.put(
  "/update-experience/:expId",
  requireSignIn,
  expOwner,
  authSeller,
  formidable(),
  experience.updateExperience
);

router.get(
  "/experiences",
  experience.getExperiences
);

router.get(
  "/experience/image/:experienceId",
  experience.getImages
);

router.get(
  "/seller-experiences",
  requireSignIn,
  authSeller,
  experience.getSellerExperiences
);

router.get(
  "/experience/:expId",
  // requireSignIn,
  experience.getSingleExperience
);

router.get(
  "/user-experience-bookings",
  requireSignIn,
  experience.getUserBookings
);

router.get(
  "/booking/:bookingId",
  requireSignIn,
  experience.getSingleBooking
);

router.get(
  "/is-already-booked/:expId",
  requireSignIn,
  experience.isAlreadyBooked
);
router.get(
  "/is-already-favorited/:expId",
  requireSignIn,
  experience.isAlreadyFavorited
);

router.get(
  "/user-favorites",
  requireSignIn,
  experience.getUserFavorites
);

router.get(
  "/favorite-number",
  experience.getFavoriteNumber
);

module.exports = router;
