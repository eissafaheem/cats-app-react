import React from "react";
import ConversationItemStyles from "./ConversationItem.module.css";
import { useNavigate } from "react-router-dom";
import { User } from "../../../../../client/models/Entities/User";
import { Conversation } from "../../../../../client/models/Entities/Conversation";
import { AVATARS } from "../../../../_shared/utils/constatnts";

type ConversationItemProps = {
  conversation: Conversation;
  setIsChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function ConversationItemComponent(props: ConversationItemProps) {
  const { setIsChatOpen } = props;

  const { _id, name, users, lastMessage, isPinned } = props.conversation;
  const navigate = useNavigate();

  function handleConversationClick() {
    navigate("chat", { state: props.conversation});
    setIsChatOpen(true);
  }

  return (
    <div
      className={ConversationItemStyles["conversation-item-container"]}
      onClick={handleConversationClick}
    >
      <div className={ConversationItemStyles["profile-pic"]}>
        <img src={AVATARS[users[0].avatarId]} alt="Avatar" />
      </div>
      <div className={ConversationItemStyles["user"]}>
        <div className={ConversationItemStyles["line-1"]}>
          <div className={ConversationItemStyles["user-name"]}>{name}</div>
          <div className={ConversationItemStyles["timestamp"]}>{lastMessage}</div>
        </div>
        <div className={ConversationItemStyles["line-2"]}>
          <div className={ConversationItemStyles["last-message"]}>
            {lastMessage}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConversationItemComponent;
