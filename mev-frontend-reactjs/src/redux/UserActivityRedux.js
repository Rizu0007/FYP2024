import { createSlice } from "@reduxjs/toolkit";

const UserActivitySlice = createSlice({
    name: "activity",
    initialState: {
        allActivity: [],
    },
    reducers: {
        storeActivities: (state, action) => {
            if (Array.isArray(action.payload) && action.payload.length === 0) {
                state.allActivity = [];
            } else {
                state.allActivity = action.payload;
            }
        },
    },
});

export const { storeActivities } = UserActivitySlice.actions;
export default UserActivitySlice.reducer;
