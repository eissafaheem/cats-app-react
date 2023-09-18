import { SocketIoEvent } from "../models/Entities/SocketIoEvents";
import { User } from "../models/Entities/User";
import { SocketIoClient } from "../models/classes/businessLogic/SocketIoClient";

export class SocketIoService {
  socketIoClient: SocketIoClient;
  constructor() {
    this.socketIoClient = new SocketIoClient();
  }

  establishConnection(userDetails: User): void {
    this.socketIoClient.establishConnection(userDetails);
  }

  emitEvent(socketIoEvent: SocketIoEvent, data: any = null) {
    return this.socketIoClient.emitEvent(socketIoEvent, data);
  }

  recieveEvent(socketIoEvent: SocketIoEvent, callback: (data: any) => void): any {
    this.socketIoClient.recieveEvent(socketIoEvent, callback);
  }
  unregisterEvent(socketIoEvent: SocketIoEvent, callback: any) {
    this.socketIoClient.unregisterEvent(socketIoEvent, callback);
  }
}
