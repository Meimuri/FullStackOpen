import { CoursePart } from "../utils/types";

const Content = (props: { courseParts: CoursePart[] }) => {
    const assertNever = (value: never): never => {
        throw new Error(
            `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    };

    return (
        <>
            {props.courseParts.map((part, index) => (
                <div key={index}>
                    {(() => {
                        switch (part.kind) {
                            case "basic":
                                return (
                                    <div>
                                        <p>
                                            <b>
                                                {part.name} -{" "}
                                                {part.exerciseCount}
                                            </b>
                                        </p>
                                        <p>
                                            <i>{part.description}</i>
                                        </p>
                                    </div>
                                );
                            case "group":
                                return (
                                    <div>
                                        <p>
                                            <b>
                                                {part.name} -{" "}
                                                {part.exerciseCount}
                                            </b>
                                        </p>
                                        <p>
                                            Project Exercises:{" "}
                                            {part.groupProjectCount}
                                        </p>
                                    </div>
                                );
                            case "background":
                                return (
                                    <div>
                                        <p>
                                            <b>
                                                {part.name} -{" "}
                                                {part.exerciseCount}
                                            </b>
                                        </p>
                                        <p>
                                            <i>{part.description}</i>
                                        </p>
                                        <p>
                                            Submit to: {part.backgroundMaterial}
                                        </p>
                                    </div>
                                );
                            case "special":
                                return (
                                    <div>
                                        <p>
                                            <b>
                                                {part.name} -{" "}
                                                {part.exerciseCount}
                                            </b>
                                        </p>
                                        <p>
                                            <i>{part.description}</i>
                                        </p>
                                        <p>
                                            Required Skills:{" "}
                                            {part.requirements.join(", ")}
                                        </p>
                                    </div>
                                );
                            default:
                                return assertNever(part);
                        }
                    })()}
                </div>
            ))}
        </>
    );
};

export default Content;
