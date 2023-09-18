import io, { Socket } from "socket.io-client";
import { environment } from "../../../../environment";
import { SocketIoEvent } from "../../Entities/SocketIoEvents";
import { User } from "../../Entities/User";

export class SocketIoClient {
  // socket: Socket;
  static socket = io(environment.IO_URL);
  constructor() {
    SocketIoClient.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });
  }

  establishConnection(userDetails: User) {
    SocketIoClient.socket.on(SocketIoEvent.CONNECT, () => {
      console.info("Connected", SocketIoClient.socket.id);
    })
  }

  emitEvent(socketIoEvent: SocketIoEvent, data: any) {
    SocketIoClient.socket.emit(socketIoEvent, data)
  }

  recieveEvent(socketIoEvent: SocketIoEvent, callback: (data: any) => void): any {
    SocketIoClient.socket.on(socketIoEvent, (data) => {
      console.log("hi")
      callback(data);
    })
  }
}
