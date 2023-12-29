import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ALL_GENRES } from "../queries";
import { useState } from "react";

const Books = () => {
    const [selectedGenre, setSelectedGenre] = useState("");

    const { loading: booksLoading, data: booksData } = useQuery(ALL_BOOKS, {
        variables: { genre: selectedGenre },
    });

    const { loading: genresLoading, data: genresData } = useQuery(ALL_GENRES);

    if (booksLoading || genresLoading) {
        return <div>Loading...</div>;
    }

    const books = booksData.allBooks;
    const allGenres = genresData.uniqueGenres;

    const sortByGenre = (genre) => {
        setSelectedGenre(genre);
    };

    return (
        <div>
            <h2>All Books</h2>

            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>Author</th>
                        <th>Published</th>
                    </tr>
                    {books.map((a) => (
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => sortByGenre(null)}>All</button>
            {allGenres.map((genre) => (
                <button key={genre} onClick={() => sortByGenre(genre)}>
                    {genre}
                </button>
            ))}
        </div>
    );
};

export default Books;
