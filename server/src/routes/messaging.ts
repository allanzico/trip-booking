import express from "express";
import { ExperienceSetup } from "../controllers/experience";
import {  expOwner, requireSignIn } from "../middlewares/middlewares";
import formidable from "express-formidable"
import { MessagesClass } from "../controllers/messages";


const messaging = new MessagesClass()

const router = express.Router();
router.post(
    "/create-message",
    requireSignIn,
    messaging.createMessage
);

router.get(
    "/messages/:conversationId",
    requireSignIn,
    messaging.getMessages
);



module.exports = router;

