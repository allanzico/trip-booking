import express from "express";
import { ChatClass } from "../controllers/Chat";

import {  apiLimiter, expOwner, requireSignIn } from "../middlewares/middlewares";
const chat = new ChatClass()

const router = express.Router();

router.post(
    "/chat",
    requireSignIn,
    apiLimiter,
   chat.accessChat
);
router.get(
    "/get-chats",
    requireSignIn,
    apiLimiter,
    chat.getChats
);

module.exports = router;