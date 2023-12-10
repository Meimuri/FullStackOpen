import express from "express";
import calculateBmi from "./utils/calculateBmi";
import {
    exerciseCalculator,
    ExerciseArguments,
} from "./utils/calculateExercise";

const app = express();
app.use(express.json());

app.get("/bmi", (req, res) => {
    const height: number | undefined = parseFloat(req.query.height as string);
    const weight: number | undefined = parseFloat(req.query.weight as string);

    if (
        isNaN(height) ||
        isNaN(weight) ||
        height === undefined ||
        weight === undefined
    ) {
        return res.status(400).json({ error: "Malformatted parameters" });
    }

    const bmi = calculateBmi(weight, height);

    return res.send(bmi);
});

app.post("/exercises", (req, res) => {
    const { dailyHours, targetDailyHours } = req.body as ExerciseArguments;

    if (!dailyHours || targetDailyHours === undefined) {
        return res.status(400).json({ error: "Parameters missing" });
    }

    if (!Array.isArray(dailyHours) || dailyHours.some((hour) => isNaN(hour))) {
        return res.status(400).json({ error: "Malformatted parameters" });
    }

    if (isNaN(targetDailyHours)) {
        return res.status(400).json({ error: "Malformatted parameters" });
    }

    const test = exerciseCalculator(dailyHours, targetDailyHours);
    res.json(test);

    return;
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
