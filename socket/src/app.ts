
import dotenv from "dotenv"
dotenv.config()

const port = process.env.PORT || 8900
const io = require ("socket.io")(port, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.REACT_URL
    }
})

//create new socket connection

io.on("connection", (socket: any) => {
    console.log("a user connected");

    //connect user to room
    socket.on("setup", (userData: any) => {
      socket.join(userData._id)
      socket.emit("connected")
    })

    //Join chat
    socket.on("join chat", (room: any) => {
        socket.join(room)
        console.log(`${room} joined`)
      })

      //New message
      socket.on("new message", (newMessageReceived: any) => {
        var chat = newMessageReceived.chat
        if (!chat.members)return console.log("chat.members not defined")
        chat.members.forEach((member: any) => {
            if(member._id == newMessageReceived.sender._id) return
            socket.in(member._id).emit("message received", newMessageReceived)
        });
            
        
      })


      //disconnect
    //   socket.on("disconnect", () => {
    //     console.log ("user disconnected")
    //     removeUser(socket.id)
    //     io.emit("getUsers", users)
    // })
})
