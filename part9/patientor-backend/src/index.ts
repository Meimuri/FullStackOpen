import express, { Application } from "express";
import cors from "cors";
import diagnosesRouter from "./routes/diagnosesRoute";
import patientsRouter from "./routes/patientsRoute";

const app: Application = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientsRouter);

// Handle unknown routes
app.use((_req, res) => {
    res.status(404).send("Not Found");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
