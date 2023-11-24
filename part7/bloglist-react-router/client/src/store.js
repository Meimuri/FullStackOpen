import { configureStore } from "@reduxjs/toolkit";

import loginReducer from "./reducers/loginReducer";
import blogReducer from "./reducers/blogReducer";
import notificationReducer from "./reducers/notificationReducer";

const store = configureStore({
    reducer: {
        login: loginReducer,
        blog: blogReducer,
        notification: notificationReducer,
    },
});

export default store;
