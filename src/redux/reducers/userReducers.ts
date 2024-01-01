import { PayloadAction } from "@reduxjs/toolkit"
import { User } from "../../client/models/Entities/User"
import { UserState } from "../slices/userSlice"

export const getUserDetailsReducer = (state: UserState) =>{
    return state.userDetails;
}

export const setUserDetailsReducer = (state: UserState, action: PayloadAction<User>) =>{
    state.userDetails = action.payload;
}