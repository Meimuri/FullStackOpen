import { useState } from "react";

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
);

const Anecdotes = ({ anecdotes, points }) => {
    return (
        <>
            <div>{anecdotes}</div>
            <div>Has {points} votes</div>
        </>
    );
};

const App = () => {
    const anecdotes = [
        "If it hurts, do it more often.",
        "Adding manpower to a late software project makes it later!",
        "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        "Premature optimization is the root of all evil.",
        "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
        "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
        "The only way to go fast, is to go well.",
    ];
    const [selected, setSelected] = useState(0);

    const arr = Array(anecdotes.length).fill(0);
    const [points, setPoints] = useState(arr);
    const [maxPoints, setMaxPoints] = useState(0);

    const getRandomAnecdote = (max) => Math.floor(Math.random() * max);

    const handleClick = () => {
        setSelected(getRandomAnecdote(anecdotes.length));
    };

    const handleVoteClick = () => {
        const copy = [...points];
        copy[selected] += 1;
        setPoints(copy);

        const max = Math.max(...copy);
        setMaxPoints(copy.indexOf(max));
    };

    return (
        <>
            <Header text="Anecdote of the day" />
            <Anecdotes
                anecdotes={anecdotes[selected]}
                points={points[selected]}
            />
            <Button handleClick={handleVoteClick} text="Vote" />
            <Button handleClick={handleClick} text="Next anecdote" />
            <Header text="Anecdote with most votes" />
            <Anecdotes
                anecdotes={anecdotes[maxPoints]}
                points={points[maxPoints]}
            />
        </>
    );
};

export default App;
