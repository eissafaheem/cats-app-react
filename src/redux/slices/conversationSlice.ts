import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Conversation } from '../../client/models/Entities/Conversation';
import { useState } from 'react';
import { addConversationArrayReducer, addConversationReducer, removeConversationReducer, setSelectedConversationReducer } from '../reducers/conversationReducers';



export interface ConversationState {
    selectedConversation: Conversation;
    allConversations: Conversation[];
}

const initialState: ConversationState = {
    allConversations: [],
    selectedConversation: new Conversation(),
}

const conversationSlice = createSlice({
    initialState,
    name: "Conversation State",
    reducers: {
        addConversation: addConversationReducer,
        addConversationArray: addConversationArrayReducer, 
        removeConversation: removeConversationReducer,
        setSelectedConversation: setSelectedConversationReducer
    }
})

export const { addConversation, removeConversation, addConversationArray, setSelectedConversation } = conversationSlice.actions;
export default conversationSlice.reducer;