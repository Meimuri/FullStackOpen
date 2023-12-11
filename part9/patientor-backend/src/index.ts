import express from "express";
import cors from "cors";
import diagnosesRouter from "./routes/diagnosesRoute";
import patientsRouter from "./routes/patientsRoute";

const app = express();
app.use(express.json());

app.use(cors());

const PORT = 3001;

app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientsRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
