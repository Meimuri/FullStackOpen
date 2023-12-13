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

    const getWeatherEnum = (weather: string): Weather => {
        switch (weather.toLowerCase()) {
            case "sunny":
                return Weather.Sunny;
            case "rainy":
                return Weather.Rainy;
            case "cloudy":
                return Weather.Cloudy;
            case "stormy":
                return Weather.Stormy;
            case "windy":
                return Weather.Windy;
            default:
                throw new Error("Invalid weather value");
        }
    };

    const getVisibilityEnum = (visibility: string): Visibility => {
        switch (visibility.toLowerCase()) {
            case "great":
                return Visibility.Great;
            case "good":
                return Visibility.Good;
            case "ok":
                return Visibility.Ok;
            case "poor":
                return Visibility.Poor;
            default:
                throw new Error("Invalid visibility value");
        }
    };

    const diaryCreation = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        const newEntry: NewDiaryEntry = {
            date: newDate,
            weather: getWeatherEnum(newWeather),
            visibility: getVisibilityEnum(newVisibility),
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
                        value={newDate}
                        onChange={(event) => setNewDate(event.target.value)}
                    />
                </div>
                <div>
                    <label>Weather: </label>
                    <input
                        value={newWeather}
                        onChange={(event) => setNewWeather(event.target.value)}
                    />
                </div>
                <div>
                    <label>Visibility: </label>
                    <input
                        value={newVisibility}
                        onChange={(event) =>
                            setNewVisibility(event.target.value)
                        }
                    />
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
