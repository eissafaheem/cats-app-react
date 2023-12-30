import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { ConversationManagementService } from "../../../client/services/conversation-management.service";
import { MessageanagementService } from "../../../client/services/message-management.service";
import { Message, MessageRequest, MessageResponse } from "../../../client/models/Entities/Message";
import {
    LocalKeys,
    LocalStorage,
} from "../../../client/models/classes/businessLogic/LocalStorage";
import { SocketIoService } from "../../../client/services/socket-io.service";
import { SocketIoEvent } from "../../../client/models/Entities/SocketIoEvents";
import { Conversation } from "../../../client/models/Entities/Conversation";
import { ChatComponentProps } from "./Chat.component";
import ChatStyles from "./Chat.module.css";
import { AddMessageResult } from "../../../client/models/Entities/RestResults";
import { UserManagementService } from "../../../client/services/user-management.service";
import { User } from "../../../client/models/Entities/User";
import { userInfo } from "os";
import { useTypedSelector } from "../../../redux/store";
import { useDispatch } from "react-redux";
import { addConversationArray, setSelectedConversation as setSelectedConversationState } from "../../../redux/slices/conversationSlice";


export const useChatHook = (props: ChatComponentProps) => {
    const [message, setMessage] = useState<string>("");
    const [allMessages, setAllMessages] = useState<MessageResponse[]>([]);
    const messageContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const socketIoService = new SocketIoService();
    const selectors = useTypedSelector(state => state);
    const allConversations = selectors.conversationReducer.allConversations
    const selectedConversation = selectors.conversationReducer.selectedConversation;
    const dispatch = useDispatch();

    const {
        myDetails,
        setMyDetails
    } = props;

    useEffect(() => {
        scrollToBottom();
    }, [allMessages])


    useEffect(() => {
        setMessage("");
        setAllMessages([]);
        getAllMessages();
    }, [selectedConversation]);


    function setAllConversations(allConversationsLocal: Conversation[]) {
        dispatch(addConversationArray(allConversationsLocal));
    }

    function setSelectedConversation(conversation: Conversation) {
        dispatch(setSelectedConversationState(conversation));
    }

    useEffect(() => {
        socketIoService.recieveEvent(SocketIoEvent.RECIEVE_MESSAGE, handleReceiveMessage);

        return () => {
            socketIoService.unregisterEvent(SocketIoEvent.RECIEVE_MESSAGE, handleReceiveMessage);
        };
    }, [allConversations, selectedConversation, allMessages]);


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

        if (inputRef.current) {
            inputRef.current.value = "";
        }

        try {
            const messageManagementService = new MessageanagementService();
            const newMessage = new MessageRequest(null, myDetails._id, message, selectedConversation._id, undefined);
            const addMessageResult: AddMessageResult = await messageManagementService.addMessage(
                newMessage,
                selectedConversation
            );
            if (addMessageResult.errorCode === 0) {
                addMessageInDom(addMessageResult.message);
                addLastMessageInDom(selectedConversation, addMessageResult.message.content || "");
                handlePawints(addMessageResult.message.content || "");
            } else {
                alert("failure");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        }
    }

    function addMessageInDom(newMessage: MessageResponse) {
        setAllMessages([...allMessages, newMessage]);
    }

    async function handlePawints(message: string) {
        const meowCount = (message.match(/meow/g) || []).length;
        if (meowCount > 0) {
            const userManagementService = new UserManagementService();
            const updateUser = new User(myDetails._id);
            updateUser.pawints = myDetails.pawints + meowCount;
            const updateUserResult = await userManagementService.updateUser(updateUser);
            if (updateUserResult.errorCode === 0) {
                new LocalStorage().setData(LocalKeys.USER_DETAILS, updateUserResult.user);
                setMyDetails(updateUserResult.user);
            }
        }
    }

    const handleReceiveMessage = (data: any) => {
        addLastMessageInDom(data.conversation, data.message.content)
        if (data.conversation._id === selectedConversation._id) {
            addMessageInDom(data.message);
        } else {
            markConversationAsUnread(data.conversation);
        }
    };

    function markConversationAsUnread(conversation: Conversation) {
        let tempConversations: Conversation[] = [...allConversations];
        let isConversationExists = false;
        for (let i = 0; i < tempConversations.length; i++) {
            if (tempConversations[i]._id === conversation._id) {
                if (!tempConversations[i].isUnread) {
                    tempConversations[i] = {
                        ...tempConversations[i],
                        isUnread: true
                    }
                    isConversationExists = true;
                    break;
                }
                else {
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

    function addLastMessageInDom(conversation: Conversation, lastMessage: string) {
        let tempConversations: Conversation[] = [...allConversations];

        for (let i = 0; i < tempConversations.length; i++) {
            if (tempConversations[i]._id === conversation._id) {
                tempConversations[i] = {
                    ...tempConversations[i],
                    lastMessage: lastMessage
                }
                break;
            }
        }
        setAllConversations(tempConversations);
    }

    function scrollToBottom() {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current?.scrollHeight;
        }
    }

    function closeChat() {
        setSelectedConversation(new Conversation());
    }

    function onMessageChange(event: React.FormEvent<HTMLInputElement>) {
        setMessage(event.currentTarget.value);
    }

    return {
        messageContainerRef,
        allMessages,
        closeChat,
        myDetails,
        addMessage,
        setMessage,
        selectedConversation,
        inputRef,
        onMessageChange
    };
}