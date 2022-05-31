import express from "express";
import { ConversationClass } from "../controllers/conversation";

import {  expOwner, requireSignIn } from "../middlewares/middlewares";
const conversation = new ConversationClass()

const router = express.Router();
router.post(
    "/create-conversation",
    requireSignIn,
    conversation.createConversation
);

router.get(
    "/conversations/:userId",
    requireSignIn,
    conversation.getConversation
);
module.exports = router;