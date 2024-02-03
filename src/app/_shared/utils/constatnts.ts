import { environment } from '../../../environment'
import avatar1 from './../../../assets/avatar/avatar1.png'
import avatar2 from './../../../assets/avatar/avatar2.png'
import avatar3 from './../../../assets/avatar/avatar3.png'
import avatar4 from './../../../assets/avatar/avatar4.png'
import avatar5 from './../../../assets/avatar/avatar5.png'
import avatar6 from './../../../assets/avatar/avatar6.png'
export const AVATARS = [
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5,
    avatar6
]

export const ROUTES = {
    signup: `/signup`,
    signin: `/`,
    home: {
        empty: "/home",
        chat: "/home/chat",
        profile: "/home/profile",
        newConversation: "/home/new-conversation"
    }
};


export type  CONVERSATION_TYPES = "single-chat" | 'group-chat'; 