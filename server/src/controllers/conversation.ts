import Conversation from "../models/Conversation";


export class ConversationClass {
    async  createConversation(req: any, res: any) {
        const newConversation = new Conversation({
            members: [req.body.senderId, req.body.receiverId]
        })

        try {
            
            const savedConversation = await newConversation.save()
            res.status(200).json(savedConversation)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }

    async getConversation(req:any, res:any) {
        try {
            const conversation = await Conversation.find({
                members: {$in:[req.params.userId]}
            })
            res.status(200).json(conversation)
        } catch (error) {
            
        }
    }
}