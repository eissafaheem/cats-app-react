import { useDispatch } from "react-redux";
import { Conversation } from "../../../client/models/Entities/Conversation";
import { addConversationArray, setSelectedConversation as setSelectedConversationState } from "../../../redux/slices/conversationSlice";
import { useTypedSelector } from "../../../redux/store";
import { useEffect } from "react";

export const useConversationListHook = () => {

  const selectors = useTypedSelector(state => state);
  const allConversations = selectors.conversationReducer.allConversations;
  const dispatch = useDispatch();

  useEffect(()=>{
    console.log("sfgslb",selectors.conversationReducer.selectedConversation)
  },[selectors.conversationReducer.selectedConversation])

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

  function setSelectedConversation(conversation: Conversation) {
    dispatch(setSelectedConversationState(conversation))
  }

  return {
    allConversations,
    handleConversationClick
  };
}