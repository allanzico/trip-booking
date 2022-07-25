"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Analytics_1 = require("../controllers/Analytics");
const analytics = new Analytics_1.AnalyticsClass;
const router = express_1.default.Router();
router.get("/analytics", analytics.getAnalytics);
module.exports = router;
