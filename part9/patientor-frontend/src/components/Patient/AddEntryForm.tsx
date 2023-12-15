import { useState, SyntheticEvent } from "react";
import {
    TextField,
    InputLabel,
    MenuItem,
    Select,
    Grid,
    Button,
    SelectChangeEvent,
    Box,
    Alert,
} from "@mui/material";
import {
    Entry,
    HealthCheckRating,
    NewDiagnosisEntry,
    EntryWithoutId,
} from "../../types";

interface Props {
    onSubmit: (values: NewDiagnosisEntry) => void;
    error?: string;
}

const AddEntryForm = ({ onSubmit, error }: Props) => {
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [specialist, setSpecialist] = useState("");
    const [diagnosisCode, setDiagnosisCode] = useState("");
    const [entryType, setEntryType] =
        useState<EntryWithoutId["type"]>("HealthCheck");
    const [healthCheckRating, setHealthCheckRating] = useState("0");
    const [employerName, setEmployerName] = useState("");
    const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
    const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");
    const [dischargeDate, setDischargeDate] = useState("");
    const [dischargeCriteria, setDischargeCriteria] = useState("");

    const onEntryTypeChange = (event: SelectChangeEvent<string>) => {
        event.preventDefault();
        setEntryType(event.target.value as Entry["type"]);
    };

    const submitNewEntry = async (event: SyntheticEvent) => {
        event.preventDefault();

        const extractedDiagnosisCodes = diagnosisCode
            .split(",")
            .map((code) => code.trim());

        let formData: NewDiagnosisEntry;

        if (entryType === "HealthCheck") {
            formData = {
                description,
                date,
                specialist,
                diagnosisCodes: extractedDiagnosisCodes,
                type: "HealthCheck",
                healthCheckRating: parseInt(
                    healthCheckRating
                ) as HealthCheckRating,
            };
        } else if (entryType === "OccupationalHealthcare") {
            formData = {
                description,
                date,
                specialist,
                diagnosisCodes: extractedDiagnosisCodes,
                type: "OccupationalHealthcare",
                employerName,
                sickLeave: {
                    startDate: sickLeaveStartDate,
                    endDate: sickLeaveEndDate,
                },
            };
        } else {
            // entryType is "Hospital"
            formData = {
                description,
                date,
                specialist,
                diagnosisCodes: extractedDiagnosisCodes,
                type: "Hospital",
                discharge: {
                    date: dischargeDate,
                    criteria: dischargeCriteria,
                },
            };
        }

        onSubmit(formData);
    };

    return (
        <Box component="span" sx={{ display: "block", border: 1, padding: 2 }}>
            {error && <Alert severity="error">{error}</Alert>}
            <form onSubmit={submitNewEntry}>
                <TextField
                    label="Description"
                    fullWidth
                    value={description}
                    onChange={({ target }) => setDescription(target.value)}
                    sx={{ marginBottom: 1, marginTop: 1 }}
                />
                <TextField
                    label="Date"
                    fullWidth
                    placeholder="YYYY-MM-DD"
                    value={date}
                    onChange={({ target }) => setDate(target.value)}
                    sx={{ marginBottom: 1, marginTop: 1 }}
                />
                <TextField
                    label="Specialist"
                    fullWidth
                    value={specialist}
                    onChange={({ target }) => setSpecialist(target.value)}
                    sx={{ marginBottom: 1, marginTop: 1 }}
                />
                <TextField
                    label="Diagnosis Codes (comma-separated)"
                    fullWidth
                    value={diagnosisCode}
                    onChange={({ target }) => setDiagnosisCode(target.value)}
                    sx={{ marginBottom: 1, marginTop: 1 }}
                />

                <InputLabel sx={{ marginBottom: 1, marginTop: 1 }}>
                    Entry Type
                </InputLabel>
                <Select
                    label="Entry Type"
                    fullWidth
                    value={entryType}
                    onChange={onEntryTypeChange}
                    sx={{ marginBottom: 2, marginTop: 2 }}
                >
                    <MenuItem value="HealthCheck">Health Check</MenuItem>
                    <MenuItem value="OccupationalHealthcare">
                        Occupational Healthcare
                    </MenuItem>
                    <MenuItem value="Hospital">Hospital</MenuItem>
                </Select>

                {entryType === "HealthCheck" && (
                    <TextField
                        label="Health Check Rating"
                        fullWidth
                        type="number"
                        value={healthCheckRating}
                        onChange={({ target }) =>
                            setHealthCheckRating(target.value)
                        }
                        sx={{ marginBottom: 1, marginTop: 1 }}
                    />
                )}

                {entryType === "OccupationalHealthcare" && (
                    <>
                        <TextField
                            label="Employer Name"
                            fullWidth
                            value={employerName}
                            onChange={({ target }) =>
                                setEmployerName(target.value)
                            }
                            sx={{ marginBottom: 1, marginTop: 1 }}
                        />
                        <TextField
                            label="Sick Leave Start Date"
                            fullWidth
                            value={sickLeaveStartDate}
                            onChange={({ target }) =>
                                setSickLeaveStartDate(target.value)
                            }
                            sx={{ marginBottom: 1, marginTop: 1 }}
                        />
                        <TextField
                            label="Sick Leave End Date"
                            fullWidth
                            value={sickLeaveEndDate}
                            onChange={({ target }) =>
                                setSickLeaveEndDate(target.value)
                            }
                            sx={{ marginBottom: 1, marginTop: 1 }}
                        />
                    </>
                )}

                {entryType === "Hospital" && (
                    <>
                        <TextField
                            label="Discharge Date"
                            fullWidth
                            value={dischargeDate}
                            onChange={({ target }) =>
                                setDischargeDate(target.value)
                            }
                            sx={{ marginBottom: 1, marginTop: 1 }}
                        />
                        <TextField
                            label="Discharge Criteria"
                            fullWidth
                            value={dischargeCriteria}
                            onChange={({ target }) =>
                                setDischargeCriteria(target.value)
                            }
                            sx={{ marginBottom: 1, marginTop: 1 }}
                        />
                    </>
                )}

                <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Grid item>
                        <Button
                            sx={{
                                marginBottom: 2,
                                marginTop: 2,
                            }}
                            type="submit"
                            variant="contained"
                        >
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default AddEntryForm;
