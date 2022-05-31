
import express from "express";
import { StripeSetup } from "../controllers/stripe";

import { requireSignIn } from "../middlewares/middlewares";

const stripe = new StripeSetup()

const router = express.Router();

router.post(
  "/create-stripe-account",
  requireSignIn,
  stripe.createStripeAccount
);

router.post(
  "/get-account-status",
  requireSignIn,
  stripe.getAccountStatus
);

router.post(
  "/get-account-balance",
  requireSignIn,
  stripe.getAccountBalance
);

router.post(
  "/payout-setting",
  requireSignIn,
  stripe.payoutSetting
);

router.post(
  "/stripe-session-id",
  requireSignIn,
  stripe.stripeSessionId
);

router.post(
  "/stripe-success",
  requireSignIn,
  stripe.stripeSuccess
);

module.exports = router;
