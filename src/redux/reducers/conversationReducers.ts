import { PayloadAction } from "@reduxjs/toolkit";
import { ConversationState } from "../slices/conversationSlice";
import { Conversation } from "../../client/models/Entities/Conversation";

export const addConversationReducer = (state:ConversationState, action: PayloadAction<Conversation> )=>{
    state.allConversations.push(action.payload);
} 

export const removeConversationReducer = (state: ConversationState, action: PayloadAction<number>)=>{
    console.log("remove")
    state.allConversations.splice(action.payload,1);
}