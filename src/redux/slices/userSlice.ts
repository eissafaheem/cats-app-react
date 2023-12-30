import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../client/models/Entities/User";
import {getUserDetailsReducer, setUserDetailsReducer} from './../reducers/userReducers'

export interface UserState {
    userDetails: User,
}

const initialState: UserState = {
    userDetails: new User()
}

const userSlice = createSlice({
    initialState,
    name: "User",
    reducers:{
        setUserDetails: setUserDetailsReducer
    }
})

export const { setUserDetails } = userSlice.actions;
export default userSlice.reducer;