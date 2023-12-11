import { CoursePart } from "../utils/types";

const Content = (props: { courseParts: CoursePart[] }) => {
    return (
        <>
            {props.courseParts.map((part, index) => (
                <p key={index}>
                    {part.name} {part.exerciseCount}
                </p>
            ))}
        </>
    );
};

export default Content;
