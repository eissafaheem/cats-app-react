import React, { useEffect, useState } from "react";
import NewComversationModalStyles from "./NewConversationModal.module.css";
import InputComponent from "../../_shared/components/input/Input.component";
import searchIcon from "./../../../assets/search-icon.svg";
import { Conversation } from "../../../client/models/Entities/Conversation";
import { useNewConversationModalHook } from "./NewConversationModal.hook";
import { User } from "../../../client/models/Entities/User";
import UserItemComponent from "../../_shared/user-item/UserItem.component";
import ButtonComponent from "../../_shared/components/button/Button.component";
import ChipConponent from "../../_shared/components/chip/Chip.conponent";

export type NewConversationProps = {
  setIsNewConversationModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
  conversations: Conversation[];
};

function NewConversationModalComponent(props: NewConversationProps) {
  const {
    handleClose,
    setSearchToken,
    users,
    addConversation,
    myDetails,
    conversationType,
    setConversationType,
    handleSelectUser,
    selectedUsers,
    setGroupName,
  } = useNewConversationModalHook(props);

  return (
    <div className={NewComversationModalStyles["new-conversation-container"]}>
      <div
        className={NewComversationModalStyles["closeDiv"]}
        onClick={handleClose}
      ></div>
      <div className={NewComversationModalStyles["modal"]}>
        <header>
          <h3
            className={`${conversationType === "single-chat" &&
              NewComversationModalStyles["selected"]
              }`}
            onClick={() => setConversationType("single-chat")}
          >
            New Chat
          </h3>
          <h3
            className={`${conversationType === "group-chat" &&
              NewComversationModalStyles["selected"]
              }`}
            onClick={() => setConversationType("group-chat")}
          >
            New Group
          </h3>
        </header>
        <div className={NewComversationModalStyles["content"]}>
          <div
            className={`${conversationType === "group-chat" &&
              NewComversationModalStyles["inputs"]
              }`}
          >
            <InputComponent
              placeholder="Search users"
              setValue={setSearchToken}
              icon={searchIcon}
            />
            {conversationType === "group-chat" && (
              <InputComponent
                placeholder="Group name"
                setValue={setGroupName}
              />
            )}
          </div>
          <div className={NewComversationModalStyles["user-list"]}>
            {users.map((user: User, index: number) => {
              return (
                <UserItemComponent
                  key={index}
                  myEmail={myDetails.email}
                  onClick={() => handleSelectUser(user)}
                  user={user}
                />
              );
            })}
          </div>
        </div>
        <footer>
          <div className={NewComversationModalStyles["grid-item"]}>
            <div className={NewComversationModalStyles["chip-container"]}>
              {selectedUsers.map((user: User, index: number) => {
                return (
                  <ChipConponent
                    key={index}
                    onCrossClick={() => { handleSelectUser(user) }}
                    text={user.email || ""}
                  />
                );
              })}
            </div>
          </div>
          <div className={NewComversationModalStyles["grid-item"]}>
            <ButtonComponent
              text={
                conversationType === "single-chat"
                  ? "Start Chat"
                  : "Create Group"
              }
              onClick={addConversation}
            />
          </div>
        </footer>
      </div>
    </div>
  );
}

export default NewConversationModalComponent;
