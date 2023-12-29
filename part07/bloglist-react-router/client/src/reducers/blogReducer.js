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
        replaceBlogs(state, action) {
            const replaced = action.payload;
            return state.map((s) => (s.id === replaced.id ? replaced : s));
        },
        removeBlogs(state, action) {
            const remove = action.payload;
            return state.filter((b) => b.id !== remove.id);
        },
    },
});

export const { appendBlog, setBlogs, replaceBlogs, removeBlogs } =
    blogSlice.actions;

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

export const likeBlog = (content) => {
    const toLike = { ...content, likes: content.likes + 1 };

    return async (dispatch) => {
        const blog = await blogService.addLike(toLike);
        dispatch(replaceBlogs(blog));
        dispatch(
            setNotification(
                `You liked "${content.title}" by ${content.author}!`,
                "success",
                5,
            ),
        );
    };
};

export const deleteBlog = (content, user) => {
    return async (dispatch) => {
        const blog = await blogService.remove(content.id, user);
        dispatch(removeBlogs(content));
        dispatch(
            setNotification(
                `You deleted "${content.title}" by ${content.author}`,
                "error",
                5,
            ),
        );
    };
};

export const createComment = (content, id) => {
    return async (dispatch) => {
        const blog = await blogService.addComment(content, id);
        dispatch(replaceBlogs(blog));
    };
};

export default blogSlice.reducer;
