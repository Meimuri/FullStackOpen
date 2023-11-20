import { createSlice } from "@reduxjs/toolkit";

const initialNotification = "Hello World";

const notificationSlice = createSlice({
    name: "notification",
    initialState: initialNotification,
    reducers: {
        notificationShow(state, action) {
            return action.payload;
        },
    },
});

export const { notificationShow } = notificationSlice.actions;
export default notificationSlice.reducer;
