import { Conversation } from "./Conversation";
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

export class AddConversationResult extends RestResult {
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
