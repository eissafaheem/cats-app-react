import React from "react";
import ConversationListStyles from "./ConversationList.module.css";
import ConversationItemComponent from "./conversation-item/ConversationItem.component";
import { Conversation } from "../../../client/models/Entities/Conversation";
import { useNavigate } from "react-router-dom";
import { useNewConversationModalHook } from "../new-conversation-modal/NewConversationModal.hook";
import { useConversationListHook } from "./ConversationList.hook";
import emptyConversation from './../../../assets/conversation.svg'
import addIcon from './../../../assets/add-icon.svg'
import ButtonComponent from "../../_shared/components/button/Button.component";

export type ConversationListProps = {
  setSelectedConversation: React.Dispatch<React.SetStateAction<Conversation>>;
  conversations: Conversation[];
  setAllConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
  allConversations: Conversation[];
};

function ConversationListComponent(props: ConversationListProps) {
  const { conversations, handleConversationClick } =
    useConversationListHook(props);

  return (
    <div className={ConversationListStyles["conversation-list-container"]}>
      {
        conversations.length ?
          conversations?.map((conversation: Conversation, index: number) => {
            return (
              <ConversationItemComponent
                key={index}
                conversation={conversation}
                handleConversationClick={() => {
                  handleConversationClick(conversation);
                }}
              />
            );
          })
          :
          <div className={ConversationListStyles["no-conversation"]}>
            <img src={emptyConversation} alt="" className={ConversationListStyles["empty-conversation-icon"]}/>
            There's no ongoing discussion
            <ButtonComponent text="Add" icon={addIcon}/>
          </div>
      }
    </div>
  );
}

export default ConversationListComponent;
