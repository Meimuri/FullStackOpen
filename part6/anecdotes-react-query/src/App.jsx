import { useReducer } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnecdote, updateAnecdoteVote } from "./request";
import NotificationContext from "./NotificationContext";
import notificationReducer from "./reducers/notificationReducer";

import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

const App = () => {
    const queryClient = useQueryClient();
    const [notification, notificationDispatch] = useReducer(
        notificationReducer,
        ""
    );

    const updateAnecdoteMutation = useMutation({
        mutationFn: updateAnecdoteVote,
        onSuccess: (anecdote) => {
            queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
            notificationDispatch({
                type: "SHOW",
                payload: `Voted for anecdote "${anecdote.content}".`,
            });
            setTimeout(() => {
                notificationDispatch({ type: "REMOVE" });
            }, 5000);
        },
    });

    const handleVote = (anecdote) => {
        updateAnecdoteMutation.mutate({
            ...anecdote,
            votes: anecdote.votes + 1,
        });
    };

    const result = useQuery({
        queryKey: ["anecdotes"],
        queryFn: getAnecdote,
        refetchOnWindowFocus: false,
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
            <NotificationContext.Provider
                value={[notification, notificationDispatch]}
            >
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
            </NotificationContext.Provider>
        </div>
    );
};

export default App;
