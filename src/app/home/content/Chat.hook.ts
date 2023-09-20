import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { ConversationManagementService } from "../../../client/services/conversation-management.service";
import { MessageanagementService } from "../../../client/services/message-management.service";
import { Message } from "../../../client/models/Entities/Message";
import {
    LocalKeys,
    LocalStorage,
} from "../../../client/models/classes/businessLogic/LocalStorage";
import { SocketIoService } from "../../../client/services/socket-io.service";
import { SocketIoEvent } from "../../../client/models/Entities/SocketIoEvents";
import { Conversation } from "../../../client/models/Entities/Conversation";
import { ChatComponentProps } from "./Chat.component";
import ChatStyles from "./Chat.module.css";


export const useChatHook = (props: ChatComponentProps) => {
    const [message, setMessage] = useState<string>("");
    const [myId, setMyId] = useState<string>("");
    const [allMessages, setAllMessages] = useState<Message[]>([]);
    const messageContainerRef = useRef<HTMLDivElement>(null);
    const scrollFlagRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const socketIoService = new SocketIoService();

    const {
        setSelectedConversation,
        selectedConversation,
        allConversations,
        setAllConversations
    } = props;

    useEffect(() => {
        socketIoService.recieveEvent(SocketIoEvent.RECIEVE_MESSAGE, handleReceiveMessage);
        console.log(allConversations, selectedConversation);
        
        return () => {
            socketIoService.unregisterEvent(SocketIoEvent.RECIEVE_MESSAGE, handleReceiveMessage);
        };
    }, [allConversations, selectedConversation]);
    
    const handleReceiveMessage = (data: any) => {
        if (data.conversation._id === selectedConversation._id) {
            addMessageInDom(data.message);
        } else {
            markConversationAsUnread(data.conversation);
        }
    };

    useEffect(() => {
        setMyId(new LocalStorage().getData(LocalKeys.USER_DETAILS)._id);
        setMessage("");
        setAllMessages([]);
        getAllMessages();

    }, [selectedConversation._id]);

    async function getAllMessages() {
        const messageManagementService = new MessageanagementService();
        try {
            if (selectedConversation._id) {
                const getMessageResult = await messageManagementService.getAllMessages(
                    selectedConversation._id
                );
                if (getMessageResult.errorCode === 0) {
                    setAllMessages(getMessageResult.messages);
                } else {
                    alert("failure");
                }
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong!");
        }
    }

    async function addMessage(event: any) {
        event.preventDefault();
        
        if(inputRef.current){
            inputRef.current.value="";
        }

        try {
            const messageManagementService = new MessageanagementService();
            const newMessage = new Message(null, message, myId, selectedConversation._id, undefined);
            const addMessageResult = await messageManagementService.addMessage(
                newMessage,
                selectedConversation
            );
            if (addMessageResult.errorCode === 0) {
                addMessageInDom(addMessageResult.message);
            } else {
                alert("failure");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        }
    }

    function addMessageInDom(newMessage: Message) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add(
            newMessage.senderId === myId
                ? ChatStyles["my-message"]
                : ChatStyles["other-message"]
        );
        const messageSpan = document.createElement("span");
        messageSpan.innerText = newMessage.content || "";

        if (messageContainerRef.current) {
            messageDiv.appendChild(messageSpan);
            messageContainerRef.current.appendChild(messageDiv);
            scrollToBottom();
        }
    }
    
    function markConversationAsUnread(conversation: Conversation) {
        let tempConversations: Conversation[] = [...allConversations]; 
        let isConversationExists = false;
        for (let i = 0; i < tempConversations.length; i++) {
            if (tempConversations[i]._id === conversation._id) {
                if(!tempConversations[i].isUnread){
                    tempConversations[i].isUnread = true;
                    isConversationExists = true;
                    break;
                }
                else{
                    return;
                }
            }
        }

        if (!isConversationExists) {
            conversation.isUnread = true;
            tempConversations.push(conversation);
        }
        setAllConversations(tempConversations); 
    }

    function scrollToBottom(){
        scrollFlagRef.current?.scrollIntoView();
    }
    
    function closeChat() {
        setSelectedConversation(new Conversation());
    }
    return {
        messageContainerRef,
        allMessages,
        closeChat,
        myId,
        addMessage,
        setMessage,
        selectedConversation,
        scrollFlagRef,
        inputRef
    };
}