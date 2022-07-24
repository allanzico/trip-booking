// @ts-nocheck

import Chat from "../models/UserChat";
import User from "../models/User";

export class ChatClass {

  async accessChat(req: any, res: any) {
    const { userId } = req.body;

    try {
      //find old chat
      let chat = await Chat.find({
        $and: [
          { members: { $elemMatch: { $eq: req.user._id } } },
          { members: { $elemMatch: { $eq: userId } } },
        ],
      })
        .populate("members", "firstName lastName email")
        .populate("latestMessage");
      chat = await User.populate(chat, {
        path: "latestMessage.sender",
        select: "firstName lastName email",
      });

      if (chat.length > 0) {
        res.status(200).json(chat);
      } else {
        //Create New chat if old doesn't exist
        let chatData = {
          members: [req.user._id, userId],
        };
        try {
          const createdChat = await Chat.create(chatData);
          const fullChat = await Chat.findOne({
            _id: createdChat._id,
          }).populate("members", "firstName lastName email");

          res.status(200).json(fullChat);
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  async getChats(req: any, res: any) {
    try {
      let chats = await Chat.find({
        members: { $elemMatch: { $eq: req.user._id } },
      })
        .populate("members", "firstName lastName email")
        .populate("latestMessage")
        .sort({ updatedAt: -1 });
      chats = await User.populate(chats, {
        path: "latestMessage.sender",
        select: "firstName lastName email",
      });
      res.status(200).json(chats);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
}
