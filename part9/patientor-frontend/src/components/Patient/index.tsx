import { useState, useEffect } from "react";
import { Patient, Gender, DiagnosisCode, NewDiagnosisEntry } from "../../types";
import { useParams } from "react-router-dom";
import { Male, Female } from "@mui/icons-material";

import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";
import AddEntryForm from "./AddEntryForm";
import EntryDetails from "./EntryDetails";
import axios from "axios";

const getGenderIcon = (gender: Gender) => {
    switch (gender) {
        case Gender.Male:
            return <Male />;
        case Gender.Female:
            return <Female />;
        default:
            return null;
    }
};

const PatientProfile = () => {
    const [patient, setPatient] = useState<Patient | null>(null);
    const [diagnoses, setDiagnoses] = useState<DiagnosisCode[] | null>(null);
    const { id } = useParams<{ id: string }>();
    const [error, setError] = useState<string>();

    useEffect(() => {
        const fetchPatientById = async () => {
            try {
                if (id) {
                    const patientData = await patientService.getById(id);
                    setPatient(patientData);
                }
            } catch (error) {
                console.error("Error fetching patient:", error);
            }
        };

        const fetchDiagnoses = async () => {
            const diagnosesData = await diagnosesService.getAll();
            setDiagnoses(diagnosesData);
        };

        void fetchPatientById();
        void fetchDiagnoses();
    }, [id]);

    const submitNewEntry = async (values: NewDiagnosisEntry) => {
        try {
            if (patient) {
                const newData = await patientService.createEntry(values, id);
                setPatient((prevPatient: Patient | null) => {
                    if (!prevPatient) return prevPatient; // Check for null

                    return {
                        ...prevPatient,
                        entries: [...prevPatient.entries, newData],
                    };
                });
            }
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                if (
                    e?.response?.data &&
                    typeof e?.response?.data === "string"
                ) {
                    const message = e.response.data.replace(
                        "Something went wrong. Error: ",
                        ""
                    );
                    console.error(message);
                    setError(message);
                } else {
                    setError("Unrecognized axios error");
                }
            } else {
                console.error("Unknown error", e);
                setError("Unknown error");
            }
        }
    };

    if (!patient || !diagnoses) {
        return <div>Loading...</div>;
    }

    const findDiagnoseDesc = (diagnosisCode: string) => {
        const diagnose = diagnoses?.find((d) => d.code === diagnosisCode);
        return diagnose?.name;
    };

    return (
        <div>
            <h1>
                {patient.name}
                {getGenderIcon(patient.gender)}
            </h1>
            <p>SSN: {patient.ssn}</p>
            <p>Occupation: {patient.occupation}</p>
            <AddEntryForm onSubmit={submitNewEntry} error={error} />
            {patient.entries && patient.entries.length > 0 && <h3>Entries</h3>}
            {patient.entries &&
                patient.entries.map((entry) => (
                    <div key={entry.id}>
                        <EntryDetails
                            entry={entry}
                            findDiagnoseDesc={findDiagnoseDesc}
                        />
                    </div>
                ))}
        </div>
    );
};

export default PatientProfile;
