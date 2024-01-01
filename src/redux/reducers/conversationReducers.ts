import { PayloadAction } from "@reduxjs/toolkit";
import { ConversationState } from "../slices/conversationSlice";
import { Conversation } from "../../client/models/Entities/Conversation";
import { act } from "react-dom/test-utils";

export const addConversationReducer = (state:ConversationState, action: PayloadAction<Conversation> )=>{
    console.log("call")
    state.allConversations.push(action.payload);
}

export const addConversationArrayReducer = (state: ConversationState, action: PayloadAction<Conversation[]>)=>{
    console.log("array lol")
    state.allConversations = action.payload;
}

export const removeConversationReducer = (state: ConversationState, action: PayloadAction<number>)=>{
    console.log("remove")
    state.allConversations.splice(action.payload,1);
}

export const setSelectedConversationReducer = (state: ConversationState, action: PayloadAction<Conversation>) =>{
    state.selectedConversation = action.payload;
}
