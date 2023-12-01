import { Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

const App = () => {
    return (
        <div>
            <Menu />

            <Routes>
                <Route path="/" element={<Authors />} />
                <Route path="/books" element={<Books />} />
                <Route path="/newbook" element={<NewBook />} />
            </Routes>
        </div>
    );
};

export default App;
