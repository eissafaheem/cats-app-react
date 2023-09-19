import React from "react";
import ConversationItemStyles from "./ConversationItem.module.css";
import { useNavigate } from "react-router-dom";
import { User } from "../../../../client/models/Entities/User";
import { Conversation } from "../../../../client/models/Entities/Conversation";
import { AVATARS } from "../../../_shared/utils/constatnts";
import { timeStamp } from "console";

type ConversationItemProps = {
  conversation: Conversation;
  handleConversationClick: () => void;
};

function ConversationItemComponent(props: ConversationItemProps) {
  const { handleConversationClick } = props;

  const { _id, name, users, lastMessage, isPinned, isUnread ,avatarIds} =
    props.conversation;

  return (
    <div
      className={ConversationItemStyles["conversation-item-container"]}
      onClick={handleConversationClick}
    >
      <div className={ConversationItemStyles["profile-pic"]}>
        <img src={AVATARS[avatarIds[0]]} alt="Avatar" />
      </div>
      <div className={ConversationItemStyles["user"]}>
        <div className={ConversationItemStyles["line-1"]}>
          <div className={ConversationItemStyles["user-name"]}>{name}</div>
          {isUnread && <div className={ConversationItemStyles["unread"]}></div>}
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
