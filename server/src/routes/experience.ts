
import express from "express";
import { ExperienceSetup } from "../controllers/experience";
import {  apiLimiter, authSeller, expOwner, requireSignIn } from "../middlewares/middlewares";
import formidable from "express-formidable"

const experience = new ExperienceSetup()

const router = express.Router();

router.post(
  "/create-experience",
  requireSignIn,
  authSeller,
  apiLimiter,
  experience.createExperience
);

router.delete(
  "/delete-experience/:expId",
  requireSignIn,
  authSeller,
  apiLimiter,
  experience.deleteExperience
);
router.post(
  "/create-itenerary/:expId",
  requireSignIn,
  authSeller,
  apiLimiter,
  experience.createItenerary
);
router.patch(
  "/delete-ticket/:expId",
  requireSignIn,
  authSeller,
  apiLimiter,
  experience.deleteTicket
);

router.post(
  "/search-listings",
  apiLimiter,
  experience.searchListings
);

router.post(
  "/review-experience/:expId",
  requireSignIn,
  formidable(),
  apiLimiter,
  experience.reviewExperience
);

router.post(
  "/favorite-experience",
  requireSignIn,
  apiLimiter,
  experience.favoriteExperience
);

router.put(
  "/update-experience/:expId",
  requireSignIn,
  expOwner,
  authSeller,
  apiLimiter,
  experience.updateExperience
);

router.get(
  "/experiences",
  apiLimiter,
  experience.getExperiences
);

router.get(
  "/seller-experiences",
  requireSignIn,
  authSeller,
  apiLimiter,
  experience.getSellerExperiences
);

router.get(
  "/cloudinary-signature",
  requireSignIn,
  apiLimiter,
  experience.getCloudinarySignature
);

router.get(
  "/experience/:expId",
  apiLimiter,
  experience.getSingleExperience
);


// router.get(
//   "/is-already-favorited/:expId",
//   requireSignIn,
//   experience.isAlreadyFavorited
// );

module.exports = router;
