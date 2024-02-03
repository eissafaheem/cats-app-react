import { useEffect, useRef, useState } from "react";
import { SocketIoService } from "../../client/services/socket-io.service";
import { Conversation } from "../../client/models/Entities/Conversation";
import { SocketIoEvent } from "../../client/models/Entities/SocketIoEvents";
import { LocalKeys, LocalStorage } from "../../client/models/classes/businessLogic/LocalStorage";
import { User } from "../../client/models/Entities/User";
import { ConversationManagementService } from "../../client/services/conversation-management.service";
import { handleConversationData } from "../_shared/utils/methods";
import { useDispatch } from "react-redux";
import { setSelectedConversation as setSelectedConversationState, addConversationArray } from "../../redux/slices/conversationSlice";
import { useTypedSelector } from "../../redux/store";
import { setUserDetails } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../_shared/utils/constatnts";


export const useHomeHook = () => {

    const selectors = useTypedSelector(state => state);
    const selectedConversation = selectors.conversationReducer.selectedConversation;
    const myDetails = selectors.userReducer.userDetails;
    const socketIoService = new SocketIoService();
    const [searchString, setSearchString] = useState<string>("");
    const [isProfileVisible, setIsProfileVisible] = useState<boolean>(false);
    const [isNewConversationModalVisible, setIsNewConversationModalVisible] = useState<boolean>(false);
    const dispatch = useDispatch();
    const [userDetailsState, setUserDetailsState] = useState<User>(new LocalStorage().getData(LocalKeys.USER_DETAILS));
    const navigate = useNavigate();

    useEffect(() => {
        setMyDetails();
        getConversations();
        establishSocketioConnection();
        return () => {
            socketIoService.unregisterEvent(SocketIoEvent.JOIN_MY_ROOM, () => { });
            socketIoService.unregisterEvent(SocketIoEvent.JOINED, () => { });
        };
    }, []);

    useEffect(()=>{
        setUserDetailsState(myDetails);
    },[myDetails]);

    function establishSocketioConnection() {
        socketIoService.establishConnection(userDetailsState);
        socketIoService.emitEvent(SocketIoEvent.JOIN_MY_ROOM, userDetailsState);
    }

    function setMyDetails() {
        dispatch(setUserDetails(userDetailsState));
    }

    async function getConversations() {
        const conversationManagementService = new ConversationManagementService();
        try {
            const getConversationResult =
                await conversationManagementService.getAllConversations();
            if (getConversationResult.errorCode === 0) {
                const conversatiosArray = handleConversationData(
                    getConversationResult.conversation
                );
                setAllConversations([...conversatiosArray]);

            } else {
                alert(getConversationResult.errorMessage);
            }
        } catch (err) {
            console.error(err);
        }
    }

    function setSelectedConversation(conversation: Conversation) {
        dispatch(setSelectedConversationState(conversation));
    }

    function setAllConversations(conversationArr: Conversation[]) {
        dispatch(addConversationArray(conversationArr));
    }

    function openNewConversationModal() {
        navigate(ROUTES.home.newConversation)
    }

    function onSearchStringCHange(event: React.FormEvent<HTMLInputElement>) {
        setSearchString(event.currentTarget.value);
    }

    function handleProfileClick(){
        console.log("kjb")
        navigate(ROUTES.home.profile)
    }

    return {
        setSearchString,
        openNewConversationModal,
        setSelectedConversation,
        isNewConversationModalVisible,
        setIsNewConversationModalVisible,
        selectedConversation,
        isProfileVisible,
        setIsProfileVisible,
        onSearchStringCHange,
        userDetailsState,
        handleProfileClick
    };
}