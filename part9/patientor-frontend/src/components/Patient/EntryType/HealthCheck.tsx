import { Favorite, MedicalServices } from "@mui/icons-material";
import { HealthCheckEntry, HealthCheckRating } from "../../../types";

const getHealthCheckRatingIcon = (heathCheckRating: HealthCheckRating) => {
    switch (heathCheckRating) {
        case 0:
            return <Favorite sx={{ color: "success.main" }} />;
        case 1:
            return <Favorite sx={{ color: "warning.main" }} />;
        case 2:
            return <Favorite sx={{ color: "error.main" }} />;
        case 3:
            return <Favorite />;
        default:
            return null;
    }
};

interface EntryDetailsProps {
    entry: HealthCheckEntry;
    findDiagnoseDesc: (diagnosisCode: string) => string | undefined;
}

const HealthCheck: React.FC<EntryDetailsProps> = ({
    entry,
    findDiagnoseDesc,
}) => {
    return (
        <>
            <p>
                {entry.date} <MedicalServices />
            </p>
            <p>
                <i>{entry.description}</i>
            </p>
            <p>{getHealthCheckRatingIcon(entry.healthCheckRating)}</p>
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

export default HealthCheck;
