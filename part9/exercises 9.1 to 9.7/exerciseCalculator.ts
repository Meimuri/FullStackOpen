interface Values {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateRatingDescription = (rating: number): string => {
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

    const rating = average >= 2 ? 3 : average >= 1.5 ? 2 : average >= 1 ? 1 : 0;
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

console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2));
