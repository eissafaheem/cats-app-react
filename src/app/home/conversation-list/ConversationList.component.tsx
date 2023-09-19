import React from "react";
import ConversationListStyles from "./ConversationList.module.css";
import ConversationItemComponent from "./conversation-item/ConversationItem.component";
import { Conversation } from "../../../client/models/Entities/Conversation";
import { useNavigate } from "react-router-dom";

type ConversationListProps = {
  setSelectedConversation: React.Dispatch<React.SetStateAction<Conversation>>;
  conversations: Conversation[];
  setAllConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
  allConversations: Conversation[];
};

function ConversationListComponent(props: ConversationListProps) {
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
    let tempConversations: Conversation[] = [...allConversations]; // Create a copy

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


    setAllConversations(tempConversations); // Update state
  }

  return (
    <div className={ConversationListStyles["conversation-list-container"]}>
      {conversations?.map((conversation: Conversation, index: number) => {
        return (
          <ConversationItemComponent
            key={index}
            conversation={conversation}
            handleConversationClick={() => {
              handleConversationClick(conversation);
            }}
          />
        );
      })}
    </div>
  );
}

export default ConversationListComponent;
