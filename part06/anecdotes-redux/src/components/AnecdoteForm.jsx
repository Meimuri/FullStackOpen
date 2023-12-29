import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const addAnecdote = async (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = "";
        dispatch(createAnecdote(content));
    };

    return (
        <form onSubmit={addAnecdote}>
            <input name="anecdote" />
            <button type="submit">Add</button>
        </form>
    );
};

export default AnecdoteForm;
