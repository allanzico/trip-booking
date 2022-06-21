
import express from "express";
import {  authSeller, expOwner, requireSignIn } from "../middlewares/middlewares";
import { CompanyClass } from "../controllers/company";

const company = new CompanyClass()

const router = express.Router();

router.post(
  "/register-company",
  requireSignIn,
  company.registerCompany
);

router.get(
  "/user-company",
  requireSignIn,
  company.getCompany
);

router.get(
  "/is-already-registered",
  requireSignIn,
  company.isAlreadyRegistered
);


module.exports = router;
