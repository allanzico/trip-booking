"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesClass = void 0;
const Message_1 = __importDefault(require("../models/Message"));
const User_1 = __importDefault(require("../models/User"));
const UserChat_1 = __importDefault(require("../models/UserChat"));
class MessagesClass {
    async sendMessage(req, res) {
        const { chatId, content } = req.body;
        if (!chatId || !content) {
            res.status(400).json({
                message: "Missing parameters",
            });
        }
        let newMessage = {
            sender: req.user._id,
            content: content,
            chat: chatId,
        };
        try {
            let message = await Message_1.default.create(newMessage);
            message = await message.populate("sender", "firstName lastName email");
            message = await message.populate("chat");
            message = await User_1.default.populate(message, {
                path: "chat.members",
                select: "firstName lastName email",
            });
            await UserChat_1.default.findByIdAndUpdate(req.body.chatId, {
                latestMessage: message,
            });
            res.status(200).json(message);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Error creating message",
            });
        }
    }
    async getMessages(req, res) {
        try {
            const allMessages = await Message_1.default.find({
                chat: req.params.chatId,
            }).populate("sender", "firstName lastName email").populate("chat");
            res.status(200).json(allMessages);
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Error getting messages",
            });
        }
    }
}
exports.MessagesClass = MessagesClass;
