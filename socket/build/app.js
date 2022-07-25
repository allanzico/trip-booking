"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = process.env.PORT || 8900;
const io = require("socket.io")(port, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.REACT_URL
    }
});
//create new socket connection
io.on("connection", (socket) => {
    console.log("a user connected");
    //connect user to room
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    });
    //Join chat
    socket.on("join chat", (room) => {
        socket.join(room);
        console.log(`${room} joined`);
    });
    //New message
    socket.on("new message", (newMessageReceived) => {
        var chat = newMessageReceived.chat;
        if (!chat.members)
            return console.log("chat.members not defined");
        chat.members.forEach((member) => {
            if (member._id == newMessageReceived.sender._id)
                return;
            socket.in(member._id).emit("message received", newMessageReceived);
        });
    });
});
