import { Conversation } from "./Conversation";
import { Message, MessageResponse } from "./Message";
import { User } from "./User";

export class RestResult {
  errorCode: number;
  errorMessage: string;

  constructor(errorCode: number = 1, errorMessage: string = "") {
    this.errorCode = errorCode;
    this.errorMessage = errorMessage;
  }
}

export class SigninResult extends RestResult {
  constructor() {
    super();
  }
}

export class SignUpResult extends RestResult {
  user: User;
  constructor(user: User = new User()) {
    super();
    this.user = user;
  }
}

export class SearchUserResult extends RestResult {
  users: User[];
  constructor(users: User[] = []) {
    super();
    this.users = users;
  }
}

export class UpdateUserResult extends RestResult {
  user: User;
  constructor(user: User = new User()) {
    super();
    this.user = user;
  }
}

export class AddConversationResult extends RestResult {
  conversation: Conversation;
  constructor(conversation: Conversation = new Conversation()) {
    super();
    this.conversation = conversation;
  }
}

export class UpdateConversationResult extends RestResult {
  conversation: Conversation;
  constructor(conversation: Conversation = new Conversation()) {
    super();
    this.conversation = conversation;
  }
}

export class GetConversationResult extends RestResult {
  conversation: Conversation[];
  constructor(conversation: Conversation[] = []) {
    super();
    this.conversation = conversation;
  }
}

export class AddMessageResult extends RestResult {
  message: MessageResponse;
  constructor(message: MessageResponse = new MessageResponse()) {
    super();
    this.message = message;
  }
}

export class GetMessageResult extends RestResult {
  messages: MessageResponse[];
  constructor(messages: MessageResponse[] = []) {
    super();
    this.messages = messages;
  }
}
