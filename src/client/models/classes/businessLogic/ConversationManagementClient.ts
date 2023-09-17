import { environment } from "../../../../environment";
import { Conversation } from "../../Entities/Conversation";
import { Method, RestCalls } from "./RestCalls";

export class ConversationManagementClinet {
  restCalls: RestCalls;
  constructor() {
    this.restCalls = new RestCalls();
  }

  addConversation(conversation: Conversation): Promise<Conversation> {
    return new Promise((resolve, reject) => {
      try {
        const url = `${environment.BASE_URL}/conversation`;
        const addedConversation = this.restCalls.sendHttpRequest(
          Method.POST,
          url,
          conversation
        );
        if (addedConversation) {
          resolve(addedConversation);
        } else {
          reject(addedConversation);
        }
      } catch (err) {
        reject(conversation);
      }
    });
  }

  getAllConversations(): Promise<Conversation[]> {
    return new Promise((resolve, reject) => {
      try {
        const url = `${environment.BASE_URL}/conversation`;
        const conversations = this.restCalls.sendHttpRequest(Method.GET, url);
        if (conversations) {
          resolve(conversations);
        } else {
          reject(conversations);
        }
      } catch (err) {
        reject([]);
      }
    });
  }

  deleteConversation(conversationId: string) {}

  pinConversation(conversationId: string) {}

  searchConversation(token: string) {}
}
