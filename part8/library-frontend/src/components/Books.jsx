import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ALL_GENRES } from "../queries";
import { useState } from "react";

const Books = () => {
    const [genreSearch, setGenreSearch] = useState("");
    const result = useQuery(ALL_BOOKS, {
        variables: { genre: genreSearch },
    });
    const allGenre = useQuery(ALL_GENRES);

    if (result.loading) {
        return <div>loading...</div>;
    }

    const books = result.data.allBooks;
    const genre = allGenre.data.uniqueGenres;

    const sortByGenre = (genre) => {
        setGenreSearch(genre);
    };

    return (
        <div>
            <h2>books</h2>

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
            {genre.map((genre) => (
                <button key={genre} onClick={() => sortByGenre(genre)}>
                    {genre}
                </button>
            ))}
        </div>
    );
};

export default Books;
