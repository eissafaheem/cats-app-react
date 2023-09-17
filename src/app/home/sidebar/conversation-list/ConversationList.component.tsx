import React from "react";
import ConversationListStyles from "./ConversationList.module.css";
import ConversationItemComponent from "./conversation-item/ConversationItem.component";
import { AVATARS } from "../../../_shared/utils/constatnts";
import { Conversation } from "../../../../client/models/Entities/Conversation";

type ConversationListProps = {
  setIsChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
  conversations: Conversation[];
};

function ConversationListComponent(props: ConversationListProps) {
  const arr = [
    1, 2, 3, 4, 5, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1,
  ];
  const { setIsChatOpen, conversations } = props;
  return (
    <div className={ConversationListStyles["conversation-list-container"]}>
      {conversations?.map((conversation: Conversation, index: number) => {
        return (
          <ConversationItemComponent
            key={index}
            lastMessage={conversation.lastMessage || ""}
            profileAvatar={AVATARS[conversation.users[0].avatarId]}
            timeStamp="7:58"
            userName={conversation.users[0].name || ""}
            setIsChatOpen={setIsChatOpen}
          />
        );
      })}
    </div>
  );
}

export default ConversationListComponent;
