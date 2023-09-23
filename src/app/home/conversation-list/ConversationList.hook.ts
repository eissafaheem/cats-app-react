import { Conversation } from "../../../client/models/Entities/Conversation";
import { ConversationListProps } from "./ConversationList.component";

export const useConversationListHook = (props: ConversationListProps) => {

  const {
    setSelectedConversation,
    conversations,
    allConversations,
    setAllConversations,
  } = props;

  function handleConversationClick(conversation: Conversation) {
    markConversationAsRead(conversation);
    setSelectedConversation(conversation);
  }

  function markConversationAsRead(conversation: Conversation) {
    let tempConversations: Conversation[] = [...allConversations];

    let isConversationExists = false;

    for (let i = 0; i < tempConversations.length; i++) {
      if (tempConversations[i]._id === conversation._id) {
        tempConversations[i].isUnread = false;
        isConversationExists = true;
        break;
      }
    }

    if (!isConversationExists) {
      conversation.isUnread = true;
      tempConversations.push(conversation);
    }
    setAllConversations(tempConversations);
  }

  return {
    conversations,
    handleConversationClick
  };
}