import { useDispatch } from "react-redux"
import { useTypedSelector } from "../store"

export const useCustomSelector = () => {

    const selectors = useTypedSelector(state => state);

    const getAllConversationState = () => {
        return selectors.conversationReducer.allConversations
    }

    return {
        getAllConversationState
    }
}