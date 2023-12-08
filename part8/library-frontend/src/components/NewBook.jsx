import { useState } from "react";
import { useMutation } from "@apollo/client";

import { ALL_BOOKS, ALL_AUTHORS, CREATE_BOOK } from "../queries";

const NewBook = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publish, setPublish] = useState("");
    const [genre, setGenre] = useState("");
    const [genres, setGenres] = useState([]);

    const [createBook] = useMutation(CREATE_BOOK, {
        onError: (error) => {
            const messages = error.graphQLErrors
                .map((e) => e.message)
                .join("\n");
            console.log(messages);
        },
        update: (cache, { data: { addBook } }) => {
            // Update ALL_BOOKS
            const { allBooks } = cache.readQuery({
                query: ALL_BOOKS,
                variables: { genre: "" },
            });

            cache.writeQuery({
                query: ALL_BOOKS,
                variables: { genre: "" },
                data: { allBooks: [...allBooks, addBook] },
            });

            // Update ALL_AUTHORS
            const { allAuthors } = cache.readQuery({
                query: ALL_AUTHORS,
            });

            const authorExists = allAuthors.some(
                (author) => author.name === addBook.author
            );

            if (!authorExists) {
                cache.writeQuery({
                    query: ALL_AUTHORS,
                    data: {
                        allAuthors: [
                            ...allAuthors,
                            { name: addBook.author, bookCount: 1 },
                        ],
                    },
                });
            } else {
                cache.writeQuery({
                    query: ALL_AUTHORS,
                    data: {
                        allAuthors: allAuthors.map((author) =>
                            author.name === addBook.author
                                ? { ...author, bookCount: author.bookCount + 1 }
                                : author
                        ),
                    },
                });
            }
        },
    });

    const submit = async (event) => {
        event.preventDefault();

        const published = Number(publish);

        createBook({ variables: { title, author, published, genres } });

        setTitle("");
        setPublish("");
        setAuthor("");
        setGenres([]);
        setGenre("");
    };

    const addGenre = () => {
        setGenres(genres.concat(genre));
        setGenre("");
    };

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    Title
                    <input
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    Author
                    <input
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    Published
                    <input
                        type="number"
                        value={publish}
                        onChange={({ target }) => setPublish(target.value)}
                    />
                </div>
                <div>
                    <input
                        value={genre}
                        onChange={({ target }) => setGenre(target.value)}
                    />
                    <button onClick={addGenre} type="button">
                        Add genre
                    </button>
                </div>
                <div>Genres: {genres.join(", ")}</div>
                <button type="submit">Create book</button>
            </form>
        </div>
    );
};

export default NewBook;
