import React, { useEffect, useState } from "react";
import NewComversationModalStyles from "./NewConversationModal.module.css";
import InputComponent from "../../_shared/components/input/Input.component";
import searchIcon from "./../../../assets/search-icon.svg";
import { Conversation } from "../../../client/models/Entities/Conversation";
import { useNewConversationModalHook } from "./NewConversationModal.hook";
import { User } from "../../../client/models/Entities/User";

export type NewConversationProps = {
  setIsNewConversationModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
  conversations: Conversation[];
};

function NewConversationModalComponent(props: NewConversationProps) {
  const { handleClose, setSearchToken, users, addConversation, myDetails } =
    useNewConversationModalHook(props);

  return (
    <div className={NewComversationModalStyles["new-conversation-container"]}>
      <div className={NewComversationModalStyles["modal"]}>
        <div
          className={NewComversationModalStyles["close-icon"]}
          onClick={handleClose}
        >
          X
        </div>
        <h3>Start New Conversation</h3>
        <InputComponent
          setValue={setSearchToken}
          placeholder="Search users by email"
          icon={searchIcon}
        />
        <div className={NewComversationModalStyles["users-list"]}>
          {users.map((user: User, index: number) => {
            return (
              <div
                key={index}
                className={`${NewComversationModalStyles["user"]} ${
                  myDetails.email === user.email &&
                  NewComversationModalStyles["no-user"]
                }`}
                onClick={() => addConversation(user)}
              >
                {user.email}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default NewConversationModalComponent;
