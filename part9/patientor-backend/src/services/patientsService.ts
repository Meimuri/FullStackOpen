import patientsData from "../../data/patient";
import { NonSensitivePatientsEntry, PatientsEntry } from "../types";

const getPatients = (): PatientsEntry[] => {
    return patientsData;
};

const getNonSensitivePatientsEntries = (): NonSensitivePatientsEntry[] => {
    return patientsData.map(
        ({ id, name, dateOfBirth, gender, occupation }) => ({
            id,
            name,
            dateOfBirth,
            gender,
            occupation,
        })
    );
};

export default {
    getPatients,
    getNonSensitivePatientsEntries,
};
