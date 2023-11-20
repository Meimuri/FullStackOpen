import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
    name: "filter",
    initialState: [],
    reducers: {
        // voteAnecdote(state, action) {
        //     const id = action.payload;
        //     const anecdoteToChange = state.find((n) => n.id === id);
        //     const changedAnecdote = {
        //         ...anecdoteToChange,
        //         votes: anecdoteToChange.votes + 1,
        //     };
        //     return state.map((anecdote) =>
        //         anecdote.id !== id ? anecdote : changedAnecdote
        //     );
        // },
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
    };
};

export const vote = (anecdote) => {
    return async (dispatch) => {
        await anecdoteService.addVote(anecdote);
        const updatedAnecdotes = await anecdoteService.getAll();
        dispatch(setAnecdotes(updatedAnecdotes));
    };
};

export default anecdoteSlice.reducer;
