import { User } from "./User";

export class Conversation {
  _id: string | null;
  name: string | null;
  users: User[];
  lastMessage: string | null;
  isPinned: boolean;
  isUnread: boolean;
  avatarIds: number[];

  constructor(
    id: string | null = null,
    name: string | null = null,
    users: any[] = [],
    lastMessage: string | null = null,
    isPinned: boolean = false,
    isUnread: boolean = false,
    avatarId: number[] | null = null

  ) {
    this._id = id;
    this.name = name;
    this.users = users;
    this.lastMessage = lastMessage;
    this.isPinned = isPinned;
    this.isUnread = isUnread
    this.avatarIds = avatarId !== null ? avatarId : [0];
  }
}
