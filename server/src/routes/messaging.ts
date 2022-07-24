import express from "express";
import {  apiLimiter, requireSignIn } from "../middlewares/middlewares";
import { MessagesClass } from "../controllers/messages";


const messaging = new MessagesClass()

const router = express.Router();

router.get(
    "/get-messages/:chatId",
    requireSignIn,
    apiLimiter,
    messaging.getMessages
);

router.post(
    "/message",
    requireSignIn,
    apiLimiter,
    messaging.sendMessage
);



module.exports = router;

