
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
  experience.createExperience
);

router.delete(
  "/delete-experience/:expId",
  requireSignIn,
  authSeller,
  experience.deleteExperience
);
router.post(
  "/create-itenerary/:expId",
  requireSignIn,
  authSeller,
  experience.createItenerary
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


// router.get(
//   "/is-already-favorited/:expId",
//   requireSignIn,
//   experience.isAlreadyFavorited
// );

module.exports = router;
