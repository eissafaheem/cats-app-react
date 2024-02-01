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
import { CONVERSATION_TYPES } from "../../_shared/utils/constatnts";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../redux/store";
import { addConversationArray } from "../../../redux/slices/conversationSlice";

export const useNewConversationModalHook = () => {

    const [searchToken, setSearchToken] = useState<string>("");
    const [groupName, setGroupName] = useState<string>("");
    const [conversationType, setConversationType] = useState<CONVERSATION_TYPES>('single-chat');
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
    const dispatch = useDispatch();
    const selector = useTypedSelector(state => state);
    const allConversations = selector.conversationReducer.allConversations

    const myDetails = new LocalStorage().getData(LocalKeys.USER_DETAILS);
    useEffect(() => {
        if (searchToken.length) {
            handleSearchUsers();
        }
        else {
            setUsers([]);
        }
    }, [searchToken]);

    useEffect(() => {
        setSelectedUsers([]);
        setGroupName("");
        setSearchToken("")
        handleSelectUser(new User());
    }, [conversationType])

    function setConversations(conversationsArr: Conversation[]) {
        dispatch(addConversationArray(conversationsArr));
    }

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

    async function addConversation() {
        try {
            const conversationManagementService = new ConversationManagementService();
            const myId = myDetails._id;
            let conversation = new Conversation(
                null,
                groupName,
                [...selectedUsers, myId],
                `${myDetails.name} ${selectedUsers.length === 1 ? "started a chat" : "created a group"}`,
                false
            );
            const addConversationResult =
                await conversationManagementService.addConversation(conversation);
            if (addConversationResult.errorCode === 0) {
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
                conversationToAdd = { name, _id, isPinned, lastMessage, users, isUnread, avatarIds };
                conversationToAdd = handleConversationData([conversationToAdd])[0];
                setConversations([...[conversationToAdd], ...allConversations]);
                // setIsNewConversationModalVisible(false);
            } else {
                alert(addConversationResult.errorMessage);
            }
        } catch (err) {
            console.error(err);
            alert("Failed");
        }
    }

    function handleSelectUser(user: User) {
        if (!user._id) {
            for (let i = 0; i < users.length; i++) {
                if (users[i]._id !== user._id) {
                    users[i].isSelected = false;
                }
            }
            return;
        }
        user.isSelected = !user.isSelected;
        if (conversationType === "single-chat") {
            for (let i = 0; i < users.length; i++) {
                if (users[i]._id !== user._id) {
                    users[i].isSelected = false;
                }
            }
            setUsers([...users]);
            setSelectedUsers([user]);
        }
        else {
            if (user.isSelected) {
                setSelectedUsers([user, ...selectedUsers])
            }
            else {
                const tempArray = [];
                for (let i = 0; i < selectedUsers.length; i++) {
                    if (selectedUsers[i]._id !== user._id) {
                        tempArray.push(selectedUsers[i]);
                    }
                }
                setSelectedUsers(tempArray);
            }
        }
    }

    function handleClose() {
        // setIsNewConversationModalVisible(false);
    }

    function onSearchTokenChange(event: React.FormEvent<HTMLInputElement>) {
        setSearchToken(event.currentTarget.value);
    }

    function onGroupNameChange(event: React.FormEvent<HTMLInputElement>) {
        setSearchToken(event.currentTarget.value);
    }

    return {
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
        handleSearchUsers,
        onSearchTokenChange,
        onGroupNameChange
    };
}