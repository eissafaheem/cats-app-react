import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Conversation } from '../../client/models/Entities/Conversation';
import { useState } from 'react';
import { addConversationReducer, removeConversationReducer } from '../reducers/conversationReducers';



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
        removeConversation: removeConversationReducer
    }
})

export const { addConversation, removeConversation } = conversationSlice.actions;
export default conversationSlice.reducer;