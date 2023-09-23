import { environment } from "../../../../environment";
import { Conversation } from "../../Entities/Conversation";
import { Message } from "../../Entities/Message";
import { AddMessageResult, GetMessageResult } from "../../Entities/RestResults";
import { SocketIoEvent } from "../../Entities/SocketIoEvents";
import { User } from "../../Entities/User";
import { ConversationManagementClinet } from "./ConversationManagementClient";
import { LocalKeys, LocalStorage } from "./LocalStorage";
import { Method, RestCalls } from "./RestCalls";
import { SocketIoClient } from "./SocketIoClient";

export class MessageManagementClient {
  restCalls: RestCalls;
  constructor() {
    this.restCalls = new RestCalls();
  }

  addMessage(
    message: Message,
    conversation: Conversation
  ): Promise<AddMessageResult> {
    return new Promise(async (resolve, reject) => {
      try {
        const url = `${environment.BASE_URL}/message`;
        const accessToken = new LocalStorage().getData(
          LocalKeys.ACCESS_TOKEN
        );
        const addedMessage = await this.restCalls.sendHttpRequest(
          Method.POST,
          url,
          message,
          accessToken
        );
        await this.updateConversation(conversation, message.content || "");
        let addMessageResult = new AddMessageResult();
        if (addedMessage) {
          addMessageResult.errorCode = 0;
          addMessageResult.errorMessage = "Success";
          addMessageResult.message = addedMessage;
          this.sendSocketIONotification(message, conversation);
          resolve(addMessageResult);
        } else {
          addMessageResult.errorCode = 1;
          addMessageResult.errorMessage = "Failure";
          addMessageResult.message = addedMessage;
          reject(addMessageResult);
        }
      } catch (err) {
        let addMessageResult = new AddMessageResult();
        addMessageResult.errorCode = 1;
        addMessageResult.errorMessage = "Something went wrong";
        reject(addMessageResult);
      }
    });
  }

  sendSocketIONotification(message: Message, conversation: Conversation) {
    try {
      const socketIoClient = new SocketIoClient();
      socketIoClient.emitEvent(SocketIoEvent.SEND_MESSAGE, {message, conversation});
    }
    catch (err) {
      console.error(err)
    }
  }

  async updateConversation(conversation: Conversation, newMessage: string){
    try{
      const conversationManagementClinet = new ConversationManagementClinet();
      const updateConversationLastMessage = new Conversation();
      updateConversationLastMessage._id = conversation._id;
      updateConversationLastMessage.lastMessage = newMessage;
      const restResult = await conversationManagementClinet.updateConversation(updateConversationLastMessage);
      console.log(conversation, newMessage)
    }catch(err){
      console.error(err);
    }
  }

  getAllMessages(conversationId: string): Promise<GetMessageResult> {
    return new Promise(async (resolve, reject) => {
      try {
        const url = `${environment.BASE_URL}/message/${conversationId}`;
        const accessToken = new LocalStorage().getData(
          LocalKeys.ACCESS_TOKEN
        );
        const messages = await this.restCalls.sendHttpRequest(
          Method.GET,
          url,
          null,
          accessToken
        );
        const getMesasgeResult = new GetMessageResult();
        if (messages) {
          getMesasgeResult.errorCode = 0;
          getMesasgeResult.errorMessage = "Successfull!";
          getMesasgeResult.messages = messages;
          resolve(getMesasgeResult);
        } else {
          getMesasgeResult.errorCode = 1;
          getMesasgeResult.errorMessage = "Failure!";
          getMesasgeResult.messages = messages;
          reject(messages);
        }
      } catch (err) {
        const getMesasgeResult = new GetMessageResult();
        getMesasgeResult.errorCode = 1;
        getMesasgeResult.errorMessage = "Failure!";
        getMesasgeResult.messages = [];
        reject(getMesasgeResult);
      }
    });
  }

  deleteMessage(messageId: string) { }
}
