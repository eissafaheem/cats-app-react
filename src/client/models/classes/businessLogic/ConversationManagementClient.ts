import { get } from "http";
import { environment } from "../../../../environment";
import { Conversation } from "../../Entities/Conversation";
import {
  AddConversationResult,
  GetConversationResult,
  UpdateConversationResult,
} from "../../Entities/RestResults";
import { Method, RestCalls } from "./RestCalls";
import { LocalKeys, LocalStorage } from "./LocalStorage";

export class ConversationManagementClinet {
  restCalls: RestCalls;
  CONVERSATION_URL: string = "/conversation";
  accessToken: string;
  constructor() {
    this.restCalls = new RestCalls();
    this.accessToken = new LocalStorage().getData(LocalKeys.ACCESS_TOKEN);
  }

  addConversation(conversation: Conversation): Promise<AddConversationResult> {
    return new Promise(async (resolve, reject) => {
      try {
        const url = `${environment.BASE_URL}${this.CONVERSATION_URL}`;
        const restResult = await this.restCalls.sendHttpRequest(
          Method.POST,
          url,
          conversation,
          this.accessToken
        );
        let addConversationResult = new AddConversationResult();
        if (restResult) {
          addConversationResult.errorCode = 0;
          addConversationResult.errorMessage = "Conversation added";
          addConversationResult.conversation = restResult;
          resolve(addConversationResult);
        } else {
          addConversationResult.errorCode = 1;
          addConversationResult.errorMessage = "Failed to add conversation";
          addConversationResult.conversation = restResult;
          reject(addConversationResult);
        }
      } catch (err) {
        let addConversationResult = new AddConversationResult();
        addConversationResult.errorCode = 1;
        addConversationResult.errorMessage = "Something went wrong";
        reject(addConversationResult);
      }
    });
  }

  updateConversation(conversation: Conversation): Promise<UpdateConversationResult> {
    return new Promise(async (resolve, reject) => {
      try {
        const url = `${environment.BASE_URL}${this.CONVERSATION_URL}/${conversation._id}`;
        const restResult = await this.restCalls.sendHttpRequest(
          Method.PUT,
          url,
          conversation,
          this.accessToken
        );
        let updateConversationResult = new UpdateConversationResult();
        if (restResult) {
          updateConversationResult.errorCode = 0;
          updateConversationResult.errorMessage = "Conversation updated";
          updateConversationResult.conversation = restResult;
          resolve(updateConversationResult);
        } else {
          updateConversationResult.errorCode = 1;
          updateConversationResult.errorMessage = "Failed to update conversation";
          updateConversationResult.conversation = restResult;
          reject(updateConversationResult);
        }
      } catch (err) {
        let updateConversationResult = new UpdateConversationResult();
        updateConversationResult.errorCode = 1;
        updateConversationResult.errorMessage = "Something went wrong";
        reject(updateConversationResult);
      }
    });
  }

  getAllConversations(): Promise<GetConversationResult> {
    return new Promise(async (resolve, reject) => {
      try {
        const url = `${environment.BASE_URL}${this.CONVERSATION_URL}`;
        const restResult = await this.restCalls.sendHttpRequest(
          Method.GET,
          url,
          null,
          this.accessToken
        );
        let getConversationResult = new GetConversationResult();
        if (restResult) {
          getConversationResult.errorCode = 0;
          getConversationResult.errorMessage = "Conversation got";
          getConversationResult.conversation = restResult;
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
