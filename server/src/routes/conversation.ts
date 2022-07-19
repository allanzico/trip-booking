import express from "express";
import { ConversationClass } from "../controllers/conversation";

import {  apiLimiter, expOwner, requireSignIn } from "../middlewares/middlewares";
const conversation = new ConversationClass()

const router = express.Router();
router.post(
    "/create-conversation",
    requireSignIn,
    apiLimiter,
    conversation.createConversation
);

router.get(
    "/conversations/:userId",
    requireSignIn,
    apiLimiter,
    conversation.getConversation
);
module.exports = router;