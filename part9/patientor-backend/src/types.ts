export interface DiagnosesEntry {
    code: string;
    name: string;
    latin?: string;
}

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other",
}

export interface Entry {}

export interface PatientsEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export type NonSensitivePatientsEntry = Omit<PatientsEntry, "ssn" | "entries">;

export type NewPatientEntry = Omit<PatientsEntry, "id">;
