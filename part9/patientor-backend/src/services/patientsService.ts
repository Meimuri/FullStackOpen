import patientsData from "../../data/patient";
import { v4 as uuidv4 } from "uuid";

import {
    NonSensitivePatientsEntry,
    PatientsEntry,
    NewPatientEntry,
} from "../types";

const patients: PatientsEntry[] = patientsData;

const getPatients = (): PatientsEntry[] => {
    return patients;
};

const getNonSensitivePatientsEntries = (): NonSensitivePatientsEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const findById = (id: string): PatientsEntry | undefined => {
    const entry = patients.find((d) => d.id === id);
    return entry;
};

const addPatient = (entry: NewPatientEntry): PatientsEntry => {
    const newPatientEntry = {
        id: uuidv4(),
        ...entry,
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getPatients,
    getNonSensitivePatientsEntries,
    addPatient,
    findById,
};
