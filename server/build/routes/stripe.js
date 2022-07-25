"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const stripe_1 = require("../controllers/stripe");
const middlewares_1 = require("../middlewares/middlewares");
const stripe = new stripe_1.StripeSetup();
const router = express_1.default.Router();
router.post("/create-stripe-account", middlewares_1.requireSignIn, stripe.createStripeAccount);
router.post("/get-account-status", middlewares_1.requireSignIn, stripe.getAccountStatus);
router.post("/get-account-balance", middlewares_1.requireSignIn, stripe.getAccountBalance);
router.post("/payout-setting", middlewares_1.requireSignIn, stripe.payoutSetting);
router.post("/stripe-session-id", middlewares_1.requireSignIn, stripe.stripeSessionId);
router.post("/stripe-success", middlewares_1.requireSignIn, stripe.stripeSuccess);
module.exports = router;
