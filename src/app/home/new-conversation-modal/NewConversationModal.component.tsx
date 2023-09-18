import React, { useEffect, useState } from "react";
import NewComversationModalStyles from "./NewConversationModal.module.css";
import InputComponent from "../../_shared/components/input/Input.component";
import searchIcon from "./../../../assets/search-icon.svg";
import { UserManagementService } from "../../../client/services/user-management.service";
import { User } from "../../../client/models/Entities/User";
import { ConversationManagementService } from "../../../client/services/conversation-management.service";
import { Conversation } from "../../../client/models/Entities/Conversation";
import { AddConversationResult } from "../../../client/models/Entities/RestResults";
import {
  LocalKeys,
  LocalStorage,
} from "../../../client/models/classes/businessLogic/LocalStorage";

type NewConversationProps = {
  setIsNewConversationModalVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setConversations: React.Dispatch<React.SetStateAction<Conversation[]>>;
  conversations: Conversation[];
};

function NewConversationModalComponent(props: NewConversationProps) {
  const [searchToken, setSearchToken] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const { setIsNewConversationModalVisible, setConversations, conversations } =
    props;

  useEffect(() => {
    if (searchToken) {
      handleSearchUsers();
    }
  }, [searchToken]);

  async function handleSearchUsers() {
    const userManagementService = new UserManagementService();
    try {
      const searchUserResult = await userManagementService.searchUser(
        searchToken
      );
      if (searchUserResult.errorCode === 0) {
        setUsers(searchUserResult.users);
      } else {
        alert(searchUserResult.errorMessage);
      }
    } catch (err) {}
  }

  async function addConversation(user: User) {
    try {
      const conversationManagementService = new ConversationManagementService();
      const myDetails = new LocalStorage().getData(LocalKeys.USER_DETAILS);
      const myId = myDetails._id;
      let conversation = new Conversation(
        null,
        user.name,
        [user._id, myId],
        null,
        false
      );
      const addConversationResult =
        await conversationManagementService.addConversation(conversation);
      if (addConversationResult.errorCode === 0) {
        let tempConversationsArray: Conversation[] = conversations;
        let conversationToAdd = new Conversation();
        conversationToAdd = addConversationResult.conversation;
        conversationToAdd.users = [user, myDetails];
        tempConversationsArray.push(addConversationResult.conversation);
        setConversations(tempConversationsArray);
        setIsNewConversationModalVisible(false);
      } else {
        alert(addConversationResult.errorMessage);
      }
    } catch (err) {
      console.error(err);
      alert("Failed");
    }
  }

  function handleClose() {
    setIsNewConversationModalVisible(false);
  }

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
          {users.map((user, index) => {
            return (
              <div
                key={index}
                className={NewComversationModalStyles["user"]}
                onClick={() => {
                  addConversation(user);
                }}
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
