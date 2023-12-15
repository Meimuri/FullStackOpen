import { LocalHospital } from "@mui/icons-material";
import { HospitalEntry } from "../../../types";

interface EntryDetailsProps {
    entry: HospitalEntry;
    findDiagnoseDesc: (diagnosisCode: string) => string | undefined;
}

const Hospital: React.FC<EntryDetailsProps> = ({ entry, findDiagnoseDesc }) => {
    return (
        <>
            <p>
                {entry.date} <LocalHospital />
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
                <b>Discharge Date:</b> {entry.discharge.date}
            </p>
            <p>
                <b>Discharge Criteria:</b> {entry.discharge.criteria}
            </p>
        </>
    );
};

export default Hospital;
