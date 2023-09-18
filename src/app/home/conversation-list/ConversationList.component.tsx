import React from "react";
import ConversationListStyles from "./ConversationList.module.css";
import ConversationItemComponent from "./conversation-item/ConversationItem.component";
import { Conversation } from "../../../client/models/Entities/Conversation";
import { useNavigate } from "react-router-dom";

type ConversationListProps = {
  setSelectedConversation: React.Dispatch<React.SetStateAction<Conversation>>;
  conversations: Conversation[];
};

function ConversationListComponent(props: ConversationListProps) {
  const { setSelectedConversation, conversations } = props;
  const navigate = useNavigate();

  function handleConversationClick(conversation: Conversation) {
    setSelectedConversation(conversation);
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
