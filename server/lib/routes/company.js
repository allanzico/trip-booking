"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares/middlewares");
const company_1 = require("../controllers/company");
const company = new company_1.CompanyClass();
const router = express_1.default.Router();
router.post("/register-company", middlewares_1.requireSignIn, middlewares_1.apiLimiter, company.registerCompany);
router.get("/user-company", middlewares_1.requireSignIn, middlewares_1.apiLimiter, company.getCompany);
router.get("/is-already-registered", middlewares_1.requireSignIn, middlewares_1.apiLimiter, company.isAlreadyRegistered);
module.exports = router;
