import { Socket, Server } from "socket.io";
import event from "../constants";

export default function messageHandler(io: Server, socket: Socket) {
  function createMessage() {}

  socket.on(event.MESSAGE_CREATE, createMessage);
}
