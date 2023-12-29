export interface Values {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export interface ExerciseArguments {
    targetDailyHours: number;
    dailyHours: number[];
}

export const calculateRating = (average: number, target: number): number => {
    if (average >= target) {
        return 3;
    } else if (average >= (2 * target) / 3) {
        return 2;
    } else {
        return 1;
    }
};

export const calculateRatingDescription = (rating: number): string => {
    switch (rating) {
        case 1:
            return "Below target";
        case 2:
            return "Average";
        case 3:
            return "Perfect";
        default:
            return "Unknown rating";
    }
};

export const exerciseCalculator = (
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
