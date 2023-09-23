import { useEffect, useState } from "react";
import { UserManagementService } from "../../../client/services/user-management.service";
import { User } from "../../../client/models/Entities/User";
import { ConversationManagementService } from "../../../client/services/conversation-management.service";
import { Conversation } from "../../../client/models/Entities/Conversation";
import {
    LocalKeys,
    LocalStorage,
} from "../../../client/models/classes/businessLogic/LocalStorage";
import { handleConversationData } from "../../_shared/utils/methods";
import { NewConversationProps } from "./NewConversationModal.component";

export const useNewConversationModalHook = (props: NewConversationProps) => {

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
        } catch (err) { }
    }

    async function addConversation(user: User) {
        try {
            const conversationManagementService = new ConversationManagementService();
            const myDetails = new LocalStorage().getData(LocalKeys.USER_DETAILS);
            const myId = myDetails._id;
            let conversation = new Conversation(
                null,
                null,
                [user._id, myId],
                "Start meowing...",
                false
            );
            const addConversationResult =
                await conversationManagementService.addConversation(conversation);
            if (addConversationResult.errorCode === 0) {
                let tempConversationsArray: Conversation[] = [...conversations];
                let conversationToAdd = new Conversation();
                const conversationRestResult: Conversation = addConversationResult.conversation;
                const {
                    name,
                    _id,
                    isPinned,
                    isUnread,
                    lastMessage,
                    users,
                    avatarIds
                } = conversationRestResult
                console.log(conversationToAdd)
                conversationToAdd = { name, _id, isPinned, lastMessage, users, isUnread, avatarIds };
                console.log(conversationToAdd)
                conversationToAdd = handleConversationData([conversationToAdd])[0];
                tempConversationsArray.push(conversationToAdd);
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


    return {
        handleClose,
        setSearchToken,
        users,
        addConversation
    };
}