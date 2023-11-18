import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <>
            <p>{anecdote.content}</p>
            <p>
                has {anecdote.votes}{" "}
                <button onClick={handleClick}> Vote </button>
            </p>
        </>
    );
};

const AnecdoteList = () => {
    const dispatch = useDispatch();
    const anecdotes = useSelector(({ filter, anecdotes }) => {
        return filter.length == 0
            ? anecdotes
            : anecdotes.filter((anecdote) =>
                  anecdote.content.toLowerCase().includes(filter.toLowerCase())
              );
    });

    return (
        <div>
            {anecdotes
                .sort((a, b) => b.votes - a.votes)
                .map((anecdote) => (
                    <Anecdote
                        key={anecdote.id}
                        anecdote={anecdote}
                        handleClick={() => dispatch(voteAnecdote(anecdote.id))}
                    />
                ))}
        </div>
    );
};

export default AnecdoteList;
