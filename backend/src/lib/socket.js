import {Server} from "socket.io";
import express from "express";
import http from "http";

const app = express();

const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:["http://localhost:5173"]
    }
})
export function getReceiverSocketId(userId){
return UserSocketMap[userId];
}

const UserSocketMap = {};

io.on("connection",(socket)=>{
    console.log("A user connected",socket.id);

    const userId = socket.handshake.query.userId;
    if(userId) UserSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers",Object.keys(UserSocketMap));
    
    socket.on("disconnect",()=>{
        console.log("A user disconnecetd",socket.id);
        delete UserSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(UserSocketMap));
    })
})

export {io,app,server};