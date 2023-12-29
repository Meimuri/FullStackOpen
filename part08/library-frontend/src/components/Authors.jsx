import { useQuery } from "@apollo/client";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

const Authors = () => {
    const [name, setName] = useState("");
    const [birthYear, setBirthYear] = useState("");
    const result = useQuery(ALL_AUTHORS);

    const [editBirthYear] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
        onError: (error) => {
            const messages = error.graphQLErrors
                .map((e) => e.message)
                .join("\n");
            console.log(messages);
        },
    });

    const submit = async (event) => {
        event.preventDefault();

        const setBornTo = Number(birthYear);
        editBirthYear({ variables: { name, setBornTo } });

        setBirthYear("");
    };

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
            <h2>Edit Birthyear</h2>
            <form onSubmit={submit}>
                <div>
                    Author
                    <select onChange={({ target }) => setName(target.value)}>
                        {authors.map((author) => (
                            <option key={author.name} value={author.name}>
                                {author.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    Birth Year
                    <input
                        type="number"
                        value={birthYear}
                        onChange={({ target }) => setBirthYear(target.value)}
                    />
                </div>
                <button type="submit">Update Author</button>
            </form>
        </div>
    );
};

export default Authors;
