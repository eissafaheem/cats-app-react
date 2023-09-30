import React from "react";
import ConversationListStyles from "./ConversationList.module.css";
import ConversationItemComponent from "./conversation-item/ConversationItem.component";
import { Conversation } from "../../../client/models/Entities/Conversation";
import { useNavigate } from "react-router-dom";
import { useNewConversationModalHook } from "../new-conversation-modal/NewConversationModal.hook";
import { useConversationListHook } from "./ConversationList.hook";

export type ConversationListProps = {
  setSelectedConversation: React.Dispatch<React.SetStateAction<Conversation>>;
  conversations: Conversation[];
  setAllConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
  allConversations: Conversation[];
};

function ConversationListComponent(props: ConversationListProps) {
  const { conversations, handleConversationClick } =
    useConversationListHook(props);

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
