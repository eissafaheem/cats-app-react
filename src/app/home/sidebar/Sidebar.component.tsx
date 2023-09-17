import React, { useEffect, useState } from "react";
import SidebarStyles from "./Sidebar.module.css";
import brandLogo from "./../../../assets/brand-logo.svg";
import InputComponent from "../../_shared/components/input/Input.component";
import searchIcon from "./../../../assets/search-icon.svg";
import addIcon from "./../../../assets/add-icon.svg";
import ButtonComponent from "../../_shared/components/button/Button.component";
import ConversationListComponent from "./conversation-list/ConversationList.component";
import { ConversationManagementService } from "../../../client/services/conversation-management.service";
import { Conversation } from "../../../client/models/Entities/Conversation";
import {
  LocalKeys,
  LocalStorage,
} from "../../../client/models/classes/businessLogic/LocalStorage";
import NewConversationModalComponent from "./new-conversation-modal/NewConversationModal.component";

type SidebarProps = {
  setIsChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function SidebarComponent(props: SidebarProps) {
  const { setIsChatOpen } = props;

  const [searchString, setSearchString] = useState<string>("");
  const [isNewConversationModalVisible, setIsNewConversationModalVisible] =
    useState<boolean>(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const modalDiv = document.getElementById("modal");

  useEffect(() => {
    getConversations();
  }, []);

  useEffect(() => {
    console.log(conversations);
  }, [conversations]);

  async function getConversations() {
    const conversationManagementService = new ConversationManagementService();
    try {
      const getConversationResult =
        await conversationManagementService.getAllConversations();
      if (getConversationResult.errorCode === 0) {
        const conversatiosArray = handleConversationName(
          getConversationResult.conversation
        );
        console.log("conversatiosArray", conversatiosArray);
        setConversations(conversatiosArray);
      } else {
        alert(getConversationResult.errorMessage);
      }
    } catch (err) {
      console.log(err);
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
    <div className={SidebarStyles["sidebar-container"]}>
      <div className={SidebarStyles["header"]}>
        <div className={SidebarStyles["brand-logo"]}>
          <img src={brandLogo} alt="Cat's App Logo" />
        </div>
        <div className={SidebarStyles["brand-name"]}>Cat's App</div>
      </div>
      <div className={SidebarStyles["sidebar-options"]}>
        <div className={SidebarStyles["input"]}>
          <InputComponent
            setValue={setSearchString}
            icon={searchIcon}
            placeholder="Search people"
          />
        </div>
        <div className={SidebarStyles["button"]}>
          <ButtonComponent icon={addIcon} onClick={openNewConversationModal} />
        </div>
      </div>
      <ConversationListComponent
        setIsChatOpen={setIsChatOpen}
        conversations={conversations}
      />
      {isNewConversationModalVisible && (
        <NewConversationModalComponent
          setIsNewConversationModalVisible={setIsNewConversationModalVisible}
          setConversations={setConversations}
          conversations={conversations}
        />
      )}
    </div>
  );
}

export default SidebarComponent;
