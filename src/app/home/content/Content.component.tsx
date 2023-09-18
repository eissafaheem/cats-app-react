import React, { useEffect, useRef, useState } from "react";
import { AVATARS } from "../../_shared/utils/constatnts";
import ContentStyles from "./Content.module.css";
import InputComponent from "../../_shared/components/input/Input.component";
import ButtonComponent from "../../_shared/components/button/Button.component";
import sendIcon from "./../../../assets/send-icon.svg";
import bg from "./../../../assets/chat-bg2.avif";
import { useLocation } from "react-router-dom";
import { ConversationManagementService } from "../../../client/services/conversation-management.service";
import { MessageanagementService } from "../../../client/services/message-management.service";
import { Message } from "../../../client/models/Entities/Message";
import {
  LocalKeys,
  LocalStorage,
} from "../../../client/models/classes/businessLogic/LocalStorage";
import { SocketIoService } from "../../../client/services/socket-io.service";
import { SocketIoEvent } from "../../../client/models/Entities/SocketIoEvents";

function ContentComponent() {
  const [message, setMessage] = useState<string>("");
  const [myId, setMyId] = useState<string>("");
  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const location = useLocation();
  const { _id, name, users, lastMessage, isPinned } = location.state;
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const socketIoService = new SocketIoService();
  
  useEffect(() => {
    setMyId(new LocalStorage().getData(LocalKeys.USER_DETAILS)._id);
    setMessage("");
    setAllMessages([]);
    getAllMessages();
    recieveMessage();

    return () => {
      socketIoService.unregisterEvent(SocketIoEvent.RECIEVE_MESSAGE, () => {});
      socketIoService.unregisterEvent(SocketIoEvent.SEND_MESSAGE, () => {});
    };
  }, [_id]);
  
  async function getAllMessages() {
    const messageManagementService = new MessageanagementService();
    try {
      const getMessageResult = await messageManagementService.getAllMessages(
        _id,
      );
      if (getMessageResult.errorCode === 0) {
        setAllMessages(getMessageResult.messages);
      } else {
        alert("failure");
      }
    } catch (err) {
      console.error(err)
      alert("Something went wrong!");
    }
  }

  async function addMessage(event: any) {
    event.preventDefault();
    try {
      const messageManagementService = new MessageanagementService();
      const newMessage = new Message(null, message, myId, _id, undefined);
      const addMessageResult = await messageManagementService.addMessage(
        newMessage,
        location.state
      );
      if (addMessageResult.errorCode === 0) {
        addMessageInDom(addMessageResult.message);
      } else {
        alert("failure");
      }
    } catch (err) {
      console.error(err)
      alert("Something went wrong");
    }
  }

  function addMessageInDom(newMessage: Message) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add( newMessage.senderId === myId ? ContentStyles["my-message"]: ContentStyles["other-message"]);
    const messageSpan = document.createElement("span");
    messageSpan.innerText = newMessage.content || "";

    if (messageContainerRef.current) {
      messageDiv.appendChild(messageSpan);
      messageContainerRef.current.appendChild(messageDiv);
    }
  }

  function recieveMessage(){
    socketIoService.recieveEvent(SocketIoEvent.RECIEVE_MESSAGE, (data)=>{
      console.log("From chat");
      console.log(data);
      addMessageInDom(data);
    })

  }

  return (
    <div className={ContentStyles["content-container"]}>
      <div className={ContentStyles["header"]}>
        <div className={ContentStyles["profile-avatar"]}>
          <img src={AVATARS[0]} alt="" />
        </div>
        <div className={ContentStyles["user"]}>
          <div className={ContentStyles["name"]}>{name}</div>
          <div className={ContentStyles["status"]}>Online</div>
        </div>
      </div>
      <div
        className={ContentStyles["message-container"]}
        ref={messageContainerRef}
      >
        {allMessages.map((message, index) => {
          return (
            <div
              key={index}
              className={`${
                message.senderId === myId
                  ? ContentStyles["my-message"]
                  : ContentStyles["other-message"]
              }`}
            >
              <span>{message.content}</span>
            </div>
          );
        })}
      </div>
      <form className={ContentStyles["footer"]} onSubmit={addMessage}>
        <div className={ContentStyles["input"]}>
          <InputComponent placeholder="Type message..." setValue={setMessage} />
        </div>
        <div className={ContentStyles["button"]}>
          <ButtonComponent icon={sendIcon} onClick={addMessage} />
        </div>
      </form>
    </div>
  );
}

export default ContentComponent;
