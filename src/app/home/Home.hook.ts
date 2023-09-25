import { useEffect, useState } from "react";
import { SocketIoService } from "../../client/services/socket-io.service";
import { Conversation } from "../../client/models/Entities/Conversation";
import { SocketIoEvent } from "../../client/models/Entities/SocketIoEvents";
import { LocalKeys, LocalStorage } from "../../client/models/classes/businessLogic/LocalStorage";
import { User } from "../../client/models/Entities/User";
import { ConversationManagementService } from "../../client/services/conversation-management.service";
import { handleConversationData } from "../_shared/utils/methods";

export const useHomeHook = () => {

    const [selectedConversation, setSelectedConversation] = useState<Conversation>(new Conversation());
    const socketIoService = new SocketIoService();
    const [searchString, setSearchString] = useState<string>("");
    const [isNewConversationModalVisible, setIsNewConversationModalVisible] =
        useState<boolean>(false);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const modalDiv = document.getElementById("modal");
    const userDetails: User = new LocalStorage().getData(
        LocalKeys.USER_DETAILS
    );

    useEffect(() => {
        establishSocketioConnection();
        return () => {
            socketIoService.unregisterEvent(SocketIoEvent.JOIN_MY_ROOM, () => { });
            socketIoService.unregisterEvent(SocketIoEvent.JOINED, () => { });
        };
    }, []);

    function establishSocketioConnection() {
        socketIoService.establishConnection(userDetails);
        socketIoService.emitEvent(SocketIoEvent.JOIN_MY_ROOM, userDetails);
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
                const conversatiosArray = handleConversationData(
                    getConversationResult.conversation
                );
                setConversations([...conversatiosArray]);
            } else {
                alert(getConversationResult.errorMessage);
            }
        } catch (err) {
            console.error(err);
        }
    }

    function openNewConversationModal() {
        setIsNewConversationModalVisible(true);
    }

    return {
        setSearchString,
        openNewConversationModal,
        setSelectedConversation,
        conversations,
        isNewConversationModalVisible,
        setIsNewConversationModalVisible,
        setConversations,
        selectedConversation,
        userDetails
    };
}