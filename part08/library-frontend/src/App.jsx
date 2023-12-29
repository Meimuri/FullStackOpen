import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useSubscription } from "@apollo/client";
import Menu from "./components/Menu";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommendations from "./components/Recommendations";
import { ALL_BOOKS, ALL_AUTHORS, BOOK_ADDED } from "./queries";
import { updateBookCache } from "./utils/updateBookCache";
import { updateAuthorsCache } from "./utils/updateAuthorCache";

const App = () => {
    const storedToken = localStorage.getItem("library-user-token");
    const [token, setToken] = useState(storedToken || null);

    useSubscription(BOOK_ADDED, {
        onData: ({ data, client }) => {
            const bookAdded = data.data.bookAdded;

            updateBookCache(client, ALL_BOOKS, bookAdded);
            updateAuthorsCache(client, ALL_AUTHORS, bookAdded.author);

            alert(
                `The book titled "${bookAdded.title}" written by ${bookAdded.author.name} added!`
            );
        },
    });

    return (
        <div>
            <Menu token={token} setToken={setToken} />

            <Routes>
                <Route path="/" element={<Authors />} />
                <Route path="/books" element={<Books />} />
                <Route path="/recommendations" element={<Recommendations />} />
                <Route path="/newbook" element={<NewBook />} />
                <Route
                    path="/login"
                    element={<LoginForm setToken={setToken} />}
                />
            </Routes>
        </div>
    );
};

export default App;
