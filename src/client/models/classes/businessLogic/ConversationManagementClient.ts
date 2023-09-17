import { get } from "http";
import { environment } from "../../../../environment";
import { Conversation } from "../../Entities/Conversation";
import {
  AddConversationResult,
  GetConversationResult,
} from "../../Entities/RestResults";
import { Method, RestCalls } from "./RestCalls";

export class ConversationManagementClinet {
  restCalls: RestCalls;
CONVERSATION_URL:string = "/conversation" 
  constructor() {
    this.restCalls = new RestCalls();
  }

  addConversation(conversation: Conversation): Promise<AddConversationResult> {
    return new Promise((resolve, reject) => {
      try {
        const url = `${environment.BASE_URL}${this.CONVERSATION_URL}/conversation`;
        const restResult = this.restCalls.sendHttpRequest(
          Method.POST,
          url,
          conversation
        );
        let addConversationResult = new AddConversationResult();
        if (restResult) {
          addConversationResult.errorCode = 0;
          addConversationResult.errorMessage = "Conversation added";
          addConversationResult.conversation = restResult.conversation;
          resolve(restResult);
        } else {
          addConversationResult.errorCode = 1;
          addConversationResult.errorMessage = "Failed to add conversation";
          reject(restResult);
        }
      } catch (err) {
        let addConversationResult = new AddConversationResult();
        addConversationResult.errorCode = 1;
        addConversationResult.errorMessage = "Something went wrong";
        reject(conversation);
      }
    });
  }

  getAllConversations(): Promise<GetConversationResult> {
    return new Promise(async (resolve, reject) => {
      try {
        const url = `${environment.BASE_URL}${this.CONVERSATION_URL}`;
        const restResult = await this.restCalls.sendHttpRequest(Method.GET, url);
        let getConversationResult = new GetConversationResult();
        if (restResult) {
          getConversationResult.errorCode = 0;
          getConversationResult.errorMessage = "Conversation got";
          getConversationResult.conversation = restResult;
          console.log(getConversationResult)
          resolve(getConversationResult);
        } else {
          getConversationResult.errorCode = 0;
          getConversationResult.errorMessage = "Failed to add conversation";
          reject(getConversationResult);
        }
      } catch (err) {
        let getConversationResult = new GetConversationResult();
        getConversationResult.errorCode = 1;
        getConversationResult.errorMessage = "Something went wrong";
        reject(getConversationResult);
      }
    });
  }

  deleteConversation(conversationId: string) {}

  pinConversation(conversationId: string) {}

  searchConversation(token: string) {}
}
