import { AVATARS } from "../../_shared/utils/constatnts";
import ChatStyles from "./Chat.module.css";
import InputComponent from "../../_shared/components/input/Input.component";
import ButtonComponent from "../../_shared/components/button/Button.component";
import sendIcon from "./../../../assets/send-icon.svg";
import bg from "./../../../assets/chat-bg2.avif";

import { Conversation } from "../../../client/models/Entities/Conversation";
import { useChatHook } from "./Chat.hook";
import { Message } from "../../../client/models/Entities/Message";

export type ChatComponentProps = {
  selectedConversation: Conversation;
  setSelectedConversation: React.Dispatch<React.SetStateAction<Conversation>>;
  setAllConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
  allConversations: Conversation[];
};

function ChatComponent(props: ChatComponentProps) {
  const {
    messageContainerRef,
    allMessages,
    closeChat,
    myId,
    addMessage,
    setMessage,
    selectedConversation,
    scrollFlagRef,
    inputRef
  } = useChatHook(props);
  
  return (
    <>
      {selectedConversation._id ? (
        <div className={ChatStyles["content-container"]}>
          <div className={ChatStyles["header"]}>
            <div className={ChatStyles["profile-avatar"]}>
              <img src={AVATARS[selectedConversation.avatarIds[0]]} alt="" />
            </div>
            <div className={ChatStyles["user"]}>
              <div className={ChatStyles["name"]}>{selectedConversation.name}</div>
              <div className={ChatStyles["status"]}>Online</div>
            </div>
            <div className={ChatStyles["close-chat"]} onClick={closeChat}>
              X
            </div>
          </div>
          <div
            className={ChatStyles["message-container"]}
            ref={messageContainerRef}
          >
            {allMessages.map((message: Message, index: number) => {
              return (
                <div
                  key={index}
                  className={`${
                    message.senderId === myId
                      ? ChatStyles["my-message"]
                      : ChatStyles["other-message"]
                  }`}
                >
                  <span>{message.content}</span>
                </div>
              );
            })}
            <div id="scrollFlag" ref={scrollFlagRef}></div>
          </div>
          <form className={ChatStyles["footer"]} onSubmit={addMessage}>
            <div className={ChatStyles["input"]}>
              <InputComponent
                placeholder="Type message..."
                setValue={setMessage}
                inputRef={inputRef}
              />
            </div>
            <div className={ChatStyles["button"]}>
              <ButtonComponent icon={sendIcon} onClick={addMessage} />
            </div>
          </form>
        </div>
      ) : (
        "No Chat Selected"
      )}
    </>
  );
}

export default ChatComponent;
