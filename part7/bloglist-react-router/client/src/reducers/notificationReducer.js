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

export const setNotification = (notification, type, duration) => {
    return (dispatch) => {
        const notif = {
            notification,
            type,
        };
        dispatch(showNotification(notif));
        setTimeout(() => {
            dispatch(showNotification(""));
        }, duration * 1000);
    };
};

export default notificationSlice.reducer;
