import { Conversation } from "../models/Entities/Conversation";
import { Message } from "../models/Entities/Message";
import { AddMessageResult, GetMessageResult } from "../models/Entities/RestResults";
import { User } from "../models/Entities/User";
import { MessageManagementClient } from "../models/classes/businessLogic/MessageManagementClient";

export class MessageanagementService{
    messageManagementClient: MessageManagementClient;
  constructor() {
    this.messageManagementClient = new MessageManagementClient();
  }

  addMessage(message: Message, conversation: Conversation): Promise<AddMessageResult> {
    return this.messageManagementClient.addMessage(message, conversation);
  }

  getAllMessages(conversationId: string): Promise<GetMessageResult> {
    return this.messageManagementClient.getAllMessages(conversationId);
  }
}