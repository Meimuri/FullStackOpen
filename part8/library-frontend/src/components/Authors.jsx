import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../queries";

const Authors = () => {
    const result = useQuery(ALL_AUTHORS);

    if (result.loading) {
        return <div>loading...</div>;
    }

    const authors = result.data.allAuthors;

    return (
        <div>
            <h2>Authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>Born</th>
                        <th>Books</th>
                    </tr>
                    {authors.map((author) => (
                        <tr key={author.name}>
                            <td>{author.name}</td>
                            <td>{author.born}</td>
                            <td>{author.bookCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Authors;
