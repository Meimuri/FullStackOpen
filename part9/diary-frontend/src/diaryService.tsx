import axios from "axios";
import { NonSensitiveDiaryEntry, NewDiaryEntry } from "./types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getAllEntries = () => {
    return axios
        .get<NonSensitiveDiaryEntry[]>(baseUrl)
        .then((response) => response.data);
};

export const createEntry = (object: NewDiaryEntry) => {
    return axios
        .post<NonSensitiveDiaryEntry>(baseUrl, object)
        .then((response) => response.data);
};
