import { Conversation } from "./Conversation";
import { User } from "./User";

export class Message {
    _id: string | null;
    content: string | null;
    conversationId: string | null;
    timestamp: number;

    constructor(
        id: string | null = null,
        content: string | null = null,
        conversation: string | null = null,
        timestamp: number = 0
    ) {
        this._id = id;
        this.content = content;
        this.conversationId = conversation;
        this.timestamp = timestamp;
    }
}

export class MessageRequest extends Message {
    senderId: string | null;

    constructor(
        id: string | null = null,
        senderId: string | null = null,
        content: string | null = null,
        conversation: string | null = null,
        timestamp: number = 0
    ) {
        super(id, content, conversation, timestamp);
        this.senderId = senderId;
    }
}

export class MessageResponse extends Message {
    sender: User;
    constructor(
        id: string | null = null,
        sender: User = new User(),
        content: string | null = null,
        conversation: string | null = null,
        timestamp: number = 0
    ) {
        super(id, content, conversation, timestamp);
        this.sender = sender;
    }
}
