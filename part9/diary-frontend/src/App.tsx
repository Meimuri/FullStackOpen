import { useState, useEffect } from "react";
import { NonSensitiveDiaryEntry } from "./types";
import { getAllEntries } from "./diaryService";

const App = () => {
    const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
    // const [newDate, setNewDate] = useState("");
    // const [newWeather, setNewWeather] = useState("");
    // const [newVisibility, setNewVisibility] = useState("");

    useEffect(() => {
        getAllEntries().then((data) => {
            setDiaries(data);
        });
    }, []);

    const diaryCreation = (event: React.SyntheticEvent) => {
        event.preventDefault();
        // createEntry({ content: newNote }).then((data) => {
        //     setNotes(notes.concat(data));
        // });

        // setNewNote("");
    };

    return (
        <div>
            <form onSubmit={diaryCreation}>
                {/* <input
                    value={newDate}
                    onChange={(event) => setNewDate(event.target.value)}
                /> */}
                <button type="submit">add</button>
            </form>
            <div>
                {diaries.map((diary) => (
                    <div key={diary.id}>
                        <h3>{diary.date}</h3>
                        <p>
                            <b>Weather: </b>
                            {diary.weather}
                        </p>
                        <p>
                            <b>Visibility: </b>
                            {diary.visibility}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
