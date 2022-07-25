"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatClass = void 0;
const UserChat_1 = __importDefault(require("../models/UserChat"));
const User_1 = __importDefault(require("../models/User"));
class ChatClass {
    async accessChat(req, res) {
        const { userId } = req.body;
        try {
            //find old chat
            let chat = await UserChat_1.default.find({
                $and: [
                    { members: { $elemMatch: { $eq: req.user._id } } },
                    { members: { $elemMatch: { $eq: userId } } },
                ],
            })
                .populate("members", "firstName lastName email")
                .populate("latestMessage");
            chat = await User_1.default.populate(chat, {
                path: "latestMessage.sender",
                select: "firstName lastName email",
            });
            if (chat.length > 0) {
                res.status(200).json(chat);
            }
            else {
                //Create New chat if old doesn't exist
                let chatData = {
                    members: [req.user._id, userId],
                };
                try {
                    const createdChat = await UserChat_1.default.create(chatData);
                    const fullChat = await UserChat_1.default.findOne({
                        _id: createdChat._id,
                    }).populate("members", "firstName lastName email");
                    res.status(200).json(fullChat);
                }
                catch (error) {
                    console.log(error);
                }
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
    async getChats(req, res) {
        try {
            let chats = await UserChat_1.default.find({
                members: { $elemMatch: { $eq: req.user._id } },
            })
                .populate("members", "firstName lastName email")
                .populate("latestMessage")
                .sort({ updatedAt: -1 });
            chats = await User_1.default.populate(chats, {
                path: "latestMessage.sender",
                select: "firstName lastName email",
            });
            res.status(200).json(chats);
        }
        catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
}
exports.ChatClass = ChatClass;
