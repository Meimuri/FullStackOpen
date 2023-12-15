import { useState, useEffect } from "react";
import { Patient, Gender, DiagnosisCode } from "../../types";
import { useMatch } from "react-router-dom";
import { Male, Female } from "@mui/icons-material";

import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";
import EntryDetails from "./EntryDetails";

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
    const match = useMatch("/patient/:id");

    useEffect(() => {
        const fetchPatientById = async () => {
            if (match?.params?.id) {
                const id = match.params.id;
                try {
                    const patientData = await patientService.getById(id);
                    setPatient(patientData);
                } catch (error) {
                    console.error("Error fetching patient:", error);
                }
            }
        };

        const fetchDiagnoses = async () => {
            const diagnosesData = await diagnosesService.getAll();
            setDiagnoses(diagnosesData);
        };

        void fetchPatientById();
        void fetchDiagnoses();
    }, [match]);

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
            <h3>Entries</h3>
            {patient.entries &&
                patient.entries.map((entry) => (
                    // <div key={entry.id}>
                    //     <p>
                    //         {entry.date} <i>{entry.description}</i>
                    //     </p>
                    //     {entry.diagnosisCodes &&
                    //         entry.diagnosisCodes.map((diagnosisCode) => (
                    //             <li key={diagnosisCode}>
                    //                 {diagnosisCode}
                    //                 {" - "}
                    //                 {findDiagnoseDesc(diagnosisCode)}
                    //             </li>
                    //         ))}
                    // </div>
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
