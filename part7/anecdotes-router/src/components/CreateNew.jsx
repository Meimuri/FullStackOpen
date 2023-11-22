import { useState } from "react";

const CreateNew = (props) => {
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const [info, setInfo] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addNew({
            content,
            author,
            info,
            votes: 0,
        });
    };

    return (
        <div>
            <h2>Create a new Anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    Content:
                    <input
                        name="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <div>
                    Author
                    <input
                        name="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>
                <div>
                    URL
                    <input
                        name="info"
                        value={info}
                        onChange={(e) => setInfo(e.target.value)}
                    />
                </div>
                <button>Create</button>
            </form>
        </div>
    );
};

export default CreateNew;
