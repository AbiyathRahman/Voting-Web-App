import { Server } from "socket.io";

export default function startServer(){
    const io = new Server(8090);
    console.log("Server Started");
    return io;
}