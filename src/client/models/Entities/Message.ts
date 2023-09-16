export class Message {
    id: string | null;
    content: string | null;
    sender: string | null;
    conversationId: string | null;
    timestamp: number;

    constructor(
        id: string | null = null,
        content: string | null = null,
        sender: string | null = null,
        conversationId: string | null = null,
        timestamp: number = 0
    ) {
        this.id = id;
        this.content = content;
        this.sender = sender;
        this.conversationId = conversationId;
        this.timestamp = timestamp;
    }
}
