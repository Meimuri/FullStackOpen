import { useState, useEffect } from "react";
import { Patient, Gender } from "../types";
import { useMatch } from "react-router-dom";
import { Male, Female } from "@mui/icons-material";

import patientService from "../services/patients";

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

        fetchPatientById();
    }, [match]);

    if (!patient) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>
                {patient.name}
                {getGenderIcon(patient.gender)}
            </h1>
            <p>SSN: {patient.ssn}</p>
            <p>Occupation: {patient.occupation}</p>
        </div>
    );
};

export default PatientProfile;
