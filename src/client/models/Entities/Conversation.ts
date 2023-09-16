import { User } from "./User";

export class Conversation {
  id: string | null;
  name: string | null;
  users: User[];
  lastMessage: string | null;
  isPinned: boolean;

  constructor(
    id: string | null = null,
    name: string | null = null,
    users: User[] = [],
    lastMessage: string | null = null,
    isPinned: boolean = false
  ) {
    this.id = id;
    this.name = name;
    this.users = users;
    this.lastMessage = lastMessage;
    this.isPinned = isPinned;
  }
}
