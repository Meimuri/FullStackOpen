import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import { setNotification } from "./notificationReducer";

const loginSlice = createSlice({
    name: "login",
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload;
        },
    },
});

export const { setUser } = loginSlice.actions;

export const handleLocalStorageLogin = (storage) => {
    return async (dispatch) => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            dispatch(setUser(user));
        }
    };
};

export const handleLogin = ({ username, password }) => {
    return async (dispatch) => {
        try {
            const user = await loginService.login({
                username,
                password,
            });
            dispatch(setUser(user));
            window.localStorage.setItem(
                "loggedBlogappUser",
                JSON.stringify(user),
            );
        } catch (exception) {
            dispatch(setNotification("Wrong credentials", "error", 5));
        }
    };
};

export const handleLogout = () => {
    return async (dispatch) => {
        window.localStorage.removeItem("loggedBlogappUser");
        dispatch(setUser(null));
    };
};

export default loginSlice.reducer;
