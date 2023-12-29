import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notification",
    initialState: "",
    reducers: {
        showNotification(state, action) {
            return action.payload;
        },
    },
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export const setNotification = (notification, duration) => {
    return (dispatch) => {
        dispatch(showNotification(notification));
        setTimeout(() => {
            dispatch(showNotification(""));
        }, duration * 1000);
    };
};

export default notificationSlice.reducer;
