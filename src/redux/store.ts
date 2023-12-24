import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import countReducer, { CountState } from './slices/countSlice'
import conversationReducer, { ConversationState } from './slices/conversationSlice'

interface RootState {
    countReducer: CountState,
    conversationReducer: ConversationState
}

const store = configureStore({
    reducer: {
        countReducer: countReducer,
        conversationReducer: conversationReducer
    }
})


export default store;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;