import { Conversation } from "../../../client/models/Entities/Conversation";
import { LocalKeys, LocalStorage } from "../../../client/models/classes/businessLogic/LocalStorage";

export function handleConversationData(conversations: Conversation[]): Conversation[] {
    const myId = new LocalStorage().getData(LocalKeys.USER_DETAILS)._id;
    const tempConversations = conversations;
    for (let i=0;i<tempConversations.length;i++) {
        let conversationName:string = "";
        let conversationAvatar = [];
        for(let j=0;j<tempConversations[i].users.length;j++) {
            const user =  tempConversations[i].users[j];
            if(user._id !== myId) {
                if(tempConversations[i].name === null || tempConversations[i].name?.length===0){
                    conversationName += user.name; 
                }
                conversationAvatar.push(user.avatarId);
            }
        }
        if(tempConversations[i].name === null || tempConversations[i].name?.length===0){
            tempConversations[i].name = conversationName;
        }
        tempConversations[i].avatarIds = conversationAvatar;
    }

    return tempConversations;
}