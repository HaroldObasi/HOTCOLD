import { createSlice } from "@reduxjs/toolkit";

interface states {
    name?: string;
}

const initialState: states = {
    name: ""
};

export const playerSlice = createSlice({
    name: "name",
    initialState,
    reducers: {
        setName: (state, action) =>{
            state.name = action.payload.name;
        }
    }
})


export const { setName } =
  playerSlice.actions;
export default playerSlice.reducer;
