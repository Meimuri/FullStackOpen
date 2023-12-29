import { useField } from "../hooks";

const CreateNew = (props) => {
    const { reset: resetContent, ...content } = useField({
        type: "text",
        name: "content",
    });
    const { reset: resetAuthor, ...author } = useField({
        type: "text",
        name: "author",
    });
    const { reset: resetInfo, ...info } = useField({
        type: "text",
        name: "info",
    });

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

    const handleReset = (e) => {
        e.preventDefault();
        resetContent();
        resetAuthor();
        resetInfo();
    };

    return (
        <div>
            <h2>Create a new Anecdote</h2>
            <form onSubmit={handleSubmit} onReset={handleReset}>
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
                <button type="reset">Reset</button>
            </form>
        </div>
    );
};

export default CreateNew;
