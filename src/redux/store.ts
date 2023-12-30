import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import countReducer, { CountState } from './slices/countSlice'
import conversationReducer, { ConversationState } from './slices/conversationSlice'
import userReducer, { UserState } from './slices/userSlice'

export interface RootState {
    countReducer: CountState,
    conversationReducer: ConversationState
    userReducer: UserState
}

const store = configureStore({
    reducer: {
        countReducer: countReducer,
        conversationReducer: conversationReducer,
        userReducer: userReducer
    }
})


export default store;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;