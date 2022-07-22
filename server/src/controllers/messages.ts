import Message from "../models/Message";
import User from "../models/User";
import UserChat from "../models/UserChat";

export class MessagesClass {
  async sendMessage(req: any, res: any) {
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
      let message = await Message.create(newMessage);
      message = await message.populate("sender", "firstName lastName email");
      message = await message.populate("chat");
      message = await User.populate(message, {
        path: "chat.members",
        select: "firstName lastName email",
      });

      await UserChat.findByIdAndUpdate(req.body.chatId, {
        latestMessage: message,
      });
      res.status(200).json(message);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error creating message",
      });
    }
  }
  async getMessages(req: any, res: any) {
    try {
      const allMessages = await Message.find({
        chat: req.params.chatId,
      }).populate("sender", "firstName lastName email").populate("chat");
      res.status(200).json(allMessages);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error getting messages",
        });
    }
  }
}
