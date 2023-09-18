import React, { useEffect, useState } from "react";
import HomeStyles from "./Home.module.css";
import ContentComponent from "./content/Content.component";
import { Outlet } from "react-router-dom";
import { io } from "socket.io-client";
import { SocketIoService } from "../../client/services/socket-io.service";
import {
  LocalKeys,
  LocalStorage,
} from "../../client/models/classes/businessLogic/LocalStorage";
import { User } from "../../client/models/Entities/User";
import { SocketIoEvent } from "../../client/models/Entities/SocketIoEvents";
import InputComponent from "../_shared/components/input/Input.component";
import ButtonComponent from "../_shared/components/button/Button.component";
import ConversationListComponent from "./conversation-list/ConversationList.component";
import { Conversation } from "../../client/models/Entities/Conversation";
import { ConversationManagementService } from "../../client/services/conversation-management.service";
import NewConversationModalComponent from "./new-conversation-modal/NewConversationModal.component";
import brandLogo from "./../../assets/brand-logo.svg";
import addIcon from "./../../assets/add-icon.svg";
import searchIcon from "./../../assets/search-icon.svg";

function HomeComponent() {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const socketIoService = new SocketIoService();
  const [searchString, setSearchString] = useState<string>("");
  const [isNewConversationModalVisible, setIsNewConversationModalVisible] =
    useState<boolean>(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const modalDiv = document.getElementById("modal");

  useEffect(() => {
    establishSocketioConnection();
    return () => {
      socketIoService.unregisterEvent(SocketIoEvent.JOIN_MY_ROOM, () => {});
      socketIoService.unregisterEvent(SocketIoEvent.JOINED, () => {});
    };
  }, []);

  function establishSocketioConnection() {
    const userDetails: User = new LocalStorage().getData(
      LocalKeys.USER_DETAILS
    );
    socketIoService.establishConnection(userDetails);
    socketIoService.emitEvent(SocketIoEvent.JOIN_MY_ROOM, userDetails);
    socketIoService.recieveEvent(SocketIoEvent.JOINED, (data) => {
      console.log("joined", data);
    });
    // socketIoService.recieveEvent(SocketIoEvent.RECIEVE_MESSAGE, (data)=>{
    //   console.log("event");
    //   console.log(data);
    // })
  }

  useEffect(() => {
    getConversations();
  }, []);

  async function getConversations() {
    const conversationManagementService = new ConversationManagementService();
    try {
      const getConversationResult =
        await conversationManagementService.getAllConversations();
      if (getConversationResult.errorCode === 0) {
        const conversatiosArray = handleConversationName(
          getConversationResult.conversation
        );
        setConversations(conversatiosArray);
      } else {
        alert(getConversationResult.errorMessage);
      }
    } catch (err) {
      console.error(err);
    }
  }

  function handleConversationName(
    conversations: Conversation[]
  ): Conversation[] {
    let tempConversations: Conversation[] = conversations;
    for (let i = 0; i < tempConversations.length; i++) {
      for (let j = 0; j < tempConversations[i].users.length; j++) {
        let currUser = tempConversations[i].users[j];
        const myId = new LocalStorage().getData(LocalKeys.USER_DETAILS)._id;
        if (currUser._id !== myId) {
          tempConversations[i].name = currUser.name;
        }
      }
    }
    return tempConversations;
  }

  function openNewConversationModal() {
    setIsNewConversationModalVisible(true);
  }

  return (
    <div className={HomeStyles["home-container"]}>
      <div className={HomeStyles["sidebar"]}>
        <div className={HomeStyles["sidebar-container"]}>
          <div className={HomeStyles["header"]}>
            <div className={HomeStyles["brand-logo"]}>
              <img src={brandLogo} alt="Cat's App Logo" />
            </div>
            <div className={HomeStyles["brand-name"]}>Cat's App</div>
          </div>
          <div className={HomeStyles["sidebar-options"]}>
            <div className={HomeStyles["input"]}>
              <InputComponent
                setValue={setSearchString}
                icon={searchIcon}
                placeholder="Search people"
              />
            </div>
            <div className={HomeStyles["button"]}>
              <ButtonComponent
                icon={addIcon}
                onClick={openNewConversationModal}
              />
            </div>
          </div>
          <ConversationListComponent
            setIsChatOpen={setIsChatOpen}
            conversations={conversations}
          />
          {isNewConversationModalVisible && (
            <NewConversationModalComponent
              setIsNewConversationModalVisible={
                setIsNewConversationModalVisible
              }
              setConversations={setConversations}
              conversations={conversations}
            />
          )}
        </div>
      </div>
      <div
        className={`${HomeStyles["content"]} ${
          isChatOpen && HomeStyles["content-open"]
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default HomeComponent;
