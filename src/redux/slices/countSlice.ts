import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CountState {
    count: number
}

const initialState: CountState = {
    count: 0
}

const countSlice = createSlice({
    initialState,
    name: "Count",
    reducers: {
        increment: (state: CountState, action: PayloadAction<number>) => {
            state.count += action.payload;
        },
        decrement: (state: CountState, action: PayloadAction<number>) => {
            state.count -= action.payload;
        }
    }

})

export const { decrement, increment } = countSlice.actions;
export default countSlice.reducer;