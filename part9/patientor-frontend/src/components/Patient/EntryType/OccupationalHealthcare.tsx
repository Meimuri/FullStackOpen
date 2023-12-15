import { Work } from "@mui/icons-material";
import { OccupationalHealthcareEntry } from "../../../types";

interface EntryDetailsProps {
    entry: OccupationalHealthcareEntry;
    findDiagnoseDesc: (diagnosisCode: string) => string | undefined;
}

const OccupationalHealthcare: React.FC<EntryDetailsProps> = ({
    entry,
    findDiagnoseDesc,
}) => {
    return (
        <>
            <p>
                {entry.date} <Work /> {entry.employerName}
            </p>
            <p>
                <i>{entry.description}</i>
            </p>
            {entry.diagnosisCodes &&
                entry.diagnosisCodes.map((diagnosisCode) => (
                    <li key={diagnosisCode}>
                        {diagnosisCode}
                        {" - "}
                        {findDiagnoseDesc(diagnosisCode)}
                    </li>
                ))}
            <p>
                Diagnosed by <b>{entry.specialist}</b>
            </p>
        </>
    );
};

export default OccupationalHealthcare;
