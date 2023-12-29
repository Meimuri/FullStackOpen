import { useState, useEffect } from "react";
import {
    NonSensitiveDiaryEntry,
    NewDiaryEntry,
    Weather,
    Visibility,
} from "./types";
import { getAllEntries, createEntry } from "./diaryService";

const App = () => {
    const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
    const [newDate, setNewDate] = useState("");
    const [newWeather, setNewWeather] = useState("");
    const [newVisibility, setNewVisibility] = useState("");

    useEffect(() => {
        getAllEntries().then((data) => {
            setDiaries(data);
        });
    }, []);

    const diaryCreation = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        const newEntry: NewDiaryEntry = {
            date: newDate,
            weather: newWeather as Weather,
            visibility: newVisibility as Visibility,
            comment: "",
        };

        try {
            const createdEntry = await createEntry(newEntry);
            setDiaries(diaries.concat(createdEntry));
            setNewDate("");
            setNewWeather("");
            setNewVisibility("");
        } catch (error) {
            console.error("Error creating entry:", error);
        }
    };

    return (
        <div>
            <form onSubmit={diaryCreation}>
                <div>
                    <label>Date: </label>
                    <input
                        type="date"
                        value={newDate}
                        onChange={(event) => setNewDate(event.target.value)}
                    />
                </div>
                <div>
                    <label>Weather: </label>

                    <label>
                        <input
                            type="radio"
                            name="weather"
                            value={Weather.Sunny}
                            checked={newWeather === Weather.Sunny}
                            onChange={(event) =>
                                setNewWeather(event.target.value)
                            }
                        />
                        Sunny
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="weather"
                            value={Weather.Rainy}
                            checked={newWeather === Weather.Rainy}
                            onChange={(event) =>
                                setNewWeather(event.target.value)
                            }
                        />
                        Rainy
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="weather"
                            value={Weather.Cloudy}
                            checked={newWeather === Weather.Cloudy}
                            onChange={(event) =>
                                setNewWeather(event.target.value)
                            }
                        />
                        Cloudy
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="weather"
                            value={Weather.Stormy}
                            checked={newWeather === Weather.Stormy}
                            onChange={(event) =>
                                setNewWeather(event.target.value)
                            }
                        />
                        Stormy
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="weather"
                            value={Weather.Windy}
                            checked={newWeather === Weather.Windy}
                            onChange={(event) =>
                                setNewWeather(event.target.value)
                            }
                        />
                        Windy
                    </label>
                </div>
                <div>
                    <label>Visibility: </label>

                    <label>
                        <input
                            type="radio"
                            name="visibility"
                            value={Visibility.Great}
                            checked={newVisibility === Visibility.Great}
                            onChange={(event) =>
                                setNewVisibility(event.target.value)
                            }
                        />
                        Great
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="visibility"
                            value={Visibility.Good}
                            checked={newVisibility === Visibility.Good}
                            onChange={(event) =>
                                setNewVisibility(event.target.value)
                            }
                        />
                        Good
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="visibility"
                            value={Visibility.Ok}
                            checked={newVisibility === Visibility.Ok}
                            onChange={(event) =>
                                setNewVisibility(event.target.value)
                            }
                        />
                        Ok
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="visibility"
                            value={Visibility.Poor}
                            checked={newVisibility === Visibility.Poor}
                            onChange={(event) =>
                                setNewVisibility(event.target.value)
                            }
                        />
                        Poor
                    </label>
                </div>
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
