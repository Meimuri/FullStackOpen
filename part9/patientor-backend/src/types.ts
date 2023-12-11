export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other",
}

export interface DiagnosesEntry {
    code: string;
    name: string;
    latin?: string;
}

export interface PatientsEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
}

export type NonSensitivePatientsEntry = Omit<PatientsEntry, "ssn">;

export type NewPatientEntry = Omit<PatientsEntry, "id">;
