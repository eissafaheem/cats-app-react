import { useDispatch } from "react-redux";
import { Conversation } from "../../../client/models/Entities/Conversation";
import { ConversationListProps } from "./ConversationList.component";
import { addConversationArray } from "../../../redux/slices/conversationSlice";
import { useTypedSelector } from "../../../redux/store";

export const useConversationListHook = (props: ConversationListProps) => {

  const {
    setSelectedConversation
  } = props;
  const selectors = useTypedSelector(state => state);

  const allConversations = selectors.conversationReducer.allConversations;
  const dispatch = useDispatch();

  function handleConversationClick(conversation: Conversation) {
    markConversationAsRead(conversation);
    setSelectedConversation(conversation);
  }

  function markConversationAsRead(conversation: Conversation) {
    let tempConversations: Conversation[] = [...allConversations];

    let isConversationExists = false;

    for (let i = 0; i < tempConversations.length; i++) {
      if (tempConversations[i]._id === conversation._id) {
        tempConversations[i] = {
          ...tempConversations[i],
          isUnread: false,
        };
        isConversationExists = true;
        break;
      }
    }

    if (!isConversationExists) {
      const updatedConversation = {
        ...conversation,
        isUnread: true,
      };
      tempConversations.push(updatedConversation);
    }

    dispatch(addConversationArray(tempConversations));
  }


  return {
    allConversations,
    handleConversationClick
  };
}