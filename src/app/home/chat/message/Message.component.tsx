import React from "react";
import MessageStyles from "./Message.module.css";
import { Message } from "../../../../client/models/Entities/Message";

type MessageProps = {
  message: Message;
  myId: string;
};

function MessageComponent(props: MessageProps) {
  const { message, myId } = props;
  return (
    <div
      className={`${
        message.senderId === myId
          ? MessageStyles["my-message"]
          : MessageStyles["other-message"]
      }`}
    >
      <span>{message.content}</span>
    </div>
  );
}

export default MessageComponent;
