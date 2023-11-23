import { useState } from "react";

const BlogForm = ({ handleAddBlog }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

    const addBlog = (event) => {
        event.preventDefault();
        handleAddBlog({
            title: title,
            author: author,
            url: url,
        });

        setTitle("");
        setAuthor("");
        setUrl("");
    };

    return (
        <div>
            <h2>Add new blog</h2>
            <form onSubmit={addBlog}>
                {"Title: "}
                <input
                    id="title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Title"
                />{" "}
                <br />
                {"Author: "}
                <input
                    id="author"
                    value={author}
                    onChange={(event) => setAuthor(event.target.value)}
                    placeholder="Author"
                />{" "}
                <br />
                {"Url: "}
                <input
                    id="url"
                    value={url}
                    onChange={(event) => setUrl(event.target.value)}
                    placeholder="Url"
                />{" "}
                <br />
                <button id="save-button" type="submit">
                    Save
                </button>
            </form>
        </div>
    );
};

export default BlogForm;
