import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const App = () => {
    const handleVote = (anecdote) => {
        console.log("vote");
    };

    const result = useQuery({
        queryKey: ["anecdotes"],
        queryFn: () =>
            axios
                .get("http://localhost:3001/anecdotes")
                .then((res) => res.data),
        retry: false,
    });
    console.log(JSON.parse(JSON.stringify(result)));

    if (result.isLoading) {
        return <div>Loading data...</div>;
    }

    if (result.isError) {
        return (
            <span>
                Anecdote service is not available due to problems in the server.
                Please try again later.
            </span>
        );
    }

    const anecdotes = result.data;

    return (
        <div>
            <h3>Anecdote App</h3>

            <Notification />
            <AnecdoteForm />

            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>
                            Vote
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default App;
