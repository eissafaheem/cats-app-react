import { Message } from "../models/Entities/Message";
import { MessageManagementClient } from "../models/classes/businessLogic/MessageManagementClient";

export class MessageanagementService{
    messageManagementClient: MessageManagementClient;
  constructor() {
    this.messageManagementClient = new MessageManagementClient();
  }

  addMessage(message: Message): Promise<Message> {
    return this.messageManagementClient.addMessage(message);
  }

  getAllMessages(): Promise<Message[]> {
    return this.messageManagementClient.getAllMessages();
  }

    
}