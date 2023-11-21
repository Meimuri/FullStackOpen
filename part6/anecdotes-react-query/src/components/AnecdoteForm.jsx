const AnecdoteForm = () => {
    const onCreate = (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = "";
        console.log("new anecdote");
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
