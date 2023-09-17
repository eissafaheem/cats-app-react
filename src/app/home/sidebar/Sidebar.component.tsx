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

type SidebarProps = {
  setIsChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function SidebarComponent(props: SidebarProps) {
  const { setIsChatOpen } = props;

  const [searchString, setSearchString] = useState<string>("");
  const [conversations, setConversations] = useState<Conversation[]>([]);

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
        setConversations(getConversationResult.conversation);
        console.log(getConversationResult.conversation);
        alert(getConversationResult.errorMessage);
      } else {
        alert(getConversationResult.errorMessage);
      }
    } catch (err) {
      alert(err);
    }
  }

  function handleAddButtonClick() {
    // const conversationManagementService = new ConversationManagementService();
    // try {
    //   const addConversationResult = await conversationManagementService.addConversation(new Conversation);
    //   if()
    // } catch (err) {
    //   console.log(err);
    // }
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
          <ButtonComponent icon={addIcon} onClick={handleAddButtonClick} />
        </div>
      </div>
      <ConversationListComponent
        setIsChatOpen={setIsChatOpen}
        conversations={conversations}
      />
    </div>
  );
}

export default SidebarComponent;
