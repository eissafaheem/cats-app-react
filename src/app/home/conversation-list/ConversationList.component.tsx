import React from "react";
import ConversationListStyles from "./ConversationList.module.css";
import ConversationItemComponent from "./conversation-item/ConversationItem.component";
import { Conversation } from "../../../client/models/Entities/Conversation";

type ConversationListProps = {
  setIsChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
  conversations: Conversation[];
};

function ConversationListComponent(props: ConversationListProps) {
  const { setIsChatOpen, conversations } = props;
  return (
    <div className={ConversationListStyles["conversation-list-container"]}>
      {conversations?.map((conversation: Conversation, index: number) => {
        return (
          <ConversationItemComponent
            key={index}
            conversation= {conversation}
            setIsChatOpen={setIsChatOpen}
          />
        );
      })}
    </div>
  );
}

export default ConversationListComponent;
