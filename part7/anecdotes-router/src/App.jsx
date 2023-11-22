import { useState } from "react";
import {
    Routes,
    Route,
    // Link,
    // Navigate,
    // useParams,
    // useNavigate,
    useMatch,
} from "react-router-dom";

import Menu from "./components/Menu";
import AnecdoteList from "./components/AnecdoteList";
import Anecdote from "./components/Anecdote";
import About from "./components/About";
import Footer from "./components/Footer";

const CreateNew = (props) => {
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");
    const [info, setInfo] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addNew({
            content,
            author,
            info,
            votes: 0,
        });
    };

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input
                        name="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <div>
                    author
                    <input
                        name="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>
                <div>
                    url for more info
                    <input
                        name="info"
                        value={info}
                        onChange={(e) => setInfo(e.target.value)}
                    />
                </div>
                <button>create</button>
            </form>
        </div>
    );
};

const App = () => {
    const [anecdotes, setAnecdotes] = useState([
        {
            content: "If it hurts, do it more often",
            author: "Jez Humble",
            info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
            votes: 0,
            id: 1,
        },
        {
            content: "Premature optimization is the root of all evil",
            author: "Donald Knuth",
            info: "http://wiki.c2.com/?PrematureOptimization",
            votes: 0,
            id: 2,
        },
    ]);

    // const [notification, setNotification] = useState("");

    const addNew = (anecdote) => {
        anecdote.id = Math.round(Math.random() * 10000);
        setAnecdotes(anecdotes.concat(anecdote));
    };

    // const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

    // const vote = (id) => {
    //     const anecdote = anecdoteById(id);

    //     const voted = {
    //         ...anecdote,
    //         votes: anecdote.votes + 1,
    //     };

    //     setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
    // };

    const match = useMatch("/anecdotes/:id");
    const anecdote = match
        ? anecdotes.find((anecdote) => anecdote.id === Number(match.params.id))
        : null;

    return (
        <div>
            <h1>Software Anecdotes</h1>
            <Menu />
            <Routes>
                <Route
                    path="/anecdotes/:id"
                    element={<Anecdote anecdote={anecdote} />}
                />
                <Route
                    path="/"
                    element={<AnecdoteList anecdotes={anecdotes} />}
                />
                <Route path="/create" element={<CreateNew addNew={addNew} />} />
                <Route path="/about" element={<About />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;
