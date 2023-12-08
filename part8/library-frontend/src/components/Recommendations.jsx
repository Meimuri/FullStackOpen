import { useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { ALL_BOOKS, USER_DATA } from "../queries";

const Recommendations = () => {
    const { loading: userLoading, data: userData } = useQuery(USER_DATA);
    const [getBooks, { loading: booksLoading, data: booksData }] =
        useLazyQuery(ALL_BOOKS);

    useEffect(() => {
        if (userData) {
            getBooks({ variables: { genre: userData.me.favoriteGenre } });
        }
    }, [userData, getBooks]);

    if (userLoading) {
        return <div>Loading user data...</div>;
    }

    if (!userData) {
        return <div>User data not available</div>;
    }

    if (booksLoading) {
        return <div>Loading books data...</div>;
    }

    const books = booksData ? booksData.allBooks : [];
    const genre = userData.me.favoriteGenre;

    console.log(genre);

    return (
        <div>
            <h2>Recommendations</h2>
            <p>
                Books in your favorite genre: <b>{genre}</b>
            </p>

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
        </div>
    );
};

export default Recommendations;
