"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares/middlewares");
const messages_1 = require("../controllers/messages");
const messaging = new messages_1.MessagesClass();
const router = express_1.default.Router();
router.get("/get-messages/:chatId", middlewares_1.requireSignIn, middlewares_1.apiLimiter, messaging.getMessages);
router.post("/message", middlewares_1.requireSignIn, middlewares_1.apiLimiter, messaging.sendMessage);
module.exports = router;
