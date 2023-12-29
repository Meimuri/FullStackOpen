import express, { Request, Response } from "express";
import patientsService from "../services/patientsService";
import toNewPatient from "../utils/toNewPatient";
import toNewEntry from "../utils/toNewEntry";

const router = express.Router();

router.get("/", (_req: Request, res: Response) => {
    res.send(patientsService.getNonSensitivePatientsEntries());
});

router.get("/:id", (req: Request, res: Response) => {
    const patient = patientsService.findById(req.params.id);

    if (patient) {
        res.send(patient);
    } else {
        res.status(404).send("Patient not found");
    }
});

router.post("/", (req: Request, res: Response) => {
    try {
        const newPatientEntry = toNewPatient(req.body);

        const addedEntry = patientsService.addPatient(newPatientEntry);
        res.json(addedEntry);
    } catch (error: unknown) {
        let errorMessage = "Failed to add a new patient. ";
        if (error instanceof Error) {
            errorMessage += error.message;
        } else {
            errorMessage += "An unknown error occurred.";
        }
        res.status(400).send(errorMessage);
    }
});

router.post("/:id/entries", (req: Request, res: Response) => {
    try {
        const patient = patientsService.findById(req.params.id);
        if (!patient) {
            res.status(404).send("Patient not found");
            return;
        }

        const newEntry = toNewEntry(req.body);
        const addedEntry = patientsService.addEntry(patient, newEntry);
        res.json(addedEntry);
    } catch (error: unknown) {
        let errorMessage = "Failed to add an entry for the patient. ";
        if (error instanceof Error) {
            errorMessage += error.message;
        } else {
            errorMessage += "An unknown error occurred.";
        }
        res.status(400).send(errorMessage);
    }
});

export default router;
