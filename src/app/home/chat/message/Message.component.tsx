import React from "react";
import MessageStyles from "./Message.module.css";
import {
  Message,
  MessageResponse,
} from "../../../../client/models/Entities/Message";

type MessageProps = {
  message: MessageResponse;
  myId: string;
  isGroup: boolean;
};

function MessageComponent(props: MessageProps) {
  const { message, myId, isGroup } = props;
  return (
    <>
      <div
        className={`${
          message.sender._id === myId
            ? MessageStyles["my-message"]
            : MessageStyles["other-message"]
        }`}
      >
        <span>
          {isGroup && message.sender._id !== myId && (
            <div className={MessageStyles["name"]}>{message.sender.name}</div>
          )}
          {message.content}
        </span>
      </div>
    </>
  );
}

export default MessageComponent;
