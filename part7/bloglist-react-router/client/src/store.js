import { configureStore } from "@reduxjs/toolkit";

import loginReducer from "./reducers/loginReducer";
import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";
import notificationReducer from "./reducers/notificationReducer";

const store = configureStore({
    reducer: {
        login: loginReducer,
        blog: blogReducer,
        user: userReducer,
        notification: notificationReducer,
    },
});

export default store;
