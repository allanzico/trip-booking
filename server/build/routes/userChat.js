"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Chat_1 = require("../controllers/Chat");
const middlewares_1 = require("../middlewares/middlewares");
const chat = new Chat_1.ChatClass();
const router = express_1.default.Router();
router.post("/chat", middlewares_1.requireSignIn, middlewares_1.apiLimiter, chat.accessChat);
router.get("/get-chats", middlewares_1.requireSignIn, middlewares_1.apiLimiter, chat.getChats);
module.exports = router;
