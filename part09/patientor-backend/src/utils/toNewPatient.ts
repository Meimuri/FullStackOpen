import { NewPatientEntry, Gender } from "../types";

const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
    if (!isString(name)) {
        throw new Error("Invalid or missing 'name'");
    }

    return name;
};

const parseSsn = (ssn: unknown): string => {
    if (!isString(ssn)) {
        throw new Error("Invalid or missing 'SSN'");
    }

    return ssn;
};

const isDate = (dateOfBirth: string): boolean => {
    return Boolean(Date.parse(dateOfBirth));
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error("Invalid or missing 'date of birth': " + dateOfBirth);
    }
    return dateOfBirth;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender)
        .map((v) => v.toString())
        .includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error("Invalid 'gender': " + gender);
    }
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!isString(occupation)) {
        throw new Error("Invalid or missing 'occupation'");
    }

    return occupation;
};

const toNewPatient = (object: unknown): NewPatientEntry => {
    if (!object || typeof object !== "object") {
        throw new Error("Invalid or missing patient data");
    }

    if (
        "name" in object &&
        "dateOfBirth" in object &&
        "ssn" in object &&
        "gender" in object &&
        "occupation" in object &&
        "entries" in object
    ) {
        const newEntry: NewPatientEntry = {
            name: parseName(object.name),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            entries: [],
        };

        return newEntry;
    }

    throw new Error(
        "Incomplete or incorrect patient data: a field is missing or has an issue"
    );
};

export default toNewPatient;
