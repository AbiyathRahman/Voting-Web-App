import { Server } from "socket.io";

export default function startServer(store){
    const io = new Server(8090);
    console.log("Server Started");
    store.subscribe(
        () => io.emit('state', store.getState().toJs())
    );
    io.on('connection', (socket) => {
        socket.emit('state', store.getState().toJS());
        socket.on('action', store.dispatch.bind(store));
    });
    return io;
}