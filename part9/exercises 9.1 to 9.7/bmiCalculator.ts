const calculateBmi = (weight: number, height: number): string => {
    const bmi: number = weight / Math.pow(height, 2);

    if (bmi < 16.0) {
        return "Underweight (Unhealthy)";
    }
    if (bmi >= 18.5 || bmi <= 22.9) {
        return "Normal range (Healthy)";
    }
    if (bmi >= 23.0 || bmi <= 24.9) {
        return "Overweight I (At risk)";
    }
    if (bmi >= 25.0 || bmi <= 29.9) {
        return "Overweight II (Moderately obese)";
    }
    if (bmi >= 30.0) {
        return "Overweight III (Severely obese)";
    }
};

console.log(calculateBmi(70, 1.79832));
