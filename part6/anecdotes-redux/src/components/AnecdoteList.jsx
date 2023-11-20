import { useDispatch, useSelector } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
// import { notificationHandler } from "../reducers/notificationReducer";

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

    const sortAnecdotes = [...anecdotes];

    const castVote = (anecdote) => {
        dispatch(vote(anecdote));
    };

    return (
        <div>
            {sortAnecdotes
                .sort((a, b) => b.votes - a.votes)
                .map((anecdote) => (
                    <Anecdote
                        key={anecdote.id}
                        anecdote={anecdote}
                        handleClick={() => castVote(anecdote)}
                    />
                ))}
        </div>
    );
};

export default AnecdoteList;
