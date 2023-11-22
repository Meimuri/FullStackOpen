import { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
    const [value, setValue] = useState("");

    const onChange = (event) => {
        setValue(event.target.value);
    };

    return {
        type,
        value,
        onChange,
    };
};

const useResource = (baseUrl) => {
    const [resources, setResources] = useState([]);

    useEffect(() => {
        axios.get(baseUrl).then((res) => setResources(res.data));
    }, [baseUrl]);

    const create = async (resource) => {
        const response = await axios.post(baseUrl, resource);
        return setResources(resources.concat(response.data));
    };

    const service = {
        create,
    };

    return [resources, service];
};

const App = () => {
    const note = useField("text");
    const name = useField("text");
    const number = useField("text");

    const [notes, noteService] = useResource("http://localhost:3005/notes");
    const [persons, personService] = useResource(
        "http://localhost:3005/persons"
    );

    const handleNoteSubmit = (event) => {
        event.preventDefault();
        noteService.create({ content: note.value });
    };

    const handlePersonSubmit = (event) => {
        event.preventDefault();
        personService.create({ name: name.value, number: number.value });
    };

    return (
        <div>
            <h2>Notes</h2>
            <form onSubmit={handleNoteSubmit}>
                <input {...note} /> <button>Create</button>
            </form>
            {notes.map((note) => (
                <p key={note.id}>{note.content}</p>
            ))}

            <h2>Persons</h2>
            <form onSubmit={handlePersonSubmit}>
                Name: <input {...name} /> <br />
                Number: <input {...number} /> <button>Create</button>
            </form>
            {persons.map((person) => (
                <p key={person.id}>
                    {person.name} {person.number}
                </p>
            ))}
        </div>
    );
};

export default App;
