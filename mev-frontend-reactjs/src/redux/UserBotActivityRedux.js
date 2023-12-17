import { createSlice } from "@reduxjs/toolkit";

const UserBotActivitySlice = createSlice({
    name: "botActivity",
    initialState: {
        allBotActivity: [],
    },
    reducers: {
        storeBotActivities: (state, action) => {
            if (Array.isArray(action.payload) && action.payload.length === 0) {
                console.log("empty")
                state.allBotActivity = [];
            } else {
                console.log(action.payload)
                state.allBotActivity = action.payload;
            }
        },
    },
});

export const { storeBotActivities } = UserBotActivitySlice.actions;
export default UserBotActivitySlice.reducer;
