import { Socket, Server } from "socket.io";
import event from "../constants";

export default function userHandler(io: Server, socket: Socket) {
  function connected(userId: string) {
    console.log(userId);
  }

  function disconnected(userId: string) {
    console.log(userId);
  }

  socket.on(event.USER_CONNECTED, connected);
  socket.on(event.USER_CONNECTED, disconnected);
}
