import express, { Request, Response } from "express";
import diagnosesService from "../services/diagnosesService";

const router = express.Router();

router.get("/", (_req: Request, res: Response) => {
    try {
        const diagnoses = diagnosesService.getDiagnoses();
        res.json(diagnoses);
    } catch (error: unknown) {
        let errorMessage = "Failed to fetch diagnoses. ";
        if (error instanceof Error) {
            errorMessage += error.message;
        } else {
            errorMessage += "An unknown error occurred.";
        }
        res.status(500).send(errorMessage);
    }
});

export default router;
