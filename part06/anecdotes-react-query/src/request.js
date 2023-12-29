import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdote = () =>
    axios.get("http://localhost:3001/anecdotes").then((res) => res.data);

export const createAnecdote = (newAnecdote) =>
    axios.post(baseUrl, newAnecdote).then((res) => res.data);

export const updateAnecdoteVote = (updatedAnecdoteVote) =>
    axios
        .put(`${baseUrl}/${updatedAnecdoteVote.id}`, updatedAnecdoteVote)
        .then((res) => res.data);
