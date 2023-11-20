import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
    name: "filter",
    initialState: [],
    reducers: {
        createAnecdote(state, action) {
            state.push(action.payload);
        },
        voteAnecdote(state, action) {
            const id = action.payload;
            const anecdoteToChange = state.find((n) => n.id === id);
            const changedAnecdote = {
                ...anecdoteToChange,
                votes: anecdoteToChange.votes + 1,
            };
            return state.map((anecdote) =>
                anecdote.id !== id ? anecdote : changedAnecdote
            );
        },
        appendAnecdote(state, action) {
            state.push(action.payload);
        },
        setAnecdotes(state, action) {
            return action.payload;
        },
    },
});

export const { createAnecdote, voteAnecdote, appendAnecdote, setAnecdotes } =
    anecdoteSlice.actions;

export const initializeAnecdotes = () => {
    return async (dispatch) => {
        const notes = await anecdoteService.getAll();
        dispatch(setAnecdotes(notes));
    };
};

export default anecdoteSlice.reducer;
