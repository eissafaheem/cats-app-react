import { useEffect, useState } from "react";
import { SocketIoService } from "../../client/services/socket-io.service";
import { Conversation } from "../../client/models/Entities/Conversation";
import { SocketIoEvent } from "../../client/models/Entities/SocketIoEvents";
import { LocalKeys, LocalStorage } from "../../client/models/classes/businessLogic/LocalStorage";
import { User } from "../../client/models/Entities/User";
import { ConversationManagementService } from "../../client/services/conversation-management.service";

export const useHomeHook = () => {

    const [selectedConversation, setSelectedConversation] = useState<Conversation>(new Conversation());
    const socketIoService = new SocketIoService();
    const [searchString, setSearchString] = useState<string>("");
    const [isNewConversationModalVisible, setIsNewConversationModalVisible] =
        useState<boolean>(false);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const modalDiv = document.getElementById("modal");

    useEffect(() => {
        establishSocketioConnection();
        return () => {
            socketIoService.unregisterEvent(SocketIoEvent.JOIN_MY_ROOM, () => { });
            socketIoService.unregisterEvent(SocketIoEvent.JOINED, () => { });
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

    useEffect(()=>{
        console.log("From home", conversations)
    },[conversations])

    async function getConversations() {
        const conversationManagementService = new ConversationManagementService();
        try {
            const getConversationResult =
                await conversationManagementService.getAllConversations();
            if (getConversationResult.errorCode === 0) {
                const conversatiosArray = handleConversationName(
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

    function handleConversationName(conversations: Conversation[]): Conversation[] {
        const myId = new LocalStorage().getData(LocalKeys.USER_DETAILS)._id;
        return conversations.map(conversation => {
            return {
                ...conversation,
                name: conversation.users.find(user => user._id !== myId)?.name || "Unnamed Conversation"
            };
        });
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
        selectedConversation
    };
}