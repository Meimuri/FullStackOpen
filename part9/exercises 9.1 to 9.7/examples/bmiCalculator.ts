interface BMIValues {
    weight: number;
    height: number;
}

const parseArguments = (args: string[]): BMIValues => {
    if (args.length < 4) throw new Error("Not enough arguments");
    if (args.length > 4) throw new Error("Too many arguments");

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            weight: Number(args[2]),
            height: Number(args[3]),
        };
    } else {
        throw new Error("Provided values were not numbers!");
    }
};

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

    return "BMI category not found";
};

try {
    const { weight, height } = parseArguments(process.argv);
    console.log(calculateBmi(weight, height));
} catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
        errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
}
