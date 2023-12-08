import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommendations from "./components/Recommendations";

const App = () => {
    const storedToken = localStorage.getItem("library-user-token");
    const [token, setToken] = useState(storedToken || null);

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
