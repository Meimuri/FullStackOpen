import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";
import { setNotification } from "./notificationReducer";

const anecdoteSlice = createSlice({
    name: "filter",
    initialState: [],
    reducers: {
        appendAnecdote(state, action) {
            state.push(action.payload);
        },
        setAnecdotes(state, action) {
            return action.payload;
        },
    },
});

export const { voteAnecdote, appendAnecdote, setAnecdotes } =
    anecdoteSlice.actions;

export const initializeAnecdotes = () => {
    return async (dispatch) => {
        const notes = await anecdoteService.getAll();
        dispatch(setAnecdotes(notes));
    };
};

export const createAnecdote = (content) => {
    return async (dispatch) => {
        const newAnecdote = await anecdoteService.createNew(content);
        dispatch(appendAnecdote(newAnecdote));
        dispatch(setNotification(`You have added '${content}'!`, 5));
    };
};

export const vote = (anecdote) => {
    return async (dispatch) => {
        await anecdoteService.addVote(anecdote);
        const updatedAnecdotes = await anecdoteService.getAll();
        dispatch(setAnecdotes(updatedAnecdotes));
        dispatch(
            setNotification(`You have voted for '${anecdote.content}'!`, 5)
        );
    };
};

export default anecdoteSlice.reducer;
