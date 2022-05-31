
import dotenv from "dotenv"
dotenv.config()


const port = process.env.PORT || 8900
const io = require ("socket.io")(port, {
    cors: {
        origin: process.env.REACT_URL
    }
})
let users: any = []

const addUser = (userId: any, socketId: any) => {
 !users.some((user: any) => user.userId === userId) && users.push({userId, socketId})
}

const removeUser = (socketId: any) => {
   users = users.filter((user: any) => user.socketId !== socketId)
}

const getUser = (userId: any) => {
    return users.find((user: any) => user.userId === userId)
 }

io.on("connection", (socket: any) => {
    console.log("a user connected");

    //get userId and socketID
    socket.on("addUser", (userId: any) => {
        addUser(userId, socket.id)
        io.emit("getUsers", users)
    })

//Send and get message
    socket.on("sendMessage", ({senderId, receiverId, text}: any) => {
            const user = getUser(receiverId)
            io.to(user.socketId).emit("getMessage", {
                senderId,
                text
            })
    })

    socket.on("disconnect", () => {
        console.log ("user disconnected")
        removeUser(socket.id)
        io.emit("getUsers", users)
    })
})
