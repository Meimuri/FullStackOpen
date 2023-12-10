import express from "express";
import calculateBmi from "./utils/calculateBmi";

const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
