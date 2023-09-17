import { environment } from "../../../../environment";
import { Message } from "../../Entities/Message";
import { Method, RestCalls } from "./RestCalls";

export class MessageManagementClient {
  restCalls: RestCalls;
  constructor() {
    this.restCalls = new RestCalls();
  }

  addMessage(message: Message): Promise<Message> {
    return new Promise((resolve, reject) => {
      try {
        const url = `${environment.BASE_URL}/message`;
        const addedMessage = this.restCalls.sendHttpRequest(
          Method.POST,
          url,
          message
        );
        if (addedMessage) {
          resolve(addedMessage);
        } else {
          reject(addedMessage);
        }
      } catch (err) {
        reject(message);
      }
    });
  }

  getAllMessages(): Promise<Message[]> {
    return new Promise((resolve, reject) => {
      try {
        const url = `${environment.BASE_URL}/message`;
        const messages = this.restCalls.sendHttpRequest(Method.GET, url);
        if (messages) {
          resolve(messages);
        } else {
          reject(messages);
        }
      } catch (err) {
        reject([]);
      }
    });
  }

  deleteMessage(messageId: string) {}
}
