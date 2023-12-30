import { AVATARS } from "../../_shared/utils/constatnts";
import ChatStyles from "./Chat.module.css";
import InputComponent from "../../_shared/components/input/Input.component";
import ButtonComponent from "../../_shared/components/button/Button.component";
import sendIcon from "./../../../assets/send-icon.svg";
import emptyChat from "./../../../assets/chat.svg";
import { Conversation } from "../../../client/models/Entities/Conversation";
import { useChatHook } from "./Chat.hook";
import { Message, MessageResponse } from "../../../client/models/Entities/Message";
import MessageComponent from "./message/Message.component";
import { User } from "../../../client/models/Entities/User";

export type ChatComponentProps = {
  myDetails: User,
  setMyDetails: React.Dispatch<React.SetStateAction<User>>
};

function ChatComponent(props: ChatComponentProps) {
  const {
    messageContainerRef,
    allMessages,
    closeChat,
    myDetails,
    addMessage,
    selectedConversation,
    inputRef,
    onMessageChange
  } = useChatHook(props);

  return (
    <>
      {selectedConversation._id ? (
        <div className={ChatStyles["content-container"]}>
          <div className={ChatStyles["header"]}>
            <div className={ChatStyles["profile-pic"]}
              style={{
                gridTemplateColumns: 
                `repeat(${selectedConversation.avatarIds.length > 3 ? 3 : selectedConversation.avatarIds.length}, 1fr)`
              }}>
              {
                selectedConversation.avatarIds.slice(0, 3).map((avatar: number, index: number) => {
                  return <img key={index} src={AVATARS[selectedConversation.avatarIds[index]]} alt="Avatar" />
                })
              }
            </div>
            <div className={ChatStyles["user"]}>
              <div className={ChatStyles["name"]}>
                {selectedConversation.name}
              </div>
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
            {allMessages.map((message: MessageResponse, index: number) => {
              return (
                <MessageComponent key={index} message={message} myId={myDetails._id || ""} isGroup={selectedConversation.users.length > 2} />
              );
            })}
          </div>
          <form className={ChatStyles["footer"]} onSubmit={addMessage}>
            <div className={ChatStyles["input"]}>
              <InputComponent
                placeholder="Type message..."
                onChange={onMessageChange}
                inputRef={inputRef}
              />
            </div>
            <div className={ChatStyles["button"]}>
              <ButtonComponent icon={sendIcon} onClick={addMessage} />
            </div>
          </form>
        </div>
      ) : (
        <div className={ChatStyles["no-chat"]}>
          <img src={emptyChat} alt="" />
          Select a chat to dive into!
        </div>
      )}
    </>
  );
}

export default ChatComponent;
