"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountLimiter = exports.apiLimiter = exports.authSeller = exports.expOwner = exports.requireSignIn = void 0;
const express_jwt_1 = __importDefault(require("express-jwt"));
const Experience_1 = __importDefault(require("../models/Experience"));
const User_1 = __importDefault(require("../models/User"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const tokenSecret = (_a = process.env) === null || _a === void 0 ? void 0 : _a['JWT_SECRET'];
exports.requireSignIn = (0, express_jwt_1.default)({ secret: tokenSecret, algorithms: ["HS256"] });
const expOwner = async (req, res, next) => {
    var _a, _b;
    let experience = await Experience_1.default.findById(req.params.expId).exec();
    let owner = ((_a = experience === null || experience === void 0 ? void 0 : experience.postedBy) === null || _a === void 0 ? void 0 : _a._id) == ((_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b._id);
    if (!owner) {
        return res.status(403).send("Unauthorized");
    }
    next();
};
exports.expOwner = expOwner;
const authSeller = async (req, res, next) => {
    let user = await User_1.default.findById(req.user._id).exec();
    const userRole = user === null || user === void 0 ? void 0 : user.role;
    if (userRole === "seller") {
        next();
    }
    else {
        return res.status(401).json("Unauthorized");
    }
};
exports.authSeller = authSeller;
exports.apiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
exports.accountLimiter = (0, express_rate_limit_1.default)({
    windowMs: 60 * 60 * 1000,
    max: 5,
    message: 'Too many accounts created from this IP, please try again after an hour',
    standardHeaders: true,
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
