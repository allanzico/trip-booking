import Message from "../models/Message"



export class MessagesClass {
    async  createMessage(req: any, res: any) {
        const newMessage = new Message(req.body)

        try {
        const savedMessage = await newMessage.save()
        res.status(200).json(savedMessage)
        } catch (error) {
            console.log(error)
            res.status(500).json
        }
    }

    async  getMessages(req:any, res: any) {
        try {
            const allMessages = await Message.find({
                conversationId: req.params.conversationId
            })
            res.status(200).json(allMessages)
        } catch (error) {
            
        }
    }


}