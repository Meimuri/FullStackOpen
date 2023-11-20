import { createSlice } from "@reduxjs/toolkit";

export const notificationHandler = (notification) => {
    return (dispatch) => {
        dispatch(showNotification(notification));
        setTimeout(() => {
            dispatch(hideNotification());
        }, 5000);
    };
};

const notificationSlice = createSlice({
    name: "notification",
    initialState: "",
    reducers: {
        showNotification(state, action) {
            return action.payload;
        },
        hideNotification() {
            return "";
        },
    },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
