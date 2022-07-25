"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const experience_1 = require("../controllers/experience");
const middlewares_1 = require("../middlewares/middlewares");
const express_formidable_1 = __importDefault(require("express-formidable"));
const experience = new experience_1.ExperienceSetup();
const router = express_1.default.Router();
router.post("/create-experience", middlewares_1.requireSignIn, middlewares_1.authSeller, middlewares_1.apiLimiter, experience.createExperience);
router.delete("/delete-experience/:expId", middlewares_1.requireSignIn, middlewares_1.authSeller, middlewares_1.apiLimiter, experience.deleteExperience);
router.post("/create-itenerary/:expId", middlewares_1.requireSignIn, middlewares_1.authSeller, middlewares_1.apiLimiter, experience.createItenerary);
router.patch("/delete-ticket/:expId", middlewares_1.requireSignIn, middlewares_1.authSeller, middlewares_1.apiLimiter, experience.deleteTicket);
router.post("/search-listings", middlewares_1.apiLimiter, experience.searchListings);
router.post("/review-experience/:expId", middlewares_1.requireSignIn, (0, express_formidable_1.default)(), middlewares_1.apiLimiter, experience.reviewExperience);
router.post("/favorite-experience", middlewares_1.requireSignIn, middlewares_1.apiLimiter, experience.favoriteExperience);
router.put("/update-experience/:expId", middlewares_1.requireSignIn, middlewares_1.expOwner, middlewares_1.authSeller, middlewares_1.apiLimiter, experience.updateExperience);
router.get("/experiences", middlewares_1.apiLimiter, experience.getExperiences);
router.get("/seller-experiences", middlewares_1.requireSignIn, middlewares_1.authSeller, middlewares_1.apiLimiter, experience.getSellerExperiences);
router.get("/cloudinary-signature", middlewares_1.requireSignIn, middlewares_1.apiLimiter, experience.getCloudinarySignature);
router.get("/experience/:expId", middlewares_1.apiLimiter, experience.getSingleExperience);
// router.get(
//   "/is-already-favorited/:expId",
//   requireSignIn,
//   experience.isAlreadyFavorited
// );
module.exports = router;
