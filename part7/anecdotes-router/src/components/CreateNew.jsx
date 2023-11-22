// import { useState } from "react";
import { useField } from "../hooks";

const CreateNew = (props) => {
    const content = useField({ type: "text", name: "content" });
    const author = useField({ type: "text", name: "author" });
    const info = useField({ type: "text", name: "info" });

    const handleSubmit = (e) => {
        e.preventDefault();

        const anecdoteObj = {
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0,
        };

        props.addNew(anecdoteObj);
    };

    return (
        <div>
            <h2>Create a new Anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    Content:
                    <input {...content} />
                </div>
                <div>
                    Author
                    <input {...author} />
                </div>
                <div>
                    URL
                    <input {...info} />
                </div>
                <button>Create</button>
            </form>
        </div>
    );
};

export default CreateNew;
