import { CoursePart } from "../utils/types";

const Total = (props: { courseParts: CoursePart[] }) => {
    const totalExercises = props.courseParts.reduce(
        (sum, part) => sum + part.exerciseCount,
        0
    );

    return <p>Total number of exercises: {totalExercises}</p>;
};

export default Total;
