import { Conversation } from "../models/Entities/Conversation";
import { AddConversationResult, GetConversationResult } from "../models/Entities/RestResults";
import { ConversationManagementClinet } from "../models/classes/businessLogic/ConversationManagementClient";

export class ConversationManagementService {
  conversationManagementClient: ConversationManagementClinet;
  constructor() {
    this.conversationManagementClient = new ConversationManagementClinet();
  }

  addConversation(conversation: Conversation): Promise<AddConversationResult> {
    return this.conversationManagementClient.addConversation(conversation);
  }

  getAllConversations(): Promise<GetConversationResult> {
    return this.conversationManagementClient.getAllConversations();
  }
}
