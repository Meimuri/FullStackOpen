import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const blogSlice = createSlice({
    name: "blog",
    initialState: [],
    reducers: {
        appendBlog(state, action) {
            state.push(action.payload);
        },
        setBlogs(state, action) {
            return action.payload;
        },
    },
});

export const { appendBlog, setBlogs } = blogSlice.actions;

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll();
        dispatch(setBlogs(blogs));
    };
};

export const createBlog = (content, user) => {
    return async (dispatch) => {
        const result = await blogService.create(content, user);

        const blogUser = {
            username: user.username,
            name: user.name,
            id: result.user,
        };
        const newBlog = { ...result, user: blogUser };
        dispatch(appendBlog(newBlog));
        dispatch(
            setNotification(
                `A new blog "${content.title}" by ${content.author} added!`,
                "success",
                5,
            ),
        );
    };
};

export default blogSlice.reducer;
