import { Conversation } from "./Conversation";

export class Message {
    _id: string | null;
    content: string | null;
    senderId: string | null;
    conversationId: string | null;
    timestamp: number;

    constructor(
        id: string | null = null,
        content: string | null = null,
        sender: string | null = null,
        conversation: string | null = null,
        timestamp: number = 0
    ) {
        this._id = id;
        this.content = content;
        this.senderId = sender;
        this.conversationId = conversation;
        this.timestamp = timestamp;
    }
}