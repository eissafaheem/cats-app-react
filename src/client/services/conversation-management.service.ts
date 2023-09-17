import { Conversation } from "../models/Entities/Conversation";
import { ConversationManagementClinet } from "../models/classes/businessLogic/ConversationManagementClient";

export class ConversationManagementService {
  conversationManagementClient: ConversationManagementClinet;
  constructor() {
    this.conversationManagementClient = new ConversationManagementClinet();
  }

  addConversation(conversation: Conversation): Promise<Conversation> {
    return this.conversationManagementClient.addConversation(conversation);
  }

  getAllConversations(): Promise<Conversation[]> {
    return this.conversationManagementClient.getAllConversations();
  }
}
