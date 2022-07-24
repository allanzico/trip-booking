
import express from "express";
import {  apiLimiter, requireSignIn } from "../middlewares/middlewares";
import { CompanyClass } from "../controllers/company";

const company = new CompanyClass()

const router = express.Router();

router.post(
  "/register-company",
  requireSignIn,
  apiLimiter,
  company.registerCompany
);

router.get(
  "/user-company",
  requireSignIn,
  apiLimiter,
  company.getCompany
);

router.get(
  "/is-already-registered",
  requireSignIn,
  apiLimiter,
  company.isAlreadyRegistered
);


module.exports = router;
