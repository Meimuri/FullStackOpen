interface Values {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const parseExerciseArguments = (
    args: string[]
): { targetDailyHours: number; dailyHours: number[] } => {
    if (args.length < 3) throw new Error("Not enough arguments");

    const targetDailyHours = Number(args[2]);

    const dailyHours = args.slice(3).map(Number);

    if (!dailyHours.every((hours) => !isNaN(hours))) {
        throw new Error("Provided daily hours were not numbers!");
    }

    return {
        targetDailyHours,
        dailyHours,
    };
};

const calculateRating = (average: number, target: number): number => {
    if (average >= target) {
        return 3;
    } else if (average >= (2 * target) / 3) {
        return 2;
    } else {
        return 1;
    }
};

const calculateRatingDescription = (rating: number): string => {
    switch (rating) {
        case 1:
            return "Below target";
        case 2:
            return "Average";
        case 3:
            return "Perfect";
    }
};

const exerciseCalculator = (
    dailyHours: number[],
    targetDailyHours: number
): Values => {
    const periodLength = dailyHours.length;
    const trainingDays = dailyHours.filter((hours) => hours !== 0).length;
    const target = targetDailyHours;

    const totalHours = dailyHours.reduce((sum, hours) => sum + hours, 0);
    const average = periodLength > 0 ? totalHours / periodLength : 0;
    const success = dailyHours.every((hours) => hours >= target);

    const rating = calculateRating(average, target);
    const ratingDescription = calculateRatingDescription(rating);

    const result: Values = {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };

    return result;
};

try {
    const { targetDailyHours, dailyHours } = parseExerciseArguments(
        process.argv
    );
    console.log(exerciseCalculator(dailyHours, targetDailyHours));
} catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
        errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
}

interface Values {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}
