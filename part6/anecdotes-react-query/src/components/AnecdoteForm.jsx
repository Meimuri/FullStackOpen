import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../request";
import NotificationContext from "../NotificationContext";

const AnecdoteForm = () => {
    const queryClient = useQueryClient();
    const [notification, notificationDispatch] =
        useContext(NotificationContext);

    const newAnecdoteMutation = useMutation({
        mutationFn: createAnecdote,
        onSuccess: (newAnecdote) => {
            const anecdotes = queryClient.getQueryData(["anecdotes"]);
            queryClient.setQueryData(
                ["anecdotes"],
                anecdotes.concat(newAnecdote)
            );
            notificationDispatch({
                type: "SHOW",
                payload: `Added anecdote "${newAnecdote.content}".`,
            });
            setTimeout(() => {
                notificationDispatch({ type: "REMOVE" });
            }, 5000);
        },
    });

    const onCreate = (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = "";
        newAnecdoteMutation.mutate({ content, votes: 0 });
    };

    return (
        <div>
            <h3>New Anecdote</h3>
            <form onSubmit={onCreate}>
                <input name="anecdote" />
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default AnecdoteForm;
