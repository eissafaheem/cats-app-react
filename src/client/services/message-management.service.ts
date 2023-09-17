import { Message } from "../models/Entities/Message";
import { AddMessageResult, GetMessageResult } from "../models/Entities/RestResults";
import { MessageManagementClient } from "../models/classes/businessLogic/MessageManagementClient";

export class MessageanagementService{
    messageManagementClient: MessageManagementClient;
  constructor() {
    this.messageManagementClient = new MessageManagementClient();
  }

  addMessage(message: Message): Promise<AddMessageResult> {
    return this.messageManagementClient.addMessage(message);
  }

  getAllMessages(conversationId: string): Promise<GetMessageResult> {
    return this.messageManagementClient.getAllMessages(conversationId);
  }

    
}