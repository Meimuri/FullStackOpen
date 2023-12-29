import patientsData from "../../data/patient";
import { v4 as uuidv4 } from "uuid";

import {
    NonSensitivePatientsEntry,
    PatientsEntry,
    NewPatientEntry,
    EntryWithoutId,
    Entry,
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

const addEntry = (patient: PatientsEntry, entry: EntryWithoutId): Entry => {
    const newEntry = {
        id: uuidv4(),
        ...entry,
    };

    patient.entries.push(newEntry);
    return newEntry;
};

export default {
    getPatients,
    getNonSensitivePatientsEntries,
    addPatient,
    addEntry,
    findById,
};
