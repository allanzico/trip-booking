import express from "express";
import { ExperienceSetup } from "../controllers/experience";
import {  apiLimiter, expOwner, requireSignIn } from "../middlewares/middlewares";
import formidable from "express-formidable"
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

