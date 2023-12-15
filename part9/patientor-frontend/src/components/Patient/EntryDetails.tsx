import { Entry } from "../../types";

import Hospital from "./EntryType/Hospital";
import OccupationalHealthcare from "./EntryType/OccupationalHealthcare";
import HealthCheck from "./EntryType/HealthCheck";
import { Box } from "@mui/material";

interface EntryDetailsProps {
    entry: Entry;
    findDiagnoseDesc: (diagnosisCode: string) => string | undefined;
}

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const EntryDetails: React.FC<EntryDetailsProps> = ({
    entry,
    findDiagnoseDesc,
}) => {
    return (
        <Box
            component="span"
            sx={{ display: "block", border: 1, m: 2, padding: 2 }}
        >
            {(() => {
                switch (entry.type) {
                    case "Hospital":
                        return (
                            <Hospital
                                entry={entry}
                                findDiagnoseDesc={findDiagnoseDesc}
                            />
                        );
                    case "OccupationalHealthcare":
                        return (
                            <OccupationalHealthcare
                                entry={entry}
                                findDiagnoseDesc={findDiagnoseDesc}
                            />
                        );
                    case "HealthCheck":
                        return (
                            <HealthCheck
                                entry={entry}
                                findDiagnoseDesc={findDiagnoseDesc}
                            />
                        );
                    default:
                        return assertNever(entry);
                }
            })()}
        </Box>
    );
};

export default EntryDetails;
